# Deploying Abundant Grace

Your site is a **static website** (just HTML/CSS/JS) — it works by opening `index.html` in any browser, and it can be hosted for free on any of the services below. Pick one.

## What "url abundantgrace" will look like

You can't own a bare `abundantgrace` (top-level names aren't sold). The realistic options:

| Host | Free URL you'd get | Custom domain option |
|------|--------------------|----------------------|
| **Netlify** (easiest) | `abundantgrace.netlify.app` | add `abundantgrace.org` later |
| **GitHub Pages** | `<username>.github.io/abundantgrace` | add a custom domain |
| **Cloudflare Pages** | `abundantgrace.pages.dev` | add a custom domain |
| **Vercel** | `abundantgrace.vercel.app` | add a custom domain |

If you want a true `abundantgrace.org` / `.com`, buy it (~$10–15/yr at Namecheap, Cloudflare, or Google Domains) and point it at whichever host above — each has a one-click "add custom domain" step.

---

## Option 1 — Netlify Drop (no account technicalities, ~2 min)

1. Go to **https://app.netlify.com/drop**
2. Drag the whole `abundantgrace` folder onto the page.
3. Done — you get a live `…netlify.app` URL instantly.
4. Click **Site settings → Change site name** → type `abundantgrace` → it becomes `abundantgrace.netlify.app`.
5. (Optional) **Domain settings → Add custom domain** if you buy `abundantgrace.org`.

To update later: drag the folder again, or connect it to a GitHub repo for auto-deploys.

---

## Option 2 — GitHub Pages (best for weekly auto-updates)

1. Create a repo named `abundantgrace`.
2. Put the contents of this folder in it.
3. **Settings → Pages → Source: main branch / root**.
4. Live at `https://<your-username>.github.io/abundantgrace`.

This pairs well with the weekly update process — when the update script regenerates `data.js`, a `git push` republishes the site automatically.

---

## Previewing locally right now

From `C:\Users\Joyclyn\ClaudeCode\AboutOurAbba\abundantgrace`:

```powershell
python -m http.server 4321
```

Then open **http://localhost:4321** — or just double-click `index.html`.

---

## How the site stays current

All sermon content lives in **`data.js`**. The weekly update process (`AboutOurAbba/_scripts/update-wiki.ps1`) refreshes that one file with new sermons. The site re-reads it automatically — no other files need to change. If you host on GitHub Pages, add a `git push` to the end of the update and the live site updates itself every week.
