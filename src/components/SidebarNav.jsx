import { Home, FileText, Settings, Plus, LogOut } from 'lucide-react'

function NavItem({ icon: Icon, label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  )
}

export default function SidebarNav({ onCreate }) {
  return (
    <aside className="h-full w-64 border-r bg-white p-4 flex flex-col">
      <div className="mb-6">
        <div className="text-xl font-bold tracking-tight">Flames CMS</div>
        <p className="text-xs text-gray-500">Manage your content with ease</p>
      </div>

      <div className="space-y-2 flex-1">
        <NavItem icon={Home} label="Dashboard" active onClick={() => {}} />
        <NavItem icon={FileText} label="Posts" onClick={() => {}} />
        <NavItem icon={Settings} label="Settings" onClick={() => {}} />
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={onCreate}
          className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-2 rounded-md"
        >
          <Plus size={16} /> New Entry
        </button>
        <button className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-2 rounded-md">
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </aside>
  )
}
