import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { RootLayoutClient } from "@/components/root-layout-client";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://imobiliario-nu.vercel.app"),
  title: {
    default: "Imobiliário | Compre, alugue e invista em imóveis",
    template: "%s | Imobiliário",
  },
  description:
    "A plataforma completa para comprar, alugar e investir em imóveis no Brasil. Encontre casas, apartamentos, terrenos e imóveis comerciais com as melhores condições do mercado.",
  keywords: [
    "imóveis",
    "comprar imóvel",
    "alugar imóvel",
    "casa",
    "apartamento",
    "terreno",
    "imóvel comercial",
    "financiamento imobiliário",
    "investimento imobiliário",
    "real estate",
    "brasil",
  ],
  authors: [{ name: "Imobiliário" }],
  creator: "Imobiliário",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://imobiliario-nu.vercel.app",
    siteName: "Imobiliário",
    title: "Imobiliário | Compre, alugue e invista em imóveis",
    description:
      "A plataforma completa para comprar, alugar e investir em imóveis no Brasil.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Imobiliário",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imobiliário | Compre, alugue e invista em imóveis",
    description:
      "A plataforma completa para comprar, alugar e investir em imóveis no Brasil.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://imobiliario-nu.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("antialiased", inter.variable)}>
      <body className="font-sans">
        <RootLayoutClient>{children}</RootLayoutClient>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
