(function () {
  const meta = window.SUBJECT_META || {};
  const STORAGE_KEY = (meta.storageKey || 'se-review') + '-brand-settings';
  const DEFAULT_TITLE = meta.defaultBrandTitle || '软件工程总复习';
  const DEFAULT_SUBTITLE = meta.defaultBrandSubtitle || '2026 详细解析版';
  const DEFAULT_PAGE_TITLE = meta.defaultPageTitle || '2026 软件工程总复习 · 详细解析';

  const defaults = {
    title: DEFAULT_TITLE,
    subtitle: DEFAULT_SUBTITLE
  };

  let settings = { ...defaults };

  function $(id) { return document.getElementById(id); }

  function openBrandPanel() {
    syncPanelInputs();
    $('brandPanel')?.classList.add('show');
    $('brandTitleInput')?.focus();
  }

  function closeBrandPanel() {
    $('brandPanel')?.classList.remove('show');
  }

  function loadSettingsFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) settings = { ...defaults, ...JSON.parse(raw) };
    } catch (_) { /* ignore */ }
  }

  function saveSettings() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }

  function normalizeText(value, fallback) {
    const text = (value || '').trim();
    return text || fallback;
  }

  function updatePageTitle() {
    const title = settings.title || DEFAULT_TITLE;
    const subtitle = settings.subtitle || DEFAULT_SUBTITLE;
    if (title === DEFAULT_TITLE && subtitle === DEFAULT_SUBTITLE) {
      document.title = DEFAULT_PAGE_TITLE;
    } else {
      document.title = `${subtitle} ${title} · 详细解析`;
    }
  }

  function applyBrandText() {
    const titleEl = $('brandTitle');
    const subtitleEl = $('brandSubtitle');
    if (titleEl) titleEl.textContent = settings.title;
    if (subtitleEl) subtitleEl.textContent = settings.subtitle;
    updatePageTitle();
    syncPanelPreview();
  }

  function syncPanelPreview() {
    const previewTitle = $('brandPreviewTitle');
    const previewSubtitle = $('brandPreviewSubtitle');
    if (previewTitle) previewTitle.textContent = settings.title;
    if (previewSubtitle) previewSubtitle.textContent = settings.subtitle;
  }

  function syncPanelInputs() {
    const titleInput = $('brandTitleInput');
    const subtitleInput = $('brandSubtitleInput');
    if (titleInput && document.activeElement !== titleInput) {
      titleInput.value = settings.title;
    }
    if (subtitleInput && document.activeElement !== subtitleInput) {
      subtitleInput.value = settings.subtitle;
    }
    syncPanelPreview();
  }

  function updatePreviewFromInputs() {
    const previewTitle = $('brandPreviewTitle');
    const previewSubtitle = $('brandPreviewSubtitle');
    const titleInput = $('brandTitleInput');
    const subtitleInput = $('brandSubtitleInput');
    if (previewTitle && titleInput) {
      previewTitle.textContent = normalizeText(titleInput.value, DEFAULT_TITLE);
    }
    if (previewSubtitle && subtitleInput) {
      previewSubtitle.textContent = normalizeText(subtitleInput.value, DEFAULT_SUBTITLE);
    }
  }

  function handleApply() {
    const titleInput = $('brandTitleInput');
    const subtitleInput = $('brandSubtitleInput');
    settings.title = normalizeText(titleInput?.value, DEFAULT_TITLE);
    settings.subtitle = normalizeText(subtitleInput?.value, DEFAULT_SUBTITLE);
    saveSettings();
    applyBrandText();
    syncPanelInputs();
    closeBrandPanel();
  }

  function handleReset() {
    settings = { ...defaults };
    saveSettings();
    applyBrandText();
    syncPanelInputs();
  }

  function bindBrandOpeners() {
    [$('brandTextBtn'), $('brandBtn')].forEach(el => {
      el?.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        openBrandPanel();
      });
    });
  }

  function initBrandPanel() {
    bindBrandOpeners();

    const panel = $('brandPanel');
    const closeBtn = $('brandClose');
    const applyBtn = $('brandApply');
    const resetBtn = $('brandReset');
    const titleInput = $('brandTitleInput');
    const subtitleInput = $('brandSubtitleInput');

    closeBtn?.addEventListener('click', closeBrandPanel);
    panel?.addEventListener('click', e => {
      if (e.target === panel) closeBrandPanel();
    });

    applyBtn?.addEventListener('click', handleApply);
    resetBtn?.addEventListener('click', handleReset);

    titleInput?.addEventListener('input', updatePreviewFromInputs);
    subtitleInput?.addEventListener('input', updatePreviewFromInputs);

    [titleInput, subtitleInput].forEach(input => {
      input?.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleApply();
      });
    });
  }

  function init() {
    loadSettingsFromStorage();
    initBrandPanel();
    applyBrandText();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
