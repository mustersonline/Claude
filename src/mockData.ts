// ─── CLIENTS ─────────────────────────────────────────────────────────────────
export const clients = [
  {
    id: 'koekjes',
    name: 'Koekjesfabriek De Lekkerste',
    shortName: 'Koekjesfabriek',
    primaryColor: '#E85D04',
    secondaryColor: '#FAA307',
    logo: 'KDL',
    contactPerson: 'Petra van Buren',
    email: 'petra@koekjesfabriek.nl',
    phone: '+31 6 12345678',
    address: 'Bakkerijstraat 12, Zaandam',
  },
  {
    id: 'techflow',
    name: 'TechFlow B.V.',
    shortName: 'TechFlow',
    primaryColor: '#2563EB',
    secondaryColor: '#3B82F6',
    logo: 'TF',
    contactPerson: 'Niels Breugem',
    email: 'niels@techflow.nl',
    phone: '+31 6 98765432',
    address: 'Innovatielaan 77, Amsterdam',
  },
  {
    id: 'greenleaf',
    name: 'GreenLeaf Agency',
    shortName: 'GreenLeaf',
    primaryColor: '#16A34A',
    secondaryColor: '#22C55E',
    logo: 'GL',
    contactPerson: 'Sofie de Boer',
    email: 'sofie@greenleaf.agency',
    phone: '+31 6 55512345',
    address: 'Groene Dreef 5, Utrecht',
  },
]

// ─── CONSULTANTS ──────────────────────────────────────────────────────────────
export const consultants = [
  {
    id: 'rachid',
    name: 'Rachid Hok-ahin',
    role: 'SEO Lead',
    avatar: 'RH',
    color: '#7C3AED',
    hoursThisMonth: 98,
    hoursThisWeek: 22,
    timerActive: true,
  },
  {
    id: 'aisha',
    name: 'Aïsha Post',
    role: 'SEO Consultant',
    avatar: 'AP',
    color: '#DB2777',
    hoursThisMonth: 87,
    hoursThisWeek: 18,
    timerActive: false,
  },
  {
    id: 'lars',
    name: 'Lars van Dijk',
    role: 'Ads Specialist',
    avatar: 'LV',
    color: '#0891B2',
    hoursThisMonth: 62,
    hoursThisWeek: 14,
    timerActive: false,
  },
]

// ─── PROJECTS ────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 'proj-001',
    clientId: 'koekjes',
    name: 'SEO Optimalisatie Q2',
    description: 'Technische SEO-audit + contentstrategie',
    status: 'actief',
    budgetHours: 40,
    spentHours: 34,
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    consultants: ['rachid', 'aisha'],
    color: '#E85D04',
  },
  {
    id: 'proj-002',
    clientId: 'koekjes',
    name: 'Google Ads Campagne',
    description: 'Opzet en beheer zoekadvertentiecampagnes',
    status: 'actief',
    budgetHours: 20,
    spentHours: 9,
    startDate: '2024-04-15',
    endDate: '2024-07-15',
    consultants: ['lars'],
    color: '#E85D04',
  },
  {
    id: 'proj-003',
    clientId: 'techflow',
    name: 'Google Ads Schaalvergroting',
    description: 'Performance Max + Shopping campagnes',
    status: 'actief',
    budgetHours: 20,
    spentHours: 12,
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    consultants: ['lars'],
    color: '#2563EB',
  },
  {
    id: 'proj-004',
    clientId: 'techflow',
    name: 'SEO Technische Migratie',
    description: 'Domeinmigratie begeleiding + technische checks',
    status: 'afgerond',
    budgetHours: 30,
    spentHours: 29,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    consultants: ['rachid'],
    color: '#2563EB',
  },
  {
    id: 'proj-005',
    clientId: 'greenleaf',
    name: 'Content Marketing Q2',
    description: 'Blogartikelen, social posts en e-mailcampagnes',
    status: 'actief',
    budgetHours: 20,
    spentHours: 22,
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    consultants: ['aisha'],
    color: '#16A34A',
  },
  {
    id: 'proj-006',
    clientId: 'greenleaf',
    name: 'Social Media Strategie',
    description: 'Kanaalstrategie + content planning',
    status: 'concept',
    budgetHours: 15,
    spentHours: 0,
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    consultants: ['aisha', 'rachid'],
    color: '#16A34A',
  },
]

