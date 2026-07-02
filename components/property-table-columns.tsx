"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Property,
  getPropertyTypeLabel,
  getPropertyStatusLabel,
  formatPrice,
} from "@/lib/properties";

function getStatusVariant(status: Property["status"]) {
  switch (status) {
    case "disponivel":
      return "green" as const;
    case "vendido":
      return "red" as const;
    case "em_negociacao":
      return "yellow" as const;
  }
}

function getTypeVariant(type: Property["type"]) {
  switch (type) {
    case "casa":
      return "blue" as const;
    case "apartamento":
      return "pink" as const;
    case "terreno":
      return "yellow" as const;
    case "comercial":
      return "default" as const;
  }
}

export function getPropertyColumns(
  onEdit: (property: Property) => void,
  onDelete: (property: Property) => void
): ColumnDef<Property, unknown>[] {
  return [
    {
      accessorKey: "imageUrl",
      header: "",
      cell: ({ row }) => {
        const url = row.getValue("imageUrl") as string;
        return (
          <div className="h-10 w-10 overflow-hidden rounded-[10px] bg-muted">
            {url ? (
              <Image
                src={url}
                alt={row.getValue("title") as string}
                width={40}
                height={40}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                🏠
              </div>
            )}
          </div>
        );
      },
      size: 48,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 text-xs font-medium"
        >
          Título
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("title")}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => {
        const type = row.getValue("type") as Property["type"];
        return (
          <Badge variant={getTypeVariant(type)}>
            {getPropertyTypeLabel(type)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 text-xs font-medium"
        >
          Preço
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const price = row.getValue("price") as number;
        return <span className="font-medium">{formatPrice(price)}</span>;
      },
    },
    {
      accessorKey: "area",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 text-xs font-medium"
        >
          Área
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const area = row.getValue("area") as number;
        return <span>{area} m²</span>;
      },
    },
    {
      accessorKey: "bedrooms",
      header: "Quartos",
      cell: ({ row }) => <span>{row.getValue("bedrooms")}</span>,
    },
    {
      accessorKey: "city",
      header: "Cidade",
      cell: ({ row }) => (
        <span className="max-w-[120px] truncate">
          {row.getValue("city")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Property["status"];
        return (
          <Badge variant={getStatusVariant(status)}>
            {getPropertyStatusLabel(status)}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const property = row.original;
        return (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => onEdit(property)}
              title="Editar"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => onDelete(property)}
              title="Excluir"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        );
      },
      size: 80,
    },
  ];
}
