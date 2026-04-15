import React from 'react'
import { cn } from '@/lib/utils'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
}

interface SidebarProps {
  logo: React.ReactNode
  navItems: NavItem[]
  activePage: string
  setActivePage: (id: string) => void
  accentColor?: string
  darkMode?: boolean
}

export function Sidebar({ logo, navItems, activePage, setActivePage, accentColor, darkMode = true }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 bottom-0 w-56 flex flex-col z-30 shrink-0',
        darkMode ? 'bg-gray-900' : 'bg-white border-r border-gray-200'
      )}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-5 shrink-0">
        {logo}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {navItems.map(item => {
          const isActive = activePage === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left',
                isActive
                  ? darkMode
                    ? 'bg-white/10 text-white'
                    : 'text-white'
                  : darkMode
                    ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
              style={isActive && !darkMode && accentColor ? { backgroundColor: accentColor } : undefined}
            >
              <span className={cn('shrink-0', isActive ? 'opacity-100' : 'opacity-60')}>
                {item.icon}
              </span>
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Bottom brand */}
      <div className={cn('px-5 py-4 text-xs border-t shrink-0', darkMode ? 'border-gray-800 text-gray-600' : 'border-gray-100 text-gray-400')}>
        DGTLbase Portal v1.0
      </div>
    </aside>
  )
}
