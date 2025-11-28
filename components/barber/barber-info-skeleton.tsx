export function BarberInfoSkeleton() {
    return (
      <section className="px-4 py-6 max-w-2xl mx-auto">
        <div className="flex gap-4 items-start">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex-shrink-0 animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-8 bg-gray-300 rounded w-2/3 animate-pulse" />
            <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse" />
          </div>
        </div>
      </section>
    )
  }
  