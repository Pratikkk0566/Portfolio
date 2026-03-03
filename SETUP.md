# Setup Guide

## Prerequisites

- Node.js 18+ installed
- Git installed
- GitHub account

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5000

## Git Setup

### First Time Configuration

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Initialize Repository

```bash
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit"
```

### Push to GitHub

```bash
# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Making Changes

```bash
# Check status
git status

# Add changes
git add .

# Commit with message
git commit -m "Your descriptive message"

# Push to GitHub
git push
```

## Build for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

## Environment Variables

Create `.env` file (optional):

```env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=development
```

Without `DATABASE_URL`, the app uses mock storage.

## Troubleshooting

### Port already in use
Change port in `server/index.ts` or kill the process using port 5000

### Build fails
```bash
npm run check  # Check for TypeScript errors
npm install    # Reinstall dependencies
```

### Database errors
The app works without a database using mock storage. To use a real database, set `DATABASE_URL` environment variable.

---

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
