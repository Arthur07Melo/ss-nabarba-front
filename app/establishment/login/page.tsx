"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { loginAsEstablishment } from "@/http/establishment/ScheduleSystemApi"
import Image from "next/image"

import logo from '../../../public/nabarba-logo.svg'

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
})

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validar com Zod
    const result = loginSchema.safeParse({ email, password })

    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {}
      result.error.errors.forEach((error) => {
        if (error.path[0] === "email") fieldErrors.email = error.message
        if (error.path[0] === "password") fieldErrors.password = error.message
      })
      setErrors(fieldErrors)
      return
    }

    setIsLoading(true)

    try {
      const response = await loginAsEstablishment(email, password)

      const data = response.data;

      if (!response.status || response.status >= 400) {
        toast.error(data.message || "Erro ao fazer login")
        return
      }

      // Salvar accessToken nos cookies
      Cookies.set("establishmentAccessToken", data.accessToken, {
        expires: 7, // 7 dias
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })

      toast.success("Login realizado com sucesso!")
      router.push("/establishment/services")
    } catch (error) {
      toast.error("Erro ao conectar com o servidor")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Image src={logo} alt="nabarba!" width={180} className="text-yellow-500 bg-slate-800 rounded-4xl" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Login do Estabelecimento</h2>
          <p className="text-slate-600 text-sm">Entre com suas credenciais para acessar o painel</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Senha */}
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Botão de Submit */}
            <Button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 h-auto text-base rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          {/* Link de recuperação de senha
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
              Esqueceu sua senha?
            </a>
          </div> */}
        </div>

        {/* Rodapé */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Deseja se cadastrar?{" "}
          <a href="#" className="text-slate-900 font-semibold hover:underline">
            Cadastre-se!
          </a>
        </p>
      </div>
    </div>
  )
}
