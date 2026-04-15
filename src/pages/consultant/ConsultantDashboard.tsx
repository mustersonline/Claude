import React from 'react'
import { Clock, TrendingUp, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TimerWidget } from '@/components/TimerWidget'
import { projects, consultants } from '@/mockData'

const myProjects = [
  { ...projects[0], budgetHours: 40, spentHours: 34, consultant: 'rachid' },
  { ...projects[2], budgetHours: 20, spentHours: 12, consultant: 'lars' },
  { ...projects[4], budgetHours: 20, spentHours: 22, consultant: 'aisha' },
]

function ProjectBudgetCard({ p }: { p: typeof myProjects[0] }) {
  const pct = Math.round((p.spentHours / p.budgetHours) * 100)
  const over = pct > 100
  const warn = pct >= 80 && !over
  const color = over ? '#DC2626' : warn ? '#D97706' : '#16A34A'

  return (
    <Card className={over ? 'border-red-200' : warn ? 'border-amber-200' : ''}>
      <CardContent className="p-5">
        {over && (
          <div className="mb-3 flex items-center gap-2 text-red-600 text-xs font-medium bg-red-50 px-3 py-2 rounded-lg">
            <AlertTriangle className="h-3.5 w-3.5" />
            Budget overschreden met {p.spentHours - p.budgetHours}u!
          </div>
        )}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{p.description}</p>
          </div>
          <span
            className="text-sm font-bold px-2 py-0.5 rounded"
            style={{ color, backgroundColor: color + '15' }}
          >
            {pct}%
          </span>
        </div>
        <Progress value={Math.min(pct, 100)} indicatorColor={color} className="h-2" />
        <p className="text-xs text-gray-500 mt-2">{p.spentHours} / {p.budgetHours} uur verbruikt</p>
      </CardContent>
    </Card>
  )
}

export function ConsultantDashboard() {
  const me = consultants[0]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mijn Dashboard</h1>
        <p className="text-gray-500 text-sm mt-0.5">Welkom terug, {me.name}</p>
      </div>

      <TimerWidget />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">Deze week</p>
                <p className="text-2xl font-bold text-gray-900">{me.hoursThisWeek}u</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">Deze maand</p>
                <p className="text-2xl font-bold text-gray-900">{me.hoursThisMonth}u</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project budgets */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Projectbudgetten</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {myProjects.map(p => <ProjectBudgetCard key={p.id} p={p} />)}
        </div>
      </div>
    </div>
  )
}
