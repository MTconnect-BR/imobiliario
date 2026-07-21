-- Rode isso no SQL Editor do Supabase Dashboard:
-- https://supabase.com/dashboard → seu projeto → SQL Editor

CREATE TABLE user_properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  titulo TEXT NOT NULL,
  descricao TEXT DEFAULT '',
  preco TEXT DEFAULT '',
  categoria TEXT DEFAULT '',
  estado TEXT DEFAULT '',
  cidade TEXT DEFAULT '',
  bairro TEXT DEFAULT '',
  quartos INTEGER DEFAULT 0,
  banheiros INTEGER DEFAULT 0,
  vagas INTEGER DEFAULT 0,
  area NUMERIC DEFAULT 0,
  area_terreno NUMERIC DEFAULT 0,
  fotos TEXT[] DEFAULT '{}',
  referencia TEXT DEFAULT '',
  status TEXT DEFAULT 'ativo',
  endereco TEXT DEFAULT '',
  instagram_url TEXT DEFAULT '',
  instagram_texto TEXT DEFAULT ''
);

-- Permitir leitura pública (qualquer um vê os imóveis)
ALTER TABLE user_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON user_properties
  FOR SELECT USING (true);

CREATE POLICY "Full access for all" ON user_properties
  FOR ALL USING (true);
