import React, { useState, useRef } from 'react'
import {
  LayoutDashboard, FileText, Users, UserCog, Settings,
  Clock, Briefcase, TrendingUp, Package, BarChart2,
  FileBarChart, FolderOpen, HeadphonesIcon, Home,
} from 'lucide-react'
import { Toaster } from 'sonner'

import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'
import { PageSkeleton } from './components/PageSkeleton'

import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminFacturen } from './pages/admin/AdminFacturen'
import { AdminKlanten } from './pages/admin/AdminKlanten'
import { AdminConsultants } from './pages/admin/AdminConsultants'
import { AdminInstellingen } from './pages/admin/AdminInstellingen'

import { ConsultantDashboard } from './pages/consultant/ConsultantDashboard'
import { ConsultantUren } from './pages/consultant/ConsultantUren'
import { ConsultantKlanten } from './pages/consultant/ConsultantKlanten'

import { ClientDashboard } from './pages/client/ClientDashboard'
import { ClientFacturen } from './pages/client/ClientFacturen'
import { ClientProjecten } from './pages/client/ClientProjecten'
import { ClientUren } from './pages/client/ClientUren'
import { ClientOpleveringen } from './pages/client/ClientOpleveringen'
import { ClientDashboards } from './pages/client/ClientDashboards'
import { ClientKpiTrends } from './pages/client/ClientKpiTrends'
import { ClientRapportages } from './pages/client/ClientRapportages'
import { ClientDocumenten } from './pages/client/ClientDocumenten'
import { ClientTeam } from './pages/client/ClientTeam'
import { ClientSupport } from './pages/client/ClientSupport'

import { clients } from './mockData'

export type AppRole = 'admin' | 'consultant' | 'client_koekjes' | 'client_techflow' | 'client_greenleaf'
export type Client = typeof clients[0]

// ─── Navigation items ─────────────────────────────────────────────────────────
const adminNav = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: 'facturen', label: 'Facturen', icon: <FileText className="h-4 w-4" /> },
  { id: 'klanten', label: 'Klanten', icon: <Users className="h-4 w-4" /> },
  { id: 'consultants', label: 'Consultants & Uren', icon: <UserCog className="h-4 w-4" /> },
  { id: 'instellingen', label: 'Instellingen', icon: <Settings className="h-4 w-4" /> },
]

const consultantNav = [
  { id: 'dashboard', label: 'Mijn Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: 'uren', label: 'Mijn Uren & Timer', icon: <Clock className="h-4 w-4" /> },
  { id: 'klanten', label: 'Mijn Klanten', icon: <Briefcase className="h-4 w-4" /> },
]

const clientNav = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
  { id: 'facturen', label: 'Facturen', icon: <FileText className="h-4 w-4" /> },
  { id: 'projecten', label: 'Projecten', icon: <Briefcase className="h-4 w-4" /> },
  { id: 'uren', label: 'Uren', icon: <Clock className="h-4 w-4" /> },
  { id: 'opleveringen', label: 'Opleveringen', icon: <Package className="h-4 w-4" /> },
  { id: 'dashboards', label: 'Dashboards', icon: <BarChart2 className="h-4 w-4" /> },
  { id: 'kpi-trends', label: 'KPI Trends', icon: <TrendingUp className="h-4 w-4" /> },
  { id: 'rapportages', label: 'Rapportages', icon: <FileBarChart className="h-4 w-4" /> },
  { id: 'documenten', label: 'Documenten', icon: <FolderOpen className="h-4 w-4" /> },
  { id: 'team', label: 'Team', icon: <Users className="h-4 w-4" /> },
  { id: 'support', label: 'Support', icon: <HeadphonesIcon className="h-4 w-4" /> },
]

function getClientFromRole(role: AppRole): Client | null {
  const map: Record<string, string> = {
    client_koekjes: 'koekjes',
    client_techflow: 'techflow',
    client_greenleaf: 'greenleaf',
  }
  const id = map[role]
  return id ? (clients.find(c => c.id === id) ?? null) : null
}

