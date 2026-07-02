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

export const metadata: Metadata = {
  title: "Fale Conosco",
  description:
    "Entre em contato diretamente pelo WhatsApp com nossos especialistas em imóveis.",
};

const contacts = [
  {
    name: "João Silva",
    role: "Consultor de Imóveis",
    phone: "5511999999999",
    email: "joao@imobiliario.com.br",
    initials: "JS",
  },
  {
    name: "Maria Santos",
    role: "Gerente Comercial",
    phone: "5511988888888",
    email: "maria@imobiliario.com.br",
    initials: "MS",
  },
];

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <section className="px-6 pt-28 pb-4">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>
                  Início
                </BreadcrumbLink>
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
            Estamos prontos para ajudá-lo. Entre em contato diretamente pelo
            WhatsApp com nossos especialistas em imóveis.
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

      {/* Back link */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </section>
    </main>
  );
}
