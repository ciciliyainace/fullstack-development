# Deployment

This project is configured for Vercel as a Vite SPA. To redeploy after these fixes:

## Git Commands

```bash
git add .
git commit -m "Fix Vercel deployment"
git push origin main
```

## Vercel Settings

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Root Directory: `.`
