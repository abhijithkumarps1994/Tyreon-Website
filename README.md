# TYREON

A static, framework-free TYREON website built with HTML5, CSS3, and vanilla JavaScript.

## Structure

- `assets/css/main.css` — shared styling
- `assets/js/main.js` — shared client-side behaviour
- `assets/images/` — image assets
- `assets/icons/` — icons and app icons
- `assets/fonts/` — self-hosted fonts

## Local preview

Open `index.html` in a browser, or serve the project root with any static HTTP server.

## GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, select **Deploy from a branch**.
3. Choose the branch containing this project and the **/(root)** folder.

All asset links are relative, so the site supports deployment at a GitHub Pages project URL.

## Netlify

Import the repository in Netlify. The included `netlify.toml` uses the repository root as the publish directory and requires no build command.

Before production launch, replace `https://example.com/` in `robots.txt`, `sitemap.xml`, and `manifest.json` with the canonical site URL.
