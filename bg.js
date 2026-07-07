(function () {
  const STORAGE_KEY = 'se-review-bg-settings';
  const DB_NAME = 'se-review-bg';
  const DB_STORE = 'images';

  const defaults = {
    bgUrl: '',
    overlayOpacity: 88,
    bgMode: 'cover',
    bgSource: 'default'
  };

  let settings = { ...defaults };

  function $(id) { return document.getElementById(id); }

  function openDb() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(DB_STORE);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function saveImageBlob(blob) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, 'readwrite');
      tx.objectStore(DB_STORE).put(blob, 'custom-bg');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async function loadImageBlob() {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, 'readonly');
      const req = tx.objectStore(DB_STORE).get('custom-bg');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  async function clearImageBlob() {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, 'readwrite');
      tx.objectStore(DB_STORE).delete('custom-bg');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  function saveSettings() {
    const toSave = { ...settings };
    if (toSave.bgSource === 'upload') toSave.bgUrl = '';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }

  function loadSettingsFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) settings = { ...defaults, ...JSON.parse(raw) };
    } catch (_) { /* ignore */ }
  }

  function compressImage(file, maxW = 1920, quality = 0.72) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          let w = img.width;
          let h = img.height;
          if (w > maxW) {
            h = Math.round(h * maxW / w);
            w = maxW;
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          canvas.toBlob(blob => {
            if (blob) resolve(blob);
            else reject(new Error('压缩失败'));
          }, 'image/jpeg', quality);
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function applyBackground() {
    const layer = $('bgLayer');
    const overlay = $('bgOverlay');
    if (!layer || !overlay) return;

    let url = settings.bgUrl;

    if (settings.bgSource === 'upload') {
      const blob = await loadImageBlob();
      if (blob) url = URL.createObjectURL(blob);
    }

    if (url) {
      layer.style.backgroundImage = `url("${url}")`;
      layer.style.backgroundSize = settings.bgMode;
      layer.style.backgroundPosition = 'center';
      layer.style.backgroundRepeat = 'no-repeat';
      layer.style.backgroundAttachment = window.innerWidth > 768 ? 'fixed' : 'scroll';
      layer.classList.add('has-image');
      document.body.classList.add('has-custom-bg');
    } else {
      layer.style.backgroundImage = '';
      layer.classList.remove('has-image');
      document.body.classList.remove('has-custom-bg');
    }

    overlay.style.opacity = (settings.overlayOpacity / 100).toFixed(2);
    syncPanelControls();
  }

  function syncPanelControls() {
    const opacity = $('bgOpacity');
    const opacityVal = $('bgOpacityVal');
    const urlInput = $('bgUrlInput');
    const status = $('bgStatus');
    if (opacity) opacity.value = settings.overlayOpacity;
    if (opacityVal) opacityVal.textContent = settings.overlayOpacity + '%';
    if (urlInput && document.activeElement !== urlInput) urlInput.value = settings.bgSource === 'url' ? settings.bgUrl : '';
    if (status) {
      if (settings.bgSource === 'upload') status.textContent = '当前：本地上传的图片';
      else if (settings.bgSource === 'url' && settings.bgUrl) status.textContent = '当前：网络图片链接';
      else status.textContent = '当前：默认淡色背景';
    }
  }

  async function handleFileUpload(file) {
    if (!file || !file.type.startsWith('image/')) {
      alert('请选择图片文件（jpg、png、webp 等）');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      alert('图片过大，请选择 15MB 以内的图片');
      return;
    }
    const blob = await compressImage(file);
    await clearImageBlob();
    await saveImageBlob(blob);
    settings.bgSource = 'upload';
    settings.bgUrl = '';
    saveSettings();
    await applyBackground();
  }

  async function handleUrlApply(url) {
    url = url.trim();
    if (!url) return;
    await clearImageBlob();
    settings.bgSource = 'url';
    settings.bgUrl = url;
    saveSettings();
    await applyBackground();
  }

  async function resetBackground() {
    await clearImageBlob();
    settings = { ...defaults };
    saveSettings();
    await applyBackground();
  }

  function getShareUrl() {
    return window.location.href.split('#')[0];
  }

  function getLanHint() {
    const host = window.location.hostname;
    const port = window.location.port || '80';
    if (host === 'localhost' || host === '127.0.0.1') {
      return `局域网分享：将 localhost 换成你的电脑 IP，例如 http://192.168.1.x:${port || '8080'}/`;
    }
    return getShareUrl();
  }

  function initShare() {
    const shareBtn = $('shareBtn');
    const shareModal = $('shareModal');
    const shareClose = $('shareClose');
    const shareUrl = $('shareUrl');
    const shareLan = $('shareLan');
    const copyShareUrl = $('copyShareUrl');
    const copyLanUrl = $('copyLanUrl');

    if (!shareBtn || !shareModal) return;

    shareBtn.addEventListener('click', () => {
      if (shareUrl) shareUrl.textContent = getShareUrl();
      if (shareLan) shareLan.textContent = getLanHint();
      shareModal.classList.add('show');
    });

    shareClose?.addEventListener('click', () => shareModal.classList.remove('show'));
    shareModal.addEventListener('click', e => {
      if (e.target === shareModal) shareModal.classList.remove('show');
    });

    copyShareUrl?.addEventListener('click', () => {
      navigator.clipboard.writeText(getShareUrl()).then(() => alert('链接已复制！'));
    });

    copyLanUrl?.addEventListener('click', () => {
      navigator.clipboard.writeText(getLanHint()).then(() => alert('说明已复制！'));
    });
  }

  function initBgPanel() {
    const bgBtn = $('bgBtn');
    const bgPanel = $('bgPanel');
    const bgClose = $('bgClose');
    const bgFile = $('bgFile');
    const bgUrlApply = $('bgUrlApply');
    const bgUrlInput = $('bgUrlInput');
    const bgOpacity = $('bgOpacity');
    const bgReset = $('bgReset');

    bgBtn?.addEventListener('click', () => bgPanel?.classList.add('show'));
    bgClose?.addEventListener('click', () => bgPanel?.classList.remove('show'));
    bgPanel?.addEventListener('click', e => {
      if (e.target === bgPanel) bgPanel.classList.remove('show');
    });

    bgFile?.addEventListener('change', e => {
      const file = e.target.files?.[0];
      if (file) handleFileUpload(file);
      e.target.value = '';
    });

    bgUrlApply?.addEventListener('click', () => handleUrlApply(bgUrlInput?.value || ''));

    bgOpacity?.addEventListener('input', e => {
      settings.overlayOpacity = Number(e.target.value);
      $('bgOpacityVal').textContent = settings.overlayOpacity + '%';
      $('bgOverlay').style.opacity = (settings.overlayOpacity / 100).toFixed(2);
      saveSettings();
    });

    bgReset?.addEventListener('click', () => resetBackground());

    window.addEventListener('resize', () => applyBackground());
  }

  loadSettingsFromStorage();
  initBgPanel();
  initShare();
  applyBackground();
})();
