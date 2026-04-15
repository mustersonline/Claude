import React from 'react'
import { NotificationBell } from './NotificationBell'
import { RoleSwitcher } from './RoleSwitcher'
import type { AppRole } from '@/App'

interface TopBarProps {
  title?: React.ReactNode
  role: AppRole
  setRole: (r: AppRole) => void
  accentColor?: string
}

export function TopBar({ title, role, setRole, accentColor }: TopBarProps) {
  return (
    <header
      className="fixed top-0 right-0 left-56 h-14 flex items-center justify-between px-6 z-20 border-b border-gray-800"
      style={{ backgroundColor: accentColor ?? '#111827' }}
    >
      <div className="text-white font-semibold text-sm">{title}</div>
      <div className="flex items-center gap-2">
        <NotificationBell />
        <RoleSwitcher role={role} setRole={setRole} />
      </div>
    </header>
  )
}
