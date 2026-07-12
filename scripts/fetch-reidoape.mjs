#!/usr/bin/env node
/**
 * Busca todos os imóveis do Rei do APê via API Colibex.
 * POST https://reidoape.com.br/api
 * Salva em data/reidoape-properties.json
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const OUTPUT = join(DATA_DIR, "reidoape-properties.json");
const API_URL = "https://reidoape.com.br/api";
const ID_MASTER = "90821645";
const PAGE_SIZE = 24;
const DELAY_MS = 300;

function cleanHtml(html) {
  if (!html) return "";
  return String(html)
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function parseArea(raw) {
  const s = cleanHtml(raw).replace(/[^\d,]/g, "").replace(",", ".");
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function parseNumber(raw) {
  const s = cleanHtml(raw).replace(/[^\d]/g, "");
  const n = parseInt(s, 10);
  return isNaN(n) ? null : n;
}

function parsePrice(raw) {
  const s = cleanHtml(raw).replace(/[^\d]/g, "");
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchPage(page) {
  const body = new URLSearchParams();
  body.set("id_master", ID_MASTER);
  body.set("pagina", String(page));
  body.set("limite", String(PAGE_SIZE));
  body.set("ordena", "recentes");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
    body: body.toString(),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function transformItem(item) {
  const fotos = (item.fotos || []).filter(Boolean);
  const primeiraFoto = item.foto || fotos[0] || "";

  return {
    id: item.id,
    referencia: item.referencia_plain || "",
    ref_caixa: item.ref_caixa || "",
    titulo: cleanHtml(item.titulo_plain || item.titulo_linha),
    categoria: item.categoria_nome || item.categoria || "",
    transacao: item.transacao || "",
    tipo: item.tipo || "",
    valor_venda: item.valor_venda1 ? parsePrice(item.valor_venda1) : null,
    valor_locacao: item.valorLocacao ? parsePrice(item.valorLocacao) : null,
    valor_avaliacao: item.valor_avaliacao_txt ? parsePrice(item.valor_avaliacao_txt) : null,
    desconto_pct: item.desconto_pct ? parseNumber(item.desconto_pct) : null,
    cidade: cleanHtml(item.cidade || ""),
    estado: item.estado || "",
    bairro: cleanHtml(item.bairro || ""),
    endereco: cleanHtml(item.enderecoPermissao || ""),
    numero: cleanHtml(item.numeroPermissao || ""),
    quartos: item.quartos_txt ? parseNumber(item.quartos_txt) : parseNumber(item.quartos),
    banheiros: item.banheiros_txt ? parseNumber(item.banheiros_txt) : parseNumber(item.banheiros),
    vagas: item.vagas_txt ? parseNumber(item.vagas_txt) : parseNumber(item.vagas),
    area_m2: item.area_m2 ? parseArea(item.area_m2) : null,
    area_total: item.area_total_caixa ? parseArea(item.area_total_caixa) : null,
    area_privativa: item.area_privativa_caixa ? parseArea(item.area_privativa_caixa) : null,
    estado_imovel: item.estado_imovel_txt || "",
    situacao_caixa: item.situacao_caixa || "",
    fotos: fotos,
    imagem_principal: primeiraFoto,
    coordenadas: item.coordenadas || "",
    descricao: cleanHtml(item.descricao_html || ""),
    link: `https://reidoape.com.br/detalhes/${item.id}.html`,
  };
}

async function main() {
  console.log("Buscando imóveis do Rei do APê...");
  console.log(`API: ${API_URL}`);
  console.log(`ID Master: ${ID_MASTER}`);

  // Primeira página para pegar o total
  const first = await fetchPage(0);
  const total = first.meta?.total || 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  console.log(`Total de imóveis: ${total}`);
  console.log(`Total de páginas: ${totalPages}`);
  console.log(`Tamanho da página: ${PAGE_SIZE}`);

  // Carregar progresso anterior se existir
  let allProperties = [];
  let startPage = 0;
  if (existsSync(OUTPUT)) {
    try {
      const existing = JSON.parse(readFileSync(OUTPUT, "utf8"));
      if (existing.properties && existing.total === total) {
        allProperties = existing.properties;
        startPage = existing.lastPage + 1;
        console.log(`Retomando da página ${startPage} (${allProperties.length} já baixados)`);
      }
    } catch (e) {}
  }

  for (let page = startPage; page < totalPages; page++) {
    try {
      const data = page === 0 ? first : await fetchPage(page);
      const items = data.items || [];

      for (const item of items) {
        if (item._debug_only) continue;
        allProperties.push(transformItem(item));
      }

      process.stdout.write(
        `\rPágina ${page + 1}/${totalPages} | ${allProperties.length} imóveis coletados`
      );

      // Salvar a cada 50 páginas
      if ((page + 1) % 50 === 0 || page === totalPages - 1) {
        writeFileSync(
          OUTPUT,
          JSON.stringify(
            { total, lastPage: page, count: allProperties.length, properties: allProperties },
            null,
            2
          )
        );
      }

      if (page < totalPages - 1) await sleep(DELAY_MS);
    } catch (err) {
      console.error(`\nErro na página ${page}: ${err.message}. Tentando novamente...`);
      await sleep(2000);
      page--;
    }
  }

  console.log(`\n\nConcluído! ${allProperties.length} imóveis salvos em ${OUTPUT}`);
}

main().catch(console.error);
