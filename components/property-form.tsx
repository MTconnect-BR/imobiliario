"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Property,
  PropertyInput,
} from "@/lib/properties";

const propertySchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  type: z.enum(["casa", "apartamento", "terreno", "comercial"]),
  status: z.enum(["disponivel", "vendido", "em_negociacao"]),
  price: z.number().min(1, "Preço é obrigatório"),
  area: z.number().min(1, "Área é obrigatória"),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  parkingSpaces: z.number().min(0),
  address: z.string().min(1, "Endereço é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2, "UF é obrigatória").max(2),
  description: z.string().optional(),
  imageUrl: z.string().url("URL inválida").or(z.literal("")).optional(),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: Property | null;
  onSave: (data: PropertyInput) => void;
}

const defaultValues: PropertyFormValues = {
  title: "",
  type: "casa",
  status: "disponivel",
  price: 0,
  area: 0,
  bedrooms: 0,
  bathrooms: 0,
  parkingSpaces: 0,
  address: "",
  neighborhood: "",
  city: "",
  state: "",
  description: "",
  imageUrl: "",
};

export function PropertyForm({
  open,
  onOpenChange,
  property,
  onSave,
}: PropertyFormProps) {
  const isEditing = !!property;

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      if (property) {
        form.reset({
          title: property.title,
          type: property.type,
          status: property.status,
          price: property.price,
          area: property.area,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          parkingSpaces: property.parkingSpaces,
          address: property.address,
          neighborhood: property.neighborhood,
          city: property.city,
          state: property.state,
          description: property.description,
          imageUrl: property.imageUrl,
        });
      } else {
        form.reset(defaultValues);
      }
    }
  }, [open, property, form]);

  function onSubmit(data: PropertyFormValues) {
    onSave({
      ...data,
      description: data.description || "",
      imageUrl: data.imageUrl || "",
    });
    onOpenChange(false);
    form.reset(defaultValues);
  }

  const inputClass =
    "h-10 rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium tracking-[-0.04em] text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s]";

  const selectClass =
    "h-10 w-full rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium tracking-[-0.04em] text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s] appearance-none cursor-pointer";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="tracking-[-0.06em]">
            {isEditing ? "Editar Imóvel" : "Novo Imóvel"}
          </SheetTitle>
          <SheetDescription>
            {isEditing
              ? "Atualize as informações do imóvel."
              : "Preencha os dados para publicar um novo imóvel."}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium">Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Apartamento 3 quartos"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">Tipo</FormLabel>
                    <FormControl>
                      <select
                        className={selectClass}
                        {...field}
                      >
                        <option value="casa">Casa</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="terreno">Terreno</option>
                        <option value="comercial">Comercial</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">Status</FormLabel>
                    <FormControl>
                      <select
                        className={selectClass}
                        {...field}
                      >
                        <option value="disponivel">Disponível</option>
                        <option value="em_negociacao">Em negociação</option>
                        <option value="vendido">Vendido</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">Preço (R$)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className={inputClass}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">Área (m²)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className={inputClass}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">Quartos</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className={inputClass}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">Banheiros</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className={inputClass}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parkingSpaces"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">Vagas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className={inputClass}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium">Endereço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rua, número, complemento"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">Bairro</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bairro"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">Cidade</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cidade"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">UF</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="SP"
                        maxLength={2}
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium">URL da Imagem</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://exemplo.com/foto.jpg"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium">Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o imóvel..."
                      className="min-h-[100px] rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium tracking-[-0.04em] text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="green">
                {isEditing ? "Salvar Alterações" : "Publicar Imóvel"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
