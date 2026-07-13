"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  title?: string;
  description?: string;
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex = 0, title, description, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/90"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1 min-w-0">
          {title && <p className="text-white font-medium truncate">{title}</p>}
          <p className="text-white/60 text-sm">{currentIndex + 1} de {images.length}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Image */}
      <div className="flex-1 flex items-center justify-center px-4 pb-4 min-h-0">
        <div className="relative w-full max-w-4xl h-full max-h-[60vh]">
          <Image
            src={images[currentIndex]}
            alt={`${title || "Imagem"} - ${currentIndex + 1}`}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 px-4 pb-4 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === currentIndex ? "border-white" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`Thumbnail ${i + 1}`} width={80} height={56} className="h-full w-full object-cover" unoptimized />
            </button>
          ))}
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="px-4 pb-6 max-w-4xl mx-auto w-full">
          <p className="text-white/70 text-sm leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  );
}
