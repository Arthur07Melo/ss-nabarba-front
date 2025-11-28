'use client'

import { establishmentData } from "@/app/establishment/[id]/page"
import Image from "next/image"

export function BarberInfo({ establishmentData }: { establishmentData: establishmentData }) {
  return (
    <section className="px-4 py-6 max-w-2xl mx-auto">
      <div className="flex gap-4 items-start">
        {/* <div className="w-24 h-24 bg-black rounded-full flex-shrink-0 flex items-center justify-center"> */}
          <Image src={establishmentData.imageUrl} alt="establishment image" width={130} height={130} 
            className="rounded-full flex items-center justify-center"/>
        {/* </div> */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900">{establishmentData.name}</h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {establishmentData.description}
          </p>
        </div>
      </div>
    </section>
  )
}
