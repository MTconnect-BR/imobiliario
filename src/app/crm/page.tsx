"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase, type UserProperty } from "@/lib/supabase";
import ConfirmModal from "@/components/ConfirmModal";

const statusColors: Record<string, string> = {
  ativo: "bg-green-100 text-green-800",
  vendido: "bg-red-100 text-red-800",
  pausado: "bg-yellow-100 text-yellow-800",
};

const statusLabels: Record<string, string> = {
  ativo: "Ativo",
  vendido: "Vendido",
  pausado: "Pausado",
};

export default function CrmDashboard() {
  const [properties, setProperties] = useState<UserProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [statusToggleTarget, setStatusToggleTarget] = useState<{ id: string; currentStatus: string; newStatus: UserProperty["status"] } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function fetchProperties() {
    setLoading(true);
    const { data } = await supabase
      .from("user_properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setProperties(data);
    setLoading(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const id = deleteTarget;
    setDeleteTarget(null);
    const { error } = await supabase.from("user_properties").delete().eq("id", id);
    if (error) {
      showToast("Erro ao excluir: " + error.message);
      return;
    }
    setProperties((prev) => prev.filter((p) => p.id !== id));
    showToast("Imóvel excluído permanentemente.");
  }

  async function handleStatusToggle() {
    if (!statusToggleTarget) return;
    const { id, newStatus } = statusToggleTarget;
    setStatusToggleTarget(null);
    const { error } = await supabase.from("user_properties").update({ status: newStatus }).eq("id", id);
    if (error) {
      showToast("Erro ao alterar status: " + error.message);
      return;
    }
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    showToast(`Imóvel ${newStatus === "ativo" ? "ativado" : newStatus === "pausado" ? "pausado" : "marcado como vendido"}.`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ConfirmModal
        open={!!deleteTarget}
        title="Excluir imóvel?"
        message="Esta ação é irreversível. O imóvel será excluído permanentemente do banco de dados e não aparecerá mais nos resultados de busca."
        confirmLabel="Sim, excluir"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <ConfirmModal
        open={!!statusToggleTarget}
        title={statusToggleTarget?.newStatus === "ativo" ? "Ativar imóvel?" : "Pausar imóvel?"}
        message={
          statusToggleTarget?.newStatus === "ativo"
            ? "O imóvel voltará a aparecer nos resultados de busca do site."
            : "O imóvel ficará oculto dos resultados de busca do site."
        }
        confirmLabel={statusToggleTarget?.newStatus === "ativo" ? "Sim, ativar" : "Sim, pausar"}
        cancelLabel="Cancelar"
        variant="default"
        onConfirm={handleStatusToggle}
        onCancel={() => setStatusToggleTarget(null)}
      />

      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-[#1b4332] text-white px-6 py-3 rounded-lg shadow-lg text-sm animate-in slide-in-from-top">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus Imóveis</h1>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? "Carregando..." : `${properties.length} imóvel${properties.length !== 1 ? "s" : ""} cadastrado${properties.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Link
          href="/crm/novo"
          className="bg-[#1b4332] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#143526] transition-colors"
        >
          + Novo Imóvel
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1b4332]" />
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
          <div className="text-4xl mb-4">🏠</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Nenhum imóvel cadastrado</h2>
          <p className="text-gray-500 mb-6">Cadastre seu primeiro imóvel para venda.</p>
          <Link
            href="/crm/novo"
            className="inline-block bg-[#1b4332] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#143526] transition-colors"
          >
            Cadastrar primeiro imóvel
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
                {property.fotos && property.fotos.length > 0 ? (
                  property.fotos[0].startsWith("data:video") ? (
                    <video src={property.fotos[0]} className="w-full h-full object-cover" />
                  ) : (
                    <img
                      src={property.fotos[0]}
                      alt={property.titulo}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop";
                      }}
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                )}
                <span
                  className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded ${statusColors[property.status] || statusColors.ativo}`}
                >
                  {statusLabels[property.status] || property.status}
                </span>
              </div>

              <div className="p-4">
                <div className="text-lg font-bold text-[#1b4332] mb-1">
                  {property.preco || "Consulte"}
                </div>
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{property.titulo}</h3>
                <p className="text-sm text-gray-500 mb-1">
                  {property.categoria} · {property.bairro && `${property.bairro} · `}{property.cidade} - {property.estado}
                </p>
                <p className="text-xs text-gray-400 mb-3">Ref: {property.referencia || "—"}</p>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  {property.quartos > 0 && <span>{property.quartos} quartos</span>}
                  {property.banheiros > 0 && <span>{property.banheiros} banheiros</span>}
                  {property.vagas > 0 && <span>{property.vagas} vagas</span>}
                  {property.area > 0 && <span>{property.area}m²</span>}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/crm/editar/${property.id}`}
                    className="flex-1 text-center border border-gray-300 text-gray-700 py-2 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() =>
                      setStatusToggleTarget({
                        id: property.id,
                        currentStatus: property.status,
                        newStatus: property.status === "ativo" ? "pausado" : "ativo",
                      })
                    }
                    className="flex-1 text-center border border-gray-300 text-gray-700 py-2 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {property.status === "ativo" ? "Pausar" : "Ativar"}
                  </button>
                  <button
                    onClick={() => setDeleteTarget(property.id)}
                    className="border border-red-300 text-red-600 px-3 py-2 text-sm rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
