import React, { useState, useEffect } from 'react'
import { Square, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function TimerWidget() {
  const [seconds, setSeconds] = useState(5025) // 01:23:45

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const h = Math.floor(seconds / 3600).toString().padStart(2, '0')
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-red-500 pulse-red" />
        <span className="text-sm font-semibold text-red-700">Timer actief</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-red-500 font-medium">Koekjesfabriek De Lekkerste</p>
        <p className="text-sm text-red-700 font-semibold truncate">Technische SEO audit</p>
      </div>
      <div className="text-2xl font-mono font-bold text-red-700 tabular-nums shrink-0">
        {h}:{m}:{s}
      </div>
      <div className="flex gap-2 shrink-0">
        <Button
          size="sm"
          variant="destructive"
          className="gap-1"
          onClick={() => toast.success('Timer gestopt', { description: `${h}:${m}:${s} geregistreerd` })}
        >
          <Square className="h-3 w-3 fill-current" />
          Stop
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-1 border-red-200 text-red-600 hover:bg-red-50"
          onClick={() => toast.info('Timer verwijderd')}
        >
          <Trash2 className="h-3 w-3" />
          Verwijder
        </Button>
      </div>
    </div>
  )
}
