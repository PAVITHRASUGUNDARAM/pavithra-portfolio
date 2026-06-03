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
6. Settings:

   | Field | Value |
   |-------|--------|
   | Framework Preset | **Other** |
   | Root Directory | `.` |
   | Build Command | *(empty)* |
   | Output Directory | *(empty)* |
   | Install Command | *(empty)* |

7. Click **Deploy**.
8. When done, open the new `*.vercel.app` URL. You should see:
   - Gold/black theme
   - "Hi, I'm Pavithra"
   - **Experience** in the navbar (Sharadha Academy internship)

## If it still 404s

In Vercel → Project → **Settings → General**:

- Root Directory must be **empty** or `.` (not `public`, not `src`).
- Redeploy: **Deployments → … → Redeploy**.

## After it works

Add the live URL to LinkedIn and your resume.
