"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase, type UserProperty } from "@/lib/supabase";
import ConfirmModal from "./ConfirmModal";

const categorias = [
  "Apartamento", "Casa", "Sobrado", "Terreno", "Galpão", "Andar Corporativo",
];

const estados = ["RJ", "SP", "PR", "SC"];

const cidadesPorEstado: Record<string, string[]> = {
  RJ: [
    "Rio de Janeiro", "São Gonçalo", "Nova Iguaçu", "Niterói", "Belford Roxo",
    "São João de Meriti", "Duque de Caxias", "Magé", "Itaboraí", "Mesquita",
    "Campos dos Goytacazes", "Nova Friburgo", "Petrópolis", "Volta Redonda",
    "Barra Mansa", "Macaé", "Cabo Frio", "Angra dos Reis", "Resende",
    "Cachoeiras de Macacu", "Teresópolis", "Nilópolis", "Itaguaí", "Seropédica",
    "Queimados", "Japeri", "Guapimirim", "Paraty", "São Pedro da Aldeia",
    "Araruama", "Rio das Ostras", "Mangaratiba", "Casimiro de Abreu",
    "Cordeiro", "Cantagalo", "Bom Jardim", "Carmo", "Duas Barras",
    "Nova Friburgo", "São Bento do Sapucaí", "São Luiz do Paraitinga",
    "Taubaté", "São José dos Campos", "Jacareí", "São José dos Campos",
    "Santos Dumont", "Comendador Levy Gasparian", "Três Rios", "Paty do Alferes",
    "Vassouras", "Engenheiro Paulo de Frontin", "Mendes", "Quatis",
    "Itaocara", "São Francisco de Itabapoana", "Santo Antônio de Pádua",
    "Cambuci", "Itaperuna", "Laje do Muriaé", "Porciúncula", "Bom Jesus do Itabapoana",
  ],
  SP: [
    "São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo",
    "São José dos Campos", "Santo André", "Osasco", "Sorocaba",
    "Ribeirão Preto", "São José do Rio Preto", "Santos", "Jundiaí",
    "Piracicaba", "Carapicuíba", "Bauru", "São Vicente",
    "Mauá", "São José do Rio Preto", "Mogi das Cruzes", "Diadema",
    "Piracicaba", "Ubatuba", "Guarujá", "Cubatão", "Praia Grande",
    "Marília", "Araçatuba", "Presidente Prudente", "Araraquara",
    "Franca", "Ribeirão Preto", "Presidente Epitácio", "Lins",
    "Assis", "Marília", "Botucatu", "Ourinhos", "Pompéia",
    "Avaré", "Jaú", "Lençóis Paulista", "Botucatu", "Dois Córregos",
    "Bauru", "Pederneiras", "Ibitinga", "Jaboticabal", "Barretos",
    "Catanduva", "Bebedouro", "Palmeira d'Oeste", "Votuporanga",
    "Mirassol", "Nazaré Paulista", "Atibaia", "Bragança Paulista",
    "Várzea Paulista", "Amparo", "Americana", "Sumaré",
    "Hortolândia", "Valinhos", "Limeira", "Indaiatuba",
    "Vinhedo", "Itupeva", "Salto", "Itu", "Sorocaba",
    "Votorantim", "Cerquilho", "Tietê", "Porto Feliz",
    "Boituva", "Iperó", "Capivari", "Monte Mor", "Rifaina",
    "Brotas", "Águas de São Pedro", "São Pedro", "São Pedro da Aldeia",
    "Nazaré Paulista", "São Bento do Sapucaí", "Campos do Jordão",
    "São Bento do Sapucaí", "São José dos Campos", "Taubaté",
    "Guaratinguetá", "Pindamonhangaba", "Taubaté", "Lorena",
    "Pindamonhangaba", "Cunha", "São Luiz do Paraitinga",
    "Iguape", "Ilhabela", "Ubatuba", "Caraguatatuba", "São Sebastião",
  ],
  PR: [
    "Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel",
    "São José dos Pinhais", "Foz do Iguaçu", "Colombo", "Guarapuava",
    "Paranaguá", "Araucária", "Toledo", "Apucarana", "Pinhais",
    "Campo Largo", "Piraquara", "Almirante Tamandaré", "Mandirituba",
    "Quatro Barras", "Rio Negro", "São José dos Pinhais", "Tijucas do Sul",
    "Lapa", "Bocaiúva do Sul", "Tunas do Paraná", "Campina Grande do Sul",
    "Matinhos", "Guaraúna", "Guaratuba", "Matinhos",
    "Paranaguá", "Antonina", "Morretes", "São José dos Pinhais",
    "Pontal do Paraná", "Barra do Turvo", "Adrianópolis", "Bocaiúva do Sul",
    "Balsa Nova", "Sapopema", "Jaboti", "Conserva",
    "Ramilândia", "Palmeira", "Ivaiporã", "Bandeirantes",
    "Cornélio Procópio", "São Mateus do Sul", "Lapa", "Cerro Azul",
    "Rio Branco do Sul", "Capela do Alto", "Itaí", "Alto Paraná",
    "Sertanópolis", "Primeiro de Maio", "São Jerônimo da Serra",
    "Ponta Grossa", "Carambeí", "Castro", "Tunas do Paraná",
    "Palmeira", "Imbaú", "Telêmaco Borba", "Sengés",
    "Iraty", "Prudentópolis", "Mangueirinha", "General Carneiro",
    "Clevelândia", "Foz do Iguaçu", "São Miguel do Iguaçu",
    "Itaipulândia", "São José dos Pinhais", "Matinhos",
    "Nossa Senhora das Graças", "Astorga", "Maringá",
    "Sarandi", "Nova Aurora", "Cruzeiro do Sul",
    "Terra Roxa", "Ouro Verde do Paraná", "Mariluz", "Campo Mourão",
    "Farol", "Ubiratã", "Mamborê", "Mariluz",
    "Ampére", "Capanema", "Pérola d'Oeste", "Nova Prata do Iguaçu",
    "Bela Vista da Caroba", "Barra do Quaraí", "Realeza",
    "Santa Terezinha de Itaipu", "Itaipulândia", "Capinzal do Norte",
    "Porto Rico", "Marilena", "Nova Laranjeiras", "Catanduvas",
  ],
  SC: [
    "Florianópolis", "Joinville", "Blumenau", "São José", "Chapecó",
    "Criciúma", "Jaraguá do Sul", "Lages", "Palhoça", "Balneário Camboriú",
    "Itajaí", "Brusque", "Tubarão", "São Bento do Sul", "Caçador",
    "Navegantes", "Biguaçu", "Santo Amaro da Imperatriz", "Itapema",
    "Penha", "Santana", "Trombudo Central", "Dionísio Cerqueira",
    "Marema", "Belmonte", "Descanso", "Itapiranga", "São Miguel do Oeste",
    "Guaporé", "Vacaria", "Lajeado", "Flores da Cunha",
    "Bento Gonçalves", "Carlos Barbosa", "Garibaldi", "Monte Belo do Sul",
    "Monte Hartz", "Farroupilha", "Nova Petrópolis", "Canela",
    "Gramado", "Caxias do Sul", "Cachoeirinha", "Portão",
    "Marau", "Carazinho", "Nonoai", "Crissiumal",
    "Três Passos", "São Miguel das Missões", "Constante",
    "Candelária", "Santa Maria", "Santiago", "São Gabriel",
    "Tupanci", "Porto Xavier", "Cruz Alta", "Santa Rosa",
    "Frederico Westphalen", "Ijuí", "Cruz Alta", "Santa Rosa",
    "Três de Maio", "Santo Ângelo", "Ijuí", "Erechim",
    "Caxias do Sul", "Passo Fundo", "Bento Gonçalves",
    "Guaporé", "Monte Belo do Sul", "Nova Petrópolis",
    "São Marcos", "Prudentópolis", "Foz do Iguaçu", "São Miguel do Iguaçu",
    "Barra Velha", "Osório", "Rio do Oeste", "Balneário Barra do Sul",
    "Bombinhas", "Sombrio", "Laguna", "Imbituba",
    "Garopaba", "Tubarão", "Orleans", "Lauro Müller",
    "Siderópolis", "Araranguá", "Morro da Fumaça", "Urussanga",
    "Içara", "Balneário Arroio do Silva", "Sangão", "Criciúma",
  ],
};

