import React, { useState } from 'react'
import { ChevronLeft, Clock, CheckCircle2, Circle, PlayCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { projects, tasks, timeEntries, consultants } from '@/mockData'
import type { Client } from '@/App'

const statusBadge: Record<string, { label: string; variant: 'success' | 'info' | 'warning' | 'default' }> = {
  actief: { label: 'Actief', variant: 'success' },
  afgerond: { label: 'Afgerond', variant: 'default' },
  concept: { label: 'Concept', variant: 'warning' },
}

const taskStatusIcon = { afgerond: CheckCircle2, actief: PlayCircle, openstaand: Circle }
const taskStatusColor = { afgerond: 'text-green-500', actief: 'text-blue-500', openstaand: 'text-gray-400' }

export function ClientProjecten({ client }: { client: Client }) {
  const [selected, setSelected] = useState<string | null>(null)
  const clientProjects = projects.filter(p => p.clientId === client.id)
  const selectedProject = clientProjects.find(p => p.id === selected)

  if (selectedProject) {
    const pTasks = tasks.filter(t => t.projectId === selectedProject.id)
    const pEntries = timeEntries.filter(t => t.projectId === selectedProject.id)
    const pct = Math.min(Math.round((selectedProject.spentHours / selectedProject.budgetHours) * 100), 100)

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h1>
            <p className="text-gray-500 text-sm">{selectedProject.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle>Urenbudget</CardTitle></CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Verbruikt</span>
                <span className="font-semibold">{selectedProject.spentHours} / {selectedProject.budgetHours}u ({pct}%)</span>
              </div>
              <Progress value={pct} indicatorColor={client.primaryColor} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Voortgang taken</CardTitle></CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Afgerond</span>
                <span className="font-semibold">{pTasks.filter(t=>t.status==='afgerond').length} / {pTasks.length} taken</span>
              </div>
              <Progress
                value={pTasks.length ? Math.round((pTasks.filter(t=>t.status==='afgerond').length / pTasks.length)*100) : 0}
                indicatorColor={client.primaryColor}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Taken</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pTasks.map(t => {
                const Icon = taskStatusIcon[t.status as keyof typeof taskStatusIcon] || Circle
                const colorCls = taskStatusColor[t.status as keyof typeof taskStatusColor] || 'text-gray-400'
                const consultant = consultants.find(c => c.id === t.assignee)
                return (
                  <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <Icon className={`h-4 w-4 shrink-0 ${colorCls}`} />
                    <span className="flex-1 text-sm text-gray-800">{t.title}</span>
                    {consultant && (
                      <div
                        className="h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: consultant.color }}
                        title={consultant.name}
                      >
                        {consultant.avatar}
                      </div>
                    )}
                    <span className="text-xs text-gray-400 shrink-0">{t.hours}u</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Urenregistraties</CardTitle></CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-medium">Datum</th>
                  <th className="text-left px-5 py-3 font-medium">Omschrijving</th>
                  <th className="text-right px-5 py-3 font-medium">Uren</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pEntries.map(e => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-gray-600">{e.date}</td>
                    <td className="px-5 py-3 text-gray-700">{e.description}</td>
                    <td className="px-5 py-3 text-right font-medium">{e.hours}u</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Projecten</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clientProjects.map(p => {
          const s = statusBadge[p.status] ?? { label: p.status, variant: 'default' as const }
          const pct = Math.min(Math.round((p.spentHours / p.budgetHours) * 100), 100)
          return (
            <Card key={p.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelected(p.id)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{p.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{p.description}</p>
                  </div>
                  <Badge variant={s.variant}>{s.label}</Badge>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>Urenbudget</span>
                  <span>{p.spentHours}/{p.budgetHours}u</span>
                </div>
                <Progress value={pct} indicatorColor={client.primaryColor} />
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-gray-400">{p.startDate} → {p.endDate}</p>
                  <span className="text-xs font-medium" style={{ color: client.primaryColor }}>Details →</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
