"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const MindMarketMenu = dynamic(
  () => import("@/components/mindmarket-menu").then((m) => m.MindMarketMenu),
  { ssr: false }
);

const FAQPanel = dynamic(
  () => import("@/components/faq-panel").then((m) => m.FAQPanel),
  { ssr: false }
);

const PageTransition = dynamic(
  () => import("@/components/page-transition").then((m) => m.PageTransition),
  { ssr: false }
);

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
