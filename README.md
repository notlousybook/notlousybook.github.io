# notlousybook — creator portfolio

Static HTML/CSS/JS site for the notlousybook GitHub and YouTube presence.

## What it does

- Shows the public GitHub repos for `notlousybook`
- Highlights the flagship `DeepSeek-Desktop` project
- Embeds the YouTube uploads playlist and latest uploads
- Provides repo detail pages powered by GitHub READMEs

## Local usage

Open `index.html` in a browser, or serve the repo with any static server.

## Deployment

Push to `notlousybook.github.io` and keep `CNAME` pointed at `notlousy.me`.

## Notes

- The site uses public GitHub API data at runtime.
- YouTube uploads are rendered from a static feed snapshot in `assets/js/site-data.js`.
- Repository detail pages live at `projects/view.html?repo=<repo-name>`.

