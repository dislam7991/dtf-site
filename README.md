# DTF Website

**Live site → [your-site.netlify.app](https://your-site.netlify.app)** *(update with your Netlify URL)*

A responsive, multi-page marketing website built from scratch for **Dynamic Technical Formulations (DTF)**, a contract development and manufacturing organization (CDMO) specializing in sports nutrition and nutraceutical supplements. Designed and developed entirely on personal time as a proof-of-concept for company leadership.

---

## Tech Stack

- **HTML5** — semantic markup, accessibility-conscious structure
- **CSS3** — custom design system using CSS variables, Flexbox, Grid, responsive breakpoints
- **JavaScript (ES6+)** — vanilla JS, no frameworks or libraries
- **Netlify** — static hosting, serverless form handling with email notifications

---

## Features

- **5-page site** — Home, Services, About, Insights (blog), Contact
- **Shared component injection** — nav and footer injected via JS (`shared.js`) so markup is maintained in one place across all pages
- **Netlify Forms integration** — 3 forms (contact, home page inquiry, newsletter) wired to Netlify's serverless backend via AJAX `fetch()`, with email notification delivery and a submission dashboard
- **Intersection Observer API** — fade-up scroll animations without a library
- **Responsive mobile nav** — hamburger menu with CSS transitions and JS toggle
- **SEO optimization** — unique `<title>` and `<meta name="description">` on every page, Open Graph tags for social sharing previews, Twitter Card metadata
- **Performance** — `loading="lazy"` on all below-the-fold images
- **Real business content** — team bios, certifications, phone, address, service descriptions

---

## Pages

| Page | Description |
|---|---|
| `index.html` | Hero, services overview, facility photos, inline contact form |
| `services.html` | Full breakdown of manufacturing services (private label, custom formulation, capsule, RTM, flavor dev) |
| `about.html` | Company story, core values, team profiles, certifications |
| `blog.html` | Insights hub with newsletter signup (content planned) |
| `contact.html` | Full inquiry form with Netlify backend |

---

## Architecture Notes

`shared.js` handles all cross-page behavior at runtime:
- Injects `<nav>` and `<footer>` HTML into every page
- Sets the active nav link based on the current page filename
- Registers the Intersection Observer for scroll animations
- Attaches AJAX form submit handlers to all `data-netlify` forms

This avoids duplicating nav/footer markup across 5 HTML files while keeping the project dependency-free.

---

## Running Locally

No build step required — open any `.html` file directly in a browser, or use a local server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

> Note: Netlify form submissions only work on the deployed site, not locally.

---

## What I'd Add Next

- `sitemap.xml` and `robots.txt` for SEO crawlability
- JSON-LD schema markup (Organization, FAQPage) for AI Overview / generative search citation
- `llms.txt` for LLM crawler discoverability
- Blog content targeting long-tail supplement manufacturing queries
- Custom domain connection
