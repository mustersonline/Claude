import React from 'react'
import { Mail, Phone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { consultants, projects } from '@/mockData'
import type { Client } from '@/App'

export function ClientTeam({ client }: { client: Client }) {
  const clientProjects = projects.filter(p => p.clientId === client.id)
  const consultantIds = [...new Set(clientProjects.flatMap(p => p.consultants))]
  const myConsultants = consultants.filter(c => consultantIds.includes(c.id))

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Ons team</h1>
      <p className="text-gray-500 text-sm">Uw vaste contactpersonen bij DGTLbase</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {myConsultants.map(c => (
          <Card key={c.id}>
            <CardContent className="p-6 text-center">
              <div
                className="h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4"
                style={{ backgroundColor: c.color }}
              >
                {c.avatar}
              </div>
              <h3 className="font-semibold text-gray-900">{c.name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{c.role}</p>
              <div className="mt-4 space-y-2">
                <a href="#" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                  <Mail className="h-4 w-4" />
                  {c.name.split(' ')[0].toLowerCase()}@dgtlbase.nl
                </a>
                <a href="#" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                  <Phone className="h-4 w-4" />
                  +31 20 123 45 67
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
