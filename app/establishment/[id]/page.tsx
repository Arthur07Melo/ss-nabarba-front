"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/ui/header"
import { BarberInfo } from "@/components/barber/barber-info"
import { ServicesList } from "@/components/barber/services-list"
import { HeaderSkeleton } from "@/components/ui/header-skeleton"
import { BarberInfoSkeleton } from "@/components/barber/barber-info-skeleton"
import { ServicesListSkeleton } from "@/components/barber/services-list-skeleton"
import { getEstablishment, getEstablishmentServices } from "@/http/establishment/EstablishmentApi"
import { useParams } from "next/navigation"

export type establishmentData = {
  id: string,
  name: string,
  description: string,
  imageUrl: string,
}

export type serviceData = {
  id: string
  name: string
  duration: string
  price: string
}

type params = {
  id: string
}

export default function Home() {
  const [isLoadingEstablishment, setIsLoadingEstablishment] = useState(true)
  const [isLoadingServices, setIsLoadingServices] = useState(true)

  const [establishmentData, setEstablishmentData] = useState<establishmentData>()
  const [servicesData, setServicesData] = useState<serviceData[]>()

  const params = useParams<params>()

  useEffect(() => {
    getEstablishment(params.id)
      .then(response => {
        const data = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          imageUrl: response.data.imageUrl,
        }
        setEstablishmentData(data)
        setIsLoadingEstablishment(false)
      })
  
    getEstablishmentServices(params.id)
      .then(response => {
        const formattedServices = response.data.map((service: any) => ({
          id: service.id,
          name: service.name,
          duration: `${service.durationInMinutes}min`,
          price: service.price.toFixed(2),
        }))

        setServicesData(formattedServices)
        setIsLoadingServices(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-8">
        {isLoadingEstablishment ? <BarberInfoSkeleton /> : <BarberInfo establishmentData={establishmentData!} />}
        {isLoadingServices ? <ServicesListSkeleton /> : <ServicesList services={servicesData!} />}
      </main>
    </div>
  )
}
