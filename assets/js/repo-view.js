(function(){
  'use strict';
  function ensureScript(url, globalName){
    if(window[globalName]) return Promise.resolve();
    return new Promise(function(resolve,reject){
      var s=document.createElement('script');
      s.src=url; s.onload=resolve; s.onerror=function(){reject(new Error('Failed to load '+url))};
      document.head.appendChild(s);
    });
  }
  async function init(){
    var REPO = (typeof REPO_NAME !== 'undefined')? REPO_NAME : (location.pathname.split('/').pop() || '');
    REPO = REPO.replace('.html','');
    if(!REPO) return;
    try{ await ensureScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js','marked'); }catch(e){ console.warn('marked load failed',e) }
    try{ await ensureScript('https://cdn.jsdelivr.net/npm/dompurify@2.4.0/dist/purify.min.js','DOMPurify'); }catch(e){ console.warn('DOMPurify load failed',e) }
    var titleEl = document.getElementById('repo-title');
    var descEl = document.getElementById('repo-desc');
    var metaEl = document.getElementById('repo-meta');
    var readmeEl = document.getElementById('readme');
    try{
      var apiRes = await fetch('https://api.github.com/repos/notlousybook/' + encodeURIComponent(REPO));
      if(!apiRes.ok){
        if(titleEl) titleEl.textContent = REPO;
        if(descEl) descEl.textContent = 'Repository not found or private.';
        if(readmeEl) readmeEl.textContent = '';
        return;
      }
      var data = await apiRes.json();
      if(document && document.title) document.title = data.full_name + ' — notlousybook';
      if(titleEl) titleEl.innerHTML = '<a href="' + data.html_url + '" target="_blank" rel="noopener">' + data.full_name + '</a>';
      if(descEl) descEl.textContent = data.description || '';
      if(metaEl) metaEl.textContent = '★ ' + (data.stargazers_count||0) + ' • ' + (data.language||'') + ' • ' + (data.default_branch||'');
      var rawBase = 'https://raw.githubusercontent.com/notlousybook/' + encodeURIComponent(REPO) + '/' + data.default_branch + '/';
      var md = '';
      try{ var r = await fetch(rawBase + 'README.md'); if(r.ok) md = await r.text(); }catch(e){ console.warn('README fetch failed',e) }
      if(!md){ if(readmeEl) readmeEl.innerHTML = '<p>No README found. <a href="' + data.html_url + '" target="_blank" rel="noopener">View on GitHub</a></p>'; return; }
      var imgUrl = null;
      var mdImg = md.match(/!\[[^\]]*\]\(([^)]+)\)/);
      if(mdImg && mdImg[1]) imgUrl = mdImg[1].trim();
      if(!imgUrl){ var htmlImg = md.match(/<img[^>]*src=["']([^"']+)["'][^>]*>/i); if(htmlImg && htmlImg[1]) imgUrl = htmlImg[1].trim(); }
      if(imgUrl){ if(!/^https?:\/\//i.test(imgUrl) && !imgUrl.startsWith('data:')){ imgUrl = rawBase + imgUrl.replace(/^\.\/?/,''); }
        try{ var heroHtml = '<div class="repo-hero" style="margin-bottom:18px"><img src="' + imgUrl + '" alt="' + REPO + ' screenshot" style="width:100%;max-height:420px;object-fit:cover;border-radius:12px;display:block"></div>'; if(readmeEl) readmeEl.insertAdjacentHTML('beforebegin', heroHtml); }catch(e){ console.warn('hero insert failed',e) } }
      var html = (window.marked && window.marked.parse) ? window.marked.parse(md) : md;
      html = (window.DOMPurify && window.DOMPurify.sanitize) ? window.DOMPurify.sanitize(html) : html;
      if(readmeEl) readmeEl.innerHTML = html;
      try{
        var imgs = readmeEl.querySelectorAll('img');
        imgs.forEach(function(img){ var s = img.getAttribute('src') || img.src; if(s && !/^https?:\/\//i.test(s) && !s.startsWith('data:')){ img.src = rawBase + s.replace(/^\.\/?/,''); } });
        var anchors = readmeEl.querySelectorAll('a');
        anchors.forEach(function(a){ var href = a.getAttribute('href') || ''; if(href && !/^https?:\/\//i.test(href) && !href.startsWith('#') && !href.startsWith('mailto:')){ a.href = 'https://github.com/notlousybook/' + encodeURIComponent(REPO) + '/blob/' + data.default_branch + '/' + href.replace(/^\.\/?/,''); a.target = '_blank'; a.rel = 'noopener'; } });
      }catch(e){ console.warn('postprocess failed',e) }
    }catch(e){ console.error('repo view error',e); if(readmeEl) readmeEl.textContent = 'Error loading repository data.'; }
  }
  init();
})();
