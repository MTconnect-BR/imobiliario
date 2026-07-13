CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reidoape_id TEXT UNIQUE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('casa', 'apartamento', 'terreno', 'comercial')),
  categoria TEXT,
  status TEXT NOT NULL DEFAULT 'disponivel' CHECK (status IN ('disponivel', 'vendido', 'em_negociacao')),
  price NUMERIC NOT NULL,
  avaliacao_price NUMERIC,
  desconto_pct NUMERIC,
  area NUMERIC NOT NULL,
  bedrooms INTEGER NOT NULL DEFAULT 0,
  bathrooms INTEGER NOT NULL DEFAULT 0,
  parking_spaces INTEGER NOT NULL DEFAULT 0,
  address TEXT NOT NULL,
  address_number TEXT,
  neighborhood TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  cep TEXT DEFAULT '',
  description TEXT DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  images JSONB DEFAULT '[]'::jsonb,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  ref_caixa TEXT,
  modalidade TEXT,
  tipo_origem TEXT,
  situacao_caixa TEXT,
  documents JSONB DEFAULT '[]'::jsonb,
  official_url TEXT,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_state ON properties(state);
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_ref_caixa ON properties(ref_caixa);
CREATE INDEX idx_properties_neighborhood ON properties(neighborhood);
CREATE INDEX idx_properties_bedrooms ON properties(bedrooms);
CREATE INDEX idx_properties_bathrooms ON properties(bathrooms);
CREATE INDEX idx_properties_parking_spaces ON properties(parking_spaces);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Properties are viewable by everyone" ON properties
  FOR SELECT USING (true);

CREATE POLICY "Properties are manageable by authenticated users only" ON properties
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Properties are updatable by authenticated users" ON properties
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Properties are deletable by authenticated users" ON properties
  FOR DELETE USING (auth.role() = 'authenticated');
