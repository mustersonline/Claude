import React from 'react'
import { Download, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { deliverables } from '@/mockData'
import { toast } from 'sonner'
import type { Client } from '@/App'

export function ClientDocumenten({ client }: { client: Client }) {
  const docs = deliverables.filter(d => d.clientId === client.id)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Documenten</h1>
      <div className="space-y-2">
        {docs.map(d => (
          <div key={d.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FileText className="h-5 w-5 text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{d.title}</p>
              <p className="text-xs text-gray-400">{d.uploadDate} · {d.size}</p>
            </div>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
              onClick={() => toast.success('Download gestart')}
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
