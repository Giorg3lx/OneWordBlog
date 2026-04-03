import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    axios.get(`\${API_URL}/categories`)
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    axios.post(`\${API_URL}/categories`, { name }, {
      headers: { Authorization: `Bearer \${token}` }
    })
      .then(() => {
        setName('')
        fetchCategories()
      })
      .catch(err => console.error(err))
  }

  return (
    <div>
      <h1>Categories</h1>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ flex: 1 }}
              required
            />
            <button type="submit" className="btn btn-primary">Add Category</button>
          </div>
        </form>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat._id}>
                <td>{cat.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}