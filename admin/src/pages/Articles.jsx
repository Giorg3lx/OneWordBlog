import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', category: '', tags: '' })

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = () => {
    const token = localStorage.getItem('token')
    axios.get(`\${API_URL}/articles`, {
      headers: { Authorization: `Bearer \${token}` }
    })
      .then(res => setArticles(res.data.articles))
      .catch(err => console.error(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    axios.post(`\${API_URL}/articles`, {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim())
    }, {
      headers: { Authorization: `Bearer \${token}` }
    })
      .then(() => {
        setFormData({ title: '', excerpt: '', content: '', category: '', tags: '' })
        setShowForm(false)
        fetchArticles()
      })
      .catch(err => console.error(err))
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure?')) {
      const token = localStorage.getItem('token')
      axios.delete(`\${API_URL}/articles/\${id}`, {
        headers: { Authorization: `Bearer \${token}` }
      })
        .then(() => fetchArticles())
        .catch(err => console.error(err))
    }
  }

  return (
    <div>
      <div className="header">
        <h1>Articles</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Article'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <h2>Create Article</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Excerpt</label>
              <input
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Tags (comma-separated)</label>
              <input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">Create Article</button>
          </form>
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article._id}>
                <td>{article.title}</td>
                <td>{article.published ? 'Published' : 'Draft'}</td>
                <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(article._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}