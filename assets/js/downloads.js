(async function(){
  const el = document.getElementById('release-list');
  if(!el) return;
  try{
    const res = await fetch('https://api.github.com/repos/notlousybook/DeepSeek-Desktop/releases?per_page=10');
    const releases = await res.json();
    if(!Array.isArray(releases) || releases.length === 0){ el.innerHTML = '<p>No releases found.</p>'; return; }
    el.innerHTML = releases.map(r => {
      const tag = r.tag_name || r.name || 'untagged';
      const body = r.body ? (r.body.length>240? r.body.slice(0,240)+'...': r.body) : '';
      const assets = (r.assets || []).map(a => `<li><a href="${a.browser_download_url}" target="_blank" rel="noopener">${a.name}</a> (${Math.round(a.size/1024)} KB)</li>`).join('');
      const assetsHtml = assets ? `<ul>${assets}</ul>` : '<p>No downloadable assets for this release.</p>';
      return `\n        <article class="release">\n          <h3>${tag} <span class="meta">${r.published_at? new Date(r.published_at).toLocaleDateString():''}</span></h3>\n          <p>${body}</p>\n          ${assetsHtml}\n        </article>\n      `;
    }).join('');
  }catch(e){
    console.error(e);
    el.textContent = 'Failed to load releases.';
  }
})();
