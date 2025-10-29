import { Pencil, Trash2 } from 'lucide-react'

function ContentCard({ item, onEdit, onDelete }) {
  return (
    <div className="group border rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-gray-900 line-clamp-1">{item.title}</div>
          <div className="mt-1 text-xs text-gray-500 line-clamp-2">{item.excerpt}</div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(item)}
            className="p-2 rounded-md text-blue-600 hover:bg-blue-50"
            aria-label="Edit"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 rounded-md text-red-600 hover:bg-red-50"
            aria-label="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="mt-3 text-[11px] text-gray-400">
        <span>Updated {new Date(item.updatedAt).toLocaleString()}</span>
      </div>
    </div>
  )
}

export default function ContentList({ items, onEdit, onDelete }) {
  if (!items.length) {
    return (
      <div className="text-center py-16 text-gray-500">
        No content yet. Click "New Entry" to add your first item.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <ContentCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
