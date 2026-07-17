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
  "Quais imóveis vocês têm?",
  "Como funciona a compra?",
  "Posso usar FGTS?",
  "Imóveis no RJ",
];

const WELCOME_MESSAGE = `Olá! Sou a assistente virtual da **Siena Gestão & Imobiliária** 🏠

Sou especialista em imóveis da Caixa com até 90% de desconto. Posso ajudar você a:

- Encontrar casas, apartamentos, terrenos
- Tirar dúvidas sobre financiamento e FGTS
- Explicar o processo de compra
- Informar preços e condições

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

function hasSearchIntent(text: string): boolean {
  const lower = text.toLowerCase();
  const searchKeywords = [
    "imóvel",
    "imoveis",
    "imóveis",
    "casa",
    "casas",
    "apartamento",
    "apto",
    "terreno",
    "comercial",
    "quartos",
    "preço",
    "valor",
    "reais",
    "mil",
    "rj",
    "sp",
    "pr",
    "sc",
    "rio",
    "paulo",
    "curitiba",
    "florianópolis",
    "buscar",
    "encontrar",
    "procurar",
    "quero",
    "procuro",
    "tenho interesse",
    "até",
    "abaixo",
    "menos",
  ];
  return searchKeywords.some((kw) => lower.includes(kw));
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/imoveis/${property.id}`}
      target="_blank"
      className="block rounded-lg border border-border bg-card p-2 transition-all hover:shadow-md hover:border-primary/50"
    >
      <div className="flex gap-2">
        {property.images?.[0] ? (
          <img
            src={property.images[0]}
            alt={property.address}
            className="h-12 w-12 shrink-0 rounded-md object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted">
            <Home className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-medium leading-tight">{property.address}</p>
          <p className="text-[10px] text-muted-foreground leading-tight">
            {property.neighborhood && `${property.neighborhood}, `}
            {property.city} - {property.state}
          </p>
          {property.price && (
            <p className="mt-0.5 text-[11px] font-bold text-primary">
              {parsePrice(property.price)}
            </p>
          )}
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
  const chatHistoryRef = useRef<Array<{ role: string; content: string }>>([]);

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

  const chatWithAI = async (userMessage: string): Promise<string> => {
    chatHistoryRef.current.push({ role: "user", content: userMessage });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistoryRef.current }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const assistantResponse = data.response;

      chatHistoryRef.current.push({ role: "model", content: assistantResponse });

      if (chatHistoryRef.current.length > 20) {
        chatHistoryRef.current = chatHistoryRef.current.slice(-20);
      }

      return assistantResponse;
    } catch {
      return "Desculpe, tive um problema ao processar sua mensagem. Por favor, tente novamente ou entre em contato pelo WhatsApp: (21) 96537-3111";
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
      let aiResponse = "";
      let properties: Property[] | undefined;

      if (hasSearchIntent(query)) {
        properties = await searchProperties(query);
        aiResponse = await chatWithAI(query);

        if (properties && properties.length > 0) {
          aiResponse += `\n\nEncontrei **${properties.length} imóvel${properties.length > 1 ? "is" : ""} no nosso catálogo:`;
        }
      } else {
        aiResponse = await chatWithAI(query);
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        properties,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Erro ao processar. Tente novamente ou fale com atendente: (21) 96537-3111",
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
        className="fixed bottom-16 left-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl sm:bottom-20 sm:left-6 sm:h-14 sm:w-14"
        aria-label="Abrir assistente de IA"
      >
        <Bot className="h-5 w-5 sm:h-7 sm:w-7" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-16 left-4 z-50 flex h-[min(340px,calc(100vh-100px))] w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:bottom-20 sm:left-6 sm:h-[min(400px,calc(100vh-120px))] sm:w-[320px]">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
            <Bot className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-white">Assistente Siena</p>
            <p className="text-[9px] text-blue-100">Powered by Gemma 4 IA</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="flex h-6 w-6 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          aria-label="Fechar"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-2.5 overflow-y-auto p-2.5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-1.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Bot className="h-2.5 w-2.5 text-blue-600" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-xl px-2.5 py-1.5 text-[11px] leading-snug ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted rounded-bl-sm"
              }`}
            >
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
              {msg.properties && msg.properties.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  {msg.properties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              )}
            </div>
            {msg.role === "user" && (
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                <User className="h-2.5 w-2.5 text-primary-foreground" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-1.5 justify-start">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Bot className="h-2.5 w-2.5 text-blue-600" />
            </div>
            <div className="rounded-xl rounded-bl-sm bg-muted px-2.5 py-2">
              <div className="flex gap-0.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="border-t border-border px-2.5 py-1.5">
          <div className="flex flex-wrap gap-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border p-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-1.5"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="min-w-0 flex-1 rounded-full border border-border bg-muted/30 px-2.5 py-1.5 text-[11px] outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            aria-label="Enviar"
          >
            <Send className="h-3 w-3" />
          </button>
        </form>
        <div className="mt-1 flex items-center justify-center gap-1 text-[9px] text-muted-foreground">
          <span>Falar com humano?</span>
          <Link
            href="/contato"
            target="_blank"
            className="font-medium text-primary hover:underline"
          >
            Atendente <ExternalLink className="inline h-2 w-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
