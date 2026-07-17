"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { AIChatbot } from "@/components/ai-chatbot";

const MindMarketMenu = dynamic(
  () => import("@/components/mindmarket-menu").then((m) => m.MindMarketMenu),
  { ssr: true },
);

const FAQPanel = dynamic(() => import("@/components/faq-panel").then((m) => m.FAQPanel), {
  ssr: true,
});

const PageTransition = dynamic(() =>
  import("@/components/page-transition").then((m) => m.PageTransition),
);

const HIDDEN_CHROME_ROUTES = ["/crm", "/auth"];
const HIDDEN_WHATSAPP_ROUTES = ["/crm", "/auth", "/contato"];

export function ChromeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = HIDDEN_CHROME_ROUTES.some((route) => pathname.startsWith(route));
  const hideWhatsApp = HIDDEN_WHATSAPP_ROUTES.some((route) => pathname.startsWith(route));

  return (
    <>
      {!hideChrome && <MindMarketMenu />}
      {hideChrome ? children : <PageTransition>{children}</PageTransition>}
      {!hideChrome && <SiteFooter />}
      {!hideWhatsApp && <WhatsAppButton />}
      {!hideChrome && <AIChatbot />}
    </>
  );
}
