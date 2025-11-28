export function ServicesListSkeleton() {
    return (
      <section className="px-4 max-w-2xl mx-auto">
        <div className="h-8 w-32 bg-gray-300 rounded animate-pulse mb-6" />
        <div className="space-y-1">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-300 rounded w-1/3 animate-pulse" />
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-1/5 animate-pulse" />
                  </div>
                </div>
                <div className="h-10 w-24 bg-gray-300 rounded-lg flex-shrink-0 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
  