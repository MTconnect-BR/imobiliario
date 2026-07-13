const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const REIDOAPE_API = "https://reidoape.com.br/api";
const REIDOAPE_ID_MASTER = "90821645";
const PAGE_SIZE = 100;
const OUTPUT_DIR = path.join(__dirname, "..", "data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "all-properties.json");

function cleanHtml(html) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#\d+;/g, "")
    .trim();
}

function parsePrice(text) {
  const cleaned = cleanHtml(text);
  const match = cleaned.match(/R\$\s*([\d.,]+)/);
  if (!match) return 0;
  const numStr = match[1].replace(/\./g, "").replace(",", ".");
  const num = parseFloat(numStr);
  return isNaN(num) ? 0 : Math.round(num);
}

function parseArea(text) {
  const cleaned = cleanHtml(text).trim();
  if (!cleaned) return 0;
  const normalized = cleaned.replace(/\./g, "").replace(",", ".");
  const match = normalized.match(/([\d.]+)\s*m/);
  if (match) {
    const num = parseFloat(match[1]);
    return isNaN(num) ? 0 : num;
  }
  const num = parseFloat(normalized);
  return isNaN(num) ? 0 : num;
}

function parseNumber(text) {
  const cleaned = cleanHtml(text);
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? 0 : num;
}

function mapItem(item) {
  const cityState = item.cidade.split(",").map((s) => s.trim());
  const city = cityState[0] ?? item.cidade;
  const stateShort = item.estado;

  const enderecoRaw = cleanHtml(item.enderecoPermissao ?? "")
    .replace(/^Endereço:\s*/i, "")
    .trim();
  const numeroRaw = cleanHtml(item.numeroPermissao ?? "")
    .replace(/^\|\s*Número:\s*/i, "")
    .trim();

  const price = parsePrice(item.valor_venda1 ?? "");
  const avaliacao = parsePrice(item.valor_avaliacao_txt ?? "");
  const desconto = parseInt(item.desconto_pct ?? "0", 10) || undefined;

  const area =
    parseArea(item.area_m2 ?? "") || parseArea(item.area_total_caixa ?? "");
  const quartos = parseNumber(item.quartos_txt ?? "0");
  const banheiros = parseNumber(item.banheiros_txt ?? "0");
  const vagas = parseNumber(item.vagas_txt ?? "0");

  const matriculaUrl = `https://venda-imoveis.caixa.gov.br/editais/matricula/${item.estado}/${item.ref_caixa}.pdf`;
  const officialUrl = `https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=${item.ref_caixa}`;

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
  };

  const images = (
    item.fotos?.length > 0 ? item.fotos : [item.foto]
  ).filter(Boolean);

  let lat, lng;
  if (item.map_lat && item.map_lon) {
    lat = item.map_lat;
    lng = item.map_lon;
  } else if (item.coordenadas) {
    const parts = item.coordenadas.match(/-?\d+\.\d+/g);
    if (parts?.length === 2) {
      lat = parseFloat(parts[0]);
      lng = parseFloat(parts[1]);
    }
  }

  const situacao = item.situacao_caixa || item.estado_imovel_txt || "";
  const description = item.descricao_html
    ? cleanHtml(item.descricao_html)
    : item.titulo_plain ||
      `Imóvel ${item.categoria_nome}\n\nRef: ${item.referencia_plain}`;

  return {
    id: `imovel-${item.id}`,
    title:
      item.titulo_plain ||
      `Imóvel ${item.categoria_nome} - ${item.bairro}, ${item.cidade}`,
    type: typeMap[item.categoria] ?? "casa",
    status: "disponivel",
    price,
    area,
    bedrooms: quartos,
    bathrooms: banheiros,
    parkingSpaces: vagas,
    address: enderecoRaw,
    addressNumber: numeroRaw,
    neighborhood: item.bairro || "",
    city,
    state: stateShort,
    cep: "",
    description,
    imageUrl: images[0] ?? "",
    images,
    lat,
    lng,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source: "reidoape",
    refCaixa: item.ref_caixa,
    reidoapeId: item.id,
    avaliacaoPrice: avaliacao || undefined,
    descontoPct: desconto,
    situacaoCaixa: situacao,
    documents: [
      { label: "Matrícula do Imóvel", url: matriculaUrl },
    ],
    officialUrl,
  };
}

function fetchPage(page) {
  return new Promise((resolve, reject) => {
    const url = `${REIDOAPE_API}?id_master=${REIDOAPE_ID_MASTER}&pagina=${page}&limite=${PAGE_SIZE}`;
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

async function main() {
  console.log("Iniciando download de todos os imóveis...");

  const firstPage = await fetchPage(0);
  const total = firstPage.meta?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  console.log(`Total: ${total} imóveis em ${totalPages} páginas`);

  const allItems = [...(firstPage.items ?? [])];
  console.log(`Página 0: ${allItems.length} itens`);

  const BATCH = 10;
  for (let batchStart = 1; batchStart < totalPages; batchStart += BATCH) {
    const batchEnd = Math.min(batchStart + BATCH, totalPages);
    const pages = [];
    for (let p = batchStart; p < batchEnd; p++) pages.push(p);

    const results = await Promise.all(pages.map((p) => fetchPage(p)));
    for (const data of results) {
      allItems.push(...(data.items ?? []));
    }
    console.log(
      `Páginas ${batchStart}-${batchEnd - 1}: ${allItems.length} itens total`
    );
  }

  const properties = allItems.map(mapItem);

  const uniqueMap = new Map();
  for (const p of properties) {
    uniqueMap.set(p.id, p);
  }
  const uniqueProperties = Array.from(uniqueMap.values());

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(uniqueProperties, null, 2));
  console.log(
    `\nSalvo ${uniqueProperties.length} imóveis únicos em ${OUTPUT_FILE}`
  );
  console.log(
    `Removidos ${properties.length - uniqueProperties.length} duplicatas`
  );
  console.log(
    `Tamanho: ${(fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(2)} MB`
  );
}

main().catch(console.error);
