import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMMA_API_KEY || "";

const SYSTEM_INSTRUCTION = `Você é a assistente virtual da Siena Gestão & Imobiliária, uma imobiliária especializada em imóveis da Caixa Econômica Federal com até 90% de desconto.

Suas responsabilidades:
- Ajudar clientes a encontrar imóveis (casas, apartamentos, terrenos, comerciais)
- Informar sobre preços, áreas, quartos, localização
- Explicar processos de compra, financiamento, FGTS
- Orientar sobre documentação necessária
- Responder dúvidas sobre a Caixa e seus imóveis

Regras:
- Seja simpática, objetiva e profissional
- Responda em português brasileiro
- Nunca invente informações sobre preços ou imóveis específicos
- Se não souber algo, oriente a entrar em contato com a equipe: (21) 96537-3111 ou (21) 95932-2120
- Sempre direcione para o site quando apropriado
- Não responda sobre assuntos não relacionados a imóveis ou a imobiliária
- Use emojis com moderação para tornar a conversa amigável`;

interface ChatMessage {
  role: "user" | "model";
  parts: string;
}

async function chatWithGemma(messages: ChatMessage[]): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const contents = messages.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.parts }],
  }));

  try {
    const response = await ai.models.generateContent({
      model: "gemma-4-31b-it",
      contents,
      config: {
        maxOutputTokens: 32768,
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const text = response.text;
    if (!text) {
      return "Desculpe, não consegui processar sua mensagem. Por favor, tente novamente.";
    }

    // Remove thinking tags if present
    const cleaned = text.replace(/<\|channel\|>thought\n[\s\S]*?<\|channel\|>/g, "").trim();

    return cleaned || text;
  } catch (error) {
    console.error("Gemma API error:", error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const chatMessages: ChatMessage[] = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: msg.content,
    }));

    const response = await chatWithGemma(chatMessages);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Erro ao processar mensagem" }, { status: 500 });
  }
}
