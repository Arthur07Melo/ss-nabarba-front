"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, DollarSign, User, Calendar, X } from "lucide-react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { appointmentData } from "@/app/appointments/page"

interface BookingCardProps {
  appointment: appointmentData
  onCancel: (bookingId: string) => void
}

export function BookingCard({ appointment, onCancel }: BookingCardProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const handleConfirmCancel = () => {
    onCancel(appointment.id)
    setIsAlertOpen(false)
    toast.success("Agendamento cancelado com sucesso!")
  }

  return (
    <>
      <Card className="p-6 bg-white border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">{appointment.service.name}</h3>

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-900" />
                <span>{appointment.employee.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-900" />
                <span>{appointment.service.durationInMinutes} min</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-900" />
                <span>{formatDate(appointment.appointmentDate)}</span>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-900" />
                <span>R$ {appointment.service.price.toFixed(2)}</span>
              </div>
            </div>

          </div>

          <div className="flex items-center gap-4 sm:flex-col">
            <p className="text-xl font-bold text-slate-900">{appointment.appointmentTime}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700 hover:bg-red-200 bg-red-50"
              onClick={() => setIsAlertOpen(true)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar agendamento?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar o agendamento de {appointment.service.name} com {appointment.employee.name} em{" "}
              {formatDate(appointment.appointmentDate)} às {appointment.appointmentTime}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel className="hover:bg-gray-100">Voltar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmCancel} className="bg-red-700 hover:bg-red-800">
            Cancelar Agendamento
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
