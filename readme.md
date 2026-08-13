# Arun Kumar — Portfolio

A hand-drawn, notebook-styled personal portfolio site built with React —
no bundler, no build step. Pages load React, ReactDOM, and Babel Standalone
from a CDN, and Babel transforms the `.jsx` files right in the browser.

**Live site:** _add your Vercel URL here once deployed_

## Tech stack

- React 18 (CDN, via unpkg)
- Babel Standalone (in-browser JSX transform, via unpkg)
- Plain CSS-in-JS (inline styles + a few `<style>` blocks for keyframes)
- Google Fonts (Caveat, Kalam, Permanent Marker, Reenie Beanie, Inter)
- [Web3Forms](https://web3forms.com) for the contact form (no backend required)

There is no npm build, no bundler, and no framework beyond React itself —
just static files served as-is.

## Project structure

```
index.html                      Entry point — loads fonts, CSS vars, CDN
                                 scripts, and every component script in order
config.js                       Holds the Web3Forms access key (see below)

foxglove-primitives.jsx         Shared UI pieces: PaperCard, Tape, Doodle,
                                 Scribble, ScribbleButton, SectionHeader, etc.
foxglove-background.jsx         Fixed ambient background layer (animated
                                 ruled lines, drifting blobs, doodles)
foxglove-nav.jsx                Top navigation bar

portfolio-app.jsx               Mounts the app; renders sections in order
portfolio-hero.jsx              Hero section (name, intro, draggable/tilting
                                 profile photo, rotating role badge)
portfolio-about.jsx             "About me" cards
portfolio-interactive-cards.jsx Flip-card section + theme switcher widget
portfolio-experience.jsx        Work experience timeline
portfolio-projects.jsx          Featured projects
portfolio-skills.jsx            Technical skills grid
portfolio-education.jsx         Education & certifications
portfolio-contact.jsx           Contact form (wired to Web3Forms) + contact
                                 details
portfolio-footer.jsx            Footer

profile.jpg                     Profile photo
arun_kumar_resume.pdf           Downloadable resume (linked from nav + hero)
```

`portfolio-components.jsx` also exists in this folder but isn't loaded by
`index.html` — it's an unused leftover and safe to ignore or delete.

## Running locally

No `npm install` is required for the site itself — it's just static files.
Any static file server works:

```bash
# Option 1: no install needed
npx serve .

# Option 2: Python, if you have it
python3 -m http.server 3000
```

Then open the printed local URL in your browser.

## Contact form (Web3Forms)

The contact form sends real email without any backend of our own, using
[Web3Forms](https://web3forms.com):

1. `config.js` holds a `CONFIG.WEB3FORMS_ACCESS_KEY` value.
2. `index.html` loads `config.js` as a plain script before the React
   component scripts, so `CONFIG` is available globally.
3. `portfolio-contact.jsx` reads `CONFIG.WEB3FORMS_ACCESS_KEY` and `POST`s
   the form data straight to `https://api.web3forms.com/submit`, which
   relays it to the inbox tied to that key.

**To use your own key:** sign up at [web3forms.com](https://web3forms.com),
grab your access key, and drop it into `config.js`:

```js
const CONFIG = {
  WEB3FORMS_ACCESS_KEY: 'your-access-key-here'
};
```

Web3Forms access keys are designed to live in client-side code — they can
only send mail to the inbox they're tied to, not read or expose anything
else — so there's no real security risk in committing `config.js`. If
you'd still rather not have it visible on GitHub, keep the repo **private**
rather than trying to hide the file itself (see `.gitignore` for notes on
why `config.js` is intentionally *not* ignored).

## Deployment (Vercel)

This project deploys as a static site — no build command needed.

1. Push this repo to GitHub (private recommended, see above).
2. On [vercel.com](https://vercel.com), **Add New → Project** and import
   the repo.
3. Set **Framework Preset** to `Other`. Leave Build Command empty and
   Output Directory as the project root.
4. Deploy. No environment variables are needed — `config.js` is read
   directly at runtime.
5. Every push to `main` auto-deploys to production; other branches get
   preview URLs.

## License

Personal portfolio — feel free to use the structure/components as a
reference, but please don't republish the content (resume, photo, bio) as
your own.