import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'

const API_URL = import.meta.env.VITE_API_URL

export default function Category() {
  const { slug } = useParams()
  const [articles, setArticles] = useState([])
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch category and articles
    axios.get(`
  ${API_URL}/articles?category=${slug}
      `)
      .then(res => setArticles(res.data.articles))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="container">Loading...</div>

  return (
    <div className="container">
      <h1>Category: {slug}</h1>
      <div className="articles-grid">
        {articles.map(article => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  )
}