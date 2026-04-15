import React from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { supportTickets } from '@/mockData'
import { toast } from 'sonner'
import type { Client } from '@/App'

const statusVariant: Record<string, 'info' | 'warning' | 'default'> = {
  open: 'info',
  in_behandeling: 'warning',
  gesloten: 'default',
}
const statusLabel: Record<string, string> = {
  open: 'Open',
  in_behandeling: 'In behandeling',
  gesloten: 'Gesloten',
}

export function ClientSupport({ client }: { client: Client }) {
  const myTickets = supportTickets.filter(t => t.clientId === client.id)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Support</h1>

      <Card>
        <CardHeader><CardTitle>Nieuw ticket aanmaken</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Onderwerp</label>
            <Input placeholder="Korte omschrijving van uw vraag" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Bericht</label>
            <Textarea placeholder="Beschrijf uw vraag of probleem zo duidelijk mogelijk..." rows={4} />
          </div>
          <Button
            onClick={() => toast.success('Ticket aangemaakt!', { description: 'We reageren binnen 1 werkdag.' })}
            style={{ backgroundColor: client.primaryColor }}
            className="gap-2 text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Ticket versturen
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Mijn tickets</CardTitle></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium">Ticket</th>
                <th className="text-left px-5 py-3 font-medium">Onderwerp</th>
                <th className="text-left px-5 py-3 font-medium">Aangemaakt</th>
                <th className="text-left px-5 py-3 font-medium">Bijgewerkt</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {myTickets.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-500">#{t.id}</td>
                  <td className="px-5 py-3.5 font-medium text-gray-800">{t.subject}</td>
                  <td className="px-5 py-3.5 text-gray-500">{t.date}</td>
                  <td className="px-5 py-3.5 text-gray-500">{t.lastUpdate}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={statusVariant[t.status]}>{statusLabel[t.status]}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
