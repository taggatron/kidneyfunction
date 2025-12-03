# Kidney Functions — Interactive Web App

This is a small static web app designed for Year 9 students to explore kidney functions with bright styling and animations.

Files:
- `index.html` — main page
- `styles.css` — styles and animations
- `app.js` — interactivity and SVG bindings
- `images/body.svg` — simple body silhouette showing kidney location
- `images/kidney.svg` — simplified kidney diagram with labels and animated elements

How to run:

Open `index.html` in any modern browser. For a local server (recommended to avoid cross-origin SVG issues), run a simple static server from this folder, for example using Python 3:

```bash
cd "$(pwd)"
python3 -m http.server 8000
# Then open http://localhost:8000 in your browser
```

Usage:
- Click the buttons to read short, Year 9-friendly descriptions and see simple animations.
- Hover or click parts of the kidney image to highlight regions.

If you'd like I can:
- Add more detailed illustrations for nephrons.
- Improve accessible text descriptions (ARIA roles).
- Package this as a small static site with a deploy script.
