# Peak Work Studios

Automation consultancy website for agencies with 10-50 employees. Built with React + Vite + styled-components, deployed on Vercel.

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build & Preview

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — no config changes needed
4. The `vercel.json` handles SPA rewrites and asset caching
5. The `api/` directory deploys as serverless functions automatically

### Environment Variables (Vercel Dashboard)

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Email delivery for contact form and audit results |

## Project Structure

```
src/
  App.jsx              # Layout, routing, themes, header/footer
  pages/
    HomePage.jsx       # Landing page with 10 sections
    CalculatorPage.jsx # Interactive ROI calculator
    AuditPage.jsx      # 10-question Client Chaos Audit quiz
    AboutPage.jsx      # About Kunal / Peak Work Studios
    ContactPage.jsx    # Contact form + booking CTA
api/
  contact.js           # Serverless: contact form handler
  audit-submit.js      # Serverless: audit results handler
public/
  favicon.svg          # Mountain logo icon
  robots.txt
  sitemap.xml
```

## Customizing Content

All page content is inline in each page component under `src/pages/`. Edit the JSX directly — there is no CMS.

### Theme Colors

Edit theme objects in `src/App.jsx`:

```javascript
const lightTheme = { primary: '#38bdf8', ... };
const darkTheme  = { primary: '#38bdf8', ... };
```

## Placeholders to Replace

Before going live, update these:

- **`api/contact.js`** and **`api/audit-submit.js`**: Uncomment and configure the Resend email integration (lines are commented with `TODO`)
- **`src/pages/ContactPage.jsx`**: Update the Calendly booking link (`https://calendly.com/peakworkstudios/30min`)
- **`src/pages/AboutPage.jsx`**: Replace the avatar placeholder icon with a real headshot image
- **`src/App.jsx` footer**: Verify LinkedIn and GitHub URLs
- **`public/sitemap.xml`**: Confirm the domain is `peakworkstudios.com`

## Tech Stack

- **React 18** with React Router DOM 7
- **Vite 5** for build tooling
- **styled-components 6** for CSS-in-JS theming (light/dark mode)
- **lucide-react** for icons
- **Vercel** for hosting + serverless functions

## License

All rights reserved.
