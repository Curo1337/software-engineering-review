(function () {
  const navEl = document.getElementById('chapterNav');
  const contentEl = document.getElementById('content');
  const searchInput = document.getElementById('searchInput');
  const breadcrumb = document.getElementById('breadcrumb');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const menuToggle = document.getElementById('menuToggle');
  const expandAll = document.getElementById('expandAll');
  const collapseAll = document.getElementById('collapseAll');
  const toggleExamMode = document.getElementById('toggleExamMode');
  const examOverview = document.getElementById('examOverview');
  const hero = document.getElementById('hero');

  let activeChapter = null;

  function getExamples(chapterId) {
    return (typeof EXAMPLE_DATA !== 'undefined' && EXAMPLE_DATA[chapterId]) || [];
  }

  function stripHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || '';
  }

  function matchItem(item, q) {
    if (!q) return true;
    const memo = getMemo(item.id);
    const text = (
      item.title +
      stripHtml(item.content || '') +
      stripHtml(item.stem || '') +
      stripHtml(item.solution || '') +
      (memo ? memo.plain + memo.memory : '') +
      (item.tags || []).join(' ')
    ).toLowerCase();
    return text.includes(q);
  }

  function getMemo(itemId) {
    return (typeof STUDY_MEMOS !== 'undefined' && STUDY_MEMOS[itemId]) || null;
  }

  function buildMemoHtml(memo) {
    if (!memo) return '';
    return `
      <aside class="q-memo">
        <div class="plain-box">
          <span class="memo-label">💬 大白话解释</span>
          ${memo.plain}
        </div>
        <div class="memory-box">
          <span class="memo-label">🧠 记忆小窍门</span>
          ${memo.memory}
        </div>
      </aside>
    `;
  }

  function createCard(item, options = {}) {
    const { isExample = false, openByDefault = false } = options;
    const card = document.createElement('article');
    card.className = (isExample ? 'example-card' : 'question-card') + (openByDefault ? ' open' : '');
    card.id = item.id;

    const tagsHtml = (item.tags || [])
      .map(t => `<span class="tag ${t}">${t}</span>`)
      .join('');

    let bodyHtml = '';
    if (isExample) {
      bodyHtml = `
        <div class="example-stem"><strong>题目：</strong>${item.stem}</div>
        <div class="example-solution"><strong>详细解析：</strong>${item.solution}</div>
      `;
    } else {
      const memo = getMemo(item.id);
      const memoHtml = buildMemoHtml(memo);
      if (memoHtml) {
        bodyHtml = `
          <div class="q-body-layout">
            <div class="q-main">${item.content}</div>
            ${memoHtml}
          </div>
        `;
      } else {
        bodyHtml = item.content;
      }
    }

    card.innerHTML = `
      <div class="q-header">
        <span class="q-toggle">▶</span>
        <div class="q-title-wrap">
          <div class="q-title">${item.title}</div>
          <div class="q-tags">${tagsHtml}</div>
        </div>
      </div>
      <div class="q-body">${bodyHtml}</div>
    `;

    card.querySelector('.q-header').addEventListener('click', () => {
      card.classList.toggle('open');
    });

    return card;
  }

  function renderNav(filter = '') {
    navEl.innerHTML = '';
    const q = filter.trim().toLowerCase();

    REVIEW_DATA.forEach(chapter => {
      const matchedQuestions = chapter.questions.filter(item => matchItem(item, q));
      const matchedExamples = getExamples(chapter.id).filter(item => matchItem(item, q));
      const total = matchedQuestions.length + matchedExamples.length;

      if (q && total === 0) return;

      const wrap = document.createElement('div');
      wrap.className = 'nav-chapter';

      const btn = document.createElement('button');
      btn.className = 'nav-chapter-btn' + (activeChapter === chapter.id ? ' active' : '');
      btn.innerHTML = `<span>${chapter.title}</span><span class="count">${total}</span>`;
      btn.addEventListener('click', () => {
        activeChapter = chapter.id;
        renderNav(searchInput.value);
        scrollToChapter(chapter.id);
        closeSidebarMobile();
      });

      const qList = document.createElement('div');
      qList.className = 'nav-questions' + (activeChapter === chapter.id ? ' open' : '');

      matchedQuestions.forEach(item => {
        const qBtn = document.createElement('button');
        qBtn.className = 'nav-q-btn';
        qBtn.textContent = item.title;
        qBtn.addEventListener('click', () => {
          scrollToQuestion(item.id);
          closeSidebarMobile();
        });
        qList.appendChild(qBtn);
      });

      matchedExamples.forEach(item => {
        const qBtn = document.createElement('button');
        qBtn.className = 'nav-q-btn';
        qBtn.textContent = '📝 ' + item.title.replace(/^【例题】/, '');
        qBtn.addEventListener('click', () => {
          scrollToQuestion(item.id);
          closeSidebarMobile();
        });
        qList.appendChild(qBtn);
      });

      wrap.appendChild(btn);
      wrap.appendChild(qList);
      navEl.appendChild(wrap);
    });

    if (!navEl.children.length) {
      navEl.innerHTML = '<p class="no-results">未找到匹配内容</p>';
    }
  }

  function renderContent(filter = '') {
    contentEl.innerHTML = '';
    const q = filter.trim().toLowerCase();
    let hasResult = false;

    REVIEW_DATA.forEach((chapter, ci) => {
      const matchedQuestions = chapter.questions.filter(item => matchItem(item, q));
      const matchedExamples = getExamples(chapter.id).filter(item => matchItem(item, q));

      if (matchedQuestions.length === 0 && matchedExamples.length === 0) return;
      hasResult = true;

      const section = document.createElement('section');
      section.className = 'chapter-section';
      section.id = chapter.id;

      section.innerHTML = `
        <div class="chapter-header">
          <span class="chapter-num">${ci + 1}</span>
          <h2>${chapter.title}</h2>
        </div>
      `;

      matchedQuestions.forEach(item => {
        section.appendChild(createCard(item, { openByDefault: !!q }));
      });

      if (matchedExamples.length > 0) {
        const examplesBlock = document.createElement('div');
        examplesBlock.className = 'examples-block';
        examplesBlock.innerHTML = `
          <div class="examples-block-header">
            <h3>📝 本章例题</h3>
            <span>共 ${matchedExamples.length} 道 · 含详细解析</span>
          </div>
        `;
        matchedExamples.forEach(item => {
          examplesBlock.appendChild(createCard(item, { isExample: true, openByDefault: !!q }));
        });
        section.appendChild(examplesBlock);
      }

      contentEl.appendChild(section);
    });

    if (!hasResult) {
      contentEl.innerHTML = '<div class="no-results"><h3>没有找到相关内容</h3><p>试试其他关键词，如：DFD、内聚、白盒测试、例题</p></div>';
    }
  }

  function scrollToChapter(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      breadcrumb.textContent = REVIEW_DATA.find(c => c.id === id)?.title || '首页';
    }
  }

  function scrollToQuestion(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const card = el.classList.contains('question-card') || el.classList.contains('example-card')
      ? el
      : el.closest('.question-card, .example-card');
    if (!card) return;
    card.classList.add('open', 'highlight');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => card.classList.remove('highlight'), 2000);
    breadcrumb.textContent = card.querySelector('.q-title')?.textContent || '';
  }

  function setAllCards(open) {
    document.querySelectorAll('.question-card, .example-card').forEach(card => {
      card.classList.toggle('open', open);
    });
  }

  function closeSidebarMobile() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }

  searchInput.addEventListener('input', e => {
    const val = e.target.value;
    renderNav(val);
    renderContent(val);
    hero.style.display = val ? 'none' : '';
  });

  expandAll.addEventListener('click', () => setAllCards(true));
  collapseAll.addEventListener('click', () => setAllCards(false));

  toggleExamMode.addEventListener('click', () => {
    examOverview.scrollIntoView({ behavior: 'smooth' });
    const examSection = document.getElementById('exam');
    if (examSection) scrollToChapter('exam');
  });

  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  });

  overlay.addEventListener('click', closeSidebarMobile);

  window.addEventListener('hashchange', () => {
    const hash = location.hash.slice(1);
    if (hash) scrollToQuestion(hash);
  });

  renderNav();
  renderContent();

  if (location.hash) {
    setTimeout(() => scrollToQuestion(location.hash.slice(1)), 300);
  }
})();
