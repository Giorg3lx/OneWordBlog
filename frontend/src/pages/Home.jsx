import { useState, useEffect } from 'react'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'

const API_URL = import.meta.env.VITE_API_URL

export default function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`
  ${API_URL}/articles
      `)
      .then(res => setArticles(res.data.articles))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="container">Loading...</div>

  return (
    <div className="container">
      <h1>Latest Articles</h1>
      <div className="articles-grid">
        {articles.map(article => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  )
}