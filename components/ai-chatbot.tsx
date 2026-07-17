"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Home, Bot, User, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  neighborhood?: string;
  price?: string;
  area?: string;
  bedrooms?: string;
  bathrooms?: string;
  parkingSpaces?: string;
  type?: string;
  modalidade?: string;
  images?: string[];
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  properties?: Property[];
  timestamp: Date;
}

const SUGGESTIONS = [
  "Casas no Rio de Janeiro",
  "Apartamentos com 2 quartos",
  "Imóveis até R$ 200.000",
  "Terrenos em São Paulo",
  "Imóveis com financiamento",
];

const WELCOME_MESSAGE = `Olá! Sou a assistente virtual da **Siena Gestão & Imobiliária** 🏠

Posso ajudar você a encontrar o imóvel perfeito! Sou especialista em imóveis da Caixa com até 90% de desconto.

Como posso ajudar?`;

function parsePrice(price?: string): string {
  if (!price) return "Consulte";
  const num = parseFloat(price.replace(/[^\d.,]/g, "").replace(",", "."));
  if (isNaN(num)) return price;
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function extractSearchIntent(text: string): {
  type?: string;
  state?: string;
  city?: string;
  maxPrice?: string;
  bedrooms?: string;
  search?: string;
} {
  const lower = text.toLowerCase();
  const filters: ReturnType<typeof extractSearchIntent> = {};

  if (lower.includes("casa") || lower.includes("casas")) filters.type = "Casa";
  else if (lower.includes("apartamento") || lower.includes("apto")) filters.type = "Apartamento";
  else if (lower.includes("terreno") || lower.includes("terrenos")) filters.type = "Terreno";
  else if (lower.includes("comercial")) filters.type = "Comercial";

  const states: Record<string, string> = {
    "rio de janeiro": "RJ",
    rj: "RJ",
    "são paulo": "SP",
    sp: "SP",
    "sao paulo": "SP",
    curitiba: "PR",
    paraná: "PR",
    pr: "PR",
    florianópolis: "SC",
    "santa catarina": "SC",
    sc: "SC",
  };
  for (const [key, val] of Object.entries(states)) {
    if (lower.includes(key)) {
      filters.state = val;
      break;
    }
  }

  const cities = [
    "rio de janeiro",
    "são paulo",
    "curitiba",
    "florianópolis",
    "belo horizonte",
    "brasília",
    "porto alegre",
    "salvador",
    "recife",
    "fortaleza",
  ];
  for (const city of cities) {
    if (lower.includes(city)) {
      filters.city = city;
      break;
    }
  }

  const priceMatch = lower.match(/(?:até|abaixo de|menos de|max|limite)\s*(?:r\$?\s*)?([\d.,]+)/);
  if (priceMatch) {
    const num = parseFloat(priceMatch[1].replace(".", "").replace(",", "."));
    if (!isNaN(num)) filters.maxPrice = String(Math.round(num));
  }

  const bedroomMatch = lower.match(/(\d+)\s*(?:quartos?|dormitórios?|camas?)/);
  if (bedroomMatch) filters.bedrooms = bedroomMatch[1];

  if (!filters.type && !filters.state && !filters.city && !filters.maxPrice && !filters.bedrooms) {
    filters.search = text;
  }

  return filters;
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/imoveis/${property.id}`}
      target="_blank"
      className="block rounded-lg border border-border bg-card p-3 transition-all hover:shadow-md hover:border-primary/50"
    >
      <div className="flex gap-3">
        {property.images?.[0] ? (
          <img
            src={property.images[0]}
            alt={property.address}
            className="h-20 w-20 rounded-md object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-md bg-muted">
            <Home className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{property.address}</p>
          <p className="text-xs text-muted-foreground">
            {property.neighborhood && `${property.neighborhood}, `}
            {property.city} - {property.state}
          </p>
          {property.price && (
            <p className="mt-1 text-sm font-bold text-primary">{parsePrice(property.price)}</p>
          )}
          <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {property.area && <span>{property.area}m²</span>}
            {property.bedrooms && <span>{property.bedrooms} quartos</span>}
            {property.bathrooms && <span>{property.bathrooms} banheiros</span>}
            {property.parkingSpaces && <span>{property.parkingSpaces} vagas</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: WELCOME_MESSAGE,
          timestamp: new Date(),
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, hasOpened]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOpened) setIsOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [hasOpened]);

  const searchProperties = async (text: string): Promise<Property[]> => {
    const filters = extractSearchIntent(text);
    const params = new URLSearchParams();
    if (filters.type) params.set("type", filters.type);
    if (filters.state) params.set("state", filters.state);
    if (filters.city) params.set("city", filters.city);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
    if (filters.search) params.set("search", filters.search);
    params.set("limit", "5");

    try {
      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      return data.properties || [];
    } catch {
      return [];
    }
  };

  const handleSend = async (text?: string) => {
    const query = text || input.trim();
    if (!query) return;

    setInput("");
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const properties = await searchProperties(query);
      let response = "";

      if (properties.length > 0) {
        response = `Encontrei **${properties.length} imóvel${properties.length > 1 ? "is" : ""}** para sua busca:`;
      } else {
        response = `Não encontrei imóveis específicos para "${query}". Tente uma busca mais simples, como:\n- "Casas no RJ"\n- "Apartamento 2 quartos"\n- "Imóveis até 200 mil"\n\nOu entre em contato diretamente com nossa equipe!`;
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        properties: properties.length > 0 ? properties : undefined,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Desculpe, tive um problema ao buscar imóveis. Por favor, tente novamente ou entre em contato pelo WhatsApp.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="Abrir assistente de IA"
      >
        <Bot className="h-7 w-7" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 left-6 z-50 flex w-[360px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Assistente Siena</p>
            <p className="text-xs text-blue-100">Online agora</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: "400px", minHeight: "300px" }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted rounded-bl-md"
              }`}
            >
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
              {msg.properties && msg.properties.length > 0 && (
                <div className="mt-3 space-y-2">
                  {msg.properties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              )}
            </div>
            {msg.role === "user" && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2 justify-start">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Bot className="h-4 w-4 text-blue-600" />
            </div>
            <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="border-t border-border px-4 py-2">
          <p className="mb-2 text-xs text-muted-foreground">Sugestões:</p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Descreva o imóvel que procura..."
            className="flex-1 rounded-full border border-border bg-muted/30 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            aria-label="Enviar"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>Prefere falar com humano?</span>
          <Link
            href="/contato"
            target="_blank"
            className="flex items-center gap-1 font-medium text-primary hover:underline"
          >
            Falar com atendente <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
