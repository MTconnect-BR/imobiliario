import { createClient } from "./supabase/client";

export const supabase = createClient();

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
}
