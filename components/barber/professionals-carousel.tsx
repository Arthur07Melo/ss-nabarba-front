"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import Image from "next/image"
import { employeeData } from "@/app/service/[id]/page"


interface ProfessionalsCarouselProps {
  professionals: employeeData[]
  selected: string | null
  onSelect: (id: string) => void
}

export function ProfessionalsCarousel({ professionals, selected, onSelect }: ProfessionalsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const isCarouselMode = professionals.length > 5

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Grid mode - para 5 ou menos profissionais
  if (!isCarouselMode) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        {professionals.map((professional, index) => (
          <button
            key={professional.id}
            onClick={() => onSelect(professional.id)}
            className={`flex flex-col hover:cursor-pointer items-center gap-3 pb-4 transition-all ${
              selected === professional.id ? "opacity-100" : "opacity-70 hover:opacity-85"
            }`}
          >
            <div
              className={`w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                selected === professional.id ? "border-yellow-500" : "border-gray-300"
              }`}
            >
              <Image
                src={professional.imageUrl || "/placeholder.svg"}
                alt={professional.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-900">{professional.name}</span>
          </button>
        ))}
      </div>
    )
  }

  // Carousel mode - para mais de 5 profissionais
  return (
    <div className="relative w-full">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-12"
        style={{ scrollBehavior: "smooth" }}
      >
        {professionals.map((professional, index) => (
          <button
            key={professional.id}
            onClick={() => onSelect(professional.id)}
            className={`shrink-0 flex flex-col items-center gap-3 pb-4 transition-all ${
              selected === professional.id ? "opacity-100" : "opacity-70 hover:opacity-85"
            }`}
          >
            <div
              className={`w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                selected === professional.id ? "border-yellow-500" : "border-gray-300"
              }`}
            >
              <Image
                src={professional.imageUrl || "/placeholder.svg"}
                alt={professional.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-900">{professional.name}</span>
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
