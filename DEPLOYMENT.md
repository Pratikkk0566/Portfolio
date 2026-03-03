# Deployment Guide

## Quick Deploy to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

### Configuration

Vercel will auto-detect settings. If needed:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Environment Variables (Optional)

If using a database, add in Vercel dashboard:
- `DATABASE_URL` - Your PostgreSQL connection string

Without it, the app uses mock storage (perfect for demo).

## Alternative: Manual Deployment

```bash
# Build locally
npm run build

# The dist/ folder contains your production build
# Upload to any static hosting service
```

## Post-Deployment

- Test all pages work
- Check mobile responsiveness
- Verify contact form
- Test project links

Your portfolio will be live at: `https://your-project.vercel.app`

## Custom Domain

In Vercel dashboard:
1. Go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration steps

---

For issues, check Vercel deployment logs or GitHub Actions.
