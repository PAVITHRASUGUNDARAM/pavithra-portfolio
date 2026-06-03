# Fix Vercel deployment

## What went wrong

- `https://pavithra-portfolio.vercel.app/` is **another person's** portfolio (not yours).
- `https://pavithra-s-portfolio-two.vercel.app/` returns **404** — usually wrong repo, wrong root folder, or a failed deploy.

Your correct code is on GitHub: **https://github.com/PAVITHRASUGUNDARAM/pavithra-portfolio**

## Correct setup (do this in Vercel)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard).
2. **Delete** broken projects (`pavithra-s-portfolio-two`, or any project not linked to `pavithra-portfolio` repo).
3. Click **Add New → Project**.
4. Import **`PAVITHRASUGUNDARAM/pavithra-portfolio`** only.
5. **Project name:** use something unique, e.g. `pavithra-sugundaram-portfolio` (avoid `pavithra-portfolio` — that name is taken globally).
6. Settings (must match `vercel.json` in the repo):

   | Field | Value |
   |-------|--------|
   | Framework Preset | **Other** |
   | Root Directory | `.` (empty) |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | *(default / empty)* |

   If Vercel shows **Override** toggles, turn them **on** only if values differ — otherwise leave overrides off so `vercel.json` applies.

7. Click **Deploy**.
8. When done, open the new `*.vercel.app` URL. You should see:
   - Gold/black theme
   - "Hi, I'm Pavithra"
   - **Experience** in the navbar (Sharadha Academy internship)

## If it still 404s

In Vercel → Project → **Settings → General**:

- Root Directory must be **empty** or `.` (not `public`, not `src`, not your Windows user folder).
- **Output Directory** must be `dist` (the build copies `index.html` there).
- **Build Command** must be `npm run build`.
- Redeploy: **Deployments → … → Redeploy** (use latest commit from GitHub).

Check the build log: you should see `Copied index.html` and `Build complete → dist/`.

## After it works

Add the live URL to LinkedIn and your resume.
