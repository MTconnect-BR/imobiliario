"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Bed,
  Bath,
  Maximize,
  ParkingSquare,
  MapPin,
  Share2,
  Phone,
  ArrowLeft,
  Building2,
  Calendar,
  ExternalLink,
  FileText,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PropertyCarouselSection } from "@/components/property-carousel-section";
import { PropertyMap } from "@/components/property-map";
import {
  Property,
  getPropertyTypeLabel,
  getPropertyStatusLabel,
  formatPrice,
} from "@/lib/properties";

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [galleryApi, setGalleryApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    if (!id) return;

    async function fetchProperty() {
      try {
        const res = await fetch(`/api/reidoape-property?id=${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        if (data.property) {
          setProperty(data.property);
          setRelatedProperties([]);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      }
    }
    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (!galleryApi) return;
    setTotalSlides(galleryApi.scrollSnapList().length);
    galleryApi.on("select", () => {
      setCurrentSlide(galleryApi.selectedScrollSnap());
    });
  }, [galleryApi]);

  const handleShare = useCallback(() => {
    if (navigator.share && property) {
      navigator.share({
        title: property.title,
        text: `Confira este imóvel: ${property.title} - ${formatPrice(property.price)}`,
        url: window.location.href,
      });
    }
  }, [property]);

  if (notFound) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex flex-col items-center justify-center px-6 py-32">
          <Building2 className="mb-4 h-16 w-16 text-muted-foreground/30" />
          <h1 className="text-2xl font-medium tracking-[-0.06em]">
            Imóvel não encontrado
          </h1>
          <p className="mt-2 text-muted-foreground">
            O imóvel que você procura não existe ou foi removido.
          </p>
          <Link href="/imoveis" className="mt-6">
            <Button variant="green">Ver todos os imóveis</Button>
          </Link>
        </div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center px-6 py-32">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </main>
    );
  }

  const statusVariant =
    property.status === "disponivel"
      ? "green"
      : property.status === "em_negociacao"
        ? "yellow"
        : "red";

  const galleryImages =
    property.images?.length > 0
      ? property.images
      : [property.imageUrl].filter(Boolean);

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <section className="px-6 pt-28 pb-4">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/imoveis" />}>
                  Imóveis
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href={`/imoveis/${property.type === "casa" ? "casas" : property.type === "apartamento" ? "apartamentos" : property.type === "terreno" ? "terrenos" : "comerciais"}`} />}>
                  {getPropertyTypeLabel(property.type)}s
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{property.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[10px] bg-muted">
            <Carousel setApi={setGalleryApi} opts={{ align: "start", loop: false, containScroll: "trimSnaps" }} className="w-full">
              <CarouselContent>
                {galleryImages.map((img, i) => (
                  <CarouselItem key={i}>
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[10px]">
                      <Image
                        src={img}
                        alt={`${property.title} - imagem ${i + 1}`}
                        width={1200}
                        height={675}
                        priority={i === 0}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {galleryImages.length > 1 && (
                <>
                  <CarouselPrevious className="-left-4 lg:-left-12" />
                  <CarouselNext className="-right-4 lg:-right-12" />
                </>
              )}
            </Carousel>

            {/* Slide counter */}
            {totalSlides > 1 && (
              <div className="absolute bottom-4 right-4 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-medium text-white">
                {currentSlide + 1} / {totalSlides}
              </div>
            )}

            {/* Back button */}
            <Link
              href="/imoveis"
              aria-label="Voltar para imóveis"
              className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-charcoal transition-all duration-[0.4s] hover:bg-white hover:scale-[1.05]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="mt-3 flex gap-2">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => galleryApi?.scrollTo(i)}
                  className={`h-16 w-24 overflow-hidden rounded-[10px] border-2 transition-all duration-[0.4s] ${
                    currentSlide === i
                      ? "border-primary"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    width={96}
                    height={64}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Property Info */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Main Content */}
            <div className="flex-1">
              {/* Badges */}
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="outline">{getPropertyTypeLabel(property.type)}</Badge>
                <Badge variant={statusVariant as "green" | "yellow" | "red"}>
                  {getPropertyStatusLabel(property.status)}
                </Badge>
                {property.source === "reidoape" && (
                  <Badge variant="blue">Venda Direta Online - Caixa</Badge>
                )}
                {property.refCaixa && (
                  <Badge variant="outline" className="text-muted-foreground">
                    Ref: {property.refCaixa}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-medium tracking-[-0.06em] text-foreground md:text-4xl">
                {property.title}
              </h1>

              {/* Location */}
              <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm tracking-[-0.04em]">
                  {property.address}{property.addressNumber ? `, ${property.addressNumber}` : ""}, {property.neighborhood}, {property.city} - {property.state}
                </span>
              </div>

              {/* Price */}
              <div className="mt-4">
                <span className="text-3xl font-medium tracking-[-0.06em] text-primary">
                  {formatPrice(property.price)}
                </span>
              </div>

              <Separator className="my-8" />

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex flex-col items-center rounded-[10px] bg-card p-4 text-center">
                  <Bed className="mb-2 h-5 w-5 text-muted-foreground" />
                  <span className="text-lg font-medium tracking-[-0.06em]">
                    {property.bedrooms}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {property.bedrooms === 1 ? "Quarto" : "Quartos"}
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-[10px] bg-card p-4 text-center">
                  <Bath className="mb-2 h-5 w-5 text-muted-foreground" />
                  <span className="text-lg font-medium tracking-[-0.06em]">
                    {property.bathrooms}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {property.bathrooms === 1 ? "Banheiro" : "Banheiros"}
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-[10px] bg-card p-4 text-center">
                  <Maximize className="mb-2 h-5 w-5 text-muted-foreground" />
                  <span className="text-lg font-medium tracking-[-0.06em]">
                    {property.area}m²
                  </span>
                  <span className="text-xs text-muted-foreground">Área</span>
                </div>
                <div className="flex flex-col items-center rounded-[10px] bg-card p-4 text-center">
                  <ParkingSquare className="mb-2 h-5 w-5 text-muted-foreground" />
                  <span className="text-lg font-medium tracking-[-0.06em]">
                    {property.parkingSpaces}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {property.parkingSpaces === 1 ? "Vaga" : "Vagas"}
                  </span>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Description */}
              <div>
                <h2 className="mb-4 text-xl font-medium tracking-[-0.06em]">
                  Descrição
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Documents & Official Link (Rei do APê) */}
              {property.source === "reidoape" && (
                <>
                  <Separator className="my-8" />
                  <div>
                    <h2 className="mb-4 text-xl font-medium tracking-[-0.06em]">
                      Documentos e Links Oficiais
                    </h2>
                    <div className="space-y-3">
                      {property.documents?.map((doc, i) => (
                        <a
                          key={i}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-[10px] bg-card px-4 py-3 transition-colors hover:bg-accent"
                        >
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="flex-1 text-sm font-medium">{doc.label}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </a>
                      ))}
                      {property.officialUrl && (
                        <a
                          href={property.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-[10px] bg-card px-4 py-3 transition-colors hover:bg-accent"
                        >
                          <Shield className="h-5 w-5 text-primary" />
                          <span className="flex-1 text-sm font-medium">Página oficial no site da Caixa</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </a>
                      )}
                    </div>
                    {property.situacaoCaixa && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        Situação: <span className="font-medium text-foreground">{property.situacaoCaixa}</span>
                      </p>
                    )}
                    {property.avaliacaoPrice && property.avaliacaoPrice > property.price && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        Valor de avaliação: <span className="font-medium text-foreground">
                          {formatPrice(property.avaliacaoPrice)}
                        </span>
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Map */}
              {property.lat != null && property.lng != null && (
                <div>
                  <h2 className="mb-4 text-xl font-medium tracking-[-0.06em]">
                    Localização
                  </h2>
                  <PropertyMap
                    lat={property.lat}
                    lng={property.lng}
                    title={property.title}
                    address={`${property.address}${property.addressNumber ? `, ${property.addressNumber}` : ""}, ${property.neighborhood}, ${property.city} - ${property.state}`}
                  />
                  <a
                    href={`https://www.google.com/maps?q=${property.lat},${property.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Abrir no Google Maps
                  </a>
                </div>
              )}

              <Separator className="my-8" />

              {/* Details Grid */}
              <div>
                <h2 className="mb-4 text-xl font-medium tracking-[-0.06em]">
                  Detalhes do Imóvel
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-[10px] bg-card px-4 py-3">
                    <span className="text-sm text-muted-foreground">Tipo</span>
                    <span className="text-sm font-medium">
                      {getPropertyTypeLabel(property.type)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-[10px] bg-card px-4 py-3">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={statusVariant as "green" | "yellow" | "red"} className="text-xs">
                      {getPropertyStatusLabel(property.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-[10px] bg-card px-4 py-3">
                    <span className="text-sm text-muted-foreground">Área</span>
                    <span className="text-sm font-medium">{property.area} m²</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[10px] bg-card px-4 py-3">
                    <span className="text-sm text-muted-foreground">Quartos</span>
                    <span className="text-sm font-medium">{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[10px] bg-card px-4 py-3">
                    <span className="text-sm text-muted-foreground">Banheiros</span>
                    <span className="text-sm font-medium">{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[10px] bg-card px-4 py-3">
                    <span className="text-sm text-muted-foreground">Vagas</span>
                    <span className="text-sm font-medium">{property.parkingSpaces}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[10px] bg-card px-4 py-3 sm:col-span-2">
                    <span className="text-sm text-muted-foreground">Endereço</span>
                    <span className="text-right text-sm font-medium">
                      {property.address}{property.addressNumber ? `, ${property.addressNumber}` : ""}, {property.neighborhood}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-[10px] bg-card px-4 py-3">
                    <span className="text-sm text-muted-foreground">Cidade</span>
                    <span className="text-sm font-medium">{property.city}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[10px] bg-card px-4 py-3">
                    <span className="text-sm text-muted-foreground">Estado</span>
                    <span className="text-sm font-medium">{property.state}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[10px] bg-card px-4 py-3 sm:col-span-2">
                    <span className="text-sm text-muted-foreground">Publicado em</span>
                    <span className="flex items-center gap-1.5 text-sm font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(property.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Contact CTA */}
            <div className="w-full lg:w-80 lg:flex-shrink-0">
              <div className="sticky top-28">
                <div className="rounded-[10px] bg-card p-6">
                  <h3 className="mb-2 text-lg font-medium tracking-[-0.06em]">
                    Interessado neste imóvel?
                  </h3>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Entre em contato para agendar uma visita ou tirar suas dúvidas.
                  </p>

                  <Button variant="green" className="mb-3 w-full" size="lg" asChild>
                    <Link href="/contato">
                      <Phone className="mr-2 h-4 w-4" />
                      Fale Conosco
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleShare}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </Button>

                  {property.officialUrl && (
                    <Button
                      variant="outline"
                      className="mt-3 w-full"
                      asChild
                    >
                      <a href={property.officialUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Ver no site da Caixa
                      </a>
                    </Button>
                  )}

                  <Separator className="my-6" />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo</span>
                      <span className="font-medium">{getPropertyTypeLabel(property.type)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Preço</span>
                      <span className="font-medium">{formatPrice(property.price)}</span>
                    </div>
                    {property.avaliacaoPrice && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avaliação</span>
                        <span className="font-medium text-muted-foreground line-through">
                          {formatPrice(property.avaliacaoPrice)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Área</span>
                      <span className="font-medium">{property.area} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quartos</span>
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    {property.refCaixa && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ref. Caixa</span>
                        <span className="font-medium">{property.refCaixa}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="px-6 py-8">
          <div className="mx-auto max-w-6xl">
            <PropertyCarouselSection
              title="Imóveis Relacionados"
              subtitle={`Outros ${getPropertyTypeLabel(property.type).toLowerCase()}s em ${property.city}`}
              properties={relatedProperties}
              viewAllHref={`/imoveis/${property.type === "casa" ? "casas" : property.type === "apartamento" ? "apartamentos" : property.type === "terreno" ? "terrenos" : "comerciais"}`}
            />
          </div>
        </section>
      )}
    </main>
  );
}
