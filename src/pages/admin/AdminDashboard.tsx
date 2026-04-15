import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { TrendingUp, FileText, AlertCircle, Clock, Bell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { adminStats, invoices, clients } from '@/mockData'
import { toast } from 'sonner'

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType, label: string, value: string, sub?: string, color: string
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
          </div>
          <div className="p-2 rounded-lg" style={{ backgroundColor: color + '20' }}>
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AdminDashboard() {
  const dueSoon = invoices.filter(i => i.status !== 'betaald')
  const clientName = (id: string) => clients.find(c => c.id === id)?.shortName ?? id

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-0.5">Overzicht van alle activiteiten</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Omzet deze maand" value="€18.400" color="#7C3AED" />
        <StatCard icon={FileText} label="Open facturen" value="€6.200" sub="3 facturen" color="#2563EB" />
        <StatCard icon={AlertCircle} label="Achterstallig" value="€2.100" sub="1 factuur" color="#DC2626" />
        <StatCard icon={Clock} label="Uren deze maand" value="247" sub="3 consultants" color="#059669" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Uren per consultant</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={adminStats.hoursByConsultant} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => [`${v} uur`, 'Uren']} />
                <Bar dataKey="hours" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Omzet afgelopen 6 maanden</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={adminStats.revenueByMonth} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `€${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [`€${Number(v).toLocaleString('nl-NL')}`, 'Omzet']} />
                <Bar dataKey="revenue" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top clients */}
        <Card>
          <CardHeader>
            <CardTitle>Top klanten op uren</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-gray-100">
                    <th className="text-left pb-2 font-medium">Klant</th>
                    <th className="text-right pb-2 font-medium">Uren</th>
                    <th className="text-right pb-2 font-medium">Omzet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {adminStats.topClientsByHours.map(r => (
                    <tr key={r.client} className="hover:bg-gray-50">
                      <td className="py-2.5 font-medium text-gray-800">{r.client}</td>
                      <td className="py-2.5 text-right text-gray-600">{r.hours}u</td>
                      <td className="py-2.5 text-right text-gray-600">€{r.revenue.toLocaleString('nl-NL')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Invoices due soon */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Facturen vervallen binnenkort</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {dueSoon.map(inv => (
                <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{clientName(inv.clientId)}</p>
                    <p className="text-xs text-gray-400">{inv.id} · Vervalt {inv.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">€{inv.amount.toLocaleString('nl-NL')}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toast.success('Herinnering verstuurd', { description: `Naar ${clientName(inv.clientId)}` })}
                      className="text-xs gap-1"
                    >
                      <Bell className="h-3 w-3" />
                      Stuur herinnering
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
