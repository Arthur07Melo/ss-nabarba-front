export function HeaderSkeleton() {
  return (
    <header className="bg-slate-900 text-white py-4 px-4">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-slate-700 rounded-lg animate-pulse" />
          <div className="h-6 w-24 bg-slate-700 rounded animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-yellow-500 rounded-lg animate-pulse" />
      </div>
    </header>
  )
}
