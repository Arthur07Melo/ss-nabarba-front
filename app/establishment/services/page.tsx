"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Trash2, Plus, Clock, DollarSign } from "lucide-react"
import { toast } from "sonner"
import { ServiceFormModal } from "@/components/barber/service-form-modal"
import { ServicesGridSkeleton } from "@/components/barber/services-grid-skeleton"
import Cookies from "js-cookie"
import { deleteServicesAsEstablishment, getServicesAsEstablishment } from "@/http/establishment/ScheduleSystemApi"

interface Service {
  id: string
  name: string
  duration: number
  price: number
  description?: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)
  const [editingService, setEditingService] = useState<Service | null>(null)


  const fetchServicesAndSetStates = async () => {
    const establishmentAccessToken = Cookies.get('establishmentAccessToken');
    if (!establishmentAccessToken) {
      console.error("No establishment access token found");
      //TODO: IMPLEMENTAR PAGINA DE LOGIN E REDIRECIONAR
      return;
    }

    try {
      const response = await getServicesAsEstablishment(establishmentAccessToken);
  
      const formattedServices = response.data.map((service: any) => ({
        id: service.id,
        name: service.name,
        duration: service.duration,
        price: service.price,
        description: service.description,
      }));

      setServices(formattedServices);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchServicesAndSetStates();
  }, [])

  const handleAddService = (newService: Omit<Service, "id">) => {
    if (editingService) {
      setServices(services.map((s) => (s.id === editingService.id ? { ...newService, id: s.id } : s)))
      toast.success("Serviço atualizado com sucesso!")
      setEditingService(null)
    } else {
      const serviceWithId = {
        ...newService,
        id: Date.now().toString(),
      }
      setServices([...services, serviceWithId])
      toast.success("Serviço criado com sucesso!")
    }
    setIsFormOpen(false)
  }

  // const handleEditService = (service: Service) => {
  //   setEditingService(service)
  //   setIsFormOpen(true)
  // }

  const handleDeleteService = async () => {
    if (serviceToDelete) {
      await deleteServicesAsEstablishment([serviceToDelete], Cookies.get('establishmentAccessToken') || '')
      await fetchServicesAndSetStates();
      toast.success("Serviço deletado com sucesso!")
      setServiceToDelete(null)
    }
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingService(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Serviços</h1>
            <p className="text-gray-600 mt-2">Crie, visualize e delete os serviços do seu estabelecimento</p>
          </div>
          <Button
            onClick={() => {
              setEditingService(null)
              setIsFormOpen(true)
            }}
            className="bg-amber-500 hover:bg-amber-600 text-white gap-2"
          >
            <Plus size={20} />
            Novo Serviço
          </Button>
        </div>

        {isLoading ? (
          <ServicesGridSkeleton />
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  {service.description && <CardDescription>{service.description}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>{service.duration} min</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign size={16} />
                        <span>R$ {service.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        disabled
                      >
                        Editar (em desenvolvimento...)
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => setServiceToDelete(service.id)}>
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-600 mb-4">Nenhum serviço criado ainda</p>
              <Button onClick={() => setIsFormOpen(true)} className="bg-amber-500 hover:bg-amber-600 text-white">
                Criar Primeiro Serviço
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      <ServiceFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleAddService}
        initialService={editingService || undefined}
      />

      <AlertDialog open={serviceToDelete !== null} onOpenChange={(open) => !open && setServiceToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Serviço</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este serviço? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteService}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
