# AI-Powered E-Commerce Product Catalog

A modern production-ready e-commerce catalog built with React, Vite, and REST API integration. It includes SPA navigation, search and filter controls, cart state persistence, dark mode, responsive design, and SEO-ready metadata.

## Features

- Product catalog from `https://fakestoreapi.com`
- Client-side routing with React Router
- Product details pages with dynamic route params
- Search by title or category
- Category filters
- Shopping cart with quantity controls and localStorage persistence
- Dark mode toggle with theme persistence
- Responsive design using CSS Grid and Flexbox
- SEO metadata, Open Graph and Twitter tags
- Error states and friendly 404 page
- Deployment-ready build with Vite

## Folder Structure

```
src/
  components/
  hooks/
  pages/
  services/
  styles/
public/
  robots.txt
  sitemap.xml
index.html
package.json
vite.config.js
```

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run serve
```

## Deployment

### Vercel

1. Install Vercel CLI if needed: `npm i -g vercel`
2. Run `vercel` and follow prompts

### Netlify

1. Set build command: `npm run build`
2. Set publish directory: `dist`
3. Deploy from repository or drag-and-drop 

### Render

1. Create a new static site
2. Use `npm run build`
3. Publish the `dist` directory

## Notes

- Replace placeholder URLs in `index.html` and `public/sitemap.xml` with your actual site URL.
- The app is built for production with SEO-friendly meta tags and accessibility best practices.
- Cart state persists across refreshes using `localStorage`.
