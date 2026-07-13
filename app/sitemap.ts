import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/properties-server";
import { waitForFullLoad } from "@/lib/reidoape-api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://imobiliario-nu.vercel.app";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    {
      url: `${base}/imoveis`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${base}/imoveis/casas`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${base}/imoveis/apartamentos`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${base}/imoveis/terrenos`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${base}/imoveis/comerciais`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${base}/contato`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${base}/termos-de-servico`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${base}/politica-de-privacidade`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  await waitForFullLoad();
  const properties = await getProperties();
  const propertyPages: MetadataRoute.Sitemap = properties.slice(0, 50000).map((property) => {
    const lastMod = new Date(property.updatedAt);
    return {
      url: `${base}/imoveis/${property.id}`,
      lastModified: isNaN(lastMod.getTime()) ? now : lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    };
  });

  return [...staticPages, ...propertyPages];
}
