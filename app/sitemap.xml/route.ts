import { NextResponse } from "next/server";

const BASE = "https://www.xn--sienagestoimobiliria-yxb9a.com.br";
const API_BASE = "https://reidoape.com.br/api";
const ID_MASTER = "90821645";
const PAGE_SIZE = 100;

interface RawItem {
  id: string;
}

interface RawPage {
  items?: RawItem[];
  meta?: { total?: number };
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function fetchPage(page: number): Promise<RawPage> {
  const url = `${API_BASE}?id_master=${ID_MASTER}&pagina=${page}&limite=${PAGE_SIZE}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function GET(): Promise<NextResponse> {
  const now = new Date().toISOString();

  const staticPages = [
    { loc: BASE, lastmod: now, changefreq: "weekly", priority: "1.0" },
    { loc: `${BASE}/imoveis`, lastmod: now, changefreq: "weekly", priority: "0.9" },
    { loc: `${BASE}/imoveis/casas`, lastmod: now, changefreq: "weekly", priority: "0.8" },
    { loc: `${BASE}/imoveis/apartamentos`, lastmod: now, changefreq: "weekly", priority: "0.8" },
    { loc: `${BASE}/imoveis/terrenos`, lastmod: now, changefreq: "weekly", priority: "0.8" },
    { loc: `${BASE}/imoveis/comerciais`, lastmod: now, changefreq: "weekly", priority: "0.8" },
    { loc: `${BASE}/contato`, lastmod: now, changefreq: "yearly", priority: "0.7" },
    { loc: `${BASE}/termos-de-servico`, lastmod: now, changefreq: "yearly", priority: "0.3" },
    { loc: `${BASE}/politica-de-privacidade`, lastmod: now, changefreq: "yearly", priority: "0.3" },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const p of staticPages) {
    xml += `<url>\n`;
    xml += `  <loc>${escapeXml(p.loc)}</loc>\n`;
    xml += `  <lastmod>${p.lastmod}</lastmod>\n`;
    xml += `  <changefreq>${p.changefreq}</changefreq>\n`;
    xml += `  <priority>${p.priority}</priority>\n`;
    xml += `</url>\n`;
  }

  try {
    const firstPage = await fetchPage(0);
    const total = firstPage.meta?.total ?? 0;
    const totalPages = Math.ceil(total / PAGE_SIZE);

    for (const item of firstPage.items ?? []) {
      xml += `<url>\n`;
      xml += `  <loc>${escapeXml(`${BASE}/imoveis/imovel-${item.id}`)}</loc>\n`;
      xml += `  <lastmod>${now}</lastmod>\n`;
      xml += `  <changefreq>weekly</changefreq>\n`;
      xml += `  <priority>0.6</priority>\n`;
      xml += `</url>\n`;
    }

    const BATCH = 10;
    for (let batchStart = 1; batchStart < totalPages; batchStart += BATCH) {
      const batchEnd = Math.min(batchStart + BATCH, totalPages);
      const pages: number[] = [];
      for (let p = batchStart; p < batchEnd; p++) pages.push(p);

      const results = await Promise.all(pages.map((p) => fetchPage(p)));
      for (const data of results) {
        for (const item of data.items ?? []) {
          xml += `<url>\n`;
          xml += `  <loc>${escapeXml(`${BASE}/imoveis/imovel-${item.id}`)}</loc>\n`;
          xml += `  <lastmod>${now}</lastmod>\n`;
          xml += `  <changefreq>weekly</changefreq>\n`;
          xml += `  <priority>0.6</priority>\n`;
          xml += `</url>\n`;
        }
      }

      if (batchEnd < totalPages) {
        await new Promise((r) => setTimeout(r, 200));
      }
    }
  } catch (err) {
    console.error("Sitemap: API error, returning static pages only", err);
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
