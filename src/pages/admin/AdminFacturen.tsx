import React, { useState } from 'react'
import { Download, CheckCircle, Bell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { invoices, clients } from '@/mockData'
import { toast } from 'sonner'

const statusLabel: Record<string, string> = { betaald: 'Betaald', open: 'Open', te_laat: 'Te laat' }
const statusVariant: Record<string, 'success' | 'info' | 'danger'> = { betaald: 'success', open: 'info', te_laat: 'danger' }

export function AdminFacturen() {
  const [statusFilter, setStatusFilter] = useState('alle')
  const [clientFilter, setClientFilter] = useState('alle')

  const filtered = invoices.filter(i => {
    if (statusFilter !== 'alle' && i.status !== statusFilter) return false
    if (clientFilter !== 'alle' && i.clientId !== clientFilter) return false
    return true
  })

  const totals = {
    open: invoices.filter(i => i.status === 'open').reduce((s, i) => s + i.amount, 0),
    overdue: invoices.filter(i => i.status === 'te_laat').reduce((s, i) => s + i.amount, 0),
    paid: invoices.filter(i => i.status === 'betaald').reduce((s, i) => s + i.amount, 0),
  }

  const clientName = (id: string) => clients.find(c => c.id === id)?.shortName ?? id

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Facturen</h1>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-blue-500 font-semibold uppercase">Open</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">€{totals.open.toLocaleString('nl-NL')}</p>
            <p className="text-xs text-gray-400">{invoices.filter(i => i.status === 'open').length} facturen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-red-500 font-semibold uppercase">Achterstallig</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">€{totals.overdue.toLocaleString('nl-NL')}</p>
            <p className="text-xs text-gray-400">{invoices.filter(i => i.status === 'te_laat').length} facturen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-green-500 font-semibold uppercase">Betaald</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">€{totals.paid.toLocaleString('nl-NL')}</p>
            <p className="text-xs text-gray-400">{invoices.filter(i => i.status === 'betaald').length} facturen</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        {['alle', 'open', 'betaald', 'te_laat'].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${statusFilter === s ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {s === 'alle' ? 'Alle statussen' : statusLabel[s] ?? s}
          </button>
        ))}
        <div className="ml-auto">
          <select
            value={clientFilter}
            onChange={e => setClientFilter(e.target.value)}
            className="h-9 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="alle">Alle klanten</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.shortName}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium">Factuur</th>
                <th className="text-left px-5 py-3 font-medium">Klant</th>
                <th className="text-left px-5 py-3 font-medium">Omschrijving</th>
                <th className="text-right px-5 py-3 font-medium">Bedrag</th>
                <th className="text-left px-5 py-3 font-medium">Vervaldatum</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-center px-5 py-3 font-medium">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(inv => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-600">{inv.id}</td>
                  <td className="px-5 py-3.5 font-medium text-gray-800">{clientName(inv.clientId)}</td>
                  <td className="px-5 py-3.5 text-gray-600 max-w-[200px] truncate">{inv.description}</td>
                  <td className="px-5 py-3.5 text-right font-semibold text-gray-900">€{inv.amount.toLocaleString('nl-NL')}</td>
                  <td className="px-5 py-3.5 text-gray-600">{inv.dueDate}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={statusVariant[inv.status]}>{statusLabel[inv.status]}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => toast.success('Download gestart', { description: inv.id })}
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 rounded hover:bg-green-50 text-gray-500 hover:text-green-600 transition-colors"
                        onClick={() => toast.success('Factuur gemarkeerd als betaald')}
                        title="Betaald"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 rounded hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors"
                        onClick={() => toast.success('Herinnering verstuurd', { description: clientName(inv.clientId) })}
                        title="Herinnering"
                      >
                        <Bell className="h-4 w-4" />
                      </button>
                    </div>
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
