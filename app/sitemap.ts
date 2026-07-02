import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://imobiliario-nu.vercel.app";
  const now = new Date();

  const staticPages = [
    { url: base, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/imoveis`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/imoveis/casas`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/imoveis/apartamentos`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/imoveis/terrenos`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/imoveis/comerciais`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/termos-de-servico`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/politica-de-privacidade`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return staticPages;
}
