"use client";

import dynamic from "next/dynamic";

const ChromeWrapper = dynamic(
  () => import("@/components/chrome-wrapper").then((m) => m.ChromeWrapper),
  { ssr: true }
);

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return <ChromeWrapper>{children}</ChromeWrapper>;
}
