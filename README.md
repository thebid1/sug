# Career Launchpad 2026

Marketing site for **Career Launchpad 2026**, a one-day Career & Future Readiness
Conference run by the Students' Union, Usmanu Danfodiyo University, Sokoto.

Static HTML/CSS/JS. No build step, no dependencies — the repository *is* the
deployable artifact.

## Structure

```
index.html        Home / pitch
schedule.html     Programme and masterclasses
sponsors.html     Sponsorship tiers + enquiry modal
register.html     Registration, links out to the Google Form
styles.css        All styles (design tokens in :root)
script.js         Shared behaviour, safe to load on every page
images/           Photography and brand assets
favicon.ico       Site icon
robots.txt        Crawler policy
sitemap.xml       Sitemap
```

## Local preview

Open `index.html` directly, or serve it so relative paths behave exactly as in
production:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Deploying

Upload the repository contents to any static host — Netlify, Vercel, GitHub
Pages, Cloudflare Pages, or plain cPanel/FTP. There is nothing to compile.

Netlify / Vercel: point the project at this repo, leave the build command empty
and set the publish directory to the repository root.

### Before going live

1. **Confirm the domain.** `sitemap.xml`, `robots.txt`, and the `og:`/`canonical`
   tags in `register.html` all point at `https://careerlaunchpad26.vercel.app`.
   If the site later moves to a custom domain, update those three places.
2. **Enable HTTPS** — required for the fonts and the Formspree POST.
3. **Verify the sponsor form.** `sponsors.html` posts to Formspree endpoint
   `mnjekjle`. Confirm that endpoint is live and the notification address is
   correct.
4. **Verify the registration link.** `register.html` links to the Google Form at
   `forms.gle/maYBADxgQ5cT174L6`. Confirm it is accepting responses.
5. **Check the event date.** `CONFIG.EVENT_DATE_ISO` in `script.js` drives the
   countdown on the registration page.

## Editing notes

- Colours, spacing, radii and fonts are CSS custom properties at the top of
  `styles.css`. Change them there rather than in individual rules.
- The nav and footer are duplicated verbatim in all four pages. Any edit to
  contact details, links or branding must be applied to **all four**.
- `script.js` null-checks every element before wiring it up, so the single file
  is safe to include on every page.

## Contact

Comr. Tasiu Aminu — President/Chairman
tasiuaminu882@gmail.com · sugudus@udusok.edu.ng · 0903 559 8053
