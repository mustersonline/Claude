import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { kpis } from '@/mockData'
import type { Client } from '@/App'

export function ClientDashboards({ client }: { client: Client }) {
  const clientKpis = kpis.filter(k => k.clientId === client.id)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboards</h1>
      <p className="text-gray-500 text-sm">Live overzicht van alle kanalen</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {clientKpis.map(kpi => (
          <Card key={kpi.id}>
            <CardHeader>
              <CardTitle>{kpi.channel} — {kpi.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={kpi.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={client.primaryColor}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
