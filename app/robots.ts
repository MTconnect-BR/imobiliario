import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/crm", "/auth", "/api"],
      },
    ],
    sitemap: "https://www.xn--sienagestoimobiliria-yxb9a.com.br/sitemap.xml",
  };
}
