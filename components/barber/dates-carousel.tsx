"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useEffect } from "react"

interface DatesCarouselProps {
  selected: string | null
  onSelect: (date: string) => void
}

export function DatesCarousel({ selected, onSelect }: DatesCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const generateDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)

      const dayName = date.toLocaleDateString("pt-BR", { weekday: "short" }).substring(0, 3)
      const dayNum = String(date.getDate()).padStart(2, "0")
      const month = String(date.getMonth() + 1).padStart(2, "0")

      dates.push({
        key: date.toISOString().split("T")[0],
        display: `${dayName}`,
        date: `${dayNum}/${month}`,
      })
    }

    return dates
  }

  const dates = generateDates()

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative w-full">
      <div className="text-center mb-6">
        <p className="text-gray-600 font-medium">2025</p>
      </div>

      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollBehavior: "smooth" }}
      >
        {dates.map((dateItem) => (
          <button
            key={dateItem.key}
            onClick={() => onSelect(dateItem.key)}
            className={`shrink-0 flex flex-col hover:cursor-pointer items-center gap-1 p-3 rounded-lg border-2 transition-all w-20 ${
              selected === dateItem.key
                ? "bg-slate-800 border-slate-800 text-white"
                : "bg-gray-100 border-gray-300 text-gray-800 hover:border-gray-400"
            }`}
          >
            <span className="text-xs font-semibold">{dateItem.display}</span>
            <span className="text-xs font-medium">{dateItem.date}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
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
