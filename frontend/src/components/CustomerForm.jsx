import React, { useState } from 'react'
import api from '../api'

export default function CustomerForm({ initial = null, onSaved, onClose }) {
  const [form, setForm] = useState(initial || { name: '', email: '', phone: '', company: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (initial) {
        const res = await api.put(`/customers/${initial._id}`, form)
        onSaved(res.data)
      } else {
        const res = await api.post('/customers', form)
        onSaved(res.data)
      }
      onClose?.()
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      {error && <div className="text-red-600">{error}</div>}

      <div>
        <label className="block text-sm">Name</label>
        <input name="name" value={form.name} onChange={onChange} required className="mt-1 block w-full rounded-md border-gray-300" />
      </div>

      <div>
        <label className="block text-sm">Email</label>
        <input name="email" value={form.email} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300" />
      </div>

      <div>
        <label className="block text-sm">Phone</label>
        <input name="phone" value={form.phone} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300" />
      </div>

      <div>
        <label className="block text-sm">Company</label>
        <input name="company" value={form.company} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300" />
      </div>

      <div>
        <label className="block text-sm">Notes</label>
        <textarea name="notes" value={form.notes} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300" />
      </div>

      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="py-2 px-4 bg-teal-500 text-white rounded">{initial ? 'Save' : 'Add'}</button>
        <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-100 rounded">Cancel</button>
      </div>
    </form>
  )
}
