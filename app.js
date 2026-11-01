/**
 * DSA Playbook Interactive Application Controller
 * Handles verbatim markdown parsing, visualizer mounting, navigation, checklist, and search.
 */

(function () {
  'use strict';

  // Checkpoint & State
  const AppState = {
    theme: localStorage.getItem('dsa_theme') || 'dark',
    mastered: JSON.parse(localStorage.getItem('dsa_mastered_items') || '{}'),
    activeFilter: 'all', // 'all', 'patterns', 'hybrids', 'visualizers'
    visualizersOnly: false,
    tocEntries: []
  };

  document.addEventListener('DOMContentLoaded', initApp);

  async function initApp() {
    applyTheme(AppState.theme);
    setupHeaderControls();
    setupReadingProgress();

    // Load markdown content
    let markdown = window.DSA_PLAYBOOK_MARKDOWN;
    if (!markdown) {
      try {
        const resp = await fetch('DSA_All_in_One_Interview_Playbook_Java.md');
        if (resp.ok) markdown = await resp.text();
      } catch (err) {
        console.warn('Could not fetch markdown file directly:', err);
      }
    }

    if (!markdown) {
      document.getElementById('main-content').innerHTML = `
        <div style="padding:40px;text-align:center;color:var(--text-secondary);">
          <h2>Could not load markdown content</h2>
          <p>Please make sure <code>DSA_All_in_One_Interview_Playbook_Java.md</code> or <code>dsa-content.js</code> is in the directory.</p>
        </div>
      `;
      return;
    }

    // Render markdown with exact verbatim fidelity
    renderMarkdown(markdown);

    // Mount interactive animations under patterns and hybrid questions
    mountAllVisualizers();

    // Build sidebar navigation & TOC
    buildSidebarNav();

    // Enhance code blocks with copy buttons and styling
    enhanceCodeBlocks();

    // Setup search modal and keyboard shortcuts
    setupSearch();
    setupKeyboardShortcuts();

    // Setup active scroll spy
    setupScrollSpy();

    // Update mastery status
    updateMasteryProgress();
  }

  /* ---------------------------------------------------------
     Theme Management
  --------------------------------------------------------- */
  function applyTheme(theme) {
    AppState.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dsa_theme', theme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      themeBtn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
  }

  /* ---------------------------------------------------------
     Markdown Rendering with Exact Fidelity
  --------------------------------------------------------- */
  function slugify(text) {
    return text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  function renderMarkdown(md) {
    const mainEl = document.getElementById('main-content');
    if (!window.marked) {
      mainEl.innerHTML = `<pre>${md}</pre>`;
      return;
    }

    // Configure marked renderer for exact GitHub anchor compatibility
    const renderer = new marked.Renderer();

    // Wrap tables in responsive scroll container
    renderer.table = function (header, body) {
      return `<div class="table-wrapper"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
    };

    // Custom heading with anchor links
    renderer.heading = function (text, level, raw) {
      const slug = slugify(raw);
      return `
        <h${level} id="${slug}">
          <span>${text}</span>
          <a href="#${slug}" class="header-anchor" title="Direct link to this section">#</a>
        </h${level}>
      `;
    };

    marked.setOptions({
      renderer: renderer,
      gfm: true,
      breaks: false,
      headerIds: true,
      highlight: function (code, lang) {
        if (window.hljs) {
          try {
            if (lang && hljs.getLanguage(lang)) {
              return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlight(code, { language: 'java' }).value;
          } catch (e) {
            return code;
          }
        }
        return code;
      }
    });

    const parsedHTML = marked.parse(md);
    mainEl.innerHTML = `<div class="markdown-body">${parsedHTML}</div>`;
  }

  /* ---------------------------------------------------------
     Interactive Visualizers Injection
  --------------------------------------------------------- */
  function mountAllVisualizers() {
    if (!window.VisualizerEngine) return;

    // 1. Worked Example Visualizer
    const workedExampleHeading = document.getElementById('9-worked-example-from-brute-force-to-a-hybrid-solution');
    if (workedExampleHeading && window.PatternVisualizers && window.PatternVisualizers['worked-example']) {
      injectVisualizerAfter(workedExampleHeading, 'vis-worked-example', window.PatternVisualizers['worked-example']);
    }

    // 2. Pattern Visualizers (P1 to P22)
    const patternSlugs = [
      'p1-two-pointers', 'p2-sliding-window', 'p3-prefix-sum--hashmap',
      'p4-kadane-and-array-tricks', 'p5-binary-search', 'p6-hashmap--hashset--frequency',
      'p7-stack-and-monotonic-stack', 'p8-queue-and-deque', 'p9-linked-list',
      'p10-recursion-and-divide--conquer', 'p11-trees-binary-tree-and-bst',
      'p12-heap--priority-queue', 'p13-graphs', 'p14-backtracking',
      'p15-greedy-and-intervals', 'p16-dynamic-programming', 'p17-trie',
      'p18-bit-manipulation', 'p19-string-algorithms', 'p20-advanced-structures',
      'p21-sorting-toolbox', 'p22-math-and-number-theory'
    ];

    patternSlugs.forEach(slug => {
      const heading = document.getElementById(slug);
      const def = window.PatternVisualizers && window.PatternVisualizers[slug];
      if (heading && def) {
        injectVisualizerAfter(heading, `vis-${slug}`, def);
      }
    });

    // 3. Hybrid Visualizers (H1 to H31)
    const hybridSlugs = [
      'h1-longest-increasing-subsequence', 'h2-subarray-sum-equals-k',
      'h3-longest-substring-without-repeating-characters', 'h4-minimum-window-substring',
      'h5-sliding-window-maximum', 'h6-top-k-frequent-elements',
      'h7-word-break', 'h8-course-schedule-i-and-ii',
      'h9-word-ladder', 'h10-network-delay-time',
      'h11-merge-intervals', 'h12-meeting-rooms-ii',
      'h13-trapping-rain-water', 'h14-daily-temperatures',
      'h15-3sum', 'h16-kth-largest-element',
      'h17-median-of-two-sorted-arrays', 'h18-search-in-rotated-sorted-array',
      'h19-number-of-islands', 'h20-accounts-merge',
      'h21-count-inversions', 'h22-longest-palindromic-substring',
      'h23-palindrome-partitioning', 'h24-binary-search-on-the-answer',
      'h25-count-of-smaller-numbers-after-self',
      'h26-lowest-common-ancestor-single-query-vs-many-queries',
      'h27-subset-sum--target-sum', 'h28-travelling-salesperson-problem',
      'h29-maximal-rectangle', 'h30-sum-of-subarray-minimums',
      'h31-shortest-path-visiting-all-nodes'
    ];

    hybridSlugs.forEach(slug => {
      const heading = document.getElementById(slug);
      const def = window.HybridVisualizers && window.HybridVisualizers[slug];
      if (heading && def) {
        injectVisualizerAfter(heading, `vis-${slug}`, def);
      }
    });
  }

  function injectVisualizerAfter(headingEl, containerId, definition) {
    if (document.getElementById(containerId)) return;

    // Find insertion target: directly before the next heading or after the code block
    let target = headingEl;
    let sibling = headingEl.nextElementSibling;
    while (sibling && !sibling.tagName.match(/^H[1-4]$/i)) {
      if (sibling.tagName === 'PRE' || sibling.classList.contains('code-block-container')) {
        target = sibling;
        break;
      }
      target = sibling;
      sibling = sibling.nextElementSibling;
    }

    const visContainer = document.createElement('div');
    visContainer.id = containerId;
    visContainer.className = 'dsa-visualizer-widget-mount';
    target.parentNode.insertBefore(visContainer, target.nextSibling);

    // Initialize visualizer instance
    window.VisualizerEngine.init(visContainer, definition);
  }

  /* ---------------------------------------------------------
     Code Block Enhancement (Copy Button & Mac Dots)
  --------------------------------------------------------- */
  function enhanceCodeBlocks() {
    const pres = document.querySelectorAll('.markdown-body pre');
    pres.forEach((pre, idx) => {
      if (pre.closest('.code-block-container')) return;

      const code = pre.querySelector('code');
      const lang = code ? (code.className.match(/language-(\w+)/) || [, 'java'])[1] : 'java';

      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-container';

      wrapper.innerHTML = `
        <div class="code-block-header">
          <div class="code-mac-dots">
            <span class="code-mac-dot red"></span>
            <span class="code-mac-dot yellow"></span>
            <span class="code-mac-dot green"></span>
          </div>
          <div class="code-meta-info">
            <span class="code-lang-tag">${lang}</span>
            <button class="code-copy-btn" data-code-idx="${idx}">
              <span>📋</span> Copy
            </button>
          </div>
        </div>
      `;

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const copyBtn = wrapper.querySelector('.code-copy-btn');
      copyBtn.addEventListener('click', () => {
        const text = code ? code.innerText : pre.innerText;
        navigator.clipboard.writeText(text).then(() => {
          copyBtn.innerHTML = '<span>✓</span> Copied!';
          showToast('Code copied to clipboard!');
          setTimeout(() => {
            copyBtn.innerHTML = '<span>📋</span> Copy';
          }, 2000);
        });
      });
    });
  }

  /* ---------------------------------------------------------
     Sidebar Navigation & TOC
  --------------------------------------------------------- */
  function buildSidebarNav() {
    const navTreeEl = document.querySelector('.sidebar-nav-tree');
    if (!navTreeEl) return;

    navTreeEl.innerHTML = '';
    const headings = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3');
    AppState.tocEntries = [];

    let currentGroup = null;

    headings.forEach(h => {
      const id = h.id;
      const text = h.innerText.replace('#', '').trim();
      const level = h.tagName.toLowerCase();

      // Categorize
      let groupName = 'Reference';
      let isPattern = /^p\d+\./i.test(text);
      let isHybrid = /^h\d+\./i.test(text);
      let hasVisualizer = !!document.getElementById(`vis-${id}`);

      if (level === 'h1' && text.includes('PART I')) groupName = 'Part I. Revision Dashboard';
      else if (level === 'h1' && text.includes('PART II')) groupName = 'Part II. Deriving Solutions';
      else if (level === 'h1' && text.includes('PART III')) groupName = 'Part III. Java Foundations';
      else if (level === 'h1' && text.includes('PART IV')) groupName = 'Part IV. Pattern Library';
      else if (level === 'h1' && text.includes('PART V')) groupName = 'Part V. Hybrid Problems';
      else if (level === 'h1' && text.includes('PART VI')) groupName = 'Part VI. Practice & Revision';

      if (level === 'h1' && text.startsWith('PART')) {
        const groupHeader = document.createElement('div');
        groupHeader.className = 'sidebar-group-title';
        groupHeader.textContent = text;
        navTreeEl.appendChild(groupHeader);
        currentGroup = groupHeader;
        return;
      }

      if (level === 'h2' || (level === 'h3' && isHybrid)) {
        const isMastered = !!AppState.mastered[id];
        const link = document.createElement('div');
        link.className = 'sidebar-link';
        link.dataset.id = id;
        link.dataset.type = isPattern ? 'pattern' : isHybrid ? 'hybrid' : 'general';
        link.dataset.hasVis = hasVisualizer ? 'true' : 'false';

        // Checkbox + Title + Badges
        link.innerHTML = `
          <div class="sidebar-link-content">
            <input type="checkbox" class="sidebar-item-checkbox" ${isMastered ? 'checked' : ''} data-target="${id}" title="Mark as mastered" />
            <a href="#${id}" style="color:inherit;text-decoration:none;overflow:hidden;text-overflow:ellipsis;">${text}</a>
          </div>
          ${hasVisualizer ? `<span style="color:var(--accent-cyan);font-size:0.75rem;" title="Interactive Animation Available">▶</span>` : ''}
        `;

        navTreeEl.appendChild(link);

        // Checkbox event
        const cb = link.querySelector('.sidebar-item-checkbox');
        cb.addEventListener('change', (e) => {
          e.stopPropagation();
          if (cb.checked) {
            AppState.mastered[id] = true;
          } else {
            delete AppState.mastered[id];
          }
          localStorage.setItem('dsa_mastered_items', JSON.stringify(AppState.mastered));
          updateMasteryProgress();
        });

        AppState.tocEntries.push({ id, text, el: h, linkEl: link, type: link.dataset.type, hasVis: hasVisualizer });
      }
    });

    setupSidebarFilters();
  }

  function setupSidebarFilters() {
    const chips = document.querySelectorAll('.sidebar-filters .filter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.dataset.filter;
        AppState.activeFilter = filter;
        applySidebarFilter(filter);
      });
    });

    const searchInput = document.querySelector('.sidebar-search-input');
    const clearBtn = document.getElementById('sidebar-search-clear');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (clearBtn) {
          clearBtn.classList.toggle('visible', !!query);
        }
        filterSidebarByQuery(query);
      });
    }

    if (clearBtn && searchInput) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.classList.remove('visible');
        filterSidebarByQuery('');
        searchInput.focus();
      });
    }
  }

  function applySidebarFilter(filter) {
    const searchInput = document.querySelector('.sidebar-search-input');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    filterSidebarCombined(filter, query);
  }

  function filterSidebarByQuery(query) {
    filterSidebarCombined(AppState.activeFilter, query);
  }

  function filterSidebarCombined(filter, query) {
    const links = document.querySelectorAll('.sidebar-link');
    const groupTitles = document.querySelectorAll('.sidebar-group-title');

    links.forEach(l => {
      let matchesFilter = true;
      if (filter === 'patterns') matchesFilter = (l.dataset.type === 'pattern');
      else if (filter === 'hybrids') matchesFilter = (l.dataset.type === 'hybrid');
      else if (filter === 'visualizers') matchesFilter = (l.dataset.hasVis === 'true');

      const matchesQuery = !query || l.innerText.toLowerCase().includes(query);
      l.style.display = (matchesFilter && matchesQuery) ? 'flex' : 'none';
    });

    // Also update visibility of group titles
    groupTitles.forEach(gt => {
      let next = gt.nextElementSibling;
      let hasVisible = false;
      while (next && !next.classList.contains('sidebar-group-title')) {
        if (next.classList.contains('sidebar-link') && next.style.display !== 'none') {
          hasVisible = true;
          break;
        }
        next = next.nextElementSibling;
      }
      gt.style.display = hasVisible ? 'flex' : 'none';
    });
  }

  /* ---------------------------------------------------------
     Mastery Progress Bar
  --------------------------------------------------------- */
  function updateMasteryProgress() {
    const totalTopics = AppState.tocEntries.filter(e => e.type === 'pattern' || e.type === 'hybrid').length || 53;
    const masteredCount = Object.keys(AppState.mastered).length;
    const pct = Math.min(Math.round((masteredCount / totalTopics) * 100), 100);

    const textEl = document.querySelector('.mastery-progress-text');
    const fillEl = document.querySelector('.mastery-progress-fill');

    if (textEl) textEl.textContent = `${masteredCount} / ${totalTopics} (${pct}%)`;
    if (fillEl) fillEl.style.width = `${pct}%`;
  }

  /* ---------------------------------------------------------
     Header Controls & Reading Progress
  --------------------------------------------------------- */
  function setupHeaderControls() {
    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const nextTheme = AppState.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }

    // Visualizers Only mode toggle
    const visOnlyBtn = document.getElementById('visualizers-only-btn');
    if (visOnlyBtn) {
      visOnlyBtn.addEventListener('click', () => {
        AppState.visualizersOnly = !AppState.visualizersOnly;
        visOnlyBtn.classList.toggle('active', AppState.visualizersOnly);
        if (AppState.visualizersOnly) {
          showToast('Focusing on Interactive Animations only!');
          // Smoothly scroll to the first visualizer
          const firstVis = document.querySelector('.dsa-visualizer-widget-mount');
          if (firstVis) firstVis.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Mobile sidebar toggle
    const mobileBtn = document.getElementById('mobile-sidebar-toggle');
    const sidebar = document.getElementById('app-sidebar');
    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }
  }

  function setupReadingProgress() {
    const bar = document.getElementById('reading-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     Active Scroll Spy
  --------------------------------------------------------- */
  function setupScrollSpy() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveHeading();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  function updateActiveHeading() {
    const scrollPos = window.scrollY + 100;
    const entries = AppState.tocEntries;
    if (!entries || entries.length === 0) return;

    let currentActive = entries[0];
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].el.offsetTop <= scrollPos) {
        currentActive = entries[i];
      } else {
        break;
      }
    }

    entries.forEach(e => {
      if (e.linkEl) {
        if (e === currentActive) {
          e.linkEl.classList.add('active');
        } else {
          e.linkEl.classList.remove('active');
        }
      }
    });
  }

  /* ---------------------------------------------------------
     Search Modal & Shortcuts
  --------------------------------------------------------- */
  function setupSearch() {
    const triggerBtn = document.getElementById('search-trigger-btn');
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-modal-input');
    const resultsContainer = document.getElementById('search-modal-results');

    if (!triggerBtn || !modal || !input) return;

    function openSearch() {
      modal.classList.add('open');
      input.value = '';
      input.focus();
      renderSearchResults('');
    }

    function closeSearch() {
      modal.classList.remove('open');
    }

    triggerBtn.addEventListener('click', openSearch);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSearch();
    });

    input.addEventListener('input', (e) => {
      renderSearchResults(e.target.value.toLowerCase().trim());
    });

    function renderSearchResults(query) {
      if (!resultsContainer) return;
      resultsContainer.innerHTML = '';

      const matched = AppState.tocEntries.filter(e => !query || e.text.toLowerCase().includes(query));

      if (matched.length === 0) {
        resultsContainer.innerHTML = `<div style="padding:20px;text-align:center;color:var(--text-muted)">No matching patterns or topics found.</div>`;
        return;
      }

      matched.slice(0, 15).forEach(m => {
        const item = document.createElement('a');
        item.className = 'search-result-item';
        item.href = `#${m.id}`;
        item.innerHTML = `
          <span>${m.text}</span>
          ${m.hasVis ? `<span style="color:var(--accent-cyan);font-size:0.75rem;">▶ Visualizer</span>` : ''}
        `;
        item.addEventListener('click', () => {
          closeSearch();
        });
        resultsContainer.appendChild(item);
      });
    }

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      } else if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeSearch();
      }
    });
  }

  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Don't trigger shortcuts if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

      if (e.key === 't' || e.key === 'T') {
        const nextTheme = AppState.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        showToast(`Theme switched to ${nextTheme} mode`);
      }
    });
  }

  /* ---------------------------------------------------------
     Toast Notifications
  --------------------------------------------------------- */
  function showToast(message) {
    let toast = document.getElementById('toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-msg';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  window.showToast = showToast;

})();
