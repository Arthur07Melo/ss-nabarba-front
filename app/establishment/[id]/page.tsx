"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/ui/header"
import { BarberInfo } from "@/components/barber/barber-info"
import { ServicesList } from "@/components/barber/services-list"
import { BarberInfoSkeleton } from "@/components/barber/barber-info-skeleton"
import { ServicesListSkeleton } from "@/components/barber/services-list-skeleton"
import { getEstablishmentServices } from "@/http/establishment/ScheduleSystemApi"
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

export default function EstablishmentPage() {
  const [isLoadingEstablishment, setIsLoadingEstablishment] = useState(true)
  const [isLoadingServices, setIsLoadingServices] = useState(true)

  const [establishmentData, setEstablishmentData] = useState<establishmentData>()
  const [servicesData, setServicesData] = useState<serviceData[]>()

  const params = useParams<params>()

  const updateEstablishmentData = (data: establishmentData) => {
    setEstablishmentData(data)
    setIsLoadingEstablishment(false)
  }

  const updateServicesData = (data: serviceData[]) => {
    setServicesData(data)
    setIsLoadingServices(false)
  }


  useEffect(() => {
    if (!params?.id) return

    getEstablishmentServices(params.id)
      .then((response) => {
        const servicesResponse = response.data.services;
        const establishmentResponse = response.data.establishment;

        const formattedEstablishment = {
          id: establishmentResponse.id,
          name: establishmentResponse.name,
          description: establishmentResponse.description,
          imageUrl: establishmentResponse.imageUrl
        }

        const formattedServices = servicesResponse.map((service: any) => ({
          id: service.id,
          name: service.name,
          duration: `${service.durationInMinutes}min`,
          price: Number(service.price).toFixed(2),
        }))

        updateEstablishmentData(formattedEstablishment)
        updateServicesData(formattedServices)
      })
      .catch((error) => {
        console.error("Failed to fetch establishment data:", error)
        setIsLoadingEstablishment(false)
        setIsLoadingServices(false)
      })
  }, [params.id])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-8">
        {isLoadingEstablishment ? <BarberInfoSkeleton /> : (establishmentData && <BarberInfo establishmentData={establishmentData} />)}
        {isLoadingServices ? <ServicesListSkeleton /> : (servicesData && <ServicesList services={servicesData} />)}
      </main>
    </div>
  )
}
