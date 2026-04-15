import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { timeEntries, projects } from '@/mockData'
import type { Client } from '@/App'

export function ClientRapportages({ client }: { client: Client }) {
  const clientProjects = projects.filter(p => p.clientId === client.id)
  const clientEntries = timeEntries.filter(te => clientProjects.some(p => p.id === te.projectId))

  const hoursByProject = clientProjects.map(p => ({
    name: p.name.split(' ').slice(0, 2).join(' '),
    spent: p.spentHours,
    budget: p.budgetHours,
  }))

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Rapportages</h1>

      <Card>
        <CardHeader><CardTitle>Uren per project</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hoursByProject} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v, n) => [`${v}u`, n === 'spent' ? 'Verbruikt' : 'Budget']} />
              <Bar dataKey="budget" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="budget" />
              <Bar dataKey="spent" fill={client.primaryColor} radius={[4, 4, 0, 0]} name="spent" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-gray-900">{clientEntries.reduce((s,e)=>s+e.hours, 0)}u</p>
            <p className="text-xs text-gray-500 mt-1">Totaal gewerkt</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-gray-900">{clientProjects.length}</p>
            <p className="text-xs text-gray-500 mt-1">Projecten</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold" style={{ color: client.primaryColor }}>
              {Math.round(clientProjects.reduce((s,p)=>s+p.spentHours,0) / Math.max(clientProjects.reduce((s,p)=>s+p.budgetHours,0),1) * 100)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">Budget benut</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
