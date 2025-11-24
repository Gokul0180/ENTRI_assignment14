import React, { useState, useContext } from 'react'
import api from '../api'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    setError(null)
    try {
      const res = await api.post('/auth/login', form)
      login(res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto my-24 bg-white p-8 rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4">Welcome back</h2>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input name="email" value={form.email} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300" />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input name="password" type="password" value={form.password} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300" />
        </div>

        <button className="w-full py-2 bg-teal-500 text-white rounded-md">Login</button>
      </form>

      <p className="mt-4 text-sm">
        Don't have an account? <Link to="/register" className="text-teal-600">Register</Link>
      </p>
    </div>
  )
}
