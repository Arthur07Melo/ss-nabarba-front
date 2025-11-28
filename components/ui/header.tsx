"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import logo from '../../public/nabarba-logo.svg'


export function Header() {
  return (
    <header className="bg-slate-900 text-white px-4">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="nabarba!" width={180} className="text-yellow-500" />
        </div>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-4 py-2 h-auto text-sm rounded-lg">
          Meus Agendamentos
        </Button>
      </div>
    </header>
  )
}
