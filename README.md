# Pavithra Sugundaram Portfolio

Recruiter-focused personal portfolio built with HTML, CSS, and JavaScript.

## Your files (quick reference)

| What | Where to put it |
|------|------------------|
| Logo | `assets/logo.jpeg` (already set) |
| Profile photo | `assets/photos/pavithra-profile.jpeg` |
| Resume PDF | `assets/Pavithra-Sugundaram-Resume.pdf` |
| Project screenshots | `public/projects/<project-name>/screen1.jpeg`, … |

See also: `assets/photos/README.txt`, `assets/RESUME-README.txt`, `assets/HOW-TO-ADD-NEW-PROJECTS.txt`

## Edit your content

- Update links in `index.html`:
  - GitHub profile
  - LinkedIn profile
  - Email address
- Replace GitHub widgets:
  - Change all `YOUR_GITHUB_USERNAME` values to your GitHub username.
- Resume:
  - Place your real resume file at `assets/Pavithra-Sugundaram-Resume.pdf`.

## Add your photo manually

- Replace `assets/photos/pavithra-profile.jpeg` with your real photo (`.jpg` or `.png` also work).
- Replace `assets/Pavithra-Sugundaram-Resume.pdf` with your real resume PDF.

## Add your screenshots manually

Place screenshots in `public/projects/` (see `public/projects/README.md`).

Each project uses `screen1.png`, `screen2.png`, etc. Gallery order comes from `data-images` in `index.html`.

## Local run

Double-click `start-portfolio.bat` or run:

```powershell
cd C:\Users\pavis\Portfolio-PaV
py -m http.server 5500 --bind 127.0.0.1
```

Open in browser: **http://127.0.0.1:5500** (not `http://[::]:5500/`).

## Deploy options

### GitHub Pages

1. Push this project to a GitHub repository.
2. The workflow at `.github/workflows/deploy-pages.yml` deploys on pushes to `main`.
3. In GitHub settings, set Pages source to `GitHub Actions`.

### Netlify

- Drag and drop the folder to Netlify, or connect the Git repository.
- `netlify.toml` is already configured.

### Vercel (recommended)

1. Push this repo to [pavithra-portfolio](https://github.com/PAVITHRASUGUNDARAM/pavithra-portfolio).
2. Sign in at [vercel.com](https://vercel.com) with GitHub.
3. **Add New Project** → import `PAVITHRASUGUNDARAM/pavithra-portfolio`.
4. Framework preset: **Other** (static site, no build step).
5. Root directory: `.` — leave build command empty, output directory empty.
6. **Project name:** use `pavithra-sugundaram-portfolio` (do not use `pavithra-portfolio` — that subdomain may belong to someone else).
7. Deploy. Your live URL will look like `https://pavithra-sugundaram-portfolio.vercel.app`.

If you see the wrong site or a 404, read [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md).

`vercel.json` is already configured for static hosting and security headers.
