(function () {
  const STORAGE_KEY = 'se-review-music-settings';
  const DEFAULT_API = 'http://127.0.0.1:3000';
  const DEFAULT_PLAYLIST_ID = '3778678';

  const defaults = {
    apiBase: DEFAULT_API,
    volume: 0.75,
    playlistId: DEFAULT_PLAYLIST_ID,
    neteaseCookie: '',
    loginNickname: ''
  };

  let settings = { ...defaults };
  let queue = [];
  let queueIndex = -1;
  let isPlaying = false;
  let isSeeking = false;
  let hasLoadedTrack = false;
  let qrPollTimer = null;
  let qrUnikey = '';
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

  function hasLogin() {
    return !!settings.neteaseCookie;
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

  function buildApiParams(params = {}) {
    const merged = { ...params, timestamp: Date.now() };
    if (settings.neteaseCookie) {
      merged.cookie = settings.neteaseCookie;
    }
    return merged;
  }

  async function neteaseApi(path, params = {}, options = {}) {
    const url = new URL(getApiBase() + path);
    Object.entries(buildApiParams(params)).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        url.searchParams.set(k, String(v));
      }
    });

    let res;
    try {
      res = await fetch(url.toString());
    } catch (_) {
      throw new Error('无法连接网易云 API，请先启动 API 服务并检查地址');
    }

    if (!res.ok) throw new Error(`API 请求失败 (${res.status})`);

    const data = await res.json();
    const allowedCodes = options.allowedCodes || [200];
    if (data.code !== undefined && !allowedCodes.includes(data.code)) {
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
    const levels = hasLogin() ? ['exhigh', 'higher', 'standard'] : ['standard', 'higher'];
    let lastError = null;

    for (const level of levels) {
      try {
        const data = await neteaseApi('/song/url/v1', { id, level });
        const item = data.data?.[0];
        if (item?.url) return item.url;
        lastError = new Error('该歌曲暂无法播放（可能是 VIP 或版权限制）');
      } catch (err) {
        lastError = err;
      }
    }

    if (hasLogin()) {
      throw lastError || new Error('该歌曲暂无法播放，请确认账号有相应 VIP 权限');
    }
    throw new Error('该歌曲无法播放，请登录网易云账号后再试（VIP 歌曲需要登录）');
  }

  function showQrImage(src) {
    const qrImage = $('musicQrImage');
    const qrPlaceholder = $('musicQrPlaceholder');
    if (!qrImage) return;
    qrImage.src = src;
    qrImage.hidden = false;
    if (qrPlaceholder) qrPlaceholder.hidden = true;
  }

  function hideQrImage(message) {
    const qrImage = $('musicQrImage');
    const qrPlaceholder = $('musicQrPlaceholder');
    if (qrImage) {
      qrImage.hidden = true;
      qrImage.removeAttribute('src');
    }
    if (qrPlaceholder) {
      qrPlaceholder.hidden = false;
      qrPlaceholder.textContent = message || '二维码加载失败';
    }
  }

  function setQrLink(url) {
    const wrap = $('musicQrLinkWrap');
    const link = $('musicQrLink');
    if (!url || !wrap || !link) return;
    link.href = url;
    wrap.hidden = false;
  }

  function clearQrLink() {
    const wrap = $('musicQrLinkWrap');
    if (wrap) wrap.hidden = true;
  }

  function buildQrImageSrc(qrimg, qrurl) {
    if (qrimg) {
      if (qrimg.startsWith('data:') || qrimg.startsWith('http')) return qrimg;
      return `data:image/png;base64,${qrimg}`;
    }
    if (qrurl) {
      return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=${encodeURIComponent(qrurl)}`;
    }
    return '';
  }

  function updateLoginUI(profile) {
    const status = $('musicLoginStatus');
    const logoutBtn = $('musicLogout');
    const qrStart = $('musicQrStart');
    const qrWrap = $('musicQrWrap');

    if (profile?.nickname || settings.loginNickname) {
      const name = profile?.nickname || settings.loginNickname;
      const vipTag = profile?.vipType > 0 ? ' · VIP' : '';
      if (status) status.textContent = `已登录：${name}${vipTag}`;
      if (logoutBtn) logoutBtn.hidden = false;
      if (qrStart) qrStart.textContent = '刷新登录状态';
      if (qrWrap) qrWrap.hidden = true;
      stopQrPolling();
    } else {
      if (status) status.textContent = '未登录 · VIP 歌曲需扫码登录后播放';
      if (logoutBtn) logoutBtn.hidden = true;
      if (qrStart) qrStart.textContent = '刷新二维码';
      if (qrWrap) qrWrap.hidden = false;
    }
  }

  async function refreshLoginStatus() {
    if (!settings.neteaseCookie) {
      settings.loginNickname = '';
      updateLoginUI(null);
      return false;
    }

    try {
      const data = await neteaseApi('/login/status');
      const profile = data.profile || data.data?.profile;
      if (data.data?.code === 200 || profile) {
        settings.loginNickname = profile?.nickname || settings.loginNickname;
        saveSettings();
        updateLoginUI(profile);
        return true;
      }
    } catch (_) { /* ignore */ }

    settings.neteaseCookie = '';
    settings.loginNickname = '';
    saveSettings();
    updateLoginUI(null);
    return false;
  }

  function stopQrPolling() {
    if (qrPollTimer) {
      clearInterval(qrPollTimer);
      qrPollTimer = null;
    }
  }

  function setQrTip(text) {
    const tip = $('musicQrTip');
    if (tip) tip.innerHTML = text;
  }

  async function startQrLogin() {
    if (hasLogin()) {
      await refreshLoginStatus();
      return;
    }

    stopQrPolling();
    clearQrLink();
    hideQrImage('正在获取二维码…');
    setQrTip('正在连接 API 并生成二维码…');
    setStatus('正在生成登录二维码…');

    const qrStart = $('musicQrStart');
    if (qrStart) {
      qrStart.disabled = true;
      qrStart.textContent = '加载中…';
    }

    try {
      const keyData = await neteaseApi('/login/qr/key');
      qrUnikey = keyData.data?.unikey || keyData.unikey;
      if (!qrUnikey) throw new Error('无法获取二维码 key');

      const qrData = await neteaseApi('/login/qr/create', { key: qrUnikey, qrimg: 1 });
      const qrimg = qrData.data?.qrimg || qrData.qrimg;
      const qrurl = qrData.data?.qrurl || qrData.qrurl;
      const imageSrc = buildQrImageSrc(qrimg, qrurl);

      if (!imageSrc) throw new Error('API 未返回二维码，请确认 NeteaseCloudMusicApi 已启动');

      showQrImage(imageSrc);
      if (qrurl) setQrLink(qrurl);

      setQrTip('请打开 <strong>网易云音乐 App</strong> → 左上角菜单 → 扫一扫');
      setStatus('二维码已就绪，请扫码登录');

      qrPollTimer = setInterval(async () => {
        try {
          const check = await neteaseApi('/login/qr/check', { key: qrUnikey, noCookie: true }, {
            allowedCodes: [800, 801, 802, 803]
          });

          if (check.code === 801) {
            setQrTip('二维码已显示，请用 App 扫一扫');
          } else if (check.code === 802) {
            setQrTip('扫码成功！请在手机上点击 <strong>确认登录</strong>');
          } else if (check.code === 803) {
            stopQrPolling();
            settings.neteaseCookie = check.cookie || check.data?.cookie || '';
            if (!settings.neteaseCookie) throw new Error('登录成功但未获取到凭证，请重试');
            saveSettings();
            await refreshLoginStatus();
            setStatus('网易云登录成功 ✓');
            setQrTip('登录成功，现在可以播放 VIP 歌曲了');
          } else if (check.code === 800) {
            stopQrPolling();
            hideQrImage('二维码已过期');
            setQrTip('二维码已过期，请点击「刷新二维码」');
            setStatus('二维码已过期，请刷新', true);
          }
        } catch (err) {
          stopQrPolling();
          hideQrImage('扫码检测失败');
          setStatus(err.message, true);
        }
      }, 2000);
    } catch (err) {
      hideQrImage('获取二维码失败');
      setQrTip('请先在「设置」中配置 API 地址，并双击 <code>start-music-api.bat</code> 启动服务');
      setStatus(err.message, true);
    } finally {
      if (qrStart) {
        qrStart.disabled = false;
        qrStart.textContent = hasLogin() ? '刷新登录状态' : '刷新二维码';
      }
    }
  }

  async function logoutNetease() {
    stopQrPolling();
    try {
      if (settings.neteaseCookie) {
        await neteaseApi('/logout');
      }
    } catch (_) { /* ignore */ }

    settings.neteaseCookie = '';
    settings.loginNickname = '';
    saveSettings();
    updateLoginUI(null);
    setStatus('已退出网易云登录');

    const qrImage = $('musicQrImage');
    const qrPlaceholder = $('musicQrPlaceholder');
    if (qrImage) {
      qrImage.hidden = true;
      qrImage.removeAttribute('src');
    }
    if (qrPlaceholder) qrPlaceholder.hidden = false;
    setQrTip('请使用 <strong>网易云音乐 App</strong> 扫码登录');
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

  function setPlayerVisible(show) {
    $('musicPlayer')?.classList.toggle('active', show);
  }

  function updatePlayStateLabel() {
    const state = $('musicPlayState');
    if (!state) return;
    if (!hasLoadedTrack) {
      state.textContent = '待机';
      state.className = 'music-player-state';
    } else if (isPlaying) {
      state.textContent = '播放中';
      state.className = 'music-player-state is-playing';
    } else {
      state.textContent = '已暂停';
      state.className = 'music-player-state is-paused';
    }
  }

  function updatePlayButtons() {
    const playBtn = $('musicPlayBtn');
    const pauseBtn = $('musicPauseBtn');
    const canControl = hasLoadedTrack && !!audio.src;

    if (playBtn) playBtn.hidden = isPlaying && canControl;
    if (pauseBtn) pauseBtn.hidden = !isPlaying || !canControl;
  }

  function updatePlayerUI(song) {
    const title = $('musicTitle');
    const artist = $('musicArtist');
    const cover = $('musicCover');
    const fallback = $('musicCoverFallback');

    if (!song) {
      if (title) title.textContent = '未播放';
      if (artist) artist.textContent = '打开音乐面板搜索或加载歌单';
      if (cover) { cover.hidden = true; cover.removeAttribute('src'); }
      if (fallback) fallback.hidden = false;
      hasLoadedTrack = false;
      setPlayerVisible(false);
      updatePlayStateLabel();
      updatePlayButtons();
      return;
    }

    if (title) title.textContent = song.name;
    if (artist) artist.textContent = formatArtists(song);
    hasLoadedTrack = true;
    setPlayerVisible(true);

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

    updatePlayStateLabel();
    updatePlayButtons();
  }

  async function playFromQueue(newQueue, index, replace) {
    queue = newQueue.slice();
    queueIndex = index;
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
      updatePlayButtons();
      updatePlayStateLabel();
      setStatus(`正在播放：${song.name}${hasLogin() ? '' : '（未登录，VIP 歌曲可能无法播放）'}`);
    } catch (err) {
      isPlaying = false;
      updatePlayButtons();
      updatePlayStateLabel();
      setStatus(err.message, true);
      if (!hasLogin() && /登录|VIP/i.test(err.message)) {
        setTimeout(() => openMusicPanel('account'), 500);
      }
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

  function pauseMusic() {
    if (!audio.src) return;
    audio.pause();
    isPlaying = false;
    updatePlayButtons();
    updatePlayStateLabel();
    const song = queue[queueIndex];
    setStatus(song ? `已暂停：${song.name}` : '已暂停');
  }

  function resumeMusic() {
    if (!audio.src) {
      openMusicPanel('search');
      return;
    }
    audio.play().then(() => {
      isPlaying = true;
      updatePlayButtons();
      updatePlayStateLabel();
      const song = queue[queueIndex];
      setStatus(song ? `正在播放：${song.name}` : '正在播放');
    }).catch(err => setStatus(err.message, true));
  }

  function togglePlayPause() {
    if (isPlaying) pauseMusic();
    else resumeMusic();
  }

  function isTypingTarget(target) {
    if (!target) return false;
    const tag = target.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
  }

  function openMusicPanel(tab) {
    $('musicPanel')?.classList.add('show');
    syncPanelSettings();
    if (tab) switchTab(tab);
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
    if (tabName === 'account') {
      refreshLoginStatus().then(loggedIn => {
        if (!loggedIn) startQrLogin();
      });
    }
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

    $('musicPlayBtn')?.addEventListener('click', resumeMusic);
    $('musicPauseBtn')?.addEventListener('click', pauseMusic);
    $('musicNext')?.addEventListener('click', playNext);
    $('musicPrev')?.addEventListener('click', playPrev);

    $('musicQrStart')?.addEventListener('click', startQrLogin);
    $('musicLogout')?.addEventListener('click', logoutNetease);

    $('musicTitle')?.addEventListener('click', togglePlayPause);
    document.querySelector('.music-player-cover')?.addEventListener('click', togglePlayPause);

    document.addEventListener('keydown', e => {
      if (e.code !== 'Space' || isTypingTarget(e.target)) return;
      e.preventDefault();
      togglePlayPause();
    });

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
      updatePlayButtons();
      updatePlayStateLabel();
    });

    audio.addEventListener('pause', () => {
      isPlaying = false;
      updatePlayButtons();
      updatePlayStateLabel();
    });

    audio.addEventListener('ended', playNext);

    audio.addEventListener('error', () => {
      setStatus('播放出错，尝试下一首…', true);
      setTimeout(playNext, 800);
    });
  }

  async function init() {
    loadSettings();
    audio.volume = settings.volume;

    const volume = $('musicVolume');
    const panelVol = $('musicVolumePanel');
    if (volume) volume.value = String(Math.round(settings.volume * 100));
    if (panelVol) panelVol.value = String(Math.round(settings.volume * 100));

    bindEvents();
    syncPanelSettings();
    updateLoginUI(settings.loginNickname ? { nickname: settings.loginNickname } : null);
    await refreshLoginStatus();
    await testApiConnection();
    updatePlayButtons();
    updatePlayStateLabel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
