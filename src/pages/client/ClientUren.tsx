import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { timeEntries, projects, consultants } from '@/mockData'
import type { Client } from '@/App'

export function ClientUren({ client }: { client: Client }) {
  const clientProjects = projects.filter(p => p.clientId === client.id)
  const clientEntries = timeEntries.filter(te =>
    clientProjects.some(p => p.id === te.projectId)
  )

  const consultantName = (id: string) => consultants.find(c => c.id === id)?.name ?? id
  const projectName = (id: string) => projects.find(p => p.id === id)?.name ?? id

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Uren</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clientProjects.map(p => {
          const pct = Math.min(Math.round((p.spentHours / p.budgetHours) * 100), 100)
          const color = pct > 100 ? '#DC2626' : pct >= 80 ? '#D97706' : client.primaryColor
          return (
            <Card key={p.id}>
              <CardContent className="p-5">
                <p className="font-semibold text-gray-900 mb-1">{p.name}</p>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Budget</span>
                  <span>{p.spentHours} / {p.budgetHours}u ({pct}%)</span>
                </div>
                <Progress value={pct} indicatorColor={color} />
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader><CardTitle>Urenlog</CardTitle></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium">Datum</th>
                <th className="text-left px-5 py-3 font-medium">Project</th>
                <th className="text-left px-5 py-3 font-medium">Consultant</th>
                <th className="text-left px-5 py-3 font-medium">Omschrijving</th>
                <th className="text-right px-5 py-3 font-medium">Uren</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clientEntries.map(e => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-600">{e.date}</td>
                  <td className="px-5 py-3 font-medium text-gray-800 max-w-[140px] truncate">{projectName(e.projectId)}</td>
                  <td className="px-5 py-3 text-gray-600">{consultantName(e.consultantId)}</td>
                  <td className="px-5 py-3 text-gray-600 max-w-[200px] truncate">{e.description}</td>
                  <td className="px-5 py-3 text-right font-semibold">{e.hours}u</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
