(async function(){
  const repoList = document.getElementById('home-repo-list');
  const videoList = document.getElementById('home-video-list');

  if(repoList){
    try{
      const res = await fetch('https://api.github.com/users/notlousybook/repos?per_page=100&sort=updated');
      const repos = await res.json();
      if(Array.isArray(repos)){
        const top = repos.sort((a,b)=> (b.stargazers_count||0) - (a.stargazers_count||0)).slice(0,3);
        repoList.innerHTML = top.map(r => `\n          <div class="repo-card">\n            <h4><a href="projects/view.html?repo=${encodeURIComponent(r.name)}">${r.name}</a></h4>\n            <p>${r.description||''}</p>\n            <div class="meta">★ ${r.stargazers_count || 0} • ${r.language || ''}</div>\n          </div>\n        `).join('');
      } else {
        repoList.textContent = 'No projects found.';
      }
    }catch(e){
      console.error(e);
      repoList.textContent = 'Failed to load projects.';
    }
  }

  if(videoList){
    if(window.YT_API_KEY && window.YT_CHANNEL_ID){
      try{
        const chRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${window.YT_CHANNEL_ID}&key=${window.YT_API_KEY}`);
        const chJson = await chRes.json();
        const uploads = chJson.items && chJson.items[0] && chJson.items[0].contentDetails.relatedPlaylists.uploads;
        if(uploads){
          const plRes = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=3&playlistId=${uploads}&key=${window.YT_API_KEY}`);
          const plJson = await plRes.json();
          const vids = plJson.items || [];
          videoList.innerHTML = vids.map(i => `\n            <div class="yt-card">\n              <a href="https://www.youtube.com/watch?v=${i.snippet.resourceId.videoId}" target="_blank" rel="noopener">\n                <img src="${(i.snippet.thumbnails.high||i.snippet.thumbnails.medium||i.snippet.thumbnails.default).url}" alt="${(i.snippet.title||'video').replace(/"/g,'')}">\n                <div class="yt-overlay">▶</div>\n              </a>\n            </div>\n          `).join('');
        } else {
          videoList.innerHTML = '<p>No videos found.</p>';
        }
      }catch(e){
        console.error(e);
        videoList.innerHTML = '<p>Failed to load videos.</p>';
      }
    } else {
      videoList.innerHTML = '<p><a class="cta" href="https://www.youtube.com/@notlousybook" target="_blank">Visit YouTube channel</a></p>';
    }
  }
})();
