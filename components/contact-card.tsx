"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

interface ContactCardProps {
  name: string;
  role: string;
  phone: string;
  email: string;
  initials: string;
}

export function ContactCard({
  name,
  role,
  phone,
  email,
  initials,
}: ContactCardProps) {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    `Olá ${name}, gostaria de saber mais sobre os imóveis.`
  )}`;

  return (
    <Card className="overflow-hidden rounded-[10px] transition-all duration-[0.4s] hover:shadow-md">
      <CardContent className="p-6">
        {/* Avatar */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#8ed462]/20 text-2xl font-medium tracking-[-0.06em] text-[#368d32]">
            {initials}
          </div>
        </div>

        {/* Info */}
        <div className="text-center">
          <h3 className="text-lg font-medium tracking-[-0.06em]">{name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{role}</p>
        </div>

        {/* Contact Details */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 shrink-0" />
            <span>
              ({phone.slice(2, 4)}) {phone.slice(4, 9)}-{phone.slice(9)}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0" />
            <span>{email}</span>
          </div>
        </div>

        {/* WhatsApp Button */}
        <div className="mt-6">
          <Button
            asChild
            variant="green"
            className="h-12 w-full text-base"
            size="lg"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar no WhatsApp
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
