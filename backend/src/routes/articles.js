import express from 'express';
import Article from '../models/Article.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all published articles
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const skip = (page - 1) * limit;

    const query = { published: true };
    if (category) query.category = category;
    if (search) query.$text = { $search: search };

    const articles = await Article.find(query)
      .populate('author', 'name avatar')
      .populate('category', 'name slug')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Article.countDocuments(query);

    res.json({ success: true, articles, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get article by slug
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug, published: true })
      .populate('author', 'name avatar bio')
      .populate('category', 'name slug');

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    article.viewCount++;
    await article.save();

    res.json({ success: true, article });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create article (authenticated)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, excerpt, content, category, tags, featured } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-');

    const article = new Article({
      title,
      slug,
      excerpt,
      content,
      category,
      tags: tags || [],
      featured: featured || false,
      author: req.user.id
    });

    await article.save();
    res.status(201).json({ success: true, article });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update article (authenticated)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    if (article.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    Object.assign(article, req.body);
    article.updatedAt = Date.now();
    await article.save();

    res.json({ success: true, article });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete article (authenticated)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    if (article.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    await Article.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