// ─── TASKS ────────────────────────────────────────────────────────────────────
export const tasks = [
  { id: 't001', projectId: 'proj-001', title: 'Technische SEO audit', status: 'actief', assignee: 'rachid', hours: 8 },
  { id: 't002', projectId: 'proj-001', title: 'Keyword-onderzoek', status: 'afgerond', assignee: 'aisha', hours: 6 },
  { id: 't003', projectId: 'proj-001', title: 'On-page optimalisatie', status: 'actief', assignee: 'aisha', hours: 10 },
  { id: 't004', projectId: 'proj-001', title: 'Linkbuilding outreach', status: 'openstaand', assignee: 'rachid', hours: 5 },
  { id: 't005', projectId: 'proj-002', title: 'Campagne-opzet', status: 'afgerond', assignee: 'lars', hours: 4 },
  { id: 't006', projectId: 'proj-002', title: 'A/B-testen advertenties', status: 'actief', assignee: 'lars', hours: 3 },
  { id: 't007', projectId: 'proj-003', title: 'Performance Max opzet', status: 'actief', assignee: 'lars', hours: 7 },
  { id: 't008', projectId: 'proj-003', title: 'Shopping feed optimalisatie', status: 'actief', assignee: 'lars', hours: 5 },
  { id: 't009', projectId: 'proj-005', title: 'Contentkalender maken', status: 'afgerond', assignee: 'aisha', hours: 4 },
  { id: 't010', projectId: 'proj-005', title: 'Blogartikelen schrijven (4x)', status: 'actief', assignee: 'aisha', hours: 12 },
]

// ─── TIME ENTRIES ─────────────────────────────────────────────────────────────
export const timeEntries = [
  { id: 'te001', projectId: 'proj-001', consultantId: 'rachid', date: '2024-04-15', hours: 3.5, description: 'Technische SEO audit - crawl analyse', billable: true },
  { id: 'te002', projectId: 'proj-001', consultantId: 'aisha', date: '2024-04-15', hours: 2.0, description: 'Keyword-onderzoek - competitor gap', billable: true },
  { id: 'te003', projectId: 'proj-001', consultantId: 'rachid', date: '2024-04-14', hours: 4.0, description: 'Core Web Vitals analyse', billable: true },
  { id: 'te004', projectId: 'proj-002', consultantId: 'lars', date: '2024-04-15', hours: 2.5, description: 'Google Ads account audit', billable: true },
  { id: 'te005', projectId: 'proj-003', consultantId: 'lars', date: '2024-04-14', hours: 3.0, description: 'Performance Max campagne opzet', billable: true },
  { id: 'te006', projectId: 'proj-005', consultantId: 'aisha', date: '2024-04-13', hours: 4.5, description: 'Contentkalender Q2 uitwerken', billable: true },
  { id: 'te007', projectId: 'proj-001', consultantId: 'aisha', date: '2024-04-12', hours: 3.0, description: 'On-page optimalisatie product pagina\'s', billable: true },
  { id: 'te008', projectId: 'proj-003', consultantId: 'lars', date: '2024-04-12', hours: 2.0, description: 'Shopping feed foutanalyse', billable: true },
  { id: 'te009', projectId: 'proj-005', consultantId: 'aisha', date: '2024-04-11', hours: 5.5, description: 'Blogartikel 1 schrijven + publiceren', billable: true },
  { id: 'te010', projectId: 'proj-001', consultantId: 'rachid', date: '2024-04-10', hours: 2.0, description: 'Backlink profiel analyse', billable: true },
]

// ─── INVOICES ─────────────────────────────────────────────────────────────────
export const invoices = [
  { id: 'inv-2024-028', clientId: 'koekjes', amount: 3200, status: 'betaald', date: '2024-03-01', dueDate: '2024-03-31', description: 'SEO Optimalisatie Maart 2024', paidDate: '2024-03-28' },
  { id: 'inv-2024-031', clientId: 'koekjes', amount: 2800, status: 'open', date: '2024-04-01', dueDate: '2024-04-30', description: 'SEO + Google Ads April 2024', paidDate: null },
  { id: 'inv-2024-029', clientId: 'techflow', amount: 4100, status: 'betaald', date: '2024-03-01', dueDate: '2024-03-31', description: 'Google Ads + SEO Migratie Maart 2024', paidDate: '2024-03-25' },
  { id: 'inv-2024-032', clientId: 'techflow', amount: 2100, status: 'te_laat', date: '2024-03-15', dueDate: '2024-04-14', description: 'Google Ads Beheer Q1 Restant', paidDate: null },
  { id: 'inv-2024-030', clientId: 'greenleaf', amount: 1800, status: 'betaald', date: '2024-03-01', dueDate: '2024-03-31', description: 'Content Marketing Maart 2024', paidDate: '2024-04-02' },
  { id: 'inv-2024-033', clientId: 'greenleaf', amount: 2200, status: 'open', date: '2024-04-01', dueDate: '2024-04-30', description: 'Content Marketing April 2024', paidDate: null },
  { id: 'inv-2024-034', clientId: 'koekjes', amount: 1500, status: 'open', date: '2024-04-10', dueDate: '2024-05-10', description: 'Google Ads Extra Budget April', paidDate: null },
]

