(async function(){
  const el = document.getElementById('repo-list');
  const featEl = document.getElementById('featured');
  try{
    const res = await fetch('https://api.github.com/users/notlousybook/repos?per_page=100&sort=updated');
    const repos = await res.json();
    if(!Array.isArray(repos)) { if(el) el.textContent='Unable to fetch repos.'; return; }
    const featured = repos.find(r => r.name && r.name.toLowerCase().includes('deepseek')) || repos[0];
    const thumbMap = { 'DeepSeek-Desktop': 'assets/img/deepseek-thumb.png' };
    if(featured && featEl){
      const thumb = thumbMap[featured.name] || 'assets/img/placeholder-project.png';
      featEl.innerHTML = `\n        <section class="featured" style="display:flex;gap:18px;align-items:center"> \n          <img src="${thumb}" alt="${featured.name} thumbnail" style="width:160px;height:100px;object-fit:cover;border-radius:10px;flex:0 0 160px">\n          <div>\n            <h2>Featured: <a href="projects/${encodeURIComponent(featured.name)}.html">${featured.name}</a></h2>\n            <p>${featured.description || ''}</p>\n            <p>\n              <a class="cta" href="projects/${encodeURIComponent(featured.name)}.html">View Page</a>\n              <a class="cta" href="${featured.html_url}" target="_blank" rel="noopener" style="margin-left:12px;background:transparent;border:1px solid rgba(255,255,255,0.05);color:var(--muted)">GitHub</a>\n              <a class="cta" href="${featured.html_url}/releases" target="_blank" rel="noopener" style="margin-left:12px;background:transparent;border:1px solid rgba(255,255,255,0.05);color:var(--muted)">Releases</a>\n            </p>\n          </div>\n        </section>\n      `;
    }
    const others = repos.filter(r => !r.private && (featured? r.id !== featured.id : true));
    if(el){
      el.innerHTML = others.map(r => `\n        <article class="repo">\n          <img src="${thumbMap[r.name]||'assets/img/placeholder-project.png'}" alt="${r.name} thumbnail">\n          <div>\n            <h3><a href="projects/${encodeURIComponent(r.name)}.html">${r.name}</a></h3>\n            <p>${r.description || ''}</p>\n            <div class="meta">★ ${r.stargazers_count || 0} • ${r.language || ''} • <a href="${r.html_url}" target="_blank" rel="noopener">GitHub</a></div>\n          </div>\n        </article>\n      `).join('');
    }
  } catch(e) { console.error(e); if(el) el.textContent='Failed to load projects (see console).'; }
})();
