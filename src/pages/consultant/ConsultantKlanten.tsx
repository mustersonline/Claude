import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { clients, projects } from '@/mockData'

export function ConsultantKlanten() {
  const myClients = clients

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mijn Klanten</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {myClients.map(c => {
          const cProjects = projects.filter(p => p.clientId === c.id && p.status === 'actief')
          return (
            <Card key={c.id} className="overflow-hidden">
              <div className="h-1.5" style={{ backgroundColor: c.primaryColor }} />
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="h-10 w-10 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: c.primaryColor }}
                  >
                    {c.logo}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.contactPerson}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {cProjects.map(p => (
                    <div key={p.id} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 truncate pr-2">{p.name}</span>
                      <span className="shrink-0 font-medium text-gray-800">{p.spentHours}/{p.budgetHours}u</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
