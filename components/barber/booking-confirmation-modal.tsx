"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface BookingConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  establishment: {
    name: string
  }
  professional: {
    name: string
  }
  service: {
    name: string
    duration: string
    price: string
  }
  date: string
  time: string
}

export function BookingConfirmationModal({
  isOpen,
  onClose,
  establishment,
  professional,
  service,
  date,
  time,
}: BookingConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Confirmação de Agendamento</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            {/* Establishment */}
            <div className="flex justify-between items-start">
              <span className="text-gray-600 font-medium">Estabelecimento:</span>
              <span className="text-gray-900 font-semibold text-right">{establishment.name}</span>
            </div>

            {/* Professional */}
            <div className="flex justify-between items-start">
              <span className="text-gray-600 font-medium">Profissional:</span>
              <span className="text-gray-900 font-semibold text-right">{professional.name}</span>
            </div>

            {/* Service */}
            <div className="flex justify-between items-start">
              <span className="text-gray-600 font-medium">Serviço:</span>
              <div className="text-right">
                <p className="text-gray-900 font-semibold">{service.name}</p>
                <p className="text-sm text-gray-500">{service.duration}</p>
              </div>
            </div>

            {/* Price */}
            <div className="flex justify-between items-start pt-3 border-t border-gray-200">
              <span className="text-gray-600 font-medium">Preço:</span>
              <span className="text-gray-900 font-semibold">R$ {service.price}</span>
            </div>

            {/* Date and Time */}
            <div className="flex justify-between items-start pt-3 border-t border-gray-200">
              <span className="text-gray-600 font-medium">Data e Hora:</span>
              <div className="text-right">
                <p className="text-gray-900 font-semibold">{date.split("-").reverse().join("/")}</p>
                <p className="text-gray-900 font-semibold">{time}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white">Confirmar</Button>
        </div>
      </div>
    </div>
  )
}
