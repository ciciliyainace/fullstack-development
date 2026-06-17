# Deployment Checklist: AI E-Commerce Catalog

This document describes exact steps to deploy the Vite + React SPA to Vercel and troubleshoot common issues.

## Pre-reqs
- Git repository containing the project
- Vercel account
- Node.js (>=18), npm

## Recommended `package.json` scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Vercel Project Settings
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Root Directory: `.`

## `vercel.json` (already present)

```json
{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@vercel/static-build", "config": { "distDir": "dist" } }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This rewrite ensures the SPA handles client-side routes (React Router) without 404s.

## Quick Deploy Steps (Git)

```bash
# install deps
npm install

# run build locally to verify
npm run build

# commit changes
git add .
git commit -m "Fix deployment: vercel.json and scripts"

git push origin main
```

Then go to the Vercel dashboard, import the repository (if not already imported) and deploy.

## Quick Deploy Steps (Vercel CLI)

```bash
npm i -g vercel
vercel login
vercel --prod
```

When prompted, choose the correct project and accept the defaults. Ensure Build Command is `npm run build` and Output Directory is `dist`.

## Troubleshooting

- 404 on client routes: confirm `vercel.json` has the `rewrites` entry above, and that `index.html` exists in `dist` after build.
- Blank page or JS load errors: open browser console for missing / 404 assets; check that `dist/assets` files exist and that `index.html` references `/src/main.jsx` should be transformed by Vite to point to built assets (Vite's dev server uses /src imports; production build rewrites to bundled assets). If you see `/src/main.jsx` in production `dist/index.html`, run `npm run build` locally and inspect `dist/index.html` to ensure proper references.
- CORS/API errors: Ensure the API used by the app (fakestoreapi.com) is accessible from your deployed domain.

## Verify after deploy
1. Visit the Vercel URL
2. Navigate directly to a client route, e.g. `/products/1`
3. Ensure page loads without 404 and content appears
4. Check Lighthouse scores using Chrome DevTools → Lighthouse

## Useful commands

```bash
# Build locally
npm run build

# Preview production build on local server
npm run preview

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

If you want, I can trigger a build, inspect the built `dist/index.html`, and confirm the rewrites and asset references are correct before you redeploy to Vercel.
