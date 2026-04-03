import { Link } from 'react-router-dom'

export default function ArticleCard({ article }) {
  return (
    <Link to={`/article/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="article-card">
        {article.featuredImage && <img src={article.featuredImage} alt={article.title} className="article-image" />}
        <div className="article-content">
          <h3 className="article-title">{article.title}</h3>
          <p className="article-excerpt">{article.excerpt}</p>
          <div className="article-meta">
            <span>{article.author?.name}</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}