# Abundant Grace 🕊️

**Live site:** https://joyclyn2211.github.io/abundantgrace/

A sermon-insights wiki (key points, Bible verses, daily-life applications) from Joseph Prince Ministries and Elevation Church. Hosted free on GitHub Pages.

## Files
- `index.html` · `styles.css` · `app.js` — the site
- `data.js` — **all sermon content** (the only file the weekly updater changes)
- `.nojekyll` — tells GitHub Pages to serve files as-is

## How updates publish
The weekly Windows task (`../_scripts/run-weekly-update.ps1`) regenerates `data.js`, then commits and pushes this folder. GitHub Pages rebuilds automatically — the live site refreshes every Friday with no manual step.

## Editing content by hand
Edit `data.js`, then from this folder:
```powershell
git add -A; git commit -m "update"; git push
```
The live site updates within a minute or two.
