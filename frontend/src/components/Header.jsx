import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <div className="container">
        <nav>
          <Link to="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
            OneWordBlog
          </Link>
          <div>
            <Link to="/">Home</Link>
            <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">CMS</a>
          </div>
        </nav>
      </div>
    </header>
  )
}