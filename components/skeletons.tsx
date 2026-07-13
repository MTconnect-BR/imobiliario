import { Skeleton } from "@/components/ui/skeleton";

export function PropertyCardSkeleton() {
  return (
    <div className="flex h-40 overflow-hidden rounded-[10px] border border-border bg-card">
      <div className="relative w-48 shrink-0 overflow-hidden bg-muted sm:w-56">
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      </div>
      <div className="flex flex-1 flex-col justify-between overflow-hidden p-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-5 w-1/3" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

export function PropertyGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PropertyDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <Skeleton className="h-10 w-32 mb-6" />

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6">
              <Skeleton className="aspect-video w-full rounded-[10px]" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-[10px]" />
                ))}
              </div>

              <div className="space-y-4">
                <Skeleton className="h-8 w-2/3" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-6 w-1/3" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-20 w-full" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[10px] border border-border p-6 space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>

              <div className="rounded-[10px] border border-border p-6 space-y-4">
                <Skeleton className="h-6 w-40" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[10px] border border-border overflow-hidden">
                <Skeleton className="h-64 w-full rounded-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
      <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      <div className="absolute inset-0 flex items-end px-6 pb-16 md:px-12 lg:px-20">
        <div className="w-full max-w-xl space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <div className="flex gap-3">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FiltersSkeleton() {
  return (
    <div className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur px-6 py-3 md:top-0 md:py-4">
      <div className="mx-auto max-w-6xl flex flex-col gap-3 md:flex-row md:items-center">
        <Skeleton className="h-10 flex-1" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-20" />
          ))}
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </div>
  );
}
