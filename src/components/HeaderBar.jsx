import { Menu, Search } from 'lucide-react'
import { useState } from 'react'

export default function HeaderBar({ title = 'Content', onSearch }) {
  const [query, setQuery] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
          <Menu size={18} />
        </button>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 flex-1">{title}</h1>
        <form onSubmit={submit} className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search content..."
            className="pl-9 pr-3 py-2 w-64 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>
    </header>
  )
}
