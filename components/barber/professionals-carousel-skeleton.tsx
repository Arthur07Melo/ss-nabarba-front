"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

export function ProfessionalsCarouselSkeleton() {
  return (
    <div className="relative w-full">
      <button
        disabled
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md opacity-50 cursor-not-allowed"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-12">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col items-center gap-3 pb-4">
            <div className="w-24 h-24 rounded-lg bg-gray-200 animate-pulse border-2 border-gray-200" />
            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>

      <button
        disabled
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md opacity-50 cursor-not-allowed"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
