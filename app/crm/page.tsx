"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Building2, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { PropertyForm } from "@/components/property-form";
import { getPropertyColumns } from "@/components/property-table-columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Property, PropertyInput } from "@/lib/properties";
import { getSession, logout } from "@/lib/auth";
import { toast } from "sonner";

export default function CRMPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deletingProperty, setDeletingProperty] = useState<Property | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [session, setSession] = useState<Omit<import("@/lib/auth").User, "password"> | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterState, setFilterState] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(() => {
      if (!cancelled) {
        router.replace("/auth/signin?redirect=/crm");
      }
    }, 10000);

    (async () => {
      try {
        const s = await getSession();
        if (cancelled) return;
        clearTimeout(timeout);
        const sessionUser = s?.user ?? null;
        setSession(sessionUser);
        if (!sessionUser) {
          router.replace("/auth/signin?redirect=/crm");
        } else {
          setAuthChecked(true);
        }
      } catch {
        if (!cancelled) {
          clearTimeout(timeout);
          router.replace("/auth/signin?redirect=/crm");
        }
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [router]);

  const loadExternalProperties = useCallback(async () => {
    try {
      setLoading(true);
      const allExternal: Property[] = [];
      const firstRes = await fetch("/api/reidoape?page=0");
      if (!firstRes.ok) return;
      const firstData = await firstRes.json();
      allExternal.push(...(firstData.properties ?? []));

      const totalPages = Math.ceil((firstData.total ?? 0) / (firstData.perPage ?? 24));
      const pagesToFetch = Math.min(totalPages, 10);

      for (let p = 1; p < pagesToFetch; p++) {
        const res = await fetch(`/api/reidoape?page=${p}`);
        if (!res.ok) continue;
        const data = await res.json();
        allExternal.push(...(data.properties ?? []));
      }

      const externalIds = new Set<string>();
      const uniqueExternal = allExternal.filter((p) => {
        if (externalIds.has(p.id)) return false;
        externalIds.add(p.id);
        return true;
      });

      setProperties(uniqueExternal);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authChecked) {
      loadExternalProperties();
    }
  }, [authChecked, loadExternalProperties]);

  function handleCreate() {
    setEditingProperty(null);
    setFormOpen(true);
  }

  function handleEdit(property: Property) {
    setEditingProperty(property);
    setFormOpen(true);
  }

  function handleDeleteClick(property: Property) {
    setDeletingProperty(property);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (deletingProperty) {
      try {
        const res = await fetch(`/api/properties?id=${deletingProperty.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Falha ao excluir");
        setProperties((prev) => prev.filter((p) => p.id !== deletingProperty.id));
        toast.success("Imóvel removido com sucesso!");
      } catch {
        toast.error("Erro ao excluir imóvel.");
      }
    }
    setDeleteDialogOpen(false);
    setDeletingProperty(null);
  }

  async function handleSave(data: PropertyInput) {
    try {
      if (editingProperty) {
        const res = await fetch(`/api/properties?id=${editingProperty.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Falha ao atualizar");
        setProperties((prev) =>
          prev.map((p) =>
            p.id === editingProperty.id
              ? { ...p, ...data, updatedAt: new Date().toISOString() }
              : p,
          ),
        );
        toast.success("Imóvel atualizado com sucesso!");
      } else {
        const res = await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Falha ao criar");
        const created = await res.json();
        const now = new Date().toISOString();
        const newProperty: Property = {
          ...data,
          id: created.id ?? `local-${Date.now()}`,
          createdAt: now,
          updatedAt: now,
        };
        setProperties((prev) => [newProperty, ...prev]);
        toast.success("Imóvel publicado com sucesso!");
      }
    } catch {
      toast.error("Erro ao salvar imóvel.");
    }
  }

  async function handleLogout() {
    await logout();
    setSession(null);
    toast.success("Logout realizado!");
    router.replace("/auth/signin");
  }

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Verificando acesso...</p>
        </div>
      </main>
    );
  }

  const columns = getPropertyColumns(handleEdit, handleDeleteClick);

  const uniqueTypes = [...new Set(properties.map((p) => p.type))].sort();
  const uniqueStates = [...new Set(properties.map((p) => p.state))].sort();
  const uniqueStatuses = [...new Set(properties.map((p) => p.status))].sort();

  const filteredProperties = properties.filter((p) => {
    if (filterType !== "all" && p.type !== filterType) return false;
    if (filterState !== "all" && p.state !== filterState) return false;
    if (filterStatus !== "all" && p.status !== filterStatus) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-primary tracking-[-0.06em]">Painel de Imóveis</h1>
            <p className="mt-2 text-muted-foreground">
              Gerencie seus imóveis publicados na plataforma.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {session ? (
              <>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  {session.name}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </>
            ) : (
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4" />
                  Entrar
                </Button>
              </Link>
            )}
            <Button variant="green" size="lg" onClick={handleCreate}>
              <Plus className="h-5 w-5" />
              Novo Imóvel
            </Button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-[10px] border border-border bg-card p-4 transition-all duration-[0.4s] hover:shadow-md">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="mt-1 text-2xl font-medium tracking-[-0.06em]">
              {loading ? "..." : properties.length}
            </p>
          </div>
          <div className="rounded-[10px] border border-border bg-card p-4 transition-all duration-[0.4s] hover:shadow-md">
            <p className="text-xs text-muted-foreground">Disponíveis</p>
            <p className="mt-1 text-2xl font-medium tracking-[-0.06em] text-[#8ed462]">
              {loading ? "..." : properties.filter((p) => p.status === "disponivel").length}
            </p>
          </div>
          <div className="rounded-[10px] border border-border bg-card p-4 transition-all duration-[0.4s] hover:shadow-md">
            <p className="text-xs text-muted-foreground">Em negociação</p>
            <p className="mt-1 text-2xl font-medium tracking-[-0.06em] text-[#f5e211]">
              {loading ? "..." : properties.filter((p) => p.status === "em_negociacao").length}
            </p>
          </div>
          <div className="rounded-[10px] border border-border bg-card p-4 transition-all duration-[0.4s] hover:shadow-md">
            <p className="text-xs text-muted-foreground">Vendidos</p>
            <p className="mt-1 text-2xl font-medium tracking-[-0.06em] text-[#dc2626]">
              {loading ? "..." : properties.filter((p) => p.status === "vendido").length}
            </p>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="h-10 rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
          >
            <option value="all">Todos os tipos</option>
            {uniqueTypes.map((t) => (
              <option key={t} value={t}>
                {t === "casa"
                  ? "Casa"
                  : t === "apartamento"
                    ? "Apartamento"
                    : t === "terreno"
                      ? "Terreno"
                      : "Comercial"}
              </option>
            ))}
          </select>

          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="h-10 rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
          >
            <option value="all">Todos os estados</option>
            {uniqueStates.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-10 rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
          >
            <option value="all">Todos os status</option>
            {uniqueStatuses.map((s) => (
              <option key={s} value={s}>
                {s === "disponivel"
                  ? "Disponível"
                  : s === "em_negociacao"
                    ? "Em negociação"
                    : "Vendido"}
              </option>
            ))}
          </select>

          {(filterType !== "all" || filterState !== "all" || filterStatus !== "all") && (
            <button
              onClick={() => {
                setFilterType("all");
                setFilterState("all");
                setFilterStatus("all");
              }}
              className="h-10 rounded-[10px] px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {filteredProperties.length > 0 ? (
          <DataTable
            columns={columns}
            data={filteredProperties}
            searchKey="title"
            searchPlaceholder="Buscar por título..."
          />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[10px] border border-border bg-card py-20">
            <Building2 className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h2 className="text-lg font-medium tracking-[-0.06em]">
              {loading ? "Carregando imóveis..." : "Nenhum imóvel encontrado"}
            </h2>
            {!loading && (
              <>
                <p className="mt-2 text-sm text-muted-foreground">
                  Comece publicando seu primeiro imóvel.
                </p>
                <Button variant="green" className="mt-6" onClick={handleCreate}>
                  <Plus className="h-4 w-4" />
                  Publicar Imóvel
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      <PropertyForm
        open={formOpen}
        onOpenChange={setFormOpen}
        property={editingProperty}
        onSave={handleSave}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir imóvel</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir <strong>{deletingProperty?.title}</strong>? Esta ação
              não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="red" onClick={confirmDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
