"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
import { Property, PropertyInput } from "@/lib/properties";
import { Upload, X, LinkIcon, MapPin, Search } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import "leaflet/dist/leaflet.css";

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
  addressNumber: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2, "UF é obrigatória").max(2),
  cep: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()),
  lat: z.number().optional(),
  lng: z.number().optional(),
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
  addressNumber: "",
  neighborhood: "",
  city: "",
  state: "",
  cep: "",
  description: "",
  images: [],
  lat: undefined,
  lng: undefined,
};

const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function PropertyForm({
  open,
  onOpenChange,
  property,
  onSave,
}: PropertyFormProps) {
  const isEditing = !!property;
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const markerRef = useRef<unknown>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues,
  });

  const watchedImages = form.watch("images");
  const watchedLat = form.watch("lat");
  const watchedLng = form.watch("lng");
  const watchedCep = form.watch("cep");

  useEffect(() => {
    if (open) {
      if (property) {
        const images = property.images?.length
          ? property.images
          : property.imageUrl
            ? [property.imageUrl]
            : [];
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
          addressNumber: property.addressNumber ?? "",
          neighborhood: property.neighborhood,
          city: property.city,
          state: property.state,
          cep: property.cep ?? "",
          description: property.description,
          images,
          lat: property.lat,
          lng: property.lng,
        });
      } else {
        form.reset(defaultValues);
      }
      setImageUrlInput("");
    }
  }, [open, property, form]);

  // Initialize Leaflet map — wait for portal DOM via MutationObserver
  useEffect(() => {
    if (!open || mapInstanceRef.current) return;

    let cancelled = false;
    let observer: MutationObserver | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    async function initMap() {
      if (cancelled || !mapRef.current || mapInstanceRef.current) return;

      const L = (await import("leaflet")).default;

      if (cancelled || !mapRef.current || mapInstanceRef.current) return;

      L.Icon.Default.mergeOptions({
        iconUrl: "/marker-icon.png",
        iconRetinaUrl: "/marker-icon-2x.png",
        shadowUrl: "/marker-shadow.png",
      });

      const center: [number, number] = [
        watchedLat ?? -15.7801,
        watchedLng ?? -47.9292,
      ];

      const map = L.map(mapRef.current!, {
        center,
        zoom: 14,
        zoomControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const marker = L.marker(center, { draggable: true }).addTo(map);

      marker.on("dragend", () => {
        const pos = marker.getLatLng();
        form.setValue("lat", Math.round(pos.lat * 1e6) / 1e6);
        form.setValue("lng", Math.round(pos.lng * 1e6) / 1e6);
      });

      map.on("click", (e: { latlng: { lat: number; lng: number } }) => {
        marker.setLatLng(e.latlng);
        form.setValue("lat", Math.round(e.latlng.lat * 1e6) / 1e6);
        form.setValue("lng", Math.round(e.latlng.lng * 1e6) / 1e6);
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
      setMapReady(true);
    }

    function tryInit() {
      if (mapRef.current && !mapInstanceRef.current) {
        initMap();
      }
    }

    // Try immediately in case portal is already mounted
    tryInit();

    // If not yet initialized, watch for portal DOM changes
    if (!mapInstanceRef.current) {
      observer = new MutationObserver(() => {
        tryInit();
      });
      observer.observe(document.body, { childList: true, subtree: true });

      // Also poll as fallback
      const pollId = setInterval(() => {
        tryInit();
        if (mapInstanceRef.current) clearInterval(pollId);
      }, 100);

      timeoutId = setTimeout(() => {
        clearInterval(pollId);
      }, 5000);
    }

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
        setMapReady(false);
      }
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update marker when lat/lng changes externally (e.g. geocoding)
  useEffect(() => {
    if (!mapReady || !markerRef.current || !mapInstanceRef.current) return;
    if (watchedLat != null && watchedLng != null) {
      import("leaflet").then((L) => {
        const latlng = L.latLng(watchedLat, watchedLng);
        (markerRef.current as { setLatLng: (ll: unknown) => void }).setLatLng(
          latlng
        );
        (
          mapInstanceRef.current as { flyTo: (ll: unknown, zoom: number) => void }
        ).flyTo(latlng, 14);
      });
    }
  }, [watchedLat, watchedLng, mapReady]);

  const addImageFromUrl = useCallback(() => {
    const url = imageUrlInput.trim();
    if (!url) return;
    const current = form.getValues("images");
    if (current.length >= MAX_IMAGES) return;
    if (!current.includes(url)) {
      form.setValue("images", [...current, url]);
    }
    setImageUrlInput("");
  }, [imageUrlInput, form]);

  const addImageFromFile = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const current = form.getValues("images");
      const remaining = MAX_IMAGES - current.length;
      const toProcess = Array.from(files).slice(0, remaining);

      toProcess.forEach((file) => {
        if (file.size > MAX_FILE_SIZE) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            const imgs = form.getValues("images");
            if (!imgs.includes(result)) {
              form.setValue("images", [...imgs, result]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    },
    [form]
  );

  const removeImage = useCallback(
    (index: number) => {
      const current = form.getValues("images");
      form.setValue(
        "images",
        current.filter((_, i) => i !== index)
      );
    },
    [form]
  );

  function formatCep(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length > 5) {
      return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }
    return digits;
  }

  async function fetchCep() {
    const digits = (watchedCep ?? "").replace(/\D/g, "");
    if (digits.length !== 8) {
      toast.error("CEP deve ter 8 dígitos");
      return;
    }
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (data.erro) {
        toast.error("CEP não encontrado");
        return;
      }
      if (data.logradouro) {
        form.setValue(
          "address",
          data.complemento
            ? `${data.logradouro}, ${data.complemento}`
            : data.logradouro
        );
      }
      if (data.bairro) form.setValue("neighborhood", data.bairro);
      if (data.localidade) form.setValue("city", data.localidade);
      if (data.uf) form.setValue("state", data.uf);

      // Geocode with Nominatim via API route (server-side, no CORS issues)
      const query = `${data.logradouro || ""}, ${data.localidade || ""}, ${data.uf || ""}, Brasil`;
      try {
        const geoRes = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
        const geoData = await geoRes.json();
        if (geoData.length > 0) {
          const { lat, lon } = geoData[0];
          form.setValue("lat", Math.round(parseFloat(lat) * 1e6) / 1e6);
          form.setValue("lng", Math.round(parseFloat(lon) * 1e6) / 1e6);
          toast.success("Endereço e localização preenchidos automaticamente");
        } else {
          toast.success("Endereço preenchido automaticamente");
        }
      } catch {
        toast.success("Endereço preenchido automaticamente");
      }
    } catch {
      toast.error("Erro ao buscar CEP");
    } finally {
      setCepLoading(false);
    }
  }

  async function onSubmit(data: PropertyFormValues) {
    onSave({
      ...data,
      description: data.description || "",
      addressNumber: data.addressNumber || "",
      cep: data.cep || "",
      imageUrl: data.images[0] ?? "",
      images: data.images,
      lat: data.lat,
      lng: data.lng,
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-4"
          >
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
                    <FormLabel className="text-xs font-medium">
                      Tipo
                    </FormLabel>
                    <FormControl>
                      <select className={selectClass} {...field}>
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
                    <FormLabel className="text-xs font-medium">
                      Status
                    </FormLabel>
                    <FormControl>
                      <select className={selectClass} {...field}>
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
                render={({ field }) => {
                  const formatted = field.value
                    ? new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(field.value)
                    : "";
                  return (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">
                        Preço (R$)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="decimal"
                          placeholder="R$ 0,00"
                          className={inputClass}
                          value={formatted}
                          onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, "");
                            const num = raw ? parseInt(raw, 10) : 0;
                            field.onChange(num);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">
                      Área (m²)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className={inputClass}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
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
                    <FormLabel className="text-xs font-medium">
                      Quartos
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className={inputClass}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
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
                    <FormLabel className="text-xs font-medium">
                      Banheiros
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className={inputClass}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
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
                    <FormLabel className="text-xs font-medium">
                      Vagas
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className={inputClass}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* CEP + Address */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <FormLabel className="text-xs font-medium">CEP</FormLabel>
                  <Input
                    placeholder="00000-000"
                    maxLength={9}
                    className={inputClass}
                    value={watchedCep ?? ""}
                    onChange={(e) => form.setValue("cep", formatCep(e.target.value))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        fetchCep();
                      }
                    }}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-[22px] h-10"
                  onClick={fetchCep}
                  disabled={cepLoading || (watchedCep ?? "").replace(/\D/g, "").length !== 8}
                >
                  {cepLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-[1fr_120px] gap-3">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">
                        Endereço
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Rua, complemento"
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
                  name="addressNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">
                        Número
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nº"
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">
                      Bairro
                    </FormLabel>
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
                    <FormLabel className="text-xs font-medium">
                      Cidade
                    </FormLabel>
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
            </div>

            {/* Images Section */}
            <div className="space-y-3">
              <FormLabel className="text-xs font-medium">
                Imagens do Imóvel
              </FormLabel>

              {/* Image previews */}
              {watchedImages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {watchedImages.map((img, i) => (
                    <div
                      key={i}
                      className="group relative h-20 w-20 overflow-hidden rounded-[10px] border border-border"
                    >
                      <Image
                        src={img}
                        alt={`Imagem ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      {i === 0 && (
                        <span className="absolute bottom-0 left-0 w-full bg-charcoal/70 py-0.5 text-center text-[10px] font-medium text-white">
                          Principal
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* URL input */}
              {watchedImages.length < MAX_IMAGES && (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="https://exemplo.com/foto.jpg"
                      className={`${inputClass} pl-9`}
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addImageFromUrl();
                        }
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={addImageFromUrl}
                    disabled={!imageUrlInput.trim()}
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* File upload */}
              {watchedImages.length < MAX_IMAGES && (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      addImageFromFile(e.target.files);
                      e.target.value = "";
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Enviar arquivo do dispositivo
                  </Button>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                {watchedImages.length}/{MAX_IMAGES} imagens • JPG, PNG, WebP •
                máx. 5MB cada
              </p>
            </div>

            {/* Map Section */}
            <div className="space-y-3">
              <FormLabel className="flex items-center gap-1.5 text-xs font-medium">
                <MapPin className="h-3.5 w-3.5" />
                Localização no Mapa
              </FormLabel>

              <div
                ref={mapRef}
                className="h-[200px] w-full overflow-hidden rounded-[10px] border border-border"
              />

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="lat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] text-muted-foreground">
                        Latitude
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="-15.7801"
                          className={inputClass}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseFloat(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lng"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] text-muted-foreground">
                        Longitude
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="-47.9292"
                          className={inputClass}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseFloat(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Clique no mapa ou arraste o marker para definir a localização
              </p>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium">
                    Descrição
                  </FormLabel>
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
