import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MindMarketMenu } from "@/components/mindmarket-menu";
import { PageTransition } from "@/components/page-transition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Imobiliario",
  description: "Plataforma imobiliaria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("antialiased", inter.variable)}>
      <body className="font-sans">
        <MindMarketMenu />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
