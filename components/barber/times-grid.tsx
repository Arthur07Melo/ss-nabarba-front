"use client"

interface TimesGridProps {
  times: string[]
  selected: string | null
  onSelect: (time: string) => void
  isLoading: boolean
}

export function TimesGrid({ times, selected, onSelect, isLoading }: TimesGridProps) {

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-slate-900 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Carregando horários disponíveis...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="w-full">
      {/* <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5"> */}
      <div className="flex gap-2 flex-wrap items-center justify-center">
        {times !== null && times.map((time) => (
          <button
            key={time}
            onClick={() => onSelect(time)}
            className={`w-20 h-20 p-2 rounded-lg border-2 hover:cursor-pointer font-medium text-sm transition-all ${
              selected === time
                ? "bg-slate-700 border-slate-700 text-white"
                : "bg-gray-100 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  )
}
