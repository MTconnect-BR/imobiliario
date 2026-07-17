"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <Link
      href="/contato"
      className="fixed bottom-20 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] hover:shadow-xl"
      aria-label="Fale Conosco"
    >
      <MessageCircle className="h-7 w-7" />
    </Link>
  );
}
