import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export default function Dashboard() {
  const [stats, setStats] = useState({ articles: 0, users: 0, categories: 0 })

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`\${API_URL}/articles`, {
      headers: { Authorization: `Bearer \${token}` }
    })
      .then(res => setStats(prev => ({ ...prev, articles: res.data.total })))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', color: '#3b82f6' }}>{stats.articles}</h3>
          <p>Articles</p>
        </div>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', color: '#10b981' }}>{stats.users}</h3>
          <p>Users</p>
        </div>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', color: '#f59e0b' }}>{stats.categories}</h3>
          <p>Categories</p>
        </div>
      </div>
    </div>
  )
}