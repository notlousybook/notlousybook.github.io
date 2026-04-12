(function () {
  "use strict";

  const brand = (window.PORTFOLIO && window.PORTFOLIO.brand) || {
    name: "notlousybook",
    githubUser: "notlousybook",
    githubUrl: "https://github.com/notlousybook",
    releasesRepo: "DeepSeek-Desktop"
  };

  const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

  const ensureScript = (url, globalName) => {
    if (window[globalName]) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load ${url}`));
      document.head.appendChild(script);
    });
  };

  const getRepoName = () => {
    if (typeof REPO_NAME !== "undefined" && REPO_NAME) return REPO_NAME;
    const params = new URLSearchParams(location.search);
    return params.get("repo") || "";
  };

  const toRepoUrl = (repoName, branch, path) =>
    `https://github.com/${encodeURIComponent(brand.githubUser)}/${encodeURIComponent(repoName)}/blob/${encodeURIComponent(branch)}/${path}`;

  const renderFallback = (repoName, titleEl, descEl, metaEl, readmeEl, coverEl, actionsEl) => {
    if (document.title) document.title = `${repoName} — ${brand.name}`;
    if (titleEl) titleEl.textContent = repoName;
    if (descEl) descEl.textContent = "Archive page or private repository preview.";
    if (metaEl) metaEl.innerHTML = '<span class="chip">Local archive</span><span class="chip">Unavailable on GitHub</span>';
    if (coverEl) {
      coverEl.innerHTML = `
        <div class="project-card__thumb" style="--card-hue:${repoName.length * 23 % 360};height:100%;">
          <div class="project-card__thumb-inner">
            <span class="tag">Archive</span>
            <strong>${escapeHtml(repoName.slice(0, 2).toUpperCase())}</strong>
            <span class="project-card__thumb-sub">Private or unavailable</span>
          </div>
        </div>
      `;
    }
    if (actionsEl) {
      actionsEl.innerHTML = `
        <a class="button button--primary button--small" href="${brand.githubUrl}" target="_blank" rel="noopener">Open profile</a>
        <a class="button button--secondary button--small" href="../projects.html">Back to projects</a>
      `;
    }
    if (readmeEl) {
      readmeEl.innerHTML = `
        <div class="notice">
          <p><strong>This repo isn’t public right now.</strong> The page still works as an archive entry and points back to the portfolio.</p>
        </div>
      `;
    }
  };

  const rewriteRelativeLinks = (root, repoName, branch) => {
    const rawBase = `https://raw.githubusercontent.com/${encodeURIComponent(brand.githubUser)}/${encodeURIComponent(repoName)}/${encodeURIComponent(branch)}/`;
    root.querySelectorAll("img").forEach((img) => {
      const source = img.getAttribute("src") || img.src;
      if (source && !/^https?:\/\//i.test(source) && !source.startsWith("data:")) {
        img.src = rawBase + source.replace(/^\.\/?/, "");
      }
    });

    root.querySelectorAll("a").forEach((anchor) => {
      const href = anchor.getAttribute("href") || "";
      if (href && !/^https?:\/\//i.test(href) && !href.startsWith("#") && !href.startsWith("mailto:")) {
        anchor.href = toRepoUrl(repoName, branch, href.replace(/^\.\/?/, ""));
        anchor.target = "_blank";
        anchor.rel = "noopener";
      }
    });
  };

  const extractHeroImage = (markdown) => {
    const mdImg = markdown.match(/!\[[^\]]*\]\(([^)]+)\)/);
    if (mdImg && mdImg[1]) return mdImg[1].trim();
    const htmlImg = markdown.match(/<img[^>]*src=["']([^"']+)["'][^>]*>/i);
    if (htmlImg && htmlImg[1]) return htmlImg[1].trim();
    return "";
  };

  async function init() {
    const repoName = getRepoName();
    const titleEl = document.getElementById("repo-title");
    const descEl = document.getElementById("repo-desc");
    const metaEl = document.getElementById("repo-meta");
    const readmeEl = document.getElementById("readme");
    const coverEl = document.getElementById("repo-cover");
    const actionsEl = document.getElementById("repo-actions");

    if (!repoName || !titleEl || !descEl || !metaEl || !readmeEl) return;

    try {
      await ensureScript("https://cdn.jsdelivr.net/npm/marked/marked.min.js", "marked");
      await ensureScript("https://cdn.jsdelivr.net/npm/dompurify@2.4.0/dist/purify.min.js", "DOMPurify");
    } catch (error) {
      console.warn("Markdown helpers failed to load", error);
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(brand.githubUser)}/${encodeURIComponent(repoName)}`);
      if (!response.ok) {
        renderFallback(repoName, titleEl, descEl, metaEl, readmeEl, coverEl, actionsEl);
        return;
      }

      const repo = await response.json();
      const branch = repo.default_branch || "main";

      document.title = `${repo.full_name} — ${brand.name}`;
      titleEl.innerHTML = `<a href="${repo.html_url}" target="_blank" rel="noopener">${escapeHtml(repo.full_name)}</a>`;
      descEl.textContent = repo.description || "No description provided.";

      const metaBits = [
        `<span class="chip">★ ${Number(repo.stargazers_count || 0).toLocaleString()}</span>`,
        repo.language ? `<span class="chip">${escapeHtml(repo.language)}</span>` : "",
        repo.homepage ? `<span class="chip">Live site</span>` : "",
        branch ? `<span class="chip">${escapeHtml(branch)}</span>` : ""
      ]
        .filter(Boolean)
        .join("");
      metaEl.innerHTML = metaBits;

      if (actionsEl) {
        actionsEl.innerHTML = `
          <a class="button button--primary button--small" href="${repo.html_url}" target="_blank" rel="noopener">Open on GitHub</a>
          ${repo.homepage ? `<a class="button button--secondary button--small" href="${repo.homepage}" target="_blank" rel="noopener">Live site</a>` : ""}
          <a class="button button--ghost button--small" href="${repo.html_url}/releases" target="_blank" rel="noopener">Releases</a>
        `;
      }

      const rawBase = `https://raw.githubusercontent.com/${encodeURIComponent(brand.githubUser)}/${encodeURIComponent(repoName)}/${encodeURIComponent(branch)}/`;
      let markdown = "";

      try {
        const readmeResponse = await fetch(`${rawBase}README.md`);
        if (readmeResponse.ok) {
          markdown = await readmeResponse.text();
        }
      } catch (error) {
        console.warn("README fetch failed", error);
      }

      if (!markdown) {
        readmeEl.innerHTML = `
          <div class="notice">
            <p><strong>No README found.</strong> Open the repository on GitHub to inspect the source directly.</p>
          </div>
        `;
        return;
      }

      const heroImage = extractHeroImage(markdown);
      if (heroImage && coverEl) {
        const imageSrc = /^https?:\/\//i.test(heroImage) || heroImage.startsWith("data:")
          ? heroImage
          : rawBase + heroImage.replace(/^\.\/?/, "");
        coverEl.innerHTML = `<img src="${imageSrc}" alt="${escapeHtml(repo.name)} screenshot">`;
      } else if (coverEl) {
        coverEl.innerHTML = `
          <div class="project-card__thumb" style="--card-hue:${repoName.length * 23 % 360};height:100%;">
            <div class="project-card__thumb-inner">
              <span class="tag">${escapeHtml(repo.language || "Code")}</span>
              <strong>${escapeHtml(repo.name.slice(0, 2).toUpperCase())}</strong>
              <span class="project-card__thumb-sub">${repo.homepage ? "Includes a live homepage" : "Repository preview"}</span>
            </div>
          </div>
        `;
      }

      const html = window.marked && window.marked.parse ? window.marked.parse(markdown) : markdown;
      readmeEl.innerHTML = window.DOMPurify && window.DOMPurify.sanitize ? window.DOMPurify.sanitize(html) : html;
      readmeEl.classList.add("prose");
      rewriteRelativeLinks(readmeEl, repoName, branch);
    } catch (error) {
      console.error("repo view error", error);
      renderFallback(repoName, titleEl, descEl, metaEl, readmeEl, coverEl, actionsEl);
    }
  }

  init();
})();
