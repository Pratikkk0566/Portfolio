# Vercel Deployment Troubleshooting

## Common Errors & Solutions

### Error 1: "Build Failed"

**Symptoms:**
- Build command fails
- TypeScript errors
- Missing dependencies

**Solutions:**

1. **Check build locally:**
```bash
npm run build
```

2. **If build fails locally, fix errors first**

3. **Check Vercel build settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Error 2: "Module not found"

**Symptoms:**
- "Cannot find module 'xxx'"
- Import errors

**Solutions:**

1. **Ensure all dependencies are in package.json:**
```bash
npm install
```

2. **Check if dependency is in devDependencies but should be in dependencies**

3. **Rebuild:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Error 3: "Function Invocation Failed"

**Symptoms:**
- API routes return 500
- Server errors

**Solutions:**

1. **This is a full-stack app, not serverless**
2. **Vercel might not support this architecture well**
3. **Alternative: Deploy to Railway, Render, or Fly.io**

### Error 4: "404 Not Found"

**Symptoms:**
- Pages don't load
- Routing issues

**Solutions:**

1. **Check vercel.json routing configuration**
2. **Ensure dist/public folder exists after build**

## Alternative: Deploy to Railway

If Vercel doesn't work well for this full-stack app:

### Railway Deployment (Recommended)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your Portfolio repository
6. Railway auto-detects and deploys
7. Your app is live!

**Why Railway?**
- Better for full-stack apps
- Supports Node.js servers
- Free tier available
- Automatic HTTPS

### Render Deployment

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your Portfolio repository
5. Settings:
   - Build Command: `npm run build`
   - Start Command: `npm start`
6. Click "Create Web Service"

## Vercel-Specific Issues

### Issue: This is a Full-Stack App

Your portfolio is:
- Frontend: React (static)
- Backend: Express server (dynamic)

**Vercel is optimized for:**
- Static sites
- Serverless functions
- Next.js apps

**Your app needs:**
- A running Node.js server
- WebSocket support (potentially)
- Long-running processes

### Recommended Platforms

**Best for your app:**
1. **Railway** - Easiest, auto-detects everything
2. **Render** - Free tier, good for full-stack
3. **Fly.io** - Fast, global deployment
4. **Heroku** - Classic, reliable

**Not ideal:**
- Vercel (serverless-focused)
- Netlify (static-focused)

## Quick Fix: Try Railway

```bash
# No configuration needed!
# Just connect GitHub and deploy
```

1. https://railway.app
2. New Project → Deploy from GitHub
3. Select Portfolio repo
4. Done! 🎉

## If You Must Use Vercel

Try this simplified vercel.json:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

But note: Vercel might not support the Express server properly.

## Check Deployment Logs

In Vercel dashboard:
1. Go to your project
2. Click on the failed deployment
3. View "Build Logs"
4. Look for error messages
5. Share the error here for help

## Need Help?

Share:
1. The error message from Vercel
2. Build logs (if available)
3. Screenshot of the error

I'll help you fix it or suggest the best alternative platform!

---

**TL;DR: Railway or Render are better for this full-stack app than Vercel.**
