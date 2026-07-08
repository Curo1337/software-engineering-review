(function () {
  const meta = window.SUBJECT_META || {};
  const STORAGE_KEY = (meta.storageKey || 'se-review') + '-avatar-settings';
  const DB_NAME = (meta.storageKey || 'se-review') + '-avatar';
  const DB_STORE = 'images';
  const DEFAULT_EMOJI = meta.defaultAvatar || '📘';

  const defaults = {
    avatarUrl: '',
    avatarSource: 'default'
  };

  let settings = { ...defaults };
  let objectUrl = null;

  function $(id) { return document.getElementById(id); }

  function openAvatarPanel() {
    $('avatarPanel')?.classList.add('show');
  }

  function closeAvatarPanel() {
    $('avatarPanel')?.classList.remove('show');
  }

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
    try {
      const db = await openDb();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(DB_STORE, 'readonly');
        const req = tx.objectStore(DB_STORE).get('avatar');
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } catch (_) {
      return null;
    }
  }

  async function clearImageBlob() {
    try {
      const db = await openDb();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(DB_STORE, 'readwrite');
        tx.objectStore(DB_STORE).delete('avatar');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (_) { /* ignore */ }
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

  function compressAvatar(file, outputSize = 128, quality = 0.88) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const side = Math.min(img.width, img.height);
          const sx = Math.floor((img.width - side) / 2);
          const sy = Math.floor((img.height - side) / 2);
          const canvas = document.createElement('canvas');
          canvas.width = outputSize;
          canvas.height = outputSize;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, sx, sy, side, side, 0, 0, outputSize, outputSize);
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

  function showFallback(fallback, imgEl) {
    if (fallback) {
      fallback.hidden = false;
      fallback.textContent = DEFAULT_EMOJI;
    }
    if (imgEl) {
      imgEl.hidden = true;
      imgEl.removeAttribute('src');
    }
  }

  async function applyAvatar() {
    const imgEl = $('brandAvatarImg');
    const fallback = $('brandAvatarFallback');
    const preview = $('avatarPreview');
    const previewFallback = $('avatarPreviewFallback');
    const status = $('avatarStatus');
    if (!fallback) return;

    revokeObjectUrl();
    let url = settings.avatarUrl;

    if (settings.avatarSource === 'upload') {
      const blob = await loadImageBlob();
      if (blob) {
        objectUrl = URL.createObjectURL(blob);
        url = objectUrl;
      } else {
        settings.avatarSource = 'default';
        settings.avatarUrl = '';
        saveSettings();
      }
    }

    const hasCustom = !!url;

    if (hasCustom && imgEl) {
      fallback.hidden = true;
      imgEl.hidden = false;
      imgEl.src = url;
    } else {
      showFallback(fallback, imgEl);
    }

    if (preview && previewFallback) {
      if (hasCustom) {
        previewFallback.hidden = true;
        preview.hidden = false;
        preview.src = url;
      } else {
        preview.hidden = true;
        previewFallback.hidden = false;
        preview.removeAttribute('src');
      }
    }

    if (status) {
      if (settings.avatarSource === 'upload' && hasCustom) status.textContent = '当前：本地上传的头像';
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

  function bindAvatarOpeners() {
    const targets = [
      $('brandAvatarBtn'),
      $('avatarBtn')
    ];

    targets.forEach(el => {
      if (!el) return;
      el.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        openAvatarPanel();
      });
    });
  }

  function initAvatarPanel() {
    bindAvatarOpeners();

    const panel = $('avatarPanel');
    const closeBtn = $('avatarClose');
    const fileInput = $('avatarFile');
    const urlApply = $('avatarUrlApply');
    const urlInput = $('avatarUrlInput');
    const resetBtn = $('avatarReset');

    closeBtn?.addEventListener('click', closeAvatarPanel);
    panel?.addEventListener('click', e => {
      if (e.target === panel) closeAvatarPanel();
    });

    fileInput?.addEventListener('change', e => {
      const file = e.target.files?.[0];
      if (file) handleFileUpload(file);
      e.target.value = '';
    });

    urlApply?.addEventListener('click', () => handleUrlApply(urlInput?.value || ''));
    resetBtn?.addEventListener('click', () => resetAvatar());
  }

  function init() {
    loadSettingsFromStorage();
    initAvatarPanel();
    applyAvatar().catch(() => showFallback($('brandAvatarFallback'), $('brandAvatarImg')));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
