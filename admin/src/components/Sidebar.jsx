import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    window.location.reload()
  }

  return (
    <div className="sidebar">
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #374151', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem' }}>OneWordBlog</h2>
        <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>CMS Admin</p>
      </div>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/users">Users</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      <div style={{ marginTop: '2rem', borderTop: '1px solid #374151', paddingTop: '1rem' }}>
        <button onClick={handleLogout} className="btn btn-danger" style={{ width: '90%', margin: '0 1rem' }}>
          Logout
        </button>
      </div>
    </div>
  )
}