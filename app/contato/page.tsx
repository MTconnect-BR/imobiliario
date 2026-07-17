import type { Metadata } from "next";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ContactCard } from "@/components/contact-card";
import { LocalBusinessJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

const SITE_URL = "https://www.xn--sienagestoimobiliria-yxb9a.com.br";

export const metadata: Metadata = {
  title: "Fale Conosco | Contato da Siena Gestão & Imobiliária",
  description:
    "Entre em contato com a Siena Gestão & Imobiliária. Tire suas dúvidas sobre imóveis da Caixa, financiamento, locação e mais. Atendimento online em todo o Brasil.",
  keywords: [
    "contato imobiliária",
    "fale conosco",
    "WhatsApp imobiliária",
    "telefone imobiliária",
    "atendimento",
    "Siena contato",
    "dúvidas imóveis",
    "financiamento imobiliário contato",
  ],
  openGraph: {
    title: "Fale Conosco | Siena Gestão & Imobiliária",
    description:
      "Entre em contato com a Siena Gestão & Imobiliária. Atendimento online em todo o Brasil.",
    url: `${SITE_URL}/contato`,
    siteName: "Siena Gestão & Imobiliária",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Contato" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fale Conosco | Siena Gestão & Imobiliária",
    description: "Entre em contato com a Siena Gestão & Imobiliária.",
    images: ["/og.svg"],
  },
  alternates: {
    canonical: `${SITE_URL}/contato`,
  },
};

const contacts = [
  {
    name: "Evair F de Oliveira",
    role: "Consultor de Imóveis",
    phone: "5521965373111",
    email: "sienapatrimonial@gmail.com",
    initials: "EO",
  },
  {
    name: "Edinaldo Ramos",
    role: "Comercial",
    phone: "5521959322120",
    email: "sienapatrimonial@gmail.com",
    initials: "ER",
  },
];

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-background">
      <LocalBusinessJsonLd
        name="Siena Gestão & Imobiliária"
        description="Plataforma completa para comprar, alugar e investir em imóveis no Brasil."
        url={`${SITE_URL}/contato`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: SITE_URL },
          { name: "Fale Conosco", url: `${SITE_URL}/contato` },
        ]}
      />
      {/* Breadcrumb */}
      <section className="px-6 pt-28 pb-4">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>Início</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Fale Conosco</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-primary">Fale Conosco</h1>
          <p className="lead mx-auto mt-4 max-w-2xl text-muted-foreground">
            Estamos prontos para ajudá-lo. Entre em contato diretamente pelo WhatsApp com nossos
            especialistas em imóveis.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {contacts.map((contact) => (
            <ContactCard key={contact.phone} {...contact} />
          ))}
        </div>
      </section>
    </main>
  );
}
