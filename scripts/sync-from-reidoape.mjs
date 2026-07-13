import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hxhzsmafybdkoysqtfxi.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const API_BASE = "https://reidoape.com.br/api?id_master=90821645&pagina=";
const PAGE_SIZE = 100;
const CONCURRENT = 5;
const BATCH_DELAY_MS = 300;
const UPSERT_BATCH = 100;

function parsePrice(text) {
  if (!text) return 0;
  const cleaned = String(text)
    .replace(/<[^>]*>/g, "")
    .trim();
  const match = cleaned.match(/R\$\s*([\d.,]+)/);
  if (!match) return 0;
  return Math.round(parseFloat(match[1].replace(/\./g, "").replace(",", ".")) || 0);
}

function parseArea(text) {
  if (!text) return 0;
  const cleaned = String(text)
    .replace(/<[^>]*>/g, "")
    .trim();
  if (!cleaned) return 0;
  const normalized = cleaned.replace(/\./g, "").replace(",", ".");
  const match = normalized.match(/([\d.]+)\s*m/);
  if (match) return parseFloat(match[1]) || 0;
  return parseFloat(normalized) || 0;
}

function mapItem(item) {
  const cityState = (item.cidade || "").split(",").map((s) => s.trim());
  const city = cityState[0] ?? (item.cidade || "");
  const stateShort = item.estado || "";

  const enderecoRaw = (item.enderecoPermissao || "")
    .replace(/<[^>]*>/g, "")
    .replace(/^Endereço:\s*/i, "")
    .trim();
  const numeroRaw = (item.numeroPermissao || "")
    .replace(/<[^>]*>/g, "")
    .replace(/^\|\s*Número:\s*/i, "")
    .trim();

  const price = parsePrice(item.valor_venda1);
  const avaliacao = parsePrice(item.valor_avaliacao_txt);
  const desconto = parseInt(item.desconto_pct || "0", 10) || null;

  const area = parseArea(item.area_m2) || parseArea(item.area_total_caixa);
  const quartos = parseInt(item.quartos_txt || "0", 10) || 0;
  const banheiros = parseInt(item.banheiros_txt || "0", 10) || 0;
  const vagas = parseInt(item.vagas_txt || "0", 10) || 0;

  const typeMap = {
    Apartamento: "apartamento",
    Casa: "casa",
    Terreno: "terreno",
    "Terreno / Lote": "terreno",
    Comercial: "comercial",
    Loja: "comercial",
    Sala: "comercial",
    Prédio: "comercial",
    Chácara: "casa",
    Fazenda: "casa",
    Sítio: "casa",
    Kitnet: "apartamento",
    Flat: "apartamento",
    Cobertura: "apartamento",
    Andar: "apartamento",
    Galpão: "comercial",
    "Grupo de Salas Comerciais": "comercial",
    "Imóvel Comercial": "comercial",
    Sobrado: "casa",
    "Casa Duplex": "casa",
    "Andar Corporativo": "comercial",
  };

  const categoria = item.categoria || item.categoria_nome || "";
  const images = (item.fotos?.length > 0 ? item.fotos : [item.foto]).filter(Boolean);

  let lat = null,
    lng = null;
  if (item.map_lat && item.map_lon) {
    lat = parseFloat(item.map_lat);
    lng = parseFloat(item.map_lon);
  } else if (item.coordenadas) {
    const parts = item.coordenadas.match(/-?\d+\.\d+/g);
    if (parts?.length === 2) {
      lat = parseFloat(parts[0]);
      lng = parseFloat(parts[1]);
    }
  }

  const description = item.descricao_html
    ? item.descricao_html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .trim()
    : item.titulo_plain || `Imóvel ${categoria} - Ref: ${item.ref_caixa}`;

  const matriculaUrl = item.ref_caixa
    ? `https://venda-imoveis.caixa.gov.br/editais/matricula/${item.estado}/${item.ref_caixa}.pdf`
    : "";
  const officialUrl = item.ref_caixa
    ? `https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=${item.ref_caixa}`
    : "";

  return {
    reidoape_id: String(item.id),
    title: item.titulo_plain || `Imóvel ${categoria} - ${item.bairro || ""}, ${item.cidade || ""}`,
    type: typeMap[categoria] || "casa",
    categoria,
    status: "disponivel",
    price: price,
    avaliacao_price: avaliacao || null,
    desconto_pct: desconto,
    area: area,
    bedrooms: quartos,
    bathrooms: banheiros,
    parking_spaces: vagas,
    address: enderecoRaw,
    address_number: numeroRaw,
    neighborhood: item.bairro || "",
    city,
    state: stateShort,
    cep: "",
    description,
    image_url: images[0] || "",
    images: JSON.stringify(images),
    lat,
    lng,
    ref_caixa: item.ref_caixa || null,
    modalidade: item.situacao_caixa || item.estado_imovel_txt || null,
    tipo_origem: item.tipo || null,
    documents: item.ref_caixa
      ? JSON.stringify([{ label: "Matrícula do Imóvel", url: matriculaUrl }])
      : "[]",
    official_url: officialUrl || null,
    source: "reidoape",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

async function fetchPage(page) {
  const url = `${API_BASE}${page}&limite=${PAGE_SIZE}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} on page ${page}`);
  return res.json();
}

async function fetchAllProperties() {
  const startRes = await fetchPage(0);
  const total = startRes.meta?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const allItems = [...(startRes.data || [])];
  let fetchedSoFar = allItems.length;

  console.log(`Total properties: ${total} — fetching ${totalPages} pages`);

  for (let batchStart = 1; batchStart < totalPages; batchStart += CONCURRENT) {
    const batchEnd = Math.min(batchStart + CONCURRENT, totalPages);
    const pages = [];
    for (let p = batchStart; p < batchEnd; p++) {
      pages.push(p);
    }

    const results = await Promise.all(
      pages.map((p) =>
        fetchPage(p).catch((err) => {
          console.error(`Error fetching page ${p}: ${err.message}`);
          return null;
        }),
      ),
    );

    for (const data of results) {
      if (data?.data?.length) {
        allItems.push(...data.data);
        fetchedSoFar += data.data.length;
      }
    }

    process.stdout.write(
      `\rFetching pages ${batchStart}-${Math.min(batchEnd - 1, totalPages - 1)}/${totalPages - 1} (total so far: ${fetchedSoFar})`,
    );

    if (batchEnd < totalPages) {
      await new Promise((r) => setTimeout(r, BATCH_DELAY_MS));
    }
  }

  console.log(`\nFetched ${allItems.length} properties total`);
  return allItems;
}

async function upsertProperties(items) {
  const mapped = items.map(mapItem);
  const total = mapped.length;

  for (let i = 0; i < total; i += UPSERT_BATCH) {
    const batch = mapped.slice(i, i + UPSERT_BATCH);
    const batchNum = Math.floor(i / UPSERT_BATCH) + 1;
    const totalBatches = Math.ceil(total / UPSERT_BATCH);

    const { error } = await supabase
      .from("properties")
      .upsert(batch, { onConflict: "reidoape_id" });

    if (error) {
      console.error(`Error upserting batch ${batchNum}/${totalBatches}: ${error.message}`);
    } else {
      process.stdout.write(`\rUpserting batch ${batchNum}/${totalBatches}`);
    }
  }

  console.log("\nUpsert complete");
  return total;
}

async function main() {
  const startTime = Date.now();

  try {
    const items = await fetchAllProperties();

    if (items.length === 0) {
      console.log("No properties found to sync");
      return;
    }

    const imported = await upsertProperties(items);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`Sync complete! ${imported} properties imported in ${elapsed} seconds`);
  } catch (err) {
    console.error(`Fatal error: ${err.message}`);
    process.exit(1);
  }
}

main();
