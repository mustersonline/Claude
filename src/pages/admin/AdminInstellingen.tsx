import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export function AdminInstellingen() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Instellingen</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Bedrijfsgegevens</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Bedrijfsnaam</label>
              <Input defaultValue="DGTLbase" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">E-mail</label>
              <Input defaultValue="info@dgtlbase.nl" type="email" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">KVK nummer</label>
              <Input defaultValue="87654321" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">BTW nummer</label>
              <Input defaultValue="NL004123456B01" />
            </div>
            <Button onClick={() => toast.success('Instellingen opgeslagen')}>Opslaan</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Factuurinstellingen</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Betalingstermijn (dagen)</label>
              <Input type="number" defaultValue="30" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">BTW percentage</label>
              <Input type="number" defaultValue="21" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Factuurnummer prefix</label>
              <Input defaultValue="INV-2024-" />
            </div>
            <Button onClick={() => toast.success('Instellingen opgeslagen')}>Opslaan</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
