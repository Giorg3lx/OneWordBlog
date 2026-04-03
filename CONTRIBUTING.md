# Contributing to OneWordBlog

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/OneWordBlog.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Install dependencies: `npm install`

## Development

Start all services:
```bash
npm run dev
```

Or run individual services:
```bash
npm run server    # Backend
npm run client    # Frontend
npm run admin     # Admin CMS
```

## Making Changes

1. Create a feature branch
2. Make your changes
3. Test locally
4. Commit with descriptive messages
5. Push to your fork
6. Create a Pull Request

## Code Style

- Use ES6+ syntax
- Use consistent naming conventions
- Add comments for complex logic
- Format code with proper indentation

## Testing

Run tests before submitting a PR:
```bash
npm run test
```

## Deployment

```bash
npm run build
docker-compose up --build
```

Thank you for contributing!