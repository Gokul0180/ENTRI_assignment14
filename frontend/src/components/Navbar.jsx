import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthProvider'

export default function Navbar({ onOpenSidebar }) {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className="flex items-center justify-between bg-white p-4 border-b">
      <div className="flex items-center gap-3">
        <button onClick={onOpenSidebar} className="md:hidden p-2 rounded hover:bg-gray-100">☰</button>
        <h1 className="text-xl font-semibold">MERN CRM</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">{user?.name}</div>
        <button className="text-sm text-red-500" onClick={logout}>Logout</button>
      </div>
    </header>
  )
}
