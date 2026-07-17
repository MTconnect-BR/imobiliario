import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { RootLayoutClient } from "@/components/root-layout-client";

const SITE_URL = "https://www.xn--sienagestoimobiliria-yxb9a.com.br";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Siena Gestão & Imobiliária",
  description:
    "A plataforma completa para comprar, alugar e investir em imóveis no Brasil. Casas, apartamentos, terrenos e imóveis comerciais da Caixa com até 90% de desconto.",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  knowsLanguage: ["pt-BR", "pt"],
  sameAs: [],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Como funciona o processo de compra de imóvel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O processo de compra envolve busca do imóvel, negociação, assinatura do contrato, pagamento do sinal, financiamento (se necessário) e registro em cartório.",
      },
    },
    {
      "@type": "Question",
      name: "Quais documentos são necessários para comprar um imóvel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RG, CPF, comprovante de renda, extrato do FGTS (se aplicável), declaração de imposto de renda e comprovante de endereço.",
      },
    },
    {
      "@type": "Question",
      name: "Posso usar o FGTS para dar entrada no imóvel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim! O FGTS pode ser utilizado para dar entrada no imóvel, pagar parcelas ou amortizar o saldo devedor.",
      },
    },
    {
      "@type": "Question",
      name: "Qual a taxa de juros do financiamento imobiliário?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As taxas variam de 9% a 12% ao ano, dependendo do banco, perfil do comprador e prazo de pagamento.",
      },
    },
    {
      "@type": "Question",
      name: "Como alugar um imóvel da Caixa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Escolha o imóvel, envie sua proposta, assine o contrato e realize o pagamento do sinal e primeira parcela.",
      },
    },
    {
      "@type": "Question",
      name: "O que é a matrícula do imóvel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A matrícula é um documento que comprova a propriedade do imóvel, emitido pelo cartório de registro de imóveis.",
      },
    },
    {
      "@type": "Question",
      name: "Quais garantias são aceitas no aluguel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Caução, fiador ou seguro fiança locatício. A maioria dos proprietários aceita qualquer uma dessas opções.",
      },
    },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "4BVutqR9sc529AN66yKLaZSz1sUx-gwuqxA30ovv7y4",
  },
  title: {
    default: "Siena Gestão & Imobiliária | Compre, alugue e invista em imóveis",
    template: "%s | Siena Gestão & Imobiliária",
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
    "imóveis da Caixa",
    "Caixa Econômica Federal",
    "imóveis populares",
    "casa popular",
    "apartamento popular",
    "moradia própria",
    "crédito imobiliário",
    "FGTS",
    "habitação",
    "imóvel barato",
    "desconto imóvel",
    "imóvel disponível",
    "real estate",
    "brasil",
    "Siena",
    "gestão imobiliária",
    "imobiliária",
    "consultoria imobiliária",
    "corretor de imóveis",
    "compra e venda",
    "locação",
    "aluguel",
  ],
  authors: [{ name: "Siena Gestão & Imobiliária" }],
  creator: "Siena Gestão & Imobiliária",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.xn--sienagestoimobiliria-yxb9a.com.br",
    siteName: "Siena Gestão & Imobiliária",
    title: "Siena Gestão & Imobiliária | Compre, alugue e invista em imóveis",
    description: "A plataforma completa para comprar, alugar e investir em imóveis no Brasil.",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Siena Gestão & Imobiliária",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siena Gestão & Imobiliária | Compre, alugue e invista em imóveis",
    description: "A plataforma completa para comprar, alugar e investir em imóveis no Brasil.",
    images: ["/og.svg"],
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
    canonical: "https://www.xn--sienagestoimobiliria-yxb9a.com.br",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("antialiased", inter.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="font-sans">
        <RootLayoutClient>{children}</RootLayoutClient>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
