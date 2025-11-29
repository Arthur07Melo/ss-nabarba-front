"use client"

import { serviceData } from "@/app/establishment/[id]/page"
import { Button } from "@/components/ui/button"
import { Clock, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"


export function ServicesList({ services }: { services: serviceData[] }) {
  const router = useRouter()

  const handleSchedule = (serviceId: string) => {
    router.push(`/service/${serviceId}`)
  }

  return (
    <section className="px-4 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Serviços</h3>
      <div className="space-y-1">
        {services.map((service) => (
          <div key={service.id} className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-base">{service.name}</h4>
                <div className="flex flex-col gap-2 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{service.price.replace(".", ",")}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleSchedule(service.id)}
                className="bg-slate-800 hover:bg-slate-700 text-yellow-500 hover:cursor-pointer font-semibold px-6 py-2 h-auto text-sm rounded-lg shrink-0"
              >
                Agendar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
