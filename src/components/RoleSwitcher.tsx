import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { clients } from '@/mockData'
import type { AppRole } from '@/App'

interface RoleSwitcherProps {
  role: AppRole
  setRole: (r: AppRole) => void
}

const roleLabels: Record<string, string> = {
  admin: '👑 Admin',
  consultant: '🧑‍💻 Consultant',
  client_koekjes: '🏢 Koekjesfabriek',
  client_techflow: '🏢 TechFlow',
  client_greenleaf: '🏢 GreenLeaf',
}

const allRoles: AppRole[] = ['admin', 'consultant', 'client_koekjes', 'client_techflow', 'client_greenleaf']

export function RoleSwitcher({ role, setRole }: RoleSwitcherProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm text-white font-medium"
      >
        {roleLabels[role]}
        <ChevronDown className="h-4 w-4 opacity-60" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-50 w-52 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden py-1">
            {allRoles.map(r => (
              <button
                key={r}
                onClick={() => { setRole(r); setOpen(false) }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${role === r ? 'font-semibold text-gray-900 bg-gray-50' : 'text-gray-700'}`}
              >
                {roleLabels[r]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
