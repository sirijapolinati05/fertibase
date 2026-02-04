# FertiBase — User Manual

## Overview

- **Product:** FertiBase — a responsive website delivering product information, resources, farmer stories, careers, and contact.
- **Audience:** Farmers, agronomists, job applicants, content editors, and support staff.
- **Purpose:** Help visitors use the site and help maintainers run, update, and integrate the application.

## Quick Start (Visitor)

- **Open site:** Visit the public URL or open `index.html` locally.
- **Supported browsers:** Latest Chrome, Edge, Firefox, Safari (desktop & mobile).
- **Primary flows:** Browse products → view details → view resources & stories → apply for jobs → contact support.

## Getting Started (Developer / Maintainer)

- **Repository root:** source files under `src/` and top-level project files.
- **Prerequisites:** Node.js (LTS) and npm installed.
- **Dev run:**

```bash
npm install
npm run dev
```

- **Build / Production:**

```bash
npm run build
```

- **Environment:** Check the `.env` file in the project root for environment variables (Supabase keys, etc.). Never commit secrets.

## Site Map & Navigation

- **Home / Splash:** Landing content implemented by `src/components/FertibaseSplash.jsx` and `Hero` components.
- **Products:** `src/components/ProductsPage.jsx` and `Product` list items.
- **Product Details:** `ProductDetails`, `ProductModal`, `ProductAutoDetails` provide product pages and modal views.
- **Resources & Stories:** `Resources.jsx`, `FarmerStories.jsx`, and `LatestUpdateBar`.
- **Careers:** `CareerPage.jsx`, `JobDetails.jsx`, and `ApplyForm.jsx` for job listings and applications.
- **Contact & Footer:** `Contact.jsx`, `contactus.jsx`, and `Footer.jsx`.

## User Guide — Browsing & Actions

- **Browse products:** Open `ProductsPage`, use search/filters, click an item to view details or modal.
- **Search / Auto-complete:** `ProductAutoDetails` provides suggestions from `data/productsData.js`.
- **Read farmer stories & updates:** Access sections from home or Resources.
- **Apply to a job:** From `CareerPage` select a job, open `JobDetails`, fill `ApplyForm`, and submit. Monitor UI confirmation.
- **Contact support:** Use the contact form; alternatives appear in the footer.

## Forms & Data Submission

- **ApplyForm:** Collects applicant details (name, email, phone, CV). Validate required fields client-side; ensure server-side checks.
- **Contact form:** Name, email, message; validate email before submission.
- **Submission targets:** Forms connect to endpoints defined in `src/api/*` or directly to Supabase clients — see Appendix.

## Admin / Content Updates

- **Products data:** Edit `data/productsData.js` (or `src/data/productsData.js`) to add/remove product entries.
- **Images & assets:** Update `config/images.js` and `public/posters/` for visual assets.
- **Latest updates:** Manage `lib/latestUpdates.js` for messages shown in `LatestUpdateBar`.

## Integrations & Architecture

- **Supabase:** Client code in `src/api/supabaseClient.js` and `lib/supabaseClient.js`. Configure keys via `.env` variables such as `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY`.
- **API services:** Implemented under `src/api/`:
  - `api.js` — shared utilities
  - `productService.js` — product listings/details
  - `careerService.js` — career posts and application submits
  - `testimonialService.js` — testimonials fetches
- **Front-end:** React (JSX) with entry points `src/main.jsx` and `src/App.jsx`.

## Developer Notes

- **Entry point:** `src/main.jsx` mounts `App.jsx`.
- **Styling:** Tailwind CSS via `tailwind.config.js` and `postcss.config.js`; main CSS at `src/index.css`.
- **Build tooling:** Vite (`vite.config.js`). Linting via `eslint.config.js`.
- **Debug helpers:** `test-db-connection.js` and other debug scripts at project root.

## API & Integration Appendix

- **Where to look:** `src/api/api.js`, `src/api/productService.js`, `src/api/careerService.js`, `src/api/testimonialService.js`, and `src/api/supabaseClient.js`.
- **Common actions:**
  - Fetch product list: productService fetch or Supabase query.
  - Fetch product details: by ID/slug via productService.
  - Submit application: POST via careerService to backend or Supabase table.
  - Fetch testimonials: testimonialService GET.
- **Environment variables:** Configure Supabase and other keys in `.env` (do not commit).

## Security & Data Privacy

- **Secrets:** Keep `.env` local and out of VCS. Use deployment secrets for CI/CD.
- **Validation:** Client-side validation exists, but server-side validation is required for production.
- **Data retention:** Store applicant/contact data per your privacy policy and legal requirements.

## Accessibility & UX

- **Responsive:** Components are responsive; test mobile flows and `MobileMenu` interactions.
- **Forms & ARIA:** Ensure inputs have labels and ARIA attributes as needed.
- **Contrast & readability:** Verify Tailwind theme for accessibility compliance.

## Troubleshooting

- **Dev server fails:**

```bash
npm install
npm run dev
```

Check terminal errors for missing env vars or port conflicts.
- **API errors:** Verify `.env` values for Supabase, network access, and inspect Network tab for failing requests.
- **Missing assets:** Confirm file paths in `config/images.js` and `public/`.
- **Forms not working:** Inspect browser devtools Network tab and validate backend endpoints.

## FAQ

- **Where to change product information?** Edit `data/productsData.js` or update backend datasource.
- **How to add a career posting?** Create record in backend (Supabase) or modify the dataset consumed by `careerService`.
- **How to change copy or images?** Update component JSX or `config/images.js`, then rebuild and redeploy.

## Glossary

- **Supabase:** BaaS used for database and auth.
- **Service modules:** Files under `src/api` wrapping fetch/update logic.
- **Components:** Reusable UI elements under `src/components`.

## Maintenance & Deployment

- **Update dependencies:** `npm update` then test locally.
- **Build:** `npm run build` and deploy `dist` to chosen static host (Vercel, Netlify, Azure, etc.).
- **CI/CD:** Add environment secrets for Supabase, and configure build & deploy pipeline.

## Files of Interest

- `src/main.jsx`
- `src/App.jsx`
- `src/index.css`
- `src/components/ProductsPage.jsx`
- `src/components/ProductDetails.jsx`
- `src/components/ApplyForm.jsx`
- `src/api/productService.js`
- `src/api/careerService.js`
- `src/api/supabaseClient.js`
- `.env` (local environment variables — do not commit)

---

If you want, I can:
- add example API request snippets in the Appendix,
- create a shorter Quick Reference cheat-sheet, or
- commit this file to the repo and open a PR.