// ─── DELIVERABLES ─────────────────────────────────────────────────────────────
export const deliverables = [
  { id: 'del-001', clientId: 'koekjes', projectId: 'proj-001', title: 'SEO Audit Rapport Q1 2024', type: 'rapport', uploadDate: '2024-04-10', url: '#', size: '2.4 MB' },
  { id: 'del-002', clientId: 'koekjes', projectId: 'proj-001', title: 'Keyword Research Document', type: 'document', uploadDate: '2024-04-08', url: '#', size: '890 KB' },
  { id: 'del-003', clientId: 'koekjes', projectId: 'proj-002', title: 'Google Ads Maandrapportage April', type: 'rapport', uploadDate: '2024-04-14', url: '#', size: '1.1 MB' },
  { id: 'del-004', clientId: 'techflow', projectId: 'proj-003', title: 'Performance Max Campagne Setup', type: 'document', uploadDate: '2024-04-12', url: '#', size: '450 KB' },
  { id: 'del-005', clientId: 'techflow', projectId: 'proj-004', title: 'Migratie Eindrapport', type: 'rapport', uploadDate: '2024-03-28', url: '#', size: '3.2 MB' },
  { id: 'del-006', clientId: 'greenleaf', projectId: 'proj-005', title: 'Contentkalender Q2 2024', type: 'planning', uploadDate: '2024-04-05', url: '#', size: '320 KB' },
  { id: 'del-007', clientId: 'greenleaf', projectId: 'proj-005', title: 'Blogartikelen Week 1-2', type: 'content', uploadDate: '2024-04-13', url: '#', size: '180 KB' },
]

// ─── KPIs ─────────────────────────────────────────────────────────────────────
export const kpis = [
  // Koekjesfabriek
  { id: 'kpi-001', clientId: 'koekjes', channel: 'SEO', metric: 'Organisch verkeer', unit: 'bezoekers/mnd',
    data: [
      { month: 'Nov', value: 4200 }, { month: 'Dec', value: 3900 }, { month: 'Jan', value: 4100 },
      { month: 'Feb', value: 4500 }, { month: 'Mrt', value: 5100 }, { month: 'Apr', value: 5720 },
    ],
    trend: 12, goal: 6000, goalDeadline: '2024-06-30',
  },
  { id: 'kpi-002', clientId: 'koekjes', channel: 'Google Ads', metric: 'ROAS', unit: 'x',
    data: [
      { month: 'Nov', value: 3.2 }, { month: 'Dec', value: 3.8 }, { month: 'Jan', value: 3.5 },
      { month: 'Feb', value: 3.9 }, { month: 'Mrt', value: 4.1 }, { month: 'Apr', value: 4.43 },
    ],
    trend: 8, goal: 5.0, goalDeadline: '2024-07-31',
  },
  { id: 'kpi-003', clientId: 'koekjes', channel: 'Social', metric: 'Bereik', unit: 'personen',
    data: [
      { month: 'Nov', value: 12000 }, { month: 'Dec', value: 14500 }, { month: 'Jan', value: 11000 },
      { month: 'Feb', value: 10500 }, { month: 'Mrt', value: 9800 }, { month: 'Apr', value: 9500 },
    ],
    trend: -3, goal: 15000, goalDeadline: '2024-08-31',
  },
  // TechFlow
  { id: 'kpi-004', clientId: 'techflow', channel: 'SEO', metric: 'Organisch verkeer', unit: 'bezoekers/mnd',
    data: [
      { month: 'Nov', value: 8200 }, { month: 'Dec', value: 8500 }, { month: 'Jan', value: 9100 },
      { month: 'Feb', value: 9800 }, { month: 'Mrt', value: 10400 }, { month: 'Apr', value: 11200 },
    ],
    trend: 18, goal: 15000, goalDeadline: '2024-09-30',
  },
  { id: 'kpi-005', clientId: 'techflow', channel: 'Google Ads', metric: 'CPA', unit: '€',
    data: [
      { month: 'Nov', value: 42 }, { month: 'Dec', value: 38 }, { month: 'Jan', value: 35 },
      { month: 'Feb', value: 31 }, { month: 'Mrt', value: 28 }, { month: 'Apr', value: 25 },
    ],
    trend: 10, goal: 20, goalDeadline: '2024-06-30',
  },
  // GreenLeaf
  { id: 'kpi-006', clientId: 'greenleaf', channel: 'SEO', metric: 'Organisch verkeer', unit: 'bezoekers/mnd',
    data: [
      { month: 'Nov', value: 2100 }, { month: 'Dec', value: 2300 }, { month: 'Jan', value: 2400 },
      { month: 'Feb', value: 2600 }, { month: 'Mrt', value: 2850 }, { month: 'Apr', value: 3020 },
    ],
    trend: 14, goal: 4000, goalDeadline: '2024-08-31',
  },
  { id: 'kpi-007', clientId: 'greenleaf', channel: 'Email', metric: 'Open rate', unit: '%',
    data: [
      { month: 'Nov', value: 22 }, { month: 'Dec', value: 24 }, { month: 'Jan', value: 26 },
      { month: 'Feb', value: 25 }, { month: 'Mrt', value: 27 }, { month: 'Apr', value: 29 },
    ],
    trend: 7, goal: 35, goalDeadline: '2024-09-30',
  },
]

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
export const notifications = [
  { id: 'n001', title: 'Nieuwe factuur beschikbaar', body: 'Factuur #inv-2024-031 is klaar — €2.800', time: '10 min geleden', read: false, icon: '📄' },
  { id: 'n002', title: 'Oplevering geüpload', body: 'SEO Rapport Q1 2024 staat klaar in de portal', time: '2 uur geleden', read: false, icon: '📦' },
  { id: 'n003', title: '80% urenbudget bereikt', body: 'TechFlow Google Ads — 16/20 uur verbruikt', time: '5 uur geleden', read: false, icon: '🟠' },
  { id: 'n004', title: 'Support ticket bijgewerkt', body: 'Ticket #SUP-042 heeft een nieuwe reactie', time: 'Gisteren 14:32', read: true, icon: '💬' },
  { id: 'n005', title: 'Factuur #2024-031 betaald', body: 'Koekjesfabriek heeft €3.200 overgemaakt', time: 'Gisteren 09:15', read: true, icon: '✅' },
]

