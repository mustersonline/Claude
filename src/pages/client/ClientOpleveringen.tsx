import React from 'react'
import { Download, FileText, Calendar, Package } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { deliverables } from '@/mockData'
import { toast } from 'sonner'
import type { Client } from '@/App'

const typeIcon: Record<string, React.ElementType> = {
  rapport: FileText,
  document: FileText,
  planning: Calendar,
  content: Package,
}

export function ClientOpleveringen({ client }: { client: Client }) {
  const items = deliverables.filter(d => d.clientId === client.id)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Opleveringen</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(d => {
          const Icon = typeIcon[d.type] || Package
          return (
            <Card key={d.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex items-center gap-4">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: client.primaryColor + '15' }}
                >
                  <Icon className="h-6 w-6" style={{ color: client.primaryColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{d.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{d.uploadDate}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{d.size}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className="capitalize">{d.type}</Badge>
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => toast.success('Download gestart', { description: d.title })}
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
