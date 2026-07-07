(function () {
  const STORAGE_KEY = 'se-review-avatar-settings';
  const DB_NAME = 'se-review-avatar';
  const DB_STORE = 'images';
  const DEFAULT_EMOJI = '📘';

  const defaults = {
    avatarUrl: '',
    avatarSource: 'default'
  };

  let settings = { ...defaults };
  let objectUrl = null;

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
      tx.objectStore(DB_STORE).put(blob, 'avatar');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async function loadImageBlob() {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, 'readonly');
      const req = tx.objectStore(DB_STORE).get('avatar');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  async function clearImageBlob() {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, 'readwrite');
      tx.objectStore(DB_STORE).delete('avatar');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  function saveSettings() {
    const toSave = { ...settings };
    if (toSave.avatarSource === 'upload') toSave.avatarUrl = '';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }

  function loadSettingsFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) settings = { ...defaults, ...JSON.parse(raw) };
    } catch (_) { /* ignore */ }
  }

  function compressAvatar(file, maxSize = 256, quality = 0.85) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          let w = img.width;
          let h = img.height;
          const scale = Math.min(maxSize / w, maxSize / h, 1);
          w = Math.round(w * scale);
          h = Math.round(h * scale);
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          canvas.toBlob(blob => {
            if (blob) resolve(blob);
            else reject(new Error('头像压缩失败'));
          }, 'image/jpeg', quality);
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function revokeObjectUrl() {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      objectUrl = null;
    }
  }

  async function applyAvatar() {
    const imgEl = $('brandAvatarImg');
    const fallback = $('brandAvatarFallback');
    const preview = $('avatarPreview');
    const previewFallback = $('avatarPreviewFallback');
    const status = $('avatarStatus');
    if (!imgEl || !fallback) return;

    revokeObjectUrl();
    let url = settings.avatarUrl;

    if (settings.avatarSource === 'upload') {
      const blob = await loadImageBlob();
      if (blob) {
        objectUrl = URL.createObjectURL(blob);
        url = objectUrl;
      }
    }

    const hasCustom = !!url;

    imgEl.hidden = !hasCustom;
    fallback.hidden = hasCustom;
    if (hasCustom) {
      imgEl.src = url;
    } else {
      imgEl.removeAttribute('src');
      fallback.textContent = DEFAULT_EMOJI;
    }

    if (preview && previewFallback) {
      preview.hidden = !hasCustom;
      previewFallback.hidden = hasCustom;
      if (hasCustom) preview.src = url;
    }

    if (status) {
      if (settings.avatarSource === 'upload') status.textContent = '当前：本地上传的头像';
      else if (settings.avatarSource === 'url' && settings.avatarUrl) status.textContent = '当前：网络图片头像';
      else status.textContent = '当前：默认图标 📘';
    }

    syncPanelControls();
  }

  function syncPanelControls() {
    const urlInput = $('avatarUrlInput');
    if (urlInput && document.activeElement !== urlInput) {
      urlInput.value = settings.avatarSource === 'url' ? settings.avatarUrl : '';
    }
  }

  async function handleFileUpload(file) {
    if (!file || !file.type.startsWith('image/')) {
      alert('请选择图片文件（jpg、png、webp 等）');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('头像图片请小于 5MB');
      return;
    }
    const blob = await compressAvatar(file);
    await clearImageBlob();
    await saveImageBlob(blob);
    settings.avatarSource = 'upload';
    settings.avatarUrl = '';
    saveSettings();
    await applyAvatar();
  }

  async function handleUrlApply(url) {
    url = url.trim();
    if (!url) return;
    await clearImageBlob();
    settings.avatarSource = 'url';
    settings.avatarUrl = url;
    saveSettings();
    await applyAvatar();
  }

  async function resetAvatar() {
    await clearImageBlob();
    settings = { ...defaults };
    saveSettings();
    await applyAvatar();
  }

  function initAvatarPanel() {
    const btn = $('brandAvatarBtn');
    const panel = $('avatarPanel');
    const closeBtn = $('avatarClose');
    const fileInput = $('avatarFile');
    const urlApply = $('avatarUrlApply');
    const urlInput = $('avatarUrlInput');
    const resetBtn = $('avatarReset');

    btn?.addEventListener('click', () => panel?.classList.add('show'));
    closeBtn?.addEventListener('click', () => panel?.classList.remove('show'));
    panel?.addEventListener('click', e => {
      if (e.target === panel) panel.classList.remove('show');
    });

    fileInput?.addEventListener('change', e => {
      const file = e.target.files?.[0];
      if (file) handleFileUpload(file);
      e.target.value = '';
    });

    urlApply?.addEventListener('click', () => handleUrlApply(urlInput?.value || ''));
    resetBtn?.addEventListener('click', () => resetAvatar());
  }

  loadSettingsFromStorage();
  initAvatarPanel();
  applyAvatar();
})();
