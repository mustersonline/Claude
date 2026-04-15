import React from 'react'
import { Download, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { invoices } from '@/mockData'
import { toast } from 'sonner'
import type { Client } from '@/App'

const statusLabel: Record<string, string> = { betaald: 'Betaald', open: 'Open', te_laat: 'Te laat' }
const statusVariant: Record<string, 'success' | 'info' | 'danger'> = { betaald: 'success', open: 'info', te_laat: 'danger' }

export function ClientFacturen({ client }: { client: Client }) {
  const clientInvoices = invoices.filter(i => i.clientId === client.id)
  const outstanding = clientInvoices.filter(i => i.status !== 'betaald').reduce((s, i) => s + i.amount, 0)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Facturen</h1>

      {outstanding > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-xl border" style={{ backgroundColor: client.primaryColor + '10', borderColor: client.primaryColor + '40' }}>
          <AlertCircle className="h-5 w-5 shrink-0" style={{ color: client.primaryColor }} />
          <div>
            <p className="font-semibold" style={{ color: client.primaryColor }}>
              € {outstanding.toLocaleString('nl-NL')} openstaand
            </p>
            <p className="text-sm text-gray-500">
              {clientInvoices.filter(i => i.status !== 'betaald').length} facturen nog niet betaald
            </p>
          </div>
        </div>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium">Factuur</th>
                <th className="text-left px-5 py-3 font-medium">Omschrijving</th>
                <th className="text-right px-5 py-3 font-medium">Bedrag</th>
                <th className="text-left px-5 py-3 font-medium">Vervaldatum</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-center px-5 py-3 font-medium">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clientInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-600">{inv.id}</td>
                  <td className="px-5 py-3.5 text-gray-600">{inv.description}</td>
                  <td className="px-5 py-3.5 text-right font-semibold text-gray-900">€{inv.amount.toLocaleString('nl-NL')}</td>
                  <td className="px-5 py-3.5 text-gray-600">{inv.dueDate}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={statusVariant[inv.status]}>{statusLabel[inv.status]}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <button
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors mx-auto"
                      onClick={() => toast.success('Download gestart', { description: inv.id })}
                    >
                      <Download className="h-4 w-4" />
                    </button>
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
