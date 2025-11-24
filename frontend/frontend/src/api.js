import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
})

// attach token automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers['x-auth-token'] = token
  return config
})

export default api
