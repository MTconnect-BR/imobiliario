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
import {
  Property,
  PropertyInput,
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "@/lib/properties";
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

  useEffect(() => {
    const s = getSession();
    setSession(s);
    if (!s) {
      router.replace("/auth/signin?redirect=/crm");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  const loadProperties = useCallback(() => {
    setProperties(getAllProperties());
  }, []);

  const loadExternalProperties = useCallback(async () => {
    try {
      const res = await fetch("/api/reidoape?page=0");
      if (!res.ok) return;
      const data = await res.json();
      const external: Property[] = data.properties ?? [];
      setProperties((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const newExternal = external.filter((p) => !ids.has(p.id));
        return [...prev, ...newExternal];
      });
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    loadProperties();
    loadExternalProperties();
  }, [loadProperties, loadExternalProperties]);

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

  function confirmDelete() {
    if (deletingProperty) {
      deleteProperty(deletingProperty.id);
      loadProperties();
      toast.success("Imóvel excluído com sucesso!");
    }
    setDeleteDialogOpen(false);
    setDeletingProperty(null);
  }

  function handleSave(data: PropertyInput) {
    if (editingProperty) {
      updateProperty(editingProperty.id, data);
      toast.success("Imóvel atualizado com sucesso!");
    } else {
      createProperty(data);
      toast.success("Imóvel publicado com sucesso!");
    }
    loadProperties();
  }

  function handleLogout() {
    logout();
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

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-primary tracking-[-0.06em]">
              Painel de Imóveis
            </h1>
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

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-[10px] border border-border bg-card p-4 transition-all duration-[0.4s] hover:shadow-md">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="mt-1 text-2xl font-medium tracking-[-0.06em]">
              {properties.length}
            </p>
          </div>
          <div className="rounded-[10px] border border-border bg-card p-4 transition-all duration-[0.4s] hover:shadow-md">
            <p className="text-xs text-muted-foreground">Disponíveis</p>
            <p className="mt-1 text-2xl font-medium tracking-[-0.06em] text-[#8ed462]">
              {properties.filter((p) => p.status === "disponivel").length}
            </p>
          </div>
          <div className="rounded-[10px] border border-border bg-card p-4 transition-all duration-[0.4s] hover:shadow-md">
            <p className="text-xs text-muted-foreground">Em negociação</p>
            <p className="mt-1 text-2xl font-medium tracking-[-0.06em] text-[#f5e211]">
              {properties.filter((p) => p.status === "em_negociacao").length}
            </p>
          </div>
          <div className="rounded-[10px] border border-border bg-card p-4 transition-all duration-[0.4s] hover:shadow-md">
            <p className="text-xs text-muted-foreground">Vendidos</p>
            <p className="mt-1 text-2xl font-medium tracking-[-0.06em] text-[#ff705d]">
              {properties.filter((p) => p.status === "vendido").length}
            </p>
          </div>
        </div>

        {/* DataTable */}
        {properties.length > 0 ? (
          <DataTable
            columns={columns}
            data={properties}
            searchKey="title"
            searchPlaceholder="Buscar por título..."
          />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[10px] border border-border bg-card py-20">
            <Building2 className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h2 className="text-lg font-medium tracking-[-0.06em]">
              Nenhum imóvel cadastrado
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Comece publicando seu primeiro imóvel.
            </p>
            <Button
              variant="green"
              className="mt-6"
              onClick={handleCreate}
            >
              <Plus className="h-4 w-4" />
              Publicar Imóvel
            </Button>
          </div>
        )}
      </div>

      {/* Property Form Sheet */}
      <PropertyForm
        open={formOpen}
        onOpenChange={setFormOpen}
        property={editingProperty}
        onSave={handleSave}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir imóvel</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir{" "}
              <strong>{deletingProperty?.title}</strong>? Esta ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
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