interface PropertyFormProps {
  initialData?: UserProperty;
  isEdit?: boolean;
}

function hasChanges(init: Partial<UserProperty> | undefined, current: Record<string, unknown>): boolean {
  if (!init) return Object.values(current).some((v) => v !== "" && v !== 0 && !(Array.isArray(v) && v.length === 0));
  const fields: (keyof UserProperty)[] = ["titulo", "descricao", "preco", "categoria", "estado", "cidade", "bairro", "endereco", "quartos", "banheiros", "vagas", "area", "area_terreno", "referencia", "instagram_url", "instagram_texto", "status"];
  return fields.some((f) => JSON.stringify(current[f]) !== JSON.stringify(init[f]));
}

export default function PropertyForm({ initialData, isEdit = false }: PropertyFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [error, setError] = useState("");

  const [titulo, setTitulo] = useState(initialData?.titulo || "");
  const [descricao, setDescricao] = useState(initialData?.descricao || "");
  const [preco, setPreco] = useState(initialData?.preco || "");
  const [categoria, setCategoria] = useState(initialData?.categoria || "");
  const [estado, setEstado] = useState(initialData?.estado || "");
  const [cidade, setCidade] = useState(initialData?.cidade || "");
  const [bairro, setBairro] = useState(initialData?.bairro || "");
  const [endereco, setEndereco] = useState(initialData?.endereco || "");
  const [quartos, setQuartos] = useState(initialData?.quartos || 0);
  const [banheiros, setBanheiros] = useState(initialData?.banheiros || 0);
  const [vagas, setVagas] = useState(initialData?.vagas || 0);
  const [area, setArea] = useState(initialData?.area || 0);
  const [areaTerreno, setAreaTerreno] = useState(initialData?.area_terreno || 0);
  const [referencia, setReferencia] = useState(initialData?.referencia || "");
  const [instagramUrl, setInstagramUrl] = useState(initialData?.instagram_url || "");
  const [instagramTexto, setInstagramTexto] = useState(initialData?.instagram_texto || "");
  const [fotos, setFotos] = useState<string[]>(initialData?.fotos || []);
  const [novaFotoUrl, setNovaFotoUrl] = useState("");
  const [status, setStatus] = useState<"ativo" | "vendido" | "pausado">(initialData?.status || "ativo");
  const [showCancelModal, setShowCancelModal] = useState(false);

  const cidadesDisponiveis = cidadesPorEstado[estado] || [];

  const currentValues = { titulo, descricao, preco, categoria, estado, cidade, bairro, endereco, quartos, banheiros, vagas, area, area_terreno: areaTerreno, referencia, instagram_url: instagramUrl, instagram_texto: instagramTexto, fotos, status };
  const dirty = hasChanges(initialData, currentValues);

  function addFotoUrl() {
    const url = novaFotoUrl.trim();
    if (!url) return;
    if (fotos.length >= 10) {
      setError("Máximo de 10 fotos");
      return;
    }
    setFotos([...fotos, url]);
    setNovaFotoUrl("");
    setError("");
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingFiles(true);
    setError("");

    const remaining = 10 - fotos.length;
    if (files.length > remaining) {
      setError(`Máximo de 10 fotos. Você pode adicionar mais ${remaining}.`);
      setUploadingFiles(false);
      return;
    }

    const newFotos: string[] = [];
    let loaded = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 10 * 1024 * 1024) {
        setError(`Arquivo "${file.name}" excede 10MB`);
        continue;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result && typeof ev.target.result === "string") {
          newFotos.push(ev.target.result);
        }
        loaded++;
        if (loaded === files.length) {
          setFotos((prev) => [...prev, ...newFotos]);
          setUploadingFiles(false);
        }
      };
      reader.onerror = () => {
        setError(`Erro ao ler arquivo "${file.name}"`);
        loaded++;
        if (loaded === files.length) {
          setUploadingFiles(false);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function removeFoto(index: number) {
    setFotos(fotos.filter((_, i) => i !== index));
  }

  function handleCancel() {
    if (dirty) {
      setShowCancelModal(true);
    } else {
      router.push("/crm");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!titulo.trim()) {
      setError("Título é obrigatório");
      return;
    }

    setSaving(true);

    const payload = {
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      preco: preco.trim(),
      categoria,
      estado,
      cidade,
      bairro: bairro.trim(),
      endereco: endereco.trim(),
      quartos,
      banheiros,
      vagas,
      area,
      area_terreno: areaTerreno,
      referencia: referencia.trim(),
      instagram_url: instagramUrl.trim() || null,
      instagram_texto: instagramTexto.trim() || null,
      fotos,
      status,
    };

    if (isEdit && initialData) {
      const { error: updateError } = await supabase
        .from("user_properties")
        .update(payload)
        .eq("id", initialData.id);

      if (updateError) {
        setError("Erro ao salvar: " + updateError.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from("user_properties")
        .insert([payload]);

      if (insertError) {
        setError("Erro ao salvar: " + insertError.message);
        setSaving(false);
        return;
      }
    }

    router.push("/crm");
  }

  return (
    <>
      <ConfirmModal
        open={showCancelModal}
        title="Descartar alterações?"
        message="Você tem alterações não salvas. Deseja descartá-las e sair?"
        confirmLabel="Descartar"
        cancelLabel="Continuar editando"
        variant="warning"
        onConfirm={() => { setShowCancelModal(false); router.push("/crm"); }}
        onCancel={() => setShowCancelModal(false)}
      />

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          {isEdit ? "Editar imóvel" : "Novo imóvel"}
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-8">
          {/* Básico */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações básicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Apartamento 2 quartos no Centro"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none"
                >
                  <option value="">Selecione</option>
                  {categorias.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                <input
                  type="text"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  placeholder="Ex: R$ 250.000,00 ou Consulte"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows={4}
                  placeholder="Descreva o imóvel..."
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Localização */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Localização</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={estado}
                  onChange={(e) => { setEstado(e.target.value); setCidade(""); }}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none"
                >
                  <option value="">Selecione</option>
                  {estados.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                <select
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  disabled={!estado}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none disabled:opacity-50"
                >
                  <option value="">{estado ? "Selecione" : "Primeiro selecione o estado"}</option>
                  {cidadesDisponiveis.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                <input
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Ex: Centro"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                <input
                  type="text"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  placeholder="Rua, número..."
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Características */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Características</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quartos</label>
                <input type="number" value={quartos} onChange={(e) => setQuartos(Number(e.target.value))} min={0} className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banheiros</label>
                <input type="number" value={banheiros} onChange={(e) => setBanheiros(Number(e.target.value))} min={0} className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vagas</label>
                <input type="number" value={vagas} onChange={(e) => setVagas(Number(e.target.value))} min={0} className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
                <input type="number" value={area || ""} onChange={(e) => setArea(Number(e.target.value))} min={0} placeholder="0" className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Área terreno (m²)</label>
                <input type="number" value={areaTerreno || ""} onChange={(e) => setAreaTerreno(Number(e.target.value))} min={0} placeholder="0" className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Referência</label>
              <input
                type="text"
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
                placeholder="Código de referência do imóvel"
                className="w-full md:w-1/2 border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://www.instagram.com/p/... (opcional)"
                className="w-full md:w-1/2 border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                Link da publicação no Instagram deste imóvel. Se não informado, usará o perfil principal.
              </p>
            </div>
          </div>

          {/* Fotos e Vídeos */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Fotos e Vídeos</h2>
            <p className="text-sm text-gray-500 mb-4">
              Adicione fotos ou vídeos do seu computador ou cole URLs. Máximo 10 arquivos. Máximo 10MB cada.
            </p>

            {/* File upload from PC */}
            <div className="mb-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingFiles || fotos.length >= 10}
                className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-lg px-6 py-4 text-gray-600 hover:border-[#1b4332] hover:text-[#1b4332] transition-colors disabled:opacity-50 w-full justify-center"
              >
                {uploadingFiles ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1b4332]" />
                    <span>Carregando arquivos...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Clique para selecionar fotos/vídeos do computador</span>
                  </>
                )}
              </button>
            </div>

            {/* URL input */}
            <div className="flex gap-2 mb-4">
              <input
                type="url"
                value={novaFotoUrl}
                onChange={(e) => setNovaFotoUrl(e.target.value)}
                placeholder="Ou cole URL de imagem externa..."
                className="flex-1 border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none"
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFotoUrl(); } }}
              />
              <button
                type="button"
                onClick={addFotoUrl}
                disabled={fotos.length >= 10}
                className="bg-gray-100 border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium disabled:opacity-50"
              >
                Adicionar URL
              </button>
            </div>

            {fotos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {fotos.map((foto, index) => (
                  <div key={index} className="relative group">
                    {foto.startsWith("data:video") ? (
                      <video
                        src={foto}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        controls={false}
                      />
                    ) : (
                      <img
                        src={foto}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=100&fit=crop";
                        }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => removeFoto(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-700"
                    >
                      ×
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 bg-[#1b4332] text-white text-[10px] px-1.5 py-0.5 rounded">
                        Capa
                      </span>
                    )}
                    {foto.startsWith("data:") && (
                      <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                        PC
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {fotos.length > 0 && (
              <p className="text-xs text-gray-400 mt-2">{fotos.length}/10 arquivos</p>
            )}
          </div>

          {/* Status */}
          {isEdit && (
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Status</h2>
              <div className="flex gap-3">
                {(["ativo", "pausado", "vendido"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      status === s
                        ? s === "ativo" ? "bg-green-600 text-white border-green-600"
                          : s === "vendido" ? "bg-red-600 text-white border-red-600"
                          : "bg-yellow-500 text-white border-yellow-500"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {s === "ativo" ? "Ativo" : s === "vendido" ? "Vendido" : "Pausado"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Instagram Texto */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Texto para Instagram</h2>
            <p className="text-sm text-gray-500 mb-3">
              Escreva aqui um resumo do imóvel para compartilhar no Instagram. O texto aparecerá na página do imóvel.
            </p>
            <textarea
              value={instagramTexto}
              onChange={(e) => setInstagramTexto(e.target.value)}
              rows={4}
              placeholder="Resumo do imóvel para post no Instagram..."
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#1b4332] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#143526] transition-colors disabled:opacity-50"
            >
              {saving ? "Salvando..." : isEdit ? "Salvar alterações" : "Cadastrar imóvel"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
