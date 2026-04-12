// youtube-api.js — fetch recent uploads using YouTube Data API v3
// Usage: set window.YT_API_KEY = 'YOUR_KEY'; window.YT_CHANNEL_ID = 'CHANNEL_ID'; then call initYouTubeGrid();
async function initYouTubeGrid(){
  const key = window.YT_API_KEY;
  const channelId = window.YT_CHANNEL_ID;
  const grid = document.getElementById('yt-grid');
  if(!key || !channelId){
    console.warn('YouTube API key or channel ID missing.');
    return;
  }
  try{
    // get uploads playlist id
    const chRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${key}`);
    const chJson = await chRes.json();
    const uploads = chJson.items && chJson.items[0] && chJson.items[0].contentDetails.relatedPlaylists.uploads;
    if(!uploads) return;
    const plRes = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${uploads}&key=${key}`);
    const plJson = await plRes.json();
    const vids = plJson.items || [];
    grid.innerHTML = vids.map(i=>{
      const id = i.snippet.resourceId.videoId;
      const thumb = i.snippet.thumbnails && (i.snippet.thumbnails.high || i.snippet.thumbnails.medium || i.snippet.thumbnails.default);
      return `\n      <div class="yt-card">\n        <a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">\n          <img src="${thumb.url}" alt="${(i.snippet.title||'video').replace(/"/g,'')}">\n          <div class="yt-overlay">▶</div>\n        </a>\n      </div>\n      `;
    }).join('');
  }catch(e){
    console.error('YouTube fetch error', e);
  }
}
