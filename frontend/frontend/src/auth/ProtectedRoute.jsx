import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <div className="p-6">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}