export default function App() {
  const [role, setRole] = useState<AppRole>('admin')
  const [page, setPage] = useState('dashboard')
  const [loading, setLoading] = useState(false)

  function navigate(newPage: string) {
    if (newPage === page) return
    setLoading(true)
    setTimeout(() => {
      setPage(newPage)
      setLoading(false)
    }, 500)
  }

  function switchRole(newRole: AppRole) {
    if (newRole === role) return
    setLoading(true)
    setTimeout(() => {
      setRole(newRole)
      setPage('dashboard')
      setLoading(false)
    }, 500)
  }

  const client = getClientFromRole(role)
  const isClient = role.startsWith('client_')
  const isConsultant = role === 'consultant'
  const isAdmin = role === 'admin'

  const nav = isAdmin ? adminNav : isConsultant ? consultantNav : clientNav
  const accentColor = isClient && client ? client.primaryColor : undefined

  const adminLogo = (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0">
        <span className="text-white text-xs font-bold">D</span>
      </div>
      <span className="text-white font-bold text-sm tracking-tight">DGTLbase</span>
    </div>
  )

  const clientLogo = client ? (
    <div className="flex items-center gap-2.5">
      <div
        className="h-8 w-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
        style={{ backgroundColor: client.primaryColor }}
      >
        {client.logo}
      </div>
      <span className="text-white font-bold text-sm truncate">{client.shortName}</span>
    </div>
  ) : adminLogo

  function renderPage() {
    if (loading) return <PageSkeleton />

    if (isAdmin) {
      switch (page) {
        case 'dashboard':    return <AdminDashboard />
        case 'facturen':     return <AdminFacturen />
        case 'klanten':      return <AdminKlanten />
        case 'consultants':  return <AdminConsultants />
        case 'instellingen': return <AdminInstellingen />
        default:             return <AdminDashboard />
      }
    }

    if (isConsultant) {
      switch (page) {
        case 'dashboard': return <ConsultantDashboard />
        case 'uren':      return <ConsultantUren />
        case 'klanten':   return <ConsultantKlanten />
        default:          return <ConsultantDashboard />
      }
    }

    if (isClient && client) {
      switch (page) {
        case 'dashboard':   return <ClientDashboard client={client} />
        case 'facturen':    return <ClientFacturen client={client} />
        case 'projecten':   return <ClientProjecten client={client} />
        case 'uren':        return <ClientUren client={client} />
        case 'opleveringen':return <ClientOpleveringen client={client} />
        case 'dashboards':  return <ClientDashboards client={client} />
        case 'kpi-trends':  return <ClientKpiTrends client={client} />
        case 'rapportages': return <ClientRapportages client={client} />
        case 'documenten':  return <ClientDocumenten client={client} />
        case 'team':        return <ClientTeam client={client} />
        case 'support':     return <ClientSupport client={client} />
        default:            return <ClientDashboard client={client} />
      }
    }

    return null
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Toaster position="bottom-right" richColors />

      <Sidebar
        logo={isClient ? clientLogo : adminLogo}
        navItems={nav}
        activePage={page}
        setActivePage={navigate}
        accentColor={accentColor}
        darkMode={true}
      />

      <div className="flex-1 flex flex-col ml-56 min-w-0">
        <TopBar
          title={
            isClient && client
              ? <span style={{ color: client.secondaryColor }}>{client.name}</span>
              : isConsultant
                ? <span className="text-gray-300">Rachid Hok-ahin — SEO Lead</span>
                : <span className="text-gray-300">DGTLbase Admin</span>
          }
          role={role}
          setRole={switchRole}
        />

        <main className="flex-1 overflow-y-auto pt-14 bg-gray-50">
          <div key={`${role}-${page}-${loading}`} className={loading ? '' : 'page-enter'}>
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  )
}
