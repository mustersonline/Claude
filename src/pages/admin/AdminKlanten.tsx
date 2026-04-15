import React, { useState } from 'react'
import { Plus, Users, Clock, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { clients, consultants, projects, invoices } from '@/mockData'
import { toast } from 'sonner'

function ClientCard({ client }: { client: typeof clients[0] }) {
  const clientProjects = projects.filter(p => p.clientId === client.id)
  const clientInvoices = invoices.filter(i => i.clientId === client.id)
  const totalHours = clientProjects.reduce((s, p) => s + p.spentHours, 0)
  const activeConsultants = [...new Set(clientProjects.flatMap(p => p.consultants))]
    .map(id => consultants.find(c => c.id === id))
    .filter(Boolean)

  return (
    <Card className="overflow-hidden">
      <div className="h-2" style={{ backgroundColor: client.primaryColor }} />
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Logo placeholder */}
          <div
            className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ backgroundColor: client.primaryColor }}
          >
            {client.logo}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{client.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{client.contactPerson} · {client.email}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{clientProjects.length}</p>
            <p className="text-xs text-gray-500">Projecten</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{totalHours}</p>
            <p className="text-xs text-gray-500">Uren</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{clientInvoices.filter(i => i.status === 'open' || i.status === 'te_laat').length}</p>
            <p className="text-xs text-gray-500">Open fact.</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            {activeConsultants.slice(0, 3).map(c => (
              <div
                key={c!.id}
                className="h-7 w-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: c!.color }}
                title={c!.name}
              >
                {c!.avatar}
              </div>
            ))}
          </div>
          <Button size="sm" variant="outline">Bekijk klant</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function AdminKlanten() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Klanten</h1>
          <p className="text-gray-500 text-sm mt-0.5">{clients.length} klanten actief</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nieuwe klant
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {clients.map(c => <ClientCard key={c.id} client={c} />)}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nieuwe klant aanmaken</DialogTitle>
            <DialogDescription>Vul de gegevens in om een nieuwe klant aan te maken.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Bedrijfsnaam</label>
              <Input placeholder="Bijv. Acme B.V." />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Contactpersoon</label>
              <Input placeholder="Volledige naam" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">E-mailadres</label>
              <Input type="email" placeholder="contact@bedrijf.nl" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Primaire kleur</label>
                <Input type="color" className="h-9 px-1 py-1 cursor-pointer" defaultValue="#2563EB" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Secundaire kleur</label>
                <Input type="color" className="h-9 px-1 py-1 cursor-pointer" defaultValue="#3B82F6" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                className="flex-1"
                onClick={() => { toast.success('Klant aangemaakt!'); setOpen(false) }}
              >
                Aanmaken
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)}>Annuleren</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
