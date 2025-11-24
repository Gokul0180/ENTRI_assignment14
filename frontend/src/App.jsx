import React, { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './auth/ProtectedRoute'
import { AuthContext } from './auth/AuthProvider'

export default function App() {
  const { user, logout } = useContext(AuthContext)
  // trigger deploy


  return (
    <div className="min-h-screen flex">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Dashboard onLogout={logout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}
