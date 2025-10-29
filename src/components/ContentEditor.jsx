import { useEffect, useState } from 'react'

export default function ContentEditor({ open, initial, onCancel, onSave }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    if (open) {
      setTitle(initial?.title ?? '')
      setBody(initial?.body ?? '')
    }
  }, [open, initial])

  if (!open) return null

  const submit = (e) => {
    e.preventDefault()
    const payload = {
      ...initial,
      title: title.trim(),
      body: body.trim(),
    }
    onSave?.(payload)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white w-full max-w-xl rounded-lg shadow-lg">
        <div className="px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">{initial?.id ? 'Edit Entry' : 'New Entry'}</h2>
          <p className="text-xs text-gray-500">Write and publish content for your site.</p>
        </div>

        <form onSubmit={submit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Welcome to our blog"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your content here..."
              required
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-2 text-sm rounded-md border hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              {initial?.id ? 'Save Changes' : 'Create Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
