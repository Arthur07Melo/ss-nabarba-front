"use client"

import { Header } from "@/components/ui/header"
import { BarberInfo } from "@/components/barber/barber-info"
import { ProfessionalsCarousel } from "@/components/barber/professionals-carousel"
import { DatesCarousel } from "@/components/barber/dates-carousel"
import { TimesGrid } from "@/components/barber/times-grid"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { establishmentData, serviceData } from "@/app/establishment/[id]/page"
import { BarberInfoSkeleton } from "@/components/barber/barber-info-skeleton"
import { getAvailableTimes, getServiceDetails } from "@/http/establishment/EstablishmentApi"
import { useParams } from "next/navigation"
import { ProfessionalsCarouselSkeleton } from "@/components/barber/professionals-carousel-skeleton"
import { BookingConfirmationModal } from "@/components/barber/booking-confirmation-modal"

type params = {
  id: string
}

export type employeeData = {
  id: string
  name: string
  imageUrl: string
}

export default function BookingPage() {
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const [establishmentData, setEstablishmentData] = useState<establishmentData>()
  const [isLoadingEstablishment, setIsLoadingEstablishment] = useState(true)

  const [employeesData, setEmployeesData] = useState<employeeData[]>()
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true)

  const [serviceData, setServiceData] = useState<serviceData>()

  const [availableTimes, setAvailableTimes] = useState<string[] | null>(null)
  const [isLoadingAvailableTimes, setIsLoadingAvailableTimes] = useState(false)
  
  const [selectedProfessionalData, setSelectedProfessionalData] = useState<employeeData | null>(null)

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

  const params = useParams<params>()

  const updateEstablishmentData = (data: establishmentData) => {
    setEstablishmentData(data)
    setIsLoadingEstablishment(false)
  }

  const updateEmployeesData = (data: employeeData[]) => {
    setEmployeesData(data)
    setIsLoadingEmployees(false)
  }

  const updateAvailableTimes = (data: string[]) => {
    setAvailableTimes(data)
    setIsLoadingAvailableTimes(false)
  }

  const getAndUpdateAvailableTimes = (professionalId: string, date: string) => {
    setIsLoadingAvailableTimes(true)

    getAvailableTimes(professionalId, date)
      .then(response => {
        const timesResponse = response.data.availableTimes;
        updateAvailableTimes(timesResponse)
      })
  }

  const updateSelectedProfessionalData = (employee: employeeData) => {
    const professional = employeesData?.find(emp => emp.id === employee.id) || null
    setSelectedProfessional(employee.id)
    setSelectedProfessionalData(professional)
  }

  useEffect(() => {
    getServiceDetails(params.id)
      .then(response => {
        const serviceResponse = response.data.service;
        const establishmentResponse = response.data.establishment;

        const employeesResponse = serviceResponse.employees;

        const formattedEstablishment = {
          id: establishmentResponse.id,
          name: establishmentResponse.name,
          description: establishmentResponse.description,
          imageUrl: establishmentResponse.imageUrl
        }

        const formattedService = {
          id: serviceResponse.id,
          name: serviceResponse.name,
          duration: `${serviceResponse.durationInMinutes}min`,
          price: serviceResponse.price.toFixed(2),
        }

        const formattedEmployees = employeesResponse.map((employee: any) => ({
          id: employee.id,
          name: employee.name,
          imageUrl: employee.imageUrl,
        }))

        updateEmployeesData(formattedEmployees)
        updateEstablishmentData(formattedEstablishment)
        setServiceData(formattedService)
        setSelectedProfessional(formattedEmployees[0]?.id || null)
        setSelectedProfessionalData(formattedEmployees[0] || null)
      })
  }, [])

  useEffect(() => {
    if (selectedProfessional && selectedDate) {
      getAndUpdateAvailableTimes(selectedProfessional, selectedDate)
    }
  }, [selectedProfessional, selectedDate])


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
      {isLoadingEstablishment ? <BarberInfoSkeleton /> : <BarberInfo establishmentData={establishmentData!} />}

        {isLoadingEstablishment ? null :
          <div className="mt-8 mb-8">
          <p className="text-center text-lg font-semibold">
            Serviço Selecionado: <span className="text-yellow-600">{serviceData?.name}</span>
          </p>
        </div>
        }

        {isLoadingEmployees ? <ProfessionalsCarouselSkeleton /> : 
        <section className="mb-12">
          <h2 className="text-center font-semibold text-gray-900 mb-6">Selecione o profissional:</h2>
          <ProfessionalsCarousel
            professionals={employeesData!}
            selected={selectedProfessional}
            onSelect={updateSelectedProfessionalData}
          />
        </section>}

        <section className="mb-12">
          <DatesCarousel selected={selectedDate} onSelect={setSelectedDate} />
        </section>

        {selectedProfessional && selectedDate &&
          <section className="mb-12">
            <TimesGrid 
              times={availableTimes ?? []}
              selected={selectedTime}
              onSelect={setSelectedTime}
              isLoading={isLoadingAvailableTimes}
            />
          </section>
        }

        <div className="flex gap-4 mt-12">
          <Button variant="outline" className="flex-1 bg-transparent p-8">
            Cancelar
          </Button>
          <Button 
            className="flex-1 bg-slate-900 hover:bg-slate-700 p-8"
            onClick={() => setIsConfirmationModalOpen(true)}
            disabled={!selectedProfessional || !selectedDate || !selectedTime}
          >
            Confirmar Agendamento
          </Button>
        </div>
      </main>

      {selectedProfessionalData && (
        <BookingConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          establishment={establishmentData!}
          professional={selectedProfessionalData}
          service={serviceData!}
          date={selectedDate || ""}
          time={selectedTime || ""}
        />
      )}
    </div>
  )
}
