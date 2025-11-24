import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import CustomerForm from '../components/CustomerForm'
import CustomerTable from '../components/CustomerTable'
import Modal from '../components/Modal'
import api from '../api'

export default function Dashboard() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const fetchCustomers = async () => {
    try {
      const res = await api.get('/customers')
      setCustomers(res.data)
    } catch (err) {
      console.error(err)
      alert('Failed to load customers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCustomers() }, [])

  const addCustomer = (c) => setCustomers(prev => [c, ...prev])
  const updateCustomer = (u) => setCustomers(prev => prev.map(c => c._id === u._id ? u : c))
  const deleteCustomer = (id) => setCustomers(prev => prev.filter(c => c._id !== id))

  return (
    <>
      {/* Sidebar for md+ */}
      <Sidebar />

      <div className="flex-1 min-h-screen flex flex-col">
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Customers</h2>
            <div>
              <button onClick={() => { setEditing(null); setOpen(true) }} className="py-2 px-4 bg-teal-500 text-white rounded">Add Customer</button>
            </div>
          </div>

          {loading ? <div>Loading...</div> : (
            <>
              <CustomerTable customers={customers} onUpdated={(c) => { setEditing(c); setOpen(true) }} onDeleted={deleteCustomer} />
            </>
          )}
        </main>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="text-lg font-semibold mb-3">{editing ? 'Edit Customer' : 'Add Customer'}</h3>
        <CustomerForm initial={editing} onSaved={(c) => { editing ? updateCustomer(c) : addCustomer(c) }} onClose={() => setOpen(false)} />
      </Modal>
    </>
  )
}
