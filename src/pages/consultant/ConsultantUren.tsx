import React from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { TimerWidget } from '@/components/TimerWidget'
import { timeEntries, projects, clients } from '@/mockData'
import { toast } from 'sonner'

const budgets = [
  { project: 'SEO Optimalisatie Q2 — Koekjesfabriek', budget: 40, spent: 34 },
  { project: 'Google Ads — TechFlow', budget: 20, spent: 12 },
  { project: 'Content Marketing — GreenLeaf', budget: 20, spent: 22 },
]

const clientName = (id: string) => clients.find(c => c.id === id)?.shortName ?? id
const projectName = (id: string) => projects.find(p => p.id === id)?.name ?? id

export function ConsultantUren() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mijn Uren & Timer</h1>

      <TimerWidget />

      {/* Budget overview */}
      <Card>
        <CardHeader><CardTitle>Urenbudget per project</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgets.map(b => {
              const pct = Math.round((b.spent / b.budget) * 100)
              const over = pct > 100
              const color = over ? '#DC2626' : pct >= 80 ? '#D97706' : '#16A34A'
              return (
                <div key={b.project}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 truncate pr-4">{b.project}</span>
                    <span className="shrink-0 font-semibold" style={{ color }}>
                      {b.spent}/{b.budget}u ({pct}%)
                    </span>
                  </div>
                  <Progress value={Math.min(pct, 100)} indicatorColor={color} />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Manual entry form */}
      <Card>
        <CardHeader><CardTitle>Handmatig uren invoeren</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Project</label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Selecteer project" /></SelectTrigger>
                <SelectContent>
                  {projects.filter(p => p.status === 'actief').map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Datum</label>
              <Input type="date" defaultValue="2024-04-15" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Uren</label>
              <Input type="number" placeholder="Bijv. 2.5" min={0.25} step={0.25} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Omschrijving</label>
              <Input placeholder="Wat heb je gedaan?" />
            </div>
            <div className="sm:col-span-2">
              <Button
                onClick={() => toast.success('Uren opgeslagen')}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Uren opslaan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time entries log */}
      <Card>
        <CardHeader><CardTitle>Recente urenregistraties</CardTitle></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium">Datum</th>
                <th className="text-left px-5 py-3 font-medium">Project</th>
                <th className="text-left px-5 py-3 font-medium">Omschrijving</th>
                <th className="text-right px-5 py-3 font-medium">Uren</th>
                <th className="text-center px-5 py-3 font-medium">Factureerbaar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {timeEntries.map(te => (
                <tr key={te.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-600">{te.date}</td>
                  <td className="px-5 py-3 font-medium text-gray-800 max-w-[160px] truncate">{projectName(te.projectId)}</td>
                  <td className="px-5 py-3 text-gray-600 max-w-[220px] truncate">{te.description}</td>
                  <td className="px-5 py-3 text-right font-semibold text-gray-900">{te.hours}u</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`inline-block h-2 w-2 rounded-full ${te.billable ? 'bg-green-500' : 'bg-gray-300'}`} />
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
