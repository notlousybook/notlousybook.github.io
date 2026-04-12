(async function(){
  const el = document.getElementById('repo-list');
  const featEl = document.getElementById('featured');
  try {
    const res = await fetch('https://api.github.com/users/notlousybook/repos?per_page=100&sort=updated');
    const repos = await res.json();
    if(!Array.isArray(repos)){
      if(el) el.textContent='Unable to fetch repos.';
      return;
    }
    const featured = repos.find(r => r.name && r.name.toLowerCase().includes('deepseek')) || repos[0];
    // attach thumbnail if repo has known asset
    const thumbMap = { 'DeepSeek-Desktop': 'assets/img/deepseek-thumb.png' }
    if(featured && featEl){
      const thumb = thumbMap[featured.name] || 'assets/img/placeholder-project.png';
      featEl.innerHTML = `
        <section class="featured" style="display:flex;gap:18px;align-items:center"> 
          <img src="${thumb}" alt="${featured.name} thumbnail" style="width:160px;height:100px;object-fit:cover;border-radius:10px;flex:0 0 160px">
          <div>
            <h2>Featured: <a href="projects/view.html?repo=${encodeURIComponent(featured.name)}" target="_self" rel="noopener">${featured.name}</a></h2>
            <p>${featured.description || ''}</p>
            <p>
              <a class="cta" href="projects/view.html?repo=${encodeURIComponent(featured.name)}" target="_self" rel="noopener">View Page</a>
              <a class="cta" href="${featured.html_url}" target="_blank" rel="noopener" style="margin-left:12px;background:transparent;border:1px solid rgba(255,255,255,0.05);color:var(--muted)">GitHub</a>
              <a class="cta" href="${featured.html_url}/releases" target="_blank" rel="noopener" style="margin-left:12px;background:transparent;border:1px solid rgba(255,255,255,0.05);color:var(--muted)">Releases</a>
            </p>
          </div>
        </section>
      `;
    } else if(featEl){
      featEl.innerHTML = '';
    }
    const others = repos.filter(r => featured ? r.id !== featured.id : true);
    if(el){
      el.innerHTML = others.map(r => `
        <article class="repo">
          <img src="${thumbMap[r.name]||'assets/img/placeholder-project.png'}" alt="${r.name} thumbnail">
          <div>
            <h3><a href="projects/view.html?repo=${encodeURIComponent(r.name)}" target="_self" rel="noopener">${r.name}</a></h3>
            <p>${r.description || ''}</p>
            <div class="meta">★ ${r.stargazers_count} • ${r.language || ''} • <a href="${r.html_url}" target="_blank" rel="noopener">GitHub</a></div>
          </div>
        </article>
      `).join('');
    }
  } catch(err){
    console.error(err);
    if(el) el.textContent = 'Failed to load projects (see console).';
  }
})();
