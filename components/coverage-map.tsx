"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const REGIONS = [
  {
    state: "São Paulo",
    cities: [
      { name: "São Paulo", lat: -23.5505, lng: -46.6333, count: 1200 },
      { name: "Campinas", lat: -22.9099, lng: -47.0626, count: 350 },
      { name: "Santos", lat: -23.9608, lng: -46.3336, count: 180 },
    ],
  },
  {
    state: "Rio de Janeiro",
    cities: [
      { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729, count: 1800 },
      { name: "Niterói", lat: -22.8833, lng: -43.1036, count: 220 },
      { name: "Petrópolis", lat: -22.5106, lng: -43.1776, count: 150 },
    ],
  },
  {
    state: "Paraná",
    cities: [
      { name: "Curitiba", lat: -25.4284, lng: -49.2733, count: 980 },
      { name: "Londrina", lat: -23.3045, lng: -51.1696, count: 290 },
      { name: "Maringá", lat: -23.421, lng: -51.9331, count: 210 },
    ],
  },
  {
    state: "Santa Catarina",
    cities: [
      { name: "Florianópolis", lat: -27.5954, lng: -48.548, count: 620 },
      { name: "Joinville", lat: -26.3045, lng: -48.8487, count: 180 },
      { name: "Blumenau", lat: -26.9194, lng: -49.0661, count: 140 },
    ],
  },
];

const TOTAL_PROPERTIES = REGIONS.reduce(
  (sum, r) => sum + r.cities.reduce((s, c) => s + c.count, 0),
  0,
);

const TOTAL_CITIES = REGIONS.reduce((sum, r) => sum + r.cities.length, 0);

const TOTAL_STATES = REGIONS.length;

export function CoverageMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    async function initMap() {
      const L = (await import("leaflet")).default;

      if (cancelled || !mapRef.current) return;

      L.Icon.Default.mergeOptions({
        iconUrl: "/marker-icon.png",
        iconRetinaUrl: "/marker-icon-2x.png",
        shadowUrl: "/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [-23.5, -47.5],
        zoom: 5,
        zoomControl: false,
        scrollWheelZoom: false,
        minZoom: 4,
        maxZoom: 12,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const stateColors: Record<string, string> = {
        "São Paulo": "#2563eb",
        "Rio de Janeiro": "#dc2626",
        Paraná: "#16a34a",
        "Santa Catarina": "#ea580c",
      };

      const allMarkers: ReturnType<typeof L.marker>[] = [];

      REGIONS.forEach((region) => {
        const color = stateColors[region.state] || "#6b7280";

        region.cities.forEach((city) => {
          const icon = L.divIcon({
            html: `<div style="
              width:14px;height:14px;border-radius:50%;
              background:${color};border:2px solid white;
              box-shadow:0 1px 4px rgba(0,0,0,.3);
            "></div>`,
            className: "",
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          });

          const marker = L.marker([city.lat, city.lng], { icon })
            .addTo(map)
            .bindPopup(
              `<div style="font-family:system-ui,sans-serif;min-width:120px">
                <strong style="font-size:14px">${city.name}</strong><br/>
                <span style="color:#666;font-size:12px">${region.state}</span><br/>
                <span style="font-size:13px;font-weight:600;color:${color}">${city.count.toLocaleString("pt-BR")} imóveis</span>
              </div>`,
            );
          allMarkers.push(marker);
        });
      });

      if (allMarkers.length > 0) {
        const group = L.featureGroup(allMarkers);
        map.fitBounds(group.getBounds().pad(0.1));
      }

      mapInstanceRef.current = map;
    }

    initMap();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-charcoal">
            Nossa <strong className="text-primary">Atuação</strong>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal/70">
            Presença consolidada nas principais cidades do Sul e Sudeste. Imóveis da Caixa com até
            90% de desconto em localizações estratégicas.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Mapa */}
          <div className="relative">
            <div
              ref={mapRef}
              className="h-[400px] w-full overflow-hidden rounded-[10px] border border-border sm:h-[480px]"
            />
          </div>

          {/* Painel lateral */}
          <div className="flex flex-col gap-4">
            {/* Legenda */}
            <div className="rounded-[10px] border border-border bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-charcoal">Legenda</h3>
              <div className="space-y-2">
                {REGIONS.map((region) => {
                  const colors: Record<string, string> = {
                    "São Paulo": "bg-blue-600",
                    "Rio de Janeiro": "bg-red-600",
                    Paraná: "bg-green-600",
                    "Santa Catarina": "bg-orange-600",
                  };
                  return (
                    <div key={region.state} className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${colors[region.state]}`} />
                      <span className="text-xs text-charcoal/70">{region.state}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resumo */}
            <div className="rounded-[10px] border border-border bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-charcoal">Resumo</h3>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-charcoal/60">Total</span>
                  <span className="text-lg font-bold text-primary">
                    {TOTAL_PROPERTIES.toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="border-t border-border" />
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-charcoal/60">Estados</span>
                  <span className="text-sm font-semibold text-charcoal">{TOTAL_STATES}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-charcoal/60">Cidades</span>
                  <span className="text-sm font-semibold text-charcoal">{TOTAL_CITIES}</span>
                </div>
              </div>
            </div>

            {/* Cidades por estado */}
            <div className="rounded-[10px] border border-border bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-charcoal">Imóveis por Estado</h3>
              <div className="space-y-3">
                {REGIONS.map((region) => {
                  const total = region.cities.reduce((s, c) => s + c.count, 0);
                  const pct = Math.round((total / TOTAL_PROPERTIES) * 100);
                  const barColors: Record<string, string> = {
                    "São Paulo": "bg-blue-600",
                    "Rio de Janeiro": "bg-red-600",
                    Paraná: "bg-green-600",
                    "Santa Catarina": "bg-orange-600",
                  };
                  return (
                    <div key={region.state}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-charcoal/70">{region.state}</span>
                        <span className="font-medium text-charcoal">
                          {total.toLocaleString("pt-BR")} ({pct}%)
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-charcoal/10">
                        <div
                          className={`h-full rounded-full ${barColors[region.state]}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
