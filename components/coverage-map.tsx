"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

interface CountsData {
  total: number;
  byState: Record<string, number>;
  byCity: Record<string, number>;
  loading: boolean;
}

const STATE_NAMES: Record<string, string> = {
  SP: "São Paulo",
  RJ: "Rio de Janeiro",
  PR: "Paraná",
  SC: "Santa Catarina",
  MG: "Minas Gerais",
  RS: "Rio Grande do Sul",
  BA: "Bahia",
  ES: "Espírito Santo",
};

const STATE_COLORS: Record<string, string> = {
  SP: "#2563eb",
  RJ: "#dc2626",
  PR: "#16a34a",
  SC: "#ea580c",
  MG: "#7c3aed",
  RS: "#0891b2",
  BA: "#ca8a04",
  ES: "#be123c",
};

const STATE_COORDS: Record<string, [number, number]> = {
  SP: [-23.55, -46.63],
  RJ: [-22.91, -43.17],
  PR: [-25.43, -49.27],
  SC: [-27.6, -48.55],
  MG: [-19.92, -43.94],
  RS: [-30.03, -51.23],
  BA: [-12.97, -38.51],
  ES: [-20.32, -40.34],
};

const CITY_COORDS: Record<string, [number, number]> = {
  "São Paulo": [-23.5505, -46.6333],
  "Rio de Janeiro": [-22.9068, -43.1729],
  Curitiba: [-25.4284, -49.2733],
  Florianópolis: [-27.5954, -48.548],
  "Belo Horizonte": [-19.9191, -43.9386],
  "Porto Alegre": [-30.0346, -51.2177],
  Salvador: [-12.9714, -38.5124],
  Vitória: [-20.3155, -40.3128],
  Campinas: [-22.9099, -47.0626],
  Niterói: [-22.8833, -43.1036],
  Londrina: [-23.3045, -51.1696],
  Joinville: [-26.3045, -48.8487],
  Santos: [-23.9608, -46.3336],
  Petrópolis: [-22.5106, -43.1776],
  Maringá: [-23.421, -51.9331],
  Blumenau: [-26.9194, -49.0661],
};

export function CoverageMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [counts, setCounts] = useState<CountsData>({
    total: 0,
    byState: {},
    byCity: {},
    loading: true,
  });

  useEffect(() => {
    fetch("/api/counts")
      .then((r) => r.json())
      .then((data) =>
        setCounts({
          total: data.total || 0,
          byState: data.byState || {},
          byCity: data.byCity || {},
          loading: false,
        }),
      )
      .catch(() => setCounts((p) => ({ ...p, loading: false })));
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current || counts.loading) return;

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

      const allMarkers: ReturnType<typeof L.marker>[] = [];

      const statesSorted = Object.entries(counts.byState)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6);

      statesSorted.forEach(([stateCode, stateCount]) => {
        const color = STATE_COLORS[stateCode] || "#6b7280";
        const stateCenter = STATE_COORDS[stateCode];

        const stateIcon = L.divIcon({
          html: `<div style="
            width:28px;height:28px;border-radius:50%;
            background:${color};border:3px solid white;
            box-shadow:0 2px 8px rgba(0,0,0,.35);
            display:flex;align-items:center;justify-content:center;
            color:white;font-size:10px;font-weight:700;
            font-family:system-ui,sans-serif;
          ">${stateCount > 999 ? `${Math.round(stateCount / 100) / 10}k` : stateCount}</div>`,
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        if (stateCenter) {
          const marker = L.marker(stateCenter, { icon: stateIcon })
            .addTo(map)
            .bindPopup(
              `<div style="font-family:system-ui,sans-serif;min-width:140px">
                <strong style="font-size:14px">${STATE_NAMES[stateCode] || stateCode}</strong><br/>
                <span style="font-size:13px;font-weight:600;color:${color}">${stateCount.toLocaleString("pt-BR")} imóveis</span>
              </div>`,
            );
          allMarkers.push(marker);
        }
      });

      if (allMarkers.length > 0) {
        const group = L.featureGroup(allMarkers);
        map.fitBounds(group.getBounds().pad(0.15));
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
  }, [counts.loading, counts.byState]);

  const statesSorted = Object.entries(counts.byState)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const topCities = Object.entries(counts.byCity)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 12);

  const totalByState = statesSorted.reduce((s, [, v]) => s + v, 0);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-charcoal">
            Nossa <strong className="text-primary">Atuação</strong>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal/70">
            Presença consolidada em todo o Brasil. Imóveis da Caixa com até 90% de desconto em
            localizações estratégicas.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Mapa */}
          <div className="relative">
            {counts.loading ? (
              <div className="flex h-[400px] items-center justify-center rounded-[10px] border border-border bg-charcoal/5 sm:h-[480px]">
                <div className="text-center">
                  <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <p className="text-sm text-charcoal/50">Carregando mapa...</p>
                </div>
              </div>
            ) : (
              <div
                ref={mapRef}
                className="h-[400px] w-full overflow-hidden rounded-[10px] border border-border sm:h-[480px]"
              />
            )}
          </div>

          {/* Painel lateral */}
          <div className="flex flex-col gap-4">
            {/* Legenda */}
            <div className="rounded-[10px] border border-border bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-charcoal">Estados com mais imóveis</h3>
              <div className="space-y-2">
                {statesSorted.map(([code, count]) => (
                  <div key={code} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ background: STATE_COLORS[code] || "#6b7280" }}
                    />
                    <span className="flex-1 text-xs text-charcoal/70">
                      {STATE_NAMES[code] || code}
                    </span>
                    <span className="text-xs font-semibold text-charcoal">
                      {count.toLocaleString("pt-BR")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumo */}
            <div className="rounded-[10px] border border-border bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-charcoal">Resumo</h3>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-charcoal/60">Total</span>
                  <span className="text-lg font-bold text-primary">
                    {counts.total.toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="border-t border-border" />
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-charcoal/60">Estados</span>
                  <span className="text-sm font-semibold text-charcoal">{statesSorted.length}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-charcoal/60">Cidades</span>
                  <span className="text-sm font-semibold text-charcoal">
                    {Object.keys(counts.byCity).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Cidades */}
            <div className="rounded-[10px] border border-border bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-charcoal">Top Cidades</h3>
              <div className="space-y-3">
                {topCities.map(([city, count]) => {
                  const pct = totalByState > 0 ? Math.round((count / totalByState) * 100) : 0;
                  const stateCode = Object.keys(STATE_COLORS).find((sc) =>
                    city.includes(STATE_NAMES[sc]?.split(" ")[0] || "___"),
                  );
                  const barColor = STATE_COLORS[stateCode || ""] || "#6b7280";
                  return (
                    <div key={city}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-charcoal/70">{city}</span>
                        <span className="font-medium text-charcoal">
                          {count.toLocaleString("pt-BR")} ({pct}%)
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-charcoal/10">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${Math.min(pct * 2, 100)}%`, background: barColor }}
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