// ─── SUPPORT TICKETS ──────────────────────────────────────────────────────────
export const supportTickets = [
  { id: 'SUP-041', clientId: 'koekjes', subject: 'Vraag over rankingdaling week 14', status: 'open', date: '2024-04-14', lastUpdate: '2024-04-15' },
  { id: 'SUP-042', clientId: 'koekjes', subject: 'Rapportage niet zichtbaar in portal', status: 'in_behandeling', date: '2024-04-10', lastUpdate: '2024-04-15' },
  { id: 'SUP-039', clientId: 'techflow', subject: 'Hogere CPC dan verwacht', status: 'gesloten', date: '2024-04-05', lastUpdate: '2024-04-09' },
  { id: 'SUP-040', clientId: 'greenleaf', subject: 'Content aanpassing blogartikel 2', status: 'open', date: '2024-04-12', lastUpdate: '2024-04-12' },
]

// ─── ADMIN STATS ──────────────────────────────────────────────────────────────
export const adminStats = {
  revenueThisMonth: 18400,
  openInvoicesAmount: 6200,
  openInvoicesCount: 3,
  overdueAmount: 2100,
  overdueCount: 1,
  hoursThisMonth: 247,
  revenueByMonth: [
    { month: 'Nov', revenue: 14200 },
    { month: 'Dec', revenue: 16500 },
    { month: 'Jan', revenue: 15800 },
    { month: 'Feb', revenue: 17200 },
    { month: 'Mrt', revenue: 16900 },
    { month: 'Apr', revenue: 18400 },
  ],
  hoursByConsultant: [
    { name: 'Rachid', hours: 98 },
    { name: 'Aïsha', hours: 87 },
    { name: 'Lars', hours: 62 },
  ],
  topClientsByHours: [
    { client: 'Koekjesfabriek', hours: 112, revenue: 7800 },
    { client: 'TechFlow', hours: 89, revenue: 6800 },
    { client: 'GreenLeaf', hours: 46, revenue: 3800 },
  ],
  capacityMatrix: [
    { consultant: 'Rachid', 'SEO Koekjes': 12, 'SEO TechFlow': 8, 'Content GreenLeaf': 0, 'Ads Koekjes': 0, 'Ads TechFlow': 0 },
    { consultant: 'Aïsha',  'SEO Koekjes': 8,  'SEO TechFlow': 0, 'Content GreenLeaf': 14, 'Ads Koekjes': 0, 'Ads TechFlow': 0 },
    { consultant: 'Lars',   'SEO Koekjes': 0,  'SEO TechFlow': 0, 'Content GreenLeaf': 0, 'Ads Koekjes': 6, 'Ads TechFlow': 10 },
  ],
}
