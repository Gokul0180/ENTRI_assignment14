import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ className = '' }) {
  return (
    <aside className={`bg-white w-64 border-r hidden md:block ${className}`}>
      <div className="p-4 border-b">
        <h2 className="font-semibold">Menu</h2>
      </div>

      <nav className="p-4 space-y-2">
        <NavLink to="/" end className={({isActive}) => isActive ? 'block p-2 rounded bg-teal-50' : 'block p-2 rounded hover:bg-gray-50'}>Dashboard</NavLink>
        <NavLink to="/" className={({isActive}) => isActive ? 'block p-2 rounded bg-teal-50' : 'block p-2 rounded hover:bg-gray-50'}>Customers</NavLink>
      </nav>
    </aside>
  )
}
