"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import logo from '../../public/nabarba-logo.svg'
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { useState } from "react"
import { set } from "zod"
import { UserInfoModal } from "../barber/user-info-modal"


export function Header() {
  const router = useRouter();

  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);

  const handleMyAppointmentsButtonClick = () => {
    const phone = Cookies.get("userPhone")
    const name = Cookies.get("userName")

    if (!phone || !name) {
      setIsUserInfoModalOpen(true)
      return
    }

    goToMyAppointments();
  }

  const goToMyAppointments = () => {
    router.push("/appointments");
  }

  return (
    <>
    <header className="bg-slate-900 text-white px-4">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="nabarba!" width={180} className="text-yellow-500" />
        </div>
        <Button className="bg-yellow-500 hover:bg-yellow-600 hover:cursor-pointer text-slate-900 font-semibold px-4 py-2 h-auto text-sm rounded-lg"
          onClick={handleMyAppointmentsButtonClick}>
          Meus Agendamentos
        </Button>
      </div>
    </header>

    <UserInfoModal isOpen={isUserInfoModalOpen} onOpenChange={setIsUserInfoModalOpen} handleSubmit={goToMyAppointments} />
    </>
  )
}
