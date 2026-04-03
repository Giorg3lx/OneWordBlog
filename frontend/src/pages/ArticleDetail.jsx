import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export default function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`
  ${API_URL}/articles/${slug}
      `)
      .then(res => setArticle(res.data.article))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="container">Loading...</div>
  if (!article) return <div className="container">Article not found</div>

  return (
    <div className="container">
      <article>
        {article.featuredImage && <img src={article.featuredImage} alt={article.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', marginBottom: '2rem' }} />}
        <h1>{article.title}</h1>
        <div className="article-meta" style={{ marginBottom: '2rem', fontSize: '0.9rem', color: '#666' }}>
          <span>By {article.author?.name}</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <span>{article.viewCount} views</span>
        </div>
        <div style={{ lineHeight: '1.8', fontSize: '1.05rem' }} dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </div>
  )
}