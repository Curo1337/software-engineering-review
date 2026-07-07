(function () {
  const STORAGE_KEY = 'se-review-music-settings';
  const DEFAULT_API = 'http://127.0.0.1:3000';
  const DEFAULT_PLAYLIST_ID = '3778678';
  const QUALITY_OPTIONS = [
    { value: 'standard', label: '标准', hint: '约 128k，省流量' },
    { value: 'higher', label: '较高', hint: '约 192k，推荐' },
    { value: 'exhigh', label: '极高', hint: '约 320k，需登录' },
    { value: 'lossless', label: '无损', hint: 'FLAC，需黑胶 VIP' },
    { value: 'hires', label: 'Hi-Res', hint: '高解析度，需 SVIP' }
  ];

  const defaults = {
    apiBase: DEFAULT_API,
    volume: 0.75,
    playlistId: DEFAULT_PLAYLIST_ID,
    neteaseCookie: '',
    loginNickname: '',
    audioQuality: 'higher'
  };

  let settings = { ...defaults };
  let queue = [];
  let queueIndex = -1;
  let isSeeking = false;
  let hasLoadedTrack = false;
  let qrPollTimer = null;
  let qrUnikey = '';
  let currentPlayLevel = '';
  const audio = new Audio();

  function $(id) { return document.getElementById(id); }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) settings = { ...defaults, ...JSON.parse(raw) };
    } catch (_) { /* ignore */ }
    if (!QUALITY_OPTIONS.some(q => q.value === settings.audioQuality)) {
      settings.audioQuality = defaults.audioQuality;
    }
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

  function isAudioPlaying() {
    return !!audio.src && !audio.paused && !audio.ended;
  }

  function getApiIssue() {
    const base = getApiBase();
    const pageHttps = location.protocol === 'https:';
    const apiHttp = base.startsWith('http://');
    const apiLocal = /localhost|127\.0\.0\.1/i.test(base);

    if (pageHttps && apiHttp) {
      if (apiLocal) {
        return '在线网页无法直连本机 API。请运行 start-music-tunnel.bat 获取 https 地址，或用 Render 部署 netease-api 文件夹。';
      }
      return '网页是 HTTPS，API 是 HTTP，浏览器会拦截。请使用 HTTPS 的 API 地址。';
    }
    return '';
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

  function buildApiParams(params = {}, options = {}) {
    const merged = { ...params, timestamp: Date.now() };
    if (settings.neteaseCookie && options.withCookie !== false) {
      merged.cookie = settings.neteaseCookie;
    }
    return merged;
  }

  async function neteaseApi(path, params = {}, options = {}) {
    const apiIssue = getApiIssue();
    if (apiIssue && !options.ignoreApiIssue) {
      throw new Error(apiIssue);
    }

    const url = new URL(getApiBase() + path);
    Object.entries(buildApiParams(params, options)).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        url.searchParams.set(k, String(v));
      }
    });

    let res;
    try {
      res = await fetch(url.toString());
    } catch (_) {
      const hint = getApiIssue() || '无法连接网易云 API，请启动 API 并在「设置」检查地址';
      throw new Error(hint);
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
    const issue = getApiIssue();
    if (issue) {
      setStatus(issue, true);
      return false;
    }
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

  function getQualityLabel(value) {
    return QUALITY_OPTIONS.find(q => q.value === value)?.label || value;
  }

  function getQualityFallbackChain(preferred) {
    const chains = {
      hires: ['hires', 'lossless', 'exhigh', 'higher', 'standard'],
      lossless: ['lossless', 'exhigh', 'higher', 'standard'],
      exhigh: ['exhigh', 'higher', 'standard'],
      higher: ['higher', 'standard'],
      standard: ['standard']
    };
    return chains[preferred] || chains.higher;
  }

  async function getSongUrl(id, preferredLevel) {
    const levels = getQualityFallbackChain(preferredLevel || settings.audioQuality || 'higher');
    let lastError = null;

    for (const level of levels) {
      try {
        const data = await neteaseApi('/song/url/v1', { id, level });
        const item = data.data?.[0];
        if (item?.url) {
          return { url: item.url, level: item.level || level };
        }
        lastError = new Error('该歌曲暂无法播放（可能是 VIP 或版权限制）');
      } catch (err) {
        lastError = err;
      }
    }

    if (hasLogin()) {
      throw lastError || new Error('该歌曲暂无法播放，请确认账号有相应 VIP 权限');
    }
    throw new Error('该歌曲无法播放，请切换到「扫码登录」登录网易云账号');
  }

  function hideAllQrViews(message) {
    const qrImage = $('musicQrImage');
    const qrCanvas = $('musicQrCanvas');
    const qrPlaceholder = $('musicQrPlaceholder');

    if (qrImage) {
      qrImage.hidden = true;
      qrImage.removeAttribute('src');
    }
    if (qrCanvas) qrCanvas.hidden = true;
    if (qrPlaceholder) {
      qrPlaceholder.hidden = false;
      qrPlaceholder.textContent = message || '二维码加载失败';
    }
  }

  function showQrPlaceholder(message) {
    hideAllQrViews(message);
  }

  function showQrImage(src) {
    const qrImage = $('musicQrImage');
    const qrCanvas = $('musicQrCanvas');
    const qrPlaceholder = $('musicQrPlaceholder');
    if (!qrImage) return;

    qrImage.onerror = () => {
      qrImage.hidden = true;
      showQrPlaceholder('二维码图片加载失败，请点击刷新');
    };

    qrImage.src = src;
    qrImage.hidden = false;
    if (qrCanvas) qrCanvas.hidden = true;
    if (qrPlaceholder) qrPlaceholder.hidden = true;
  }

  async function showQrCanvas(qrurl) {
    const qrCanvas = $('musicQrCanvas');
    const qrImage = $('musicQrImage');
    const qrPlaceholder = $('musicQrPlaceholder');

    if (!qrCanvas || !qrurl || typeof window.QRCode === 'undefined') {
      return false;
    }

    try {
      await window.QRCode.toCanvas(qrCanvas, qrurl, { width: 200, margin: 1 });
      qrCanvas.hidden = false;
      if (qrImage) qrImage.hidden = true;
      if (qrPlaceholder) qrPlaceholder.hidden = true;
      return true;
    } catch (_) {
      return false;
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

  function buildQrImageSrc(qrimg) {
    if (!qrimg) return '';
    const text = String(qrimg).trim();
    if (text.startsWith('data:image')) return text;
    if (text.startsWith('http')) return text;
    return `data:image/png;base64,${text.replace(/^data:image\/\w+;base64,/, '')}`;
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

  async function renderQrCode(qrimg, qrurl) {
    const imageSrc = buildQrImageSrc(qrimg);
    if (imageSrc) {
      showQrImage(imageSrc);
      return true;
    }
    if (await showQrCanvas(qrurl)) return true;
    if (qrurl) {
      showQrImage(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=${encodeURIComponent(qrurl)}`);
      return true;
    }
    return false;
  }

  async function startQrLogin() {
    if (hasLogin()) {
      await refreshLoginStatus();
      return;
    }

    const apiIssue = getApiIssue();
    if (apiIssue) {
      showQrPlaceholder('请先配置可用的 API 地址');
      setQrTip(apiIssue);
      setStatus(apiIssue, true);
      return;
    }

    stopQrPolling();
    clearQrLink();
    showQrPlaceholder('正在获取二维码…');
    setQrTip('正在连接 API…');
    setStatus('正在生成登录二维码…');

    const qrStart = $('musicQrStart');
    if (qrStart) {
      qrStart.disabled = true;
      qrStart.textContent = '加载中…';
    }

    try {
      const keyData = await neteaseApi('/login/qr/key', {}, { withCookie: false });
      qrUnikey = keyData.data?.unikey || keyData.unikey;
      if (!qrUnikey) throw new Error('无法获取二维码 key');

      const qrData = await neteaseApi('/login/qr/create', { key: qrUnikey, qrimg: 1 }, { withCookie: false });
      const qrimg = qrData.data?.qrimg || qrData.qrimg;
      const qrurl = qrData.data?.qrurl || qrData.qrurl;

      const rendered = await renderQrCode(qrimg, qrurl);
      if (!rendered) throw new Error('API 未返回二维码，请确认 NeteaseCloudMusicApi 已启动');

      if (qrurl) setQrLink(qrurl);

      setQrTip('请打开 <strong>网易云音乐 App</strong> → 扫一扫');
      setStatus('二维码已就绪，请扫码登录');

      qrPollTimer = setInterval(async () => {
        try {
          const check = await neteaseApi('/login/qr/check', { key: qrUnikey, noCookie: true }, {
            withCookie: false,
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
            showQrPlaceholder('二维码已过期');
            setQrTip('二维码已过期，请点击「刷新二维码」');
            setStatus('二维码已过期，请刷新', true);
          }
        } catch (err) {
          stopQrPolling();
          showQrPlaceholder('扫码检测失败');
          setStatus(err.message, true);
        }
      }, 2000);
    } catch (err) {
      showQrPlaceholder('获取二维码失败');
      setQrTip('本地请运行 <code>start-music-tunnel.bat</code> 或 <code>start-music-api.bat</code>');
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
      if (settings.neteaseCookie) await neteaseApi('/logout');
    } catch (_) { /* ignore */ }

    settings.neteaseCookie = '';
    settings.loginNickname = '';
    saveSettings();
    updateLoginUI(null);
    showQrPlaceholder('已退出，点击刷新二维码重新登录');
    setStatus('已退出网易云登录');
    clearQrLink();
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
        if (song) playFromQueue([song], 0);
      });
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateProgressDisplay() {
    const currentEl = $('musicTimeCurrent');
    const totalEl = $('musicTimeTotal');
    const progress = $('musicProgress');

    if (currentEl) currentEl.textContent = formatTime(audio.currentTime);
    if (totalEl) totalEl.textContent = formatTime(audio.duration);

    if (progress && !isSeeking && Number.isFinite(audio.duration) && audio.duration > 0) {
      progress.value = String((audio.currentTime / audio.duration) * 100);
    }
  }

  function resetProgressDisplay() {
    const currentEl = $('musicTimeCurrent');
    const totalEl = $('musicTimeTotal');
    const progress = $('musicProgress');
    if (currentEl) currentEl.textContent = '00:00';
    if (totalEl) totalEl.textContent = '00:00';
    if (progress) progress.value = '0';
  }

  function updateQualityBadge() {
    const badge = $('musicQualityBadge');
    if (!badge) return;
    if (!currentPlayLevel) {
      badge.hidden = true;
      return;
    }
    badge.hidden = false;
    badge.textContent = getQualityLabel(currentPlayLevel);
  }

  function syncQualitySelect() {
    const select = $('musicQualitySelect');
    const playerSelect = $('musicQualityPlayer');
    [select, playerSelect].forEach(el => {
      if (el) el.value = settings.audioQuality;
    });
  }

  function setPlayerVisible(show) {
    $('musicPlayer')?.classList.toggle('active', show);
  }

  function initQualitySelects() {
    const optionsHtml = QUALITY_OPTIONS.map(q =>
      `<option value="${q.value}">${q.label} · ${q.hint}</option>`
    ).join('');

    const select = $('musicQualitySelect');
    const playerSelect = $('musicQualityPlayer');
    if (select) select.innerHTML = optionsHtml;
    if (playerSelect) {
      playerSelect.innerHTML = QUALITY_OPTIONS.map(q =>
        `<option value="${q.value}">${q.label}</option>`
      ).join('');
    }
    syncQualitySelect();
  }
    $('musicPlayer')?.classList.toggle('active', show);
  }

  function updatePlayStateLabel() {
    const state = $('musicPlayState');
    if (!state) return;
    if (!hasLoadedTrack || !audio.src) {
      state.textContent = '待机';
      state.className = 'music-player-state';
    } else if (isAudioPlaying()) {
      state.textContent = '播放中';
      state.className = 'music-player-state is-playing';
    } else {
      state.textContent = '已暂停';
      state.className = 'music-player-state is-paused';
    }
  }

  function updateToggleButton() {
    const btn = $('musicToggleBtn');
    const canControl = hasLoadedTrack && !!audio.src;
    if (!btn) return;

    if (!canControl) {
      btn.textContent = '▶';
      btn.title = '播放';
      btn.setAttribute('aria-label', '播放');
      return;
    }

    if (isAudioPlaying()) {
      btn.textContent = '⏸';
      btn.title = '暂停';
      btn.setAttribute('aria-label', '暂停');
    } else {
      btn.textContent = '▶';
      btn.title = '继续播放';
      btn.setAttribute('aria-label', '继续播放');
    }
  }

  function syncPlayerControls() {
    updatePlayStateLabel();
    updateToggleButton();
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
      resetProgressDisplay();
      syncPlayerControls();
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

    syncPlayerControls();
  }

  async function playFromQueue(newQueue, index) {
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
      const result = await getSongUrl(song.id);
      audio.src = result.url;
      currentPlayLevel = result.level;
      audio.volume = settings.volume;
      await audio.play();
      syncPlayerControls();
      updateQualityBadge();
      setStatus(`正在播放：${song.name} · ${getQualityLabel(currentPlayLevel)}${hasLogin() ? '' : '（未登录，VIP 歌曲可能无法播放）'}`);
    } catch (err) {
      currentPlayLevel = '';
      updateQualityBadge();
      syncPlayerControls();
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
    syncPlayerControls();
    const song = queue[queueIndex];
    setStatus(song ? `已暂停：${song.name}` : '已暂停');
  }

  function resumeMusic() {
    if (!audio.src) {
      openMusicPanel('search');
      return;
    }
    audio.play().then(() => {
      syncPlayerControls();
      const song = queue[queueIndex];
      setStatus(song ? `正在播放：${song.name}` : '正在播放');
    }).catch(err => setStatus(err.message, true));
  }

  function togglePlayPause() {
    if (!audio.src) {
      openMusicPanel('search');
      return;
    }
    if (isAudioPlaying()) pauseMusic();
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
    syncQualitySelect();
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
      await playFromQueue(tracks, 0);
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

  async function handleQualityChange(source) {
    const select = source === 'player' ? $('musicQualityPlayer') : $('musicQualitySelect');
    const value = select?.value;
    if (!value || value === settings.audioQuality) return;

    settings.audioQuality = value;
    saveSettings();
    syncQualitySelect();

    const song = queue[queueIndex];
    if (!song || !audio.src) {
      setStatus(`音质已设为：${getQualityLabel(value)}`);
      return;
    }

    const wasPlaying = isAudioPlaying();
    const savedTime = audio.currentTime;
    setStatus(`正在切换音质：${getQualityLabel(value)}…`);

    try {
      const result = await getSongUrl(song.id, value);
      audio.src = result.url;
      currentPlayLevel = result.level;
      updateQualityBadge();

      const applyTime = () => {
        if (savedTime > 0 && Number.isFinite(audio.duration)) {
          audio.currentTime = Math.min(savedTime, audio.duration);
        }
        updateProgressDisplay();
      };

      if (audio.readyState >= 1) applyTime();
      else audio.addEventListener('loadedmetadata', applyTime, { once: true });

      if (wasPlaying) await audio.play();
      setStatus(`正在播放：${song.name} · ${getQualityLabel(currentPlayLevel)}`);
    } catch (err) {
      setStatus(err.message, true);
    }
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

    $('musicQualitySelect')?.addEventListener('change', () => handleQualityChange('settings'));
    $('musicQualityPlayer')?.addEventListener('change', () => handleQualityChange('player'));

    $('musicToggleBtn')?.addEventListener('click', togglePlayPause);
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
    progress?.addEventListener('input', () => {
      isSeeking = true;
      if (audio.duration) {
        const preview = (Number(progress.value) / 100) * audio.duration;
        const currentEl = $('musicTimeCurrent');
        if (currentEl) currentEl.textContent = formatTime(preview);
      }
    });
    progress?.addEventListener('change', () => {
      if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
      }
      isSeeking = false;
      updateProgressDisplay();
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

    audio.addEventListener('timeupdate', updateProgressDisplay);
    audio.addEventListener('loadedmetadata', updateProgressDisplay);
    audio.addEventListener('durationchange', updateProgressDisplay);

    audio.addEventListener('play', syncPlayerControls);
    audio.addEventListener('pause', syncPlayerControls);
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
    initQualitySelects();
    syncPanelSettings();
    hideAllQrViews('切换到本页后将自动加载二维码');
    updateLoginUI(settings.loginNickname ? { nickname: settings.loginNickname } : null);
    await refreshLoginStatus();
    await testApiConnection();
    syncPlayerControls();
    resetProgressDisplay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
