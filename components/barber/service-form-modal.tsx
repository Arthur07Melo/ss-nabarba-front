"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { z } from "zod"

interface Service {
  id: string
  name: string
  duration: number
  price: number
  description?: string
}

interface ServiceFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (service: Omit<Service, "id">) => void
  initialService?: Service
}

const serviceSchema = z.object({
  name: z.string().min(1, "Nome do serviço é obrigatório"),
  duration: z.number().min(5, "Duração deve ser no mínimo 5 minutos"),
  price: z.number().min(0.01, "Preço deve ser maior que 0"),
  description: z.string().optional(),
})

export function ServiceFormModal({ isOpen, onClose, onSubmit, initialService }: ServiceFormModalProps) {
  const [name, setName] = useState("")
  const [duration, setDuration] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (initialService) {
      setName(initialService.name)
      setDuration(initialService.duration.toString())
      setPrice(initialService.price.toString())
      setDescription(initialService.description || "")
    } else {
      setName("")
      setDuration("")
      setPrice("")
      setDescription("")
    }
    setErrors({})
  }, [initialService, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    try {
      const validated = serviceSchema.parse({
        name,
        duration: Number.parseInt(duration),
        price: Number.parseFloat(price),
        description: description || undefined,
      })

      onSubmit(validated)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          const path = err.path[0]?.toString() || "general"
          newErrors[path] = err.message
        })
        setErrors(newErrors)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{initialService ? "Editar Serviço" : "Novo Serviço"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Serviço</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Corte Clássico"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duração (min)</label>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="30"
                  min="5"
                  className={errors.duration ? "border-red-500" : ""}
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição (opcional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o serviço..."
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white">
                {initialService ? "Atualizar" : "Criar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
