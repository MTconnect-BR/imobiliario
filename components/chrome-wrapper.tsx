"use client";

import { usePathname } from "next/navigation";
import { MindMarketMenu } from "@/components/mindmarket-menu";
import { PageTransition } from "@/components/page-transition";
import { FAQPanel } from "@/components/faq-panel";

const HIDDEN_CHROME_ROUTES = ["/crm", "/auth"];

export function ChromeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = HIDDEN_CHROME_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!hideChrome && <MindMarketMenu />}
      {hideChrome ? children : <PageTransition>{children}</PageTransition>}
      {!hideChrome && <FAQPanel />}
    </>
  );
}
