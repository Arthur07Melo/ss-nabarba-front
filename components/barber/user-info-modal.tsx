"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Cookies from "js-cookie"

interface UserInfoModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  handleSubmit: () => void
}

type ModalStep = "phone" | "name"

export function UserInfoModal({ isOpen, onOpenChange, handleSubmit }: UserInfoModalProps) {
  const [step, setStep] = useState<ModalStep>("phone")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")

  if (!isOpen) return null

  const handlePhoneSubmit = () => {
    if (phone.trim()) {
      setPhone(phone.trim())
      Cookies.set("userPhone", phone.trim().replace(/\D/g, ""))
      setStep("name")
    }
  }

  const handleNameSubmit = () => {
    if (name.trim()) {
      Cookies.set("userName", name.trim())
      handleSubmit()
      handleClose()
    }
  }

  const handleCancel = () => {
    if (step === "name") {
      setStep("phone")
    } else {
      handleClose()
    }
  }

  const handleClose = () => {
      onOpenChange(false)
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-slate-900">{step === "phone" ? "Seu Telefone" : "Seu Nome"}</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 transition">
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "phone" ? (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">Por favor, digite seu telefone para continuar com o agendamento.</p>
              <input
                type="tel"
                placeholder="(xx) xxxxx-xxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">Por favor, digite seu nome para continuar com o agendamento.</p>
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium cursor-pointer"
          >
            {step === "phone" ? "Cancelar" : "Voltar"}
          </button>
          <Button
            onClick={step === "phone" ? handlePhoneSubmit : handleNameSubmit}
            disabled={step === "phone" ? !phone.trim() : !name.trim()}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium cursor-pointer"
          >
            {step === "phone" ? "Próximo" : "Confirmar"}
          </Button>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-2 px-6 pb-4 justify-center">
          <div className={`h-1 flex-1 rounded-full transition-all duration-700 ease-in-out ${step === "phone" ? "bg-slate-800" : "bg-gray-300"}`} />
          <div className={`h-1 flex-1 rounded-full transition-all duration-700 ease-in-out ${step === "name" ? "bg-slate-800" : "bg-gray-300"}`} />
        </div>
      </div>
    </div>
  )
}
