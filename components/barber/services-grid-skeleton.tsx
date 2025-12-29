export function ServicesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />

          <div className="space-y-4">
            <div className="flex gap-6">
              <div className="h-4 bg-gray-200 rounded w-20" />
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>

            <div className="flex gap-2">
              <div className="h-9 bg-gray-200 rounded flex-1" />
              <div className="h-9 bg-gray-200 rounded w-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
