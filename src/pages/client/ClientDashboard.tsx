import React from 'react'
import { TrendingUp, TrendingDown, FileText, Clock, Package, Bell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { kpis, deliverables, invoices, projects, notifications } from '@/mockData'
import type { Client } from '@/App'

interface Props { client: Client }

export function ClientDashboard({ client }: Props) {
  const clientKpis = kpis.filter(k => k.clientId === client.id).slice(0, 3)
  const clientDeliverables = deliverables.filter(d => d.clientId === client.id).slice(0, 4)
  const openInvoices = invoices.filter(i => i.clientId === client.id && i.status !== 'betaald')
  const clientProjects = projects.filter(p => p.clientId === client.id && p.status === 'actief')
  const unread = notifications.filter(n => !n.read).length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welkom terug, {client.shortName} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Hier is een overzicht van uw activiteiten</p>
        </div>
        {unread > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: client.primaryColor + '15', color: client.primaryColor }}>
            <Bell className="h-4 w-4" />
            {unread} nieuwe meldingen
          </div>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { icon: FileText, label: 'Open facturen', value: `€${openInvoices.reduce((s,i)=>s+i.amount,0).toLocaleString('nl-NL')}`, sub: `${openInvoices.length} facturen` },
          { icon: Clock, label: 'Uren deze maand', value: `${clientProjects.reduce((s,p)=>s+p.spentHours,0)}u`, sub: 'Over alle projecten' },
          { icon: Package, label: 'Actieve projecten', value: `${clientProjects.length}`, sub: 'In uitvoering' },
          { icon: TrendingUp, label: 'Opleveringen', value: `${clientDeliverables.length}`, sub: 'Beschikbaar' },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: client.primaryColor + '15' }}>
                  <stat.icon className="h-5 w-5" style={{ color: client.primaryColor }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* KPI snapshot */}
      <Card>
        <CardHeader><CardTitle>KPI Overzicht</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {clientKpis.map(kpi => {
              const latest = kpi.data[kpi.data.length - 1]
              const up = kpi.trend > 0
              return (
                <div key={kpi.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500">{kpi.channel}</p>
                    <p className="text-lg font-bold text-gray-900 mt-0.5">
                      {typeof latest.value === 'number' && latest.value > 100
                        ? latest.value.toLocaleString('nl-NL')
                        : latest.value}
                      {' '}<span className="text-xs text-gray-400 font-normal">{kpi.unit}</span>
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full ${up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {Math.abs(kpi.trend)}%
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Goals + Deliverables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>KPI Doelstellingen</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {clientKpis.slice(0, 2).map(kpi => {
              const latest = kpi.data[kpi.data.length - 1].value as number
              const pct = Math.min(Math.round((latest / (kpi.goal as number)) * 100), 100)
              return (
                <div key={kpi.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{kpi.metric}</span>
                    <span className="text-gray-500">{pct}% van doel</span>
                  </div>
                  <Progress value={pct} indicatorColor={client.primaryColor} />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Huidig: {latest.toLocaleString('nl-NL')} {kpi.unit}</span>
                    <span>Doel: {(kpi.goal as number).toLocaleString('nl-NL')} {kpi.unit}</span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recente opleveringen</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {clientDeliverables.map(d => (
                <div key={d.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: client.primaryColor + '15' }}>
                    <Package className="h-4 w-4" style={{ color: client.primaryColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{d.title}</p>
                    <p className="text-xs text-gray-400">{d.uploadDate} · {d.size}</p>
                  </div>
                  <Badge variant="outline">{d.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
