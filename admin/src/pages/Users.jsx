import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`\${API_URL}/users`, {
      headers: { Authorization: `Bearer \${token}` }
    })
      .then(res => setUsers(res.data.users))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}