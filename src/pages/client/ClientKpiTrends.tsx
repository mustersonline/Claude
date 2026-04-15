import React, { useState } from 'react'
import { TrendingUp, TrendingDown, Target } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { kpis } from '@/mockData'
import type { Client } from '@/App'

const channels = ['SEO', 'Google Ads', 'Social', 'Email']

export function ClientKpiTrends({ client }: { client: Client }) {
  const [activeChannel, setActiveChannel] = useState('SEO')
  const clientKpis = kpis.filter(k => k.clientId === client.id)
  const channelKpis = clientKpis.filter(k => k.channel === activeChannel)
  const availableChannels = [...new Set(clientKpis.map(k => k.channel))]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">KPI Trends</h1>

      {/* Channel tabs */}
      <div className="flex gap-2 flex-wrap">
        {availableChannels.map(ch => (
          <button
            key={ch}
            onClick={() => setActiveChannel(ch)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={activeChannel === ch
              ? { backgroundColor: client.primaryColor, color: '#fff' }
              : { backgroundColor: '#f3f4f6', color: '#374151' }
            }
          >
            {ch}
          </button>
        ))}
      </div>

      {channelKpis.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          Geen KPI-data beschikbaar voor {activeChannel}
        </div>
      )}

      {channelKpis.map(kpi => {
        const latest = kpi.data[kpi.data.length - 1].value as number
        const goal = kpi.goal as number
        const pct = Math.min(Math.round((latest / goal) * 100), 100)
        const up = kpi.trend > 0
        const onTrack = pct >= 70
        const reached = pct >= 100

        return (
          <Card key={kpi.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{kpi.metric}</CardTitle>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {typeof latest === 'number' && latest > 100 ? latest.toLocaleString('nl-NL') : latest}
                      <span className="text-sm font-normal text-gray-400 ml-1">{kpi.unit}</span>
                    </span>
                    <span className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-full ${up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                      {Math.abs(kpi.trend)}% MoM
                    </span>
                    <Badge variant={reached ? 'success' : onTrack ? 'info' : 'warning'}>
                      {reached ? '🎉 Doel bereikt' : onTrack ? 'Op schema' : 'Achter op schema'}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Target className="h-4 w-4" />
                  Doel: {goal.toLocaleString('nl-NL')} {kpi.unit}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={kpi.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(v) => [`${Number(v).toLocaleString('nl-NL')} ${kpi.unit}`, kpi.metric]}
                  />
                  <ReferenceLine
                    y={goal}
                    stroke={client.primaryColor}
                    strokeDasharray="6 3"
                    strokeWidth={2}
                    label={{ value: 'Doel', position: 'insideTopRight', fill: client.primaryColor, fontSize: 12 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={client.primaryColor}
                    strokeWidth={2.5}
                    dot={{ fill: client.primaryColor, strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5" />
                    Voortgang naar doel
                  </span>
                  <span className="font-semibold">{pct}%</span>
                </div>
                <Progress value={pct} indicatorColor={client.primaryColor} />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Deadline: {kpi.goalDeadline as string}</span>
                  <span>{(goal - latest).toLocaleString('nl-NL')} {kpi.unit} te gaan</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
