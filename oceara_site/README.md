# Oceara Robotics

Premium marketing site for Oceara Robotics, an early-stage autonomous underwater robotics company. The site presents the O-01 first-prototype concept, underwater constraints, autonomy architecture, missions, research basis, and development roadmap.

## Current status

- Architecture and first-version robot design: ready
- Physical prototype: not yet built
- Commercial pilots/customers: none yet
- Company: pre-incorporation
- Concept/simulation media is labeled as such; no fabricated deployment claims

## Tech stack

- React + TypeScript + Vite
- Three.js + React Three Fiber + Drei
- GSAP + ScrollTrigger
- Tailwind CSS v4
- Responsive WebGL fallbacks and reduced-motion support

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (normally `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The production output is `dist/`.

## GitHub

Push the **contents of this folder** to the repository root (do not commit the ZIP or the outer download folder). Recommended first push:

```bash
git init
git add .
git commit -m "Initial Oceara Robotics website"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

The GitHub Actions workflow at `.github/workflows/ci.yml` installs from `package-lock.json` and runs `npm run build` on pushes and pull requests.

## Vercel deployment

This repository is configured for Vercel with `vercel.json`. Vercel should use:

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: `/` (the folder containing `package.json`)

Connect the GitHub repository to Vercel and deploy. The marketing site does not require a backend server. Vercel supports Vite projects directly and can create preview deployments from Git changes.

### Vercel environment variable

Set `VITE_CONTACT_EMAIL` in Vercel only after you have a real inbox. Because `VITE_*` values are bundled into browser code, never put private API keys or other secrets in them. After changing a Vercel environment variable, redeploy so the new value is present in the build.

### Contact

The contact area intentionally does not fake a successful submission. To enable the email CTA, create a local `.env` from `.env.example` and set:

```env
VITE_CONTACT_EMAIL=your-real-inbox@example.com
```

For Vercel, add the same variable under Project Settings → Environment Variables and redeploy. Do not put private API keys into `VITE_*` variables because Vite exposes them to the client bundle.

## Repository hygiene

Do not commit `.env`, `node_modules/`, `dist/`, or `.vercel/`. The provided `.gitignore` covers these.
