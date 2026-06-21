# kevinlu1248.github.io

Personal website and blog for Kevin Lu, live at **https://kevinlu1248.github.io**.

Built with [Astro](https://astro.build) (content in Markdown / MDX) and deployed to
GitHub Pages automatically via GitHub Actions on every push to `main`.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
```

## Build

```sh
npm run build    # outputs to ./dist
npm run preview  # preview the production build
```

## Writing a post

Add a `.md` or `.mdx` file to `src/content/blog/`. Frontmatter:

```yaml
---
title: 'Post title'
description: 'Short summary used in listings and meta tags.'
pubDate: 'Jun 20 2026'
heroImage: '../../assets/blog-placeholder-1.jpg' # optional
---
```

## Project layout

- `src/pages/` — routes (`index.astro` home, `about.astro`, `blog/`)
- `src/content/blog/` — blog posts (Markdown / MDX)
- `src/components/` — header, footer, shared UI
- `src/consts.ts` — site title and description
- `.github/workflows/deploy.yml` — GitHub Pages deploy
