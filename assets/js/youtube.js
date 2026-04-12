(function(){
  // Simple static list of video IDs for manual embeds; replace with API-driven fetch when you have a key.
  const videos = ['dQw4w9WgXcQ']; // placeholder: replace with real video IDs from the channel
  const grid = document.getElementById('yt-grid');
  if(!grid) return;
  grid.innerHTML = videos.map(id => `\n    <div class="yt-card">\n      <a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">\n        <img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="video"/>\n        <div class="yt-overlay">▶</div>\n      </a>\n    </div>\n  `).join('');
})();
