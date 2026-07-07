(function () {
  const STORAGE_KEY = 'se-review-music-settings';
  const DEFAULT_API = 'http://127.0.0.1:3000';
  const DEFAULT_PLAYLIST_ID = '3778678';

  const defaults = {
    apiBase: DEFAULT_API,
    volume: 0.75,
    playlistId: DEFAULT_PLAYLIST_ID
  };

  let settings = { ...defaults };
  let queue = [];
  let queueIndex = -1;
  let isPlaying = false;
  let isSeeking = false;
  const audio = new Audio();

  function $(id) { return document.getElementById(id); }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) settings = { ...defaults, ...JSON.parse(raw) };
    } catch (_) { /* ignore */ }
  }

  function saveSettings() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }

  function getApiBase() {
    return (settings.apiBase || DEFAULT_API).replace(/\/+$/, '');
  }

  function formatArtists(song) {
    const list = song.ar || song.artists || [];
    return list.map(a => a.name).join(' / ') || '未知歌手';
  }

  function getCoverUrl(song) {
    const pic = song.al?.picUrl || song.album?.picUrl || '';
    return pic ? `${pic}?param=80y80` : '';
  }

  function setStatus(text, isError) {
    const el = $('musicStatus');
    if (!el) return;
    el.textContent = text;
    el.classList.toggle('music-status-error', !!isError);
  }

  async function neteaseApi(path, params = {}) {
    const url = new URL(getApiBase() + path);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
    });

    let res;
    try {
      res = await fetch(url.toString());
    } catch (_) {
      throw new Error('无法连接网易云 API，请先启动 API 服务并检查地址');
    }

    if (!res.ok) throw new Error(`API 请求失败 (${res.status})`);

    const data = await res.json();
    if (data.code !== undefined && data.code !== 200) {
      throw new Error(data.msg || data.message || `API 返回错误 (${data.code})`);
    }
    return data;
  }

  async function testApiConnection() {
    setStatus('正在测试 API 连接…');
    try {
      await neteaseApi('/search', { keywords: '软件工程', limit: 1 });
      setStatus('API 连接正常 ✓');
      return true;
    } catch (err) {
      setStatus(err.message, true);
      return false;
    }
  }

  async function searchSongs(keywords) {
    const data = await neteaseApi('/search', { keywords, limit: 30 });
    return data.result?.songs || [];
  }

  async function getPlaylistTracks(id) {
    const data = await neteaseApi('/playlist/detail', { id });
    return data.playlist?.tracks || [];
  }

  async function getSongUrl(id) {
    const data = await neteaseApi('/song/url/v1', { id, level: 'standard' });
    const item = data.data?.[0];
    if (!item?.url) throw new Error('该歌曲暂无法播放（可能是 VIP 或版权限制）');
    return item.url;
  }

  function renderSearchResults(songs) {
    const list = $('musicResults');
    if (!list) return;

    if (!songs.length) {
      list.innerHTML = '<p class="music-empty">未找到相关歌曲</p>';
      return;
    }

    list.innerHTML = songs.map(song => `
      <button type="button" class="music-track-item" data-id="${song.id}">
        <img class="music-track-cover" src="${getCoverUrl(song)}" alt="" loading="lazy">
        <span class="music-track-meta">
          <strong>${escapeHtml(song.name)}</strong>
          <small>${escapeHtml(formatArtists(song))}</small>
        </span>
        <span class="music-track-play">▶</span>
      </button>
    `).join('');

    list.querySelectorAll('.music-track-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        const song = songs.find(s => s.id === id);
        if (song) playFromQueue([song], 0, true);
      });
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function updatePlayerUI(song) {
    const title = $('musicTitle');
    const artist = $('musicArtist');
    const cover = $('musicCover');
    const fallback = $('musicCoverFallback');
    const player = $('musicPlayer');

    if (!song) {
      if (title) title.textContent = '未播放';
      if (artist) artist.textContent = '打开音乐面板搜索或加载歌单';
      if (cover) { cover.hidden = true; cover.removeAttribute('src'); }
      if (fallback) fallback.hidden = false;
      player?.classList.remove('active');
      return;
    }

    if (title) title.textContent = song.name;
    if (artist) artist.textContent = formatArtists(song);
    player?.classList.add('active');

    const pic = getCoverUrl(song);
    if (cover && fallback) {
      if (pic) {
        cover.src = pic;
        cover.hidden = false;
        fallback.hidden = true;
      } else {
        cover.hidden = true;
        fallback.hidden = false;
      }
    }
  }

  function updatePlayButton() {
    const btn = $('musicPlayPause');
    if (btn) btn.textContent = isPlaying ? '⏸' : '▶';
  }

  async function playFromQueue(newQueue, index, replace) {
    if (replace) {
      queue = newQueue.slice();
      queueIndex = index;
    } else {
      queue = newQueue.slice();
      queueIndex = index;
    }

    await playCurrent();
  }

  async function playCurrent() {
    const song = queue[queueIndex];
    if (!song) return;

    updatePlayerUI(song);
    setStatus(`正在加载：${song.name}…`);

    try {
      const url = await getSongUrl(song.id);
      audio.src = url;
      audio.volume = settings.volume;
      await audio.play();
      isPlaying = true;
      updatePlayButton();
      setStatus(`正在播放：${song.name}`);
    } catch (err) {
      isPlaying = false;
      updatePlayButton();
      setStatus(err.message, true);
    }
  }

  function playNext() {
    if (!queue.length) return;
    queueIndex = (queueIndex + 1) % queue.length;
    playCurrent();
  }

  function playPrev() {
    if (!queue.length) return;
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    queueIndex = (queueIndex - 1 + queue.length) % queue.length;
    playCurrent();
  }

  function togglePlayPause() {
    if (!audio.src) {
      openMusicPanel('search');
      return;
    }
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
    } else {
      audio.play().then(() => {
        isPlaying = true;
        updatePlayButton();
      }).catch(err => setStatus(err.message, true));
    }
    updatePlayButton();
  }

  function openMusicPanel(tab) {
    $('musicPanel')?.classList.add('show');
    if (tab) switchTab(tab);
    syncPanelSettings();
  }

  function closeMusicPanel() {
    $('musicPanel')?.classList.remove('show');
  }

  function switchTab(tabName) {
    document.querySelectorAll('.music-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.music-tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.dataset.panel === tabName);
    });
  }

  function syncPanelSettings() {
    const apiInput = $('musicApiInput');
    const playlistInput = $('musicPlaylistInput');
    const volumeInput = $('musicVolumePanel');
    if (apiInput && document.activeElement !== apiInput) apiInput.value = settings.apiBase;
    if (playlistInput && document.activeElement !== playlistInput) {
      playlistInput.value = settings.playlistId;
    }
    if (volumeInput) volumeInput.value = Math.round(settings.volume * 100);
  }

  async function handleSearch() {
    const keywords = ($('musicSearchInput')?.value || '').trim();
    if (!keywords) return;
    setStatus(`搜索「${keywords}」…`);
    try {
      const songs = await searchSongs(keywords);
      renderSearchResults(songs);
      setStatus(`找到 ${songs.length} 首歌曲`);
    } catch (err) {
      renderSearchResults([]);
      setStatus(err.message, true);
    }
  }

  async function handleLoadPlaylist() {
    const id = ($('musicPlaylistInput')?.value || '').trim() || settings.playlistId;
    if (!id) return;
    settings.playlistId = id;
    saveSettings();
    setStatus('正在加载歌单…');
    try {
      const tracks = await getPlaylistTracks(id);
      if (!tracks.length) throw new Error('歌单为空或无法访问');
      await playFromQueue(tracks, 0, true);
      renderSearchResults(tracks);
      switchTab('search');
      setStatus(`已加载歌单，共 ${tracks.length} 首`);
    } catch (err) {
      setStatus(err.message, true);
    }
  }

  function handleSaveApi() {
    const apiInput = $('musicApiInput');
    settings.apiBase = (apiInput?.value || DEFAULT_API).trim() || DEFAULT_API;
    saveSettings();
    testApiConnection();
  }

  function bindEvents() {
    $('musicBtn')?.addEventListener('click', () => openMusicPanel('search'));
    $('musicOpenPanel')?.addEventListener('click', () => openMusicPanel('search'));
    $('musicClose')?.addEventListener('click', closeMusicPanel);
    $('musicPanel')?.addEventListener('click', e => {
      if (e.target === $('musicPanel')) closeMusicPanel();
    });

    document.querySelectorAll('.music-tab').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    $('musicSearchBtn')?.addEventListener('click', handleSearch);
    $('musicSearchInput')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleSearch();
    });

    $('musicPlaylistLoad')?.addEventListener('click', handleLoadPlaylist);
    $('musicApiSave')?.addEventListener('click', handleSaveApi);
    $('musicApiTest')?.addEventListener('click', testApiConnection);

    $('musicPlayPause')?.addEventListener('click', togglePlayPause);
    $('musicNext')?.addEventListener('click', playNext);
    $('musicPrev')?.addEventListener('click', playPrev);

    const progress = $('musicProgress');
    progress?.addEventListener('input', () => { isSeeking = true; });
    progress?.addEventListener('change', () => {
      if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
      }
      isSeeking = false;
    });

    const volume = $('musicVolume');
    volume?.addEventListener('input', () => {
      settings.volume = Number(volume.value) / 100;
      audio.volume = settings.volume;
      saveSettings();
      const panelVol = $('musicVolumePanel');
      if (panelVol) panelVol.value = volume.value;
    });

    $('musicVolumePanel')?.addEventListener('input', e => {
      settings.volume = Number(e.target.value) / 100;
      audio.volume = settings.volume;
      saveSettings();
      if (volume) volume.value = e.target.value;
    });

    audio.addEventListener('timeupdate', () => {
      if (!progress || isSeeking || !audio.duration) return;
      progress.value = String((audio.currentTime / audio.duration) * 100);
    });

    audio.addEventListener('play', () => {
      isPlaying = true;
      updatePlayButton();
    });

    audio.addEventListener('pause', () => {
      isPlaying = false;
      updatePlayButton();
    });

    audio.addEventListener('ended', playNext);

    audio.addEventListener('error', () => {
      setStatus('播放出错，尝试下一首…', true);
      setTimeout(playNext, 800);
    });
  }

  function init() {
    loadSettings();
    audio.volume = settings.volume;

    const volume = $('musicVolume');
    const panelVol = $('musicVolumePanel');
    if (volume) volume.value = String(Math.round(settings.volume * 100));
    if (panelVol) panelVol.value = String(Math.round(settings.volume * 100));

    bindEvents();
    syncPanelSettings();
    testApiConnection();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
