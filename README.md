# notlousybook — Static showcase site

This repo is a scaffolded static site (HTML/CSS/JS) showcasing projects and YouTube content for the notlousybook account.

How to run locally

- Open `index.html` in a browser. For full functionality (Three.js hero) use a modern browser.
- To enable automatic YouTube fetch, copy `assets/js/config-sample.js` to `assets/js/config.js` and add your API key and channel ID (do not commit `config.js`).

YouTube API configuration

- Copy `assets/js/config-sample.js` to `assets/js/config.js` and set `window.YT_API_KEY = 'YOUR_KEY'` and `window.YT_CHANNEL_ID = 'YOUR_CHANNEL_ID'` (do not commit `config.js`).
- After adding `config.js`, `youtube.html` will fetch recent uploads automatically.

Deployment

- Deploy to GitHub Pages by pushing to a repository named `notlousybook.github.io` or enabling Pages in repository settings.

Next steps

- Replace placeholder thumbnails with real screenshots
- Update About/Contact copy as needed
- Provide Formspree form endpoint or contact address for the contact form

