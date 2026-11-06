# Japan Trip app

A small offline-friendly trip app (PWA). It contains **no personal trip data**. Your itinerary is loaded from a private trip file on your phone and saved only there.

## Put it online (GitHub Pages)
1. Create a repo (e.g. `japan-trip`) and upload these files: `index.html`, `sw.js`, `manifest.json`, `icon-180.png`, `icon-192.png`, `icon-512.png`.
2. Repo **Settings → Pages → Source: Deploy from a branch → `main` / root → Save**.
3. After a minute your app is at `https://<your-username>.github.io/japan-trip/`.

## Install on iPhone
1. Open the link in **Safari** → Share → **Add to Home Screen**.
2. Open the app → **Import trip file** → pick `japan-trip-data.json` from Files.

## Updating
- New trip file from Claude → Info → Data → Import (your spending log stays).
- Info → Data → Export to back up, or to send Claude your edited version.

**Never upload the trip file to GitHub.**
