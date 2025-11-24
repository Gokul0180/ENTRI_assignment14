import React, { useState } from 'react'
import api from '../api'

export default function CustomerTable({ customers = [], onUpdated, onDeleted }) {
  const [query, setQuery] = useState('')

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(query.toLowerCase()) ||
    (c.company || '').toLowerCase().includes(query.toLowerCase())
  )

  const handleDelete = async (id) => {
    if (!confirm('Delete this customer?')) return
    try {
      await api.delete(`/customers/${id}`)
      onDeleted(id)
    } catch (err) {
      console.error(err)
      alert('Delete failed')
    }
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search customers..." className="rounded border px-3 py-2 w-64" />
        <div className="text-sm text-gray-500">{filtered.length} results</div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="text-sm text-gray-600">
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Phone</th>
              <th className="py-2">Company</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c._id} className="border-t">
                <td className="py-3">{c.name}</td>
                <td className="py-3">{c.email}</td>
                <td className="py-3">{c.phone}</td>
                <td className="py-3">{c.company}</td>
                <td className="py-3">
                  <button onClick={() => onUpdated(c)} className="text-sm text-teal-600 mr-2">Edit</button>
                  <button onClick={() => handleDelete(c._id)} className="text-sm text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
