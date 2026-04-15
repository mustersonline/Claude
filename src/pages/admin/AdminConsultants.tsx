import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { consultants, projects, adminStats } from '@/mockData'
import { toast } from 'sonner'

function ConsultantCard({ c }: { c: typeof consultants[0] }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div
            className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 relative"
            style={{ backgroundColor: c.color }}
          >
            {c.avatar}
            {c.timerActive && (
              <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white pulse-red" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{c.name}</h3>
              {c.timerActive && (
                <span className="inline-flex items-center gap-1 text-xs text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 pulse-red" />
                  Timer actief
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{c.role}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="p-2.5 bg-gray-50 rounded-lg">
            <p className="text-base font-bold text-gray-900">{c.hoursThisWeek}u</p>
            <p className="text-xs text-gray-500">Deze week</p>
          </div>
          <div className="p-2.5 bg-gray-50 rounded-lg">
            <p className="text-base font-bold text-gray-900">{c.hoursThisMonth}u</p>
            <p className="text-xs text-gray-500">Deze maand</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const matrixProjects = ['SEO Koekjes', 'SEO TechFlow', 'Content GreenLeaf', 'Ads Koekjes', 'Ads TechFlow']
const cellColors = [
  { min: 1, max: 5, bg: '#dcfce7', text: '#166534' },
  { min: 6, max: 10, bg: '#fef9c3', text: '#854d0e' },
  { min: 11, max: 99, bg: '#fee2e2', text: '#991b1b' },
]
function getCellStyle(hours: number) {
  if (!hours) return { bg: 'transparent', text: '#9ca3af' }
  const tier = cellColors.find(c => hours >= c.min && hours <= c.max)
  return tier ? { bg: tier.bg, text: tier.text } : { bg: 'transparent', text: '#9ca3af' }
}

export function AdminConsultants() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consultants & Uren</h1>
          <p className="text-gray-500 text-sm mt-0.5">Beheer consultants en capaciteitsplanning</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Uren toewijzen
        </Button>
      </div>

      {/* Consultant cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {consultants.map(c => <ConsultantCard key={c.id} c={c} />)}
      </div>

      {/* Capacity matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Capaciteitsmatrix — uren per project (deze maand)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100">
                  <th className="text-left py-2 pr-4 font-medium w-36">Consultant</th>
                  {matrixProjects.map(p => (
                    <th key={p} className="text-center py-2 px-3 font-medium min-w-[110px]">{p}</th>
                  ))}
                  <th className="text-center py-2 px-3 font-medium">Totaal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {adminStats.capacityMatrix.map(row => {
                  const total = matrixProjects.reduce((s, p) => s + (row[p as keyof typeof row] as number || 0), 0)
                  return (
                    <tr key={row.consultant} className="hover:bg-gray-50">
                      <td className="py-3 pr-4 font-medium text-gray-800">{row.consultant}</td>
                      {matrixProjects.map(p => {
                        const h = row[p as keyof typeof row] as number || 0
                        const style = getCellStyle(h)
                        return (
                          <td key={p} className="py-3 px-3 text-center">
                            {h > 0 ? (
                              <span
                                className="inline-block px-2.5 py-1 rounded text-xs font-semibold min-w-[40px]"
                                style={{ backgroundColor: style.bg, color: style.text }}
                              >
                                {h}u
                              </span>
                            ) : (
                              <span className="text-gray-300 text-xs">—</span>
                            )}
                          </td>
                        )
                      })}
                      <td className="py-3 px-3 text-center font-bold text-gray-900">{total}u</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Assign hours modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Uren toewijzen</DialogTitle>
            <DialogDescription>Wijs uren toe aan een consultant voor een project.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Consultant</label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Selecteer consultant" /></SelectTrigger>
                <SelectContent>
                  {consultants.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Project</label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Selecteer project" /></SelectTrigger>
                <SelectContent>
                  {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Uren</label>
              <Input type="number" placeholder="Bijv. 8" min={0.5} step={0.5} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Omschrijving</label>
              <Input placeholder="Bijv. Technische SEO audit" />
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                className="flex-1"
                onClick={() => { toast.success('Uren toegewezen!'); setOpen(false) }}
              >
                Opslaan
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)}>Annuleren</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
