"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/barber/header"
import { BarberInfo } from "@/components/barber/barber-info"
import { ServicesList } from "@/components/barber/services-list"
import { HeaderSkeleton } from "@/components/barber/header-skeleton"
import { BarberInfoSkeleton } from "@/components/barber/barber-info-skeleton"
import { ServicesListSkeleton } from "@/components/barber/services-list-skeleton"

export default function Home() {
  const [isLoadingEstablishment, setIsLoadingEstablishment] = useState(true)
  const [isLoadingServices, setIsLoadingServices] = useState(true)

  useEffect(() => {
    // Simulating API calls - replace with actual fetch calls
    const establishmentTimer = setTimeout(() => setIsLoadingEstablishment(false), 1000)
    const servicesTimer = setTimeout(() => setIsLoadingServices(false), 1500)

    return () => {
      clearTimeout(establishmentTimer)
      clearTimeout(servicesTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoadingEstablishment ? <HeaderSkeleton /> : <Header />}
      <main className="pb-8">
        {isLoadingEstablishment ? <BarberInfoSkeleton /> : <BarberInfo />}
        {isLoadingServices ? <ServicesListSkeleton /> : <ServicesList />}
      </main>
    </div>
  )
}
