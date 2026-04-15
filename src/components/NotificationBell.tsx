import React, { useState } from 'react'
import { Bell } from 'lucide-react'
import { notifications } from '@/mockData'

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const unread = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <Bell className="h-5 w-5 text-gray-300" />
        {unread > 0 && (
          <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-50 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <span className="font-semibold text-gray-900 text-sm">Meldingen</span>
              <span className="text-xs text-gray-400">{unread} ongelezen</span>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map(n => (
                <div
                  key={n.id}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 ${!n.read ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex gap-3">
                    <span className="text-lg leading-none mt-0.5">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!n.read ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{n.body}</p>
                      <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                    </div>
                    {!n.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-gray-100 text-center">
              <button className="text-xs text-blue-600 hover:underline">Alle meldingen bekijken</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
