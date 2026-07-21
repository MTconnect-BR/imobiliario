import { createClient } from "./supabase/client";

let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!_client) {
    _client = createClient();
  }
  return _client;
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop) {
    return getClient()[prop as keyof ReturnType<typeof createClient>];
  },
});

export interface UserProperty {
  id: string;
  created_at: string;
  titulo: string;
  descricao: string;
  preco: string;
  categoria: string;
  estado: string;
  cidade: string;
  bairro: string;
  quartos: number;
  banheiros: number;
  vagas: number;
  area: number;
  area_terreno: number;
  fotos: string[];
  referencia: string;
  status: "ativo" | "vendido" | "pausado";
  endereco: string;
  instagram_url?: string;
  instagram_texto?: string;
}
