# My Website ✨

This is my personal website and portfolio, built for [darwinmanalo.com](https://darwinmanalo.com). I use it to share selected projects, write technical articles, and give a clearer picture of how I think about software, product work, and engineering.

I wanted the site to feel simple, readable, and fast, while still leaving room for motion, multilingual support, and richer long-form content.

This is my `v1.0.0` release. 🎉

## What is in the site 🚀

The website currently includes:

- a homepage with animated hero text
- a projects section with detailed case studies
- an articles section for long-form technical writing
- an about page
- a not found page
- dark mode
- multilingual support

## Tech Stack 🛠️

I built this site with:

- React 19
- React Router 7
- Vite 6
- Tailwind CSS 4
- Framer Motion
- i18next and react-i18next
- ESLint 9
- GitHub Actions for deployment

## Internationalization 🌍

The site supports these languages:

- 🇺🇸 English
- 🇯🇵 Japanese
- 🇰🇷 Korean
- 🇨🇳 Chinese
- 🇪🇸 Spanish
- 🇮🇩 Indonesian
- 🇩🇪 German
- 🇷🇺 Russian
- 🇫🇷 French
- 🇵🇹 Portuguese
- 🇸🇦 Arabic

Translation files live in `src/locales`, and I load language bundles on demand.

## Routes 🧭

The main routes are:

- `/`
- `/projects`
- `/projects/:projectId`
- `/about`
- `/articles`
- `/articles/:articleId`

## Project Structure 📁

```text
.
├── public/                  # static assets, favicons, 404 page, CNAME
├── src/
│   ├── components/          # page components and shared UI
│   ├── constants/           # shared UI constants
│   ├── data/                # project/article metadata
│   ├── data/article-content # per-article content modules
│   ├── i18n/                # i18n bootstrap and language loading
│   ├── locales/             # translation JSON files
│   ├── utils/               # helper utilities
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .github/workflows/       # deployment workflow
├── index.html
├── vite.config.js
└── package.json
```

## Running it locally 💻

### Install dependencies 📦

```bash
npm install
```

### Start the dev server ▶️

```bash
npm run dev
```

### Build for production 🏗️

```bash
npm run build
```

### Preview the production build 👀

```bash
npm run preview
```

### Run lint ✅

```bash
npm run lint
```

## Deployment 🚢

The site is deployed through GitHub Pages using `.github/workflows/deploy.yml`.

On every push to `main`, the workflow:

1. installs dependencies with `npm ci`
2. builds the app with `npm run build`
3. uploads the `dist/` output
4. deploys the result to GitHub Pages

The custom domain is:

- `darwinmanalo.com`

## Styling notes 🎨

- Tailwind CSS 4 is configured through `src/index.css`
- Google Fonts are loaded in `index.html`
- Icons are rendered through `src/components/Icon.jsx`

## Performance work ⚡

I spent time keeping the site reasonably fast, especially on slower network profiles.

Some of the improvements currently in place:

- lazy-loaded route components
- on-demand locale loading instead of bundling every language up front
- per-article content splitting so article detail pages only load the article being viewed
- local SVG icons instead of an icon font
- lighter startup payload for content and translations

## Notes 📝

- Current version: `1.0.0`
- License: `MIT`
