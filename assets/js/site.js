(function () {
  "use strict";

  const portfolio = window.PORTFOLIO || {};
  const brand = portfolio.brand || {};
  const videos = Array.isArray(portfolio.videos) ? portfolio.videos : [];
  const repoUser = brand.githubUser || "notlousybook";
  const siteRepoName = "notlousybook.github.io";
  let reposPromise = null;

  const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

  const formatNumber = (value) => new Intl.NumberFormat().format(Number(value || 0));

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(date);
  };

  const formatShortDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric"
    }).format(date);
  };

  const hashCode = (value) => {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const getRepos = async () => {
    if (!reposPromise) {
      reposPromise = fetch(`https://api.github.com/users/${encodeURIComponent(repoUser)}/repos?per_page=100&sort=updated`)
        .then((response) => (response.ok ? response.json() : []))
        .then((repos) => (Array.isArray(repos) ? repos : []))
        .catch(() => []);
    }
    return reposPromise;
  };

  const visibleRepos = (repos) =>
    repos
      .filter((repo) => !repo.private && repo.name !== siteRepoName)
      .sort((a, b) => {
        const starDiff = (b.stargazers_count || 0) - (a.stargazers_count || 0);
        if (starDiff !== 0) return starDiff;
        return new Date(b.updated_at || 0) - new Date(a.updated_at || 0);
      });

  const repoThumbHtml = (repo, featured = false) => {
    const hue = hashCode(repo.name || "repo") % 360;
    const initials = (repo.name || "repo").slice(0, 2).toUpperCase();
    return `
      <div class="project-card__thumb" style="--card-hue:${hue}">
        <div class="project-card__thumb-inner">
          <span class="tag">${escapeHtml(repo.language || "Code")}</span>
          <strong>${escapeHtml(initials)}</strong>
          <span class="project-card__thumb-sub">${featured ? "Featured build" : "Open source project"}</span>
        </div>
      </div>
    `;
  };

  const repoCardHtml = (repo, options = {}) => {
    const featured = Boolean(options.featured);
    const compact = Boolean(options.compact);
    const description = repo.description || "No description provided yet.";
    const actionLabel = featured ? "Open featured repo" : "Open detail";
    const classes = ["glass-card", "project-card"];

    if (featured) {
      classes.push("project-card--feature");
    }

    return `
      <article class="${classes.join(" ")}">
        ${repoThumbHtml(repo, featured)}
        <div class="project-card__body">
          <div class="card-meta">
            <span class="chip">★ ${formatNumber(repo.stargazers_count || 0)}</span>
            <span class="chip">${escapeHtml(repo.language || "Mixed")}</span>
            <span class="chip">${escapeHtml(formatDate(repo.updated_at))}</span>
          </div>
          <h3>${escapeHtml(repo.name)}</h3>
          <p>${escapeHtml(compact ? description.slice(0, 170) : description)}</p>
          <div class="inline-actions">
            <a class="button button--primary button--small" href="projects/view.html?repo=${encodeURIComponent(repo.name)}">${actionLabel}</a>
            <a class="button button--secondary button--small" href="${repo.html_url}" target="_blank" rel="noopener">GitHub</a>
            ${repo.homepage ? `<a class="button button--ghost button--small" href="${repo.homepage}" target="_blank" rel="noopener">Live site</a>` : ""}
          </div>
        </div>
      </article>
    `;
  };

  const videoCardHtml = (video) => `
    <article class="glass-card video-card">
      <a href="https://www.youtube.com/watch?v=${encodeURIComponent(video.id)}" target="_blank" rel="noopener">
        <div class="project-card__thumb" style="--card-hue:${hashCode(video.id) % 360}">
          <div class="project-card__thumb-inner">
            <span class="tag">YouTube</span>
            <strong>▶</strong>
            <span class="project-card__thumb-sub">${escapeHtml(formatShortDate(video.published))}</span>
          </div>
        </div>
        <div class="video-card__body">
          <h3>${escapeHtml(video.title)}</h3>
          <p>Open the full upload on the channel.</p>
          <div class="meta">
            <span class="chip">Watch now</span>
            <span class="chip">${escapeHtml(formatShortDate(video.published))}</span>
          </div>
        </div>
      </a>
    </article>
  `;

  const renderVideoGrid = (target, limit = videos.length) => {
    const el = document.getElementById(target);
    if (!el) return;
    const items = videos.slice(0, limit);
    if (!items.length) {
      el.innerHTML = '<div class="notice"><p><strong>No uploads found.</strong> Check the YouTube channel directly.</p></div>';
      return;
    }
    el.innerHTML = items.map(videoCardHtml).join("");
  };

  const renderLatestVideoSpotlight = () => {
    const link = document.getElementById("home-latest-video");
    const thumb = document.getElementById("home-latest-video-thumb");
    const title = document.getElementById("home-latest-video-title");
    const meta = document.getElementById("home-latest-video-meta");
    const latest = videos[0];

    if (!latest || !link || !thumb || !title || !meta) return;

    link.href = `https://www.youtube.com/watch?v=${encodeURIComponent(latest.id)}`;
    thumb.src = `https://i.ytimg.com/vi/${latest.id}/hqdefault.jpg`;
    thumb.alt = latest.title;
    title.textContent = latest.title;
    meta.textContent = `Uploaded ${formatDate(latest.published)}`;
  };

  const renderRepoCards = (target, repos, options = {}) => {
    const el = document.getElementById(target);
    if (!el) return;
    const items = options.limit ? repos.slice(0, options.limit) : repos;

    if (!items.length) {
      el.innerHTML = '<div class="notice"><p><strong>No public repos found.</strong> The GitHub profile may be private or unavailable.</p></div>';
      return;
    }

    el.innerHTML = items
      .map((repo, index) =>
        repoCardHtml(repo, {
          featured: Boolean(options.featured && index === 0),
          compact: Boolean(options.compact)
        })
      )
      .join("");
  };

  const renderRepoSpotlight = async () => {
    const targets = [
      { id: "home-featured-repo", repoName: brand.featuredRepo || "DeepSeek-Desktop", featured: true, compact: true },
      { id: "projects-featured", repoName: brand.featuredRepo || "DeepSeek-Desktop", featured: true, compact: false }
    ];

    if (!targets.some((target) => document.getElementById(target.id))) return;

    const repos = await getRepos();
    const pool = visibleRepos(repos);
    const fallback = pool[0];
    const repoByName = (name) => pool.find((repo) => repo.name === name) || fallback;

    targets.forEach((target) => {
      const el = document.getElementById(target.id);
      if (!el) return;

      const repo = repoByName(target.repoName);
      if (!repo) {
        el.innerHTML = '<div class="notice"><p><strong>No featured repository found.</strong></p></div>';
        return;
      }

      el.innerHTML = repoCardHtml(repo, {
        featured: target.featured,
        compact: target.compact
      });
    });
  };

  const renderRepoGrids = async () => {
    const homeGrid = document.getElementById("home-project-grid");
    const projectGrid = document.getElementById("projects-grid");
    const repoCount = document.querySelectorAll("[data-repo-count]");
    if (!homeGrid && !projectGrid && !repoCount.length) return;

    const repos = visibleRepos(await getRepos());
    repoCount.forEach((node) => {
      node.textContent = formatNumber(repos.length);
    });

    if (homeGrid) {
      renderRepoCards("home-project-grid", repos, { limit: 4, compact: true });
    }

    if (projectGrid) {
      renderRepoCards("projects-grid", repos, { compact: false });
    }

    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    document.querySelectorAll("[data-total-stars]").forEach((node) => {
      node.textContent = formatNumber(totalStars);
    });
  };

  const renderReleaseList = async () => {
    const el = document.getElementById("release-list");
    if (!el) return;

    const repoName = brand.releasesRepo || brand.featuredRepo || "DeepSeek-Desktop";
    const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(repoUser)}/${encodeURIComponent(repoName)}/releases?per_page=10`);

    if (!response.ok) {
      el.innerHTML = `
        <div class="notice">
          <p><strong>Release feed unavailable.</strong> Open the repository on GitHub to check builds manually.</p>
        </div>
      `;
      return;
    }

    const releases = await response.json();
    if (!Array.isArray(releases) || !releases.length) {
      el.innerHTML = `
        <div class="notice">
          <p><strong>No public releases yet.</strong> The repository is still linked above so visitors can check the latest source changes.</p>
        </div>
      `;
      return;
    }

    el.innerHTML = releases
      .map((release) => {
        const assets = Array.isArray(release.assets) ? release.assets : [];
        const body = release.body ? escapeHtml(release.body.length > 260 ? `${release.body.slice(0, 260)}…` : release.body) : "";
        return `
          <article class="glass-card release-card">
            <div class="release-card__body">
              <div class="card-meta">
                <span class="chip">${release.prerelease ? "Pre-release" : "Release"}</span>
                <span class="chip">${escapeHtml(formatDate(release.published_at || release.created_at))}</span>
                <span class="chip">${escapeHtml(release.tag_name || release.name || "untagged")}</span>
              </div>
              <h3>${escapeHtml(release.name || release.tag_name || "Release")}</h3>
              ${body ? `<p>${body}</p>` : ""}
              ${
                assets.length
                  ? `<div class="panel-list">${assets
                      .map(
                        (asset) => `
                          <div class="panel-row">
                            <div>
                              <strong>${escapeHtml(asset.name)}</strong>
                              <span>${Math.max(1, Math.round((asset.size || 0) / 1024))} KB</span>
                            </div>
                            <a class="button button--secondary button--small" href="${asset.browser_download_url}" target="_blank" rel="noopener">Download</a>
                          </div>
                        `
                      )
                      .join("")}</div>`
                  : '<p>No downloadable assets for this release.</p>'
              }
            </div>
          </article>
        `;
      })
      .join("");
  };

  const renderHomeFacts = () => {
    const videoCount = document.querySelectorAll("[data-video-count]");
    if (videoCount.length) {
      videoCount.forEach((node) => {
        node.textContent = formatNumber(videos.length);
      });
    }

    const playlists = document.querySelectorAll("[data-youtube-playlist]");
    playlists.forEach((node) => {
      node.textContent = brand.youtubeHandle || "@notlousybook";
    });
  };

  const setActiveNav = () => {
    const pathname = location.pathname.replace(/\/+$/, "") || "/";
    document.querySelectorAll(".site-nav a").forEach((link) => {
      try {
        const url = new URL(link.href, location.origin);
        const linkPath = url.pathname.replace(/\/+$/, "") || "/";
        if (linkPath === pathname) {
          link.setAttribute("aria-current", "page");
        }
      } catch {
        // Ignore invalid URLs.
      }
    });
  };

  const setYear = () => {
    const year = String(new Date().getFullYear());
    document.querySelectorAll("[data-year]").forEach((node) => {
      node.textContent = year;
    });
  };

  document.addEventListener("DOMContentLoaded", async () => {
    setYear();
    setActiveNav();
    renderHomeFacts();
    renderLatestVideoSpotlight();
    renderVideoGrid("home-video-grid", 6);
    renderVideoGrid("youtube-grid", 6);
    await renderRepoSpotlight();
    await renderRepoGrids();
    await renderReleaseList();
  });
})();
