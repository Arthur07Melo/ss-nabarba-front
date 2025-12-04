export function BookingsListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 space-y-3">
              {/* Service title skeleton */}
              <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3" />

              {/* Info grid skeleton */}
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
                  </div>
                ))}
              </div>

              {/* Establishment name skeleton */}
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3 pt-2" />
            </div>

            {/* Time and cancel button skeleton */}
            <div className="flex items-center gap-4 sm:flex-col">
              <div className="h-7 bg-gray-200 rounded animate-pulse w-16" />
              <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
