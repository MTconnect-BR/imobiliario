import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abra as portas para um novo morar - SextoAndar",
  description:
    "Encontre imóveis para alugar e comprar, agendamento de visitas online e contrato digital. Aluguel sem fiador e apoio em toda a compra de imóvel. Anuncie grátis!",
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
