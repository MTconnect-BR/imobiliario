import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ChromeWrapper } from "@/components/chrome-wrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://imobiliario-nu.vercel.app"),
  title: {
    default: "Imobiliario | Compre, alugue e invista em imoveis",
    template: "%s | Imobiliario",
  },
  description:
    "A plataforma completa para comprar, alugar e investir em imoveis no Brasil. Encontre casas, apartamentos, terrenos e imoveis comerciais com as melhores condicoes do mercado.",
  keywords: [
    "imoveis",
    "comprar imovel",
    "alugar imovel",
    "casa",
    "apartamento",
    "terreno",
    "imovel comercial",
    "financiamento imobiliario",
    "investimento imobiliario",
    "real estate",
    "brasil",
  ],
  authors: [{ name: "Imobiliario" }],
  creator: "Imobiliario",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://imobiliario-nu.vercel.app",
    siteName: "Imobiliario",
    title: "Imobiliario | Compre, alugue e invista em imoveis",
    description:
      "A plataforma completa para comprar, alugar e investir em imoveis no Brasil.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Imobiliario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imobiliario | Compre, alugue e invista em imoveis",
    description:
      "A plataforma completa para comprar, alugar e investir em imoveis no Brasil.",
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
        <ChromeWrapper>{children}</ChromeWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
