import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Siena Gestão & Imobiliária",
  description:
    "Encontre imóveis para comprar, agendamento de visitas online e contrato digital. Apoio em toda a compra de imóvel. Anuncie grátis!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
