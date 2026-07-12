import { NextRequest, NextResponse } from "next/server";
import { type Property, type PropertyType } from "@/lib/properties";

const REIDOAPE_API = "https://reidoape.com.br/api";
const REIDOAPE_ID_MASTER = "90821645";

interface ReiDoApeMeta {
  total: number;
  pagina: number;
  limite: number;
  ordena: string;
}

interface ReiDoApePreco {
  tipo: string;
  valor: string;
  label: string;
  destaque: boolean;
  riscado: boolean;
}

interface ReiDoApeItem {
  id: string;
  categoria: string;
  categoria_nome: string;
  transacao: string;
  tipo: string;
  referencia_plain: string;
  ref_caixa: string;
  valor_venda1: string;
  valor_avaliacao_txt: string;
  desconto_pct: string;
  cidade: string;
  estado: string;
  bairro: string;
  enderecoPermissao: string;
  numeroPermissao: string;
  quartos_txt: string;
  banheiros_txt: string;
  vagas_txt: string;
  area_m2: string;
  area_total_caixa: string;
  estado_imovel_txt: string;
  situacao_caixa: string;
  titulo_plain: string;
  descricao_html: string;
  foto: string;
  fotos: string[];
  coordenadas: string;
  map_lat: number | null;
  map_lon: number | null;
  map_geocode_queries: string[];
  precos: ReiDoApePreco[];
  link: string;
}

interface ReiDoApeApiResponse {
  meta: ReiDoApeMeta;
  items: ReiDoApeItem[];
}

function cleanHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#\d+;/g, "")
    .trim();
}

function parsePrice(text: string): number {
  const cleaned = cleanHtml(text);
  const match = cleaned.match(/R\$\s*([\d.,]+)/);
  if (!match) return 0;
  const numStr = match[1].replace(/\./g, "").replace(",", ".");
  const num = parseFloat(numStr);
  return isNaN(num) ? 0 : Math.round(num);
}

function parseArea(text: string): number {
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

function parseNumber(text: string): number {
  const cleaned = cleanHtml(text);
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? 0 : num;
}

function stripHtml(html: string): string {
  return cleanHtml(html);
}

function mapItemToProperty(item: ReiDoApeItem): Property {
  const cityState = item.cidade.split(",").map(s => s.trim());
  const city = cityState[0] ?? item.cidade;
  const stateShort = item.estado;

  const enderecoRaw = stripHtml(item.enderecoPermissao ?? "").replace(/^Endereço:\s*/i, "").trim();
  const numeroRaw = stripHtml(item.numeroPermissao ?? "").replace(/^\|\s*Número:\s*/i, "").trim();

  const price = parsePrice(item.valor_venda1 ?? "");
  const avaliacao = parsePrice(item.valor_avaliacao_txt ?? "");
  const desconto = parseInt(item.desconto_pct ?? "0", 10) || undefined;

  const area = parseArea(item.area_m2 ?? "") || parseArea(item.area_total_caixa ?? "");
  const quartos = parseNumber(item.quartos_txt ?? "0");
  const banheiros = parseNumber(item.banheiros_txt ?? "0");
  const vagas = parseNumber(item.vagas_txt ?? "0");

  const matriculaUrl = `https://venda-imoveis.caixa.gov.br/editais/matricula/${item.estado}/${item.ref_caixa}.pdf`;
  const officialUrl = `https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=${item.ref_caixa}`;

  const typeMap: Record<string, PropertyType> = {
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

  const images = (item.fotos?.length > 0 ? item.fotos : [item.foto]).filter(Boolean);

  let lat: number | undefined;
  let lng: number | undefined;
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
    ? stripHtml(item.descricao_html)
    : item.titulo_plain || `Imóvel ${item.categoria_nome}\n\nRef: ${item.referencia_plain}`;

  return {
    id: `reidoape-${item.id}`,
    title: item.titulo_plain || `Imóvel ${item.categoria_nome} - ${item.bairro}, ${item.cidade}`,
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Math.max(0, parseInt(searchParams.get("page") ?? "0", 10));

  const params = new URLSearchParams({
    id_master: REIDOAPE_ID_MASTER,
    pagina: page.toString(),
  });

  const passthrough = [
    "estado", "cidade", "bairro", "categoria_nome", "busca",
    "referencia", "financiamento", "caixa_fgts", "caixa_pagamento",
    "caixa_condominio", "caixa_tributos", "preco_minimo", "preco_maximo",
    "quartos_min", "banheiros_min", "vagas_min", "ordena", "tipo_imovel",
  ];

  for (const key of passthrough) {
    const val = searchParams.get(key);
    if (val) params.set(key, val);
  }

  const estadoImovel = searchParams.getAll("estado_imovel[]");
  for (const val of estadoImovel) {
    params.append("estado_imovel[]", val);
  }

  try {
    const res = await fetch(`${REIDOAPE_API}?${params}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`External API error: ${res.status}`);
    }

    const data: ReiDoApeApiResponse = await res.json();

    const transformed = data.items.map(mapItemToProperty);

    return NextResponse.json({
      total: data.meta.total,
      page: data.meta.pagina,
      perPage: data.meta.limite,
      properties: transformed,
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 502 }
    );
  }
}
