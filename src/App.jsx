import { useMemo, useState } from 'react'
import SidebarNav from './components/SidebarNav'
import HeaderBar from './components/HeaderBar'
import ContentList from './components/ContentList'
import ContentEditor from './components/ContentEditor'

function generateExcerpt(text, length = 120) {
  const plain = text.replace(/\n+/g, ' ').trim()
  return plain.length > length ? plain.slice(0, length) + '…' : plain
}

export default function App() {
  const [items, setItems] = useState(() => [
    {
      id: crypto.randomUUID(),
      title: 'Getting started with Flames CMS',
      body: 'This is your lightweight CMS interface. Create, edit, and manage content effortlessly. When you connect a backend, these items will persist in a database. For now, they live in your browser state.',
      updatedAt: Date.now() - 1000 * 60 * 60 * 2,
    },
    {
      id: crypto.randomUUID(),
      title: 'Design system and typography',
      body: 'Tailwind utilities are ready to go. Use consistent spacing, color, and typography to keep content clean and readable. Keep titles concise and bodies scannable.',
      updatedAt: Date.now() - 1000 * 60 * 20,
    },
  ])
  const [query, setQuery] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return items
      .filter((i) => i.title.toLowerCase().includes(q) || i.body.toLowerCase().includes(q))
      .map((i) => ({ ...i, excerpt: generateExcerpt(i.body) }))
  }, [items, query])

  const openCreate = () => {
    setEditing(null)
    setEditorOpen(true)
  }

  const openEdit = (item) => {
    setEditing(item)
    setEditorOpen(true)
  }

  const closeEditor = () => setEditorOpen(false)

  const saveItem = (payload) => {
    if (payload.id) {
      setItems((prev) => prev.map((i) => (i.id === payload.id ? { ...i, ...payload, updatedAt: Date.now() } : i)))
    } else {
      setItems((prev) => [
        {
          id: crypto.randomUUID(),
          title: payload.title,
          body: payload.body,
          updatedAt: Date.now(),
        },
        ...prev,
      ])
    }
    setEditorOpen(false)
  }

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="flex h-screen max-h-screen">
        <SidebarNav onCreate={openCreate} />

        <main className="flex-1 flex flex-col overflow-hidden">
          <HeaderBar title="Content" onSearch={setQuery} />

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">All entries</h2>
                  <p className="text-sm text-gray-500">Create, edit, and organize your site content.</p>
                </div>
                <button
                  onClick={openCreate}
                  className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                >
                  New Entry
                </button>
              </div>

              <ContentList items={filtered} onEdit={openEdit} onDelete={deleteItem} />
            </div>
          </div>
        </main>
      </div>

      <ContentEditor open={editorOpen} initial={editing} onCancel={closeEditor} onSave={saveItem} />
    </div>
  )
}
