"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/ui/header"
import { BookingCard } from "@/components/barber/booking-card"
import { BookingsListSkeleton } from "@/components/barber/booking-list-skeleton"
import { AlertCircle } from "lucide-react"
import { deleteAppointment, getAppointments } from "@/http/establishment/ScheduleSystemApi"

export type appointmentData = {
  id: string,
  service: {
    id: string
    name: string
    durationInMinutes: number
    price: number
  },
  employee: {
    id: string 
    name: string
    imageUrl: string
  },
  appointmentDate: string
  appointmentTime: string
};


export default function MeusAgendamentosPage() {
  const [appointments, setAppointments] = useState<appointmentData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const handleCancel = (bookingId: string) => {
    deleteAppointment(bookingId, "11999999999").then(() => {
        setIsLoading(true)
        fetchAndUpdateAppointments()
    })
  }

  const fetchAndUpdateAppointments = async () => {
    const appointments = await getAppointments("11999999999")
    
    const appointmentData: appointmentData[] = appointments.data.data;

    const formattedAppointments = appointmentData.map(appointment => ({
        id: appointment.id,
        service: appointment.service,
        employee: appointment.employee,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime
    }))

    setAppointments(formattedAppointments)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAndUpdateAppointments()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Meus Agendamentos</h1>

        {isLoading ? (
          <BookingsListSkeleton />
        ) : appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <BookingCard key={appointment.id} appointment={appointment} onCancel={handleCancel} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">Você ainda não tem agendamentos</p>
            {/* <Link href="/">
              <Button className="bg-slate-900 hover:bg-slate-800">Agendar Agora</Button>
            </Link> */}
          </div>
        )}
      </main>
    </div>
  )
}
