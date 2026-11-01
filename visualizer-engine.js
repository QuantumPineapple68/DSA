/**
 * DSA Interactive Visualizer Core Engine
 * Provides state machine, time-travel stepping, variable watching, and rendering primitives.
 */

(function (window) {
  'use strict';

  const VisualizerEngine = {
    instances: new Map(),

    /**
     * Register and initialize a visualizer in a designated DOM container
     * @param {string} containerId - Target container ID or element
     * @param {Object} definition - Visualizer specification & step generators
     */
    init(containerId, definition) {
      const el = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!el) return null;

      // Ensure cleanup if already initialized
      if (this.instances.has(el.id)) {
        this.instances.get(el.id).destroy();
      }

      const instance = new VisualizerInstance(el, definition);
      this.instances.set(el.id, instance);
      return instance;
    },

    get(id) {
      return this.instances.get(id);
    }
  };

  class VisualizerInstance {
    constructor(container, def) {
      this.container = container;
      this.def = def;
      this.activeTab = 0;
      this.stepIndex = 0;
      this.isPlaying = false;
      this.speed = 1000; // ms per step
      this.timer = null;
      this.steps = [];

      this.buildUI();
      this.loadMode(0);
    }

    buildUI() {
      this.container.classList.add('dsa-visualizer-widget');
      this.container.innerHTML = `
        <div class="visualizer-header">
          <div class="visualizer-title-group">
            <div class="visualizer-icon-pulse">▶</div>
            <span class="visualizer-title">${this.def.title || 'Algorithm Visualizer'}</span>
            <span class="visualizer-badge-interactive">Interactive</span>
          </div>
          <div class="visualizer-controls-bar">
            <button class="vis-btn vis-prev-btn" title="Previous Step">◀ Step</button>
            <button class="vis-btn primary vis-play-btn" title="Play / Pause">▶ Play</button>
            <button class="vis-btn vis-next-btn" title="Next Step">Step ▶</button>
            <button class="vis-btn vis-reset-btn" title="Reset to Start">↺ Reset</button>
            <select class="vis-select vis-speed-select" title="Animation Speed">
              <option value="1500">0.5x Speed</option>
              <option value="1000" selected>1.0x Speed</option>
              <option value="500">2.0x Speed</option>
            </select>
            ${this.def.presets && this.def.presets.length > 1 ? `
              <select class="vis-select vis-preset-select" title="Select Test Case">
                ${this.def.presets.map((p, i) => `<option value="${i}">${p.label || 'Case ' + (i+1)}</option>`).join('')}
              </select>
            ` : ''}
          </div>
        </div>
        ${this.def.modes && this.def.modes.length > 1 ? `
          <div class="visualizer-tabs">
            ${this.def.modes.map((m, i) => `<button class="vis-tab-btn ${i === 0 ? 'active' : ''}" data-mode="${i}">${m.name}</button>`).join('')}
          </div>
        ` : ''}
        <div class="visualizer-stage" id="${this.container.id}-stage"></div>
        <div class="visualizer-footer">
          <div class="vis-step-desc-box">
            <span class="vis-step-counter">Step 0 / 0</span>
            <span class="vis-step-text">Ready to start. Click 'Play' or 'Step' to begin.</span>
          </div>
          <div class="vis-vars-watch"></div>
        </div>
      `;

      // Cache DOM references
      this.stageEl = this.container.querySelector('.visualizer-stage');
      this.playBtn = this.container.querySelector('.vis-play-btn');
      this.prevBtn = this.container.querySelector('.vis-prev-btn');
      this.nextBtn = this.container.querySelector('.vis-next-btn');
      this.resetBtn = this.container.querySelector('.vis-reset-btn');
      this.speedSelect = this.container.querySelector('.vis-speed-select');
      this.presetSelect = this.container.querySelector('.vis-preset-select');
      this.counterEl = this.container.querySelector('.vis-step-counter');
      this.descEl = this.container.querySelector('.vis-step-text');
      this.varsEl = this.container.querySelector('.vis-vars-watch');

      // Bind events
      this.playBtn.addEventListener('click', () => this.togglePlay());
      this.prevBtn.addEventListener('click', () => this.stepBackward());
      this.nextBtn.addEventListener('click', () => this.stepForward());
      this.resetBtn.addEventListener('click', () => this.reset());
      this.speedSelect.addEventListener('change', (e) => {
        this.speed = parseInt(e.target.value, 10);
        if (this.isPlaying) {
          this.pause();
          this.play();
        }
      });

      if (this.presetSelect) {
        this.presetSelect.addEventListener('change', (e) => {
          const idx = parseInt(e.target.value, 10);
          this.loadPreset(idx);
        });
      }

      const tabBtns = this.container.querySelectorAll('.vis-tab-btn');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const modeIdx = parseInt(btn.getAttribute('data-mode'), 10);
          this.loadMode(modeIdx);
        });
      });
    }

    loadMode(modeIndex) {
      this.pause();
      this.activeTab = modeIndex;
      const currentMode = (this.def.modes && this.def.modes[modeIndex]) || this.def;
      this.activePreset = (currentMode.presets && currentMode.presets[0]) || (this.def.presets && this.def.presets[0]) || null;

      if (currentMode.generateSteps) {
        this.steps = currentMode.generateSteps(this.activePreset ? this.activePreset.data : null);
      } else if (this.def.generateSteps) {
        this.steps = this.def.generateSteps(this.activePreset ? this.activePreset.data : null);
      } else {
        this.steps = [];
      }

      this.stepIndex = 0;
      this.renderCurrentStep();
    }

    loadPreset(presetIndex) {
      this.pause();
      const currentMode = (this.def.modes && this.def.modes[this.activeTab]) || this.def;
      const presets = currentMode.presets || this.def.presets;
      if (presets && presets[presetIndex]) {
        this.activePreset = presets[presetIndex];
        const gen = currentMode.generateSteps || this.def.generateSteps;
        if (gen) {
          this.steps = gen(this.activePreset.data);
        }
        this.stepIndex = 0;
        this.renderCurrentStep();
      }
    }

    togglePlay() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    }

    play() {
      if (this.isPlaying) return;
      if (this.stepIndex >= this.steps.length - 1) {
        this.stepIndex = 0;
      }
      this.isPlaying = true;
      this.playBtn.innerHTML = '⏸ Pause';
      this.playBtn.classList.add('playing');

      this.timer = setInterval(() => {
        if (this.stepIndex < this.steps.length - 1) {
          this.stepIndex++;
          this.renderCurrentStep();
        } else {
          this.pause();
        }
      }, this.speed);
    }

    pause() {
      this.isPlaying = false;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.playBtn.innerHTML = '▶ Play';
      this.playBtn.classList.remove('playing');
    }

    stepForward() {
      this.pause();
      if (this.stepIndex < this.steps.length - 1) {
        this.stepIndex++;
        this.renderCurrentStep();
      }
    }

    stepBackward() {
      this.pause();
      if (this.stepIndex > 0) {
        this.stepIndex--;
        this.renderCurrentStep();
      }
    }

    reset() {
      this.pause();
      this.stepIndex = 0;
      this.renderCurrentStep();
    }

    renderCurrentStep() {
      if (!this.steps || this.steps.length === 0) {
        this.stageEl.innerHTML = `<div style="color:var(--text-muted);font-size:0.9rem;">No animation steps available.</div>`;
        return;
      }

      const total = this.steps.length;
      const cur = this.stepIndex;
      const step = this.steps[cur];

      // Update counter
      this.counterEl.textContent = `Step ${cur + 1} / ${total}`;
      this.prevBtn.disabled = (cur === 0);
      this.nextBtn.disabled = (cur === total - 1);

      // Update description
      this.descEl.innerHTML = step.description || '';

      // Update variables watch
      if (step.vars && Object.keys(step.vars).length > 0) {
        this.varsEl.innerHTML = Object.entries(step.vars)
          .map(([k, v]) => `<div class="vis-var-chip">${k}: <span>${v}</span></div>`)
          .join('');
      } else {
        this.varsEl.innerHTML = '';
      }

      // Delegate rendering to step's custom render or built-in primitive render
      if (step.render) {
        step.render(this.stageEl);
      } else if (step.type) {
        VisualizerRenderers.dispatch(this.stageEl, step);
      }
    }

    destroy() {
      this.pause();
      this.container.innerHTML = '';
    }
  }

  // Common built-in visualizers for quick dispatching
  const VisualizerRenderers = {
    dispatch(stage, step) {
      switch (step.type) {
        case 'array':
          this.renderArray(stage, step);
          break;
        case 'stack':
          this.renderStack(stage, step);
          break;
        case 'queue':
          this.renderQueue(stage, step);
          break;
        case 'map':
          this.renderMap(stage, step);
          break;
        case 'tree':
          this.renderTree(stage, step);
          break;
        case 'graph':
          this.renderGraph(stage, step);
          break;
        case 'dp':
          this.renderDP(stage, step);
          break;
        case 'water':
          this.renderWater(stage, step);
          break;
        case 'bits':
          this.renderBits(stage, step);
          break;
        case 'intervals':
          this.renderIntervals(stage, step);
          break;
        default:
          stage.innerHTML = `<div style="color:var(--text-secondary)">Rendering ${step.type}</div>`;
      }
    },

    renderArray(stage, step) {
      const { items = [], pointers = {}, highlights = {}, windowBounds = null } = step;
      let html = `<div class="vis-array-container">`;

      items.forEach((val, idx) => {
        let stateClass = '';
        if (highlights[idx]) stateClass = highlights[idx];

        // Check pointers pointing to this index
        const ptrsHere = Object.entries(pointers).filter(([pName, pIdx]) => pIdx === idx);

        html += `
          <div class="vis-array-cell-wrap" data-idx="${idx}">
            ${ptrsHere.map(([name, _]) => {
              const color = name === 'lo' || name === 'l' || name === 'left' ? 'cyan' :
                            name === 'hi' || name === 'r' || name === 'right' ? 'emerald' :
                            name === 'mid' || name === 'm' ? 'amber' :
                            name === 'w' || name === 'write' ? 'indigo' : 'rose';
              return `<span class="vis-pointer-badge ${color}">${name}</span>`;
            }).join('')}
            <span class="vis-cell-idx">${idx}</span>
            <div class="vis-array-cell ${stateClass}">${val !== null && val !== undefined ? val : ''}</div>
          </div>
        `;
      });

      if (windowBounds && windowBounds.length === 2) {
        // Render sliding window visual bracket indicator
        const [l, r] = windowBounds;
        html += `<div class="vis-window-bracket" style="left: calc(${l} * 58px + 10px); width: calc(${r - l + 1} * 58px - 8px);"></div>`;
      }

      html += `</div>`;
      stage.innerHTML = html;
    },

    renderStack(stage, step) {
      const { stack = [], currentItem = null, action = '' } = step;
      let html = `<div style="display:flex;align-items:center;gap:30px;">`;

      // Stack visualization
      html += `
        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:0.75rem;color:var(--text-muted);margin-bottom:6px;font-family:var(--font-mono);">TOP</span>
          <div class="vis-stack-tube">
            ${stack.map(val => `<div class="vis-stack-item">${val}</div>`).join('')}
          </div>
          <span style="font-size:0.75rem;color:var(--text-muted);margin-top:6px;font-family:var(--font-mono);">BOTTOM</span>
        </div>
      `;

      // Action description & current item
      if (currentItem !== null || action) {
        html += `
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${action ? `<div style="font-size:0.85rem;color:var(--accent-cyan);font-weight:700;">${action}</div>` : ''}
            ${currentItem !== null ? `
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:0.8rem;color:var(--text-secondary);">Current Element:</span>
                <div class="vis-array-cell active-compare" style="width:40px;height:40px;font-size:0.95rem;">${currentItem}</div>
              </div>
            ` : ''}
          </div>
        `;
      }

      html += `</div>`;
      stage.innerHTML = html;
    },

    renderQueue(stage, step) {
      const { queue = [], poppedItem = null, windowRange = null } = step;
      let html = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="vis-queue-end-label">FRONT</span>
            <div class="vis-queue-tube">
              ${queue.length === 0 ? `<span style="color:var(--text-muted);font-size:0.8rem;margin:auto;">Empty</span>` : 
                queue.map(item => `<div class="vis-array-cell" style="width:44px;height:44px;font-size:0.95rem;background:#1e293b;">${item}</div>`).join('')}
            </div>
            <span class="vis-queue-end-label">BACK</span>
          </div>
        </div>
      `;
      stage.innerHTML = html;
    },

    renderMap(stage, step) {
      const { map = {}, activeKey = null, isHit = false } = step;
      let html = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;">
          <div style="font-size:0.8rem;color:var(--text-muted);font-family:var(--font-mono);">HashMap Key-Value Pairs</div>
          <div class="vis-map-grid">
            ${Object.keys(map).length === 0 ? `<span style="color:var(--text-muted);font-size:0.85rem;">(empty map)</span>` :
              Object.entries(map).map(([k, v]) => `
                <div class="vis-map-card ${k == activeKey ? (isHit ? 'hit' : 'active') : ''}">
                  <span class="vis-map-key">${k}</span>
                  <span style="color:var(--text-muted)">:</span>
                  <span class="vis-map-val">${v}</span>
                </div>
              `).join('')}
          </div>
        </div>
      `;
      stage.innerHTML = html;
    },

    renderWater(stage, step) {
      const { heights = [], water = [], left = 0, right = 0, lMax = 0, rMax = 0 } = step;
      const maxHeight = Math.max(...heights, 1);
      const scale = 120 / maxHeight;

      let html = `<div class="vis-water-chart">`;
      heights.forEach((h, i) => {
        const w = water[i] || 0;
        const barH = h * scale;
        const waterH = w * scale;
        const isLeft = (i === left);
        const isRight = (i === right);

        html += `
          <div class="vis-water-col" data-idx="${i}">
            ${isLeft ? `<span class="vis-pointer-badge cyan" style="top:-25px;">l</span>` : ''}
            ${isRight ? `<span class="vis-pointer-badge emerald" style="top:-25px;">r</span>` : ''}
            <div class="vis-bar-block" style="height:${barH}px;"></div>
            ${waterH > 0 ? `<div class="vis-water-block" style="height:${waterH}px;"></div>` : ''}
            <span style="font-size:0.65rem;color:var(--text-muted);margin-bottom:2px;">${h}</span>
          </div>
        `;
      });
      html += `</div>`;
      html += `
        <div style="display:flex;gap:16px;font-size:0.8rem;color:var(--text-secondary);margin-top:8px;">
          <div>LeftMax: <strong style="color:var(--accent-cyan)">${lMax}</strong></div>
          <div>RightMax: <strong style="color:var(--accent-emerald)">${rMax}</strong></div>
          <div>Total Water: <strong style="color:#38bdf8">${step.totalWater || 0}</strong></div>
        </div>
      `;
      stage.innerHTML = html;
    },

    renderDP(stage, step) {
      const { grid = [], rowLabels = [], colLabels = [], activeRow = -1, activeCol = -1, sourceCells = [] } = step;
      let html = `<div style="overflow-x:auto;max-width:100%;"><div class="vis-dp-grid" style="grid-template-columns: repeat(${colLabels.length + 1}, auto);">`;

      // Header top left
      html += `<div class="vis-dp-cell header"></div>`;
      colLabels.forEach(c => {
        html += `<div class="vis-dp-cell header">${c}</div>`;
      });

      // Rows
      grid.forEach((row, r) => {
        html += `<div class="vis-dp-cell header">${rowLabels[r] !== undefined ? rowLabels[r] : r}</div>`;
        row.forEach((val, c) => {
          const isActive = (r === activeRow && c === activeCol);
          const isSource = sourceCells.some(([sr, sc]) => sr === r && sc === c);
          let cls = '';
          if (isActive) cls = 'active-compute';
          else if (isSource) cls = 'source-cell';

          html += `<div class="vis-dp-cell ${cls}">${val !== null && val !== undefined ? val : ''}</div>`;
        });
      });

      html += `</div></div>`;
      stage.innerHTML = html;
    },

    renderBits(stage, step) {
      const { val = 0, bitWidth = 8, activeBit = -1, clearedBit = -1 } = step;
      let html = `<div class="vis-bits-container">`;
      for (let i = bitWidth - 1; i >= 0; i--) {
        const isSet = (val & (1 << i)) !== 0;
        let cls = isSet ? 'set' : '';
        if (i === clearedBit) cls = 'cleared-now';

        html += `
          <div class="vis-bit-box">
            <span class="vis-bit-idx">${i}</span>
            <div class="vis-bit-val ${cls}">${isSet ? 1 : 0}</div>
          </div>
        `;
      }
      html += `</div>`;
      html += `<div style="font-family:var(--font-mono);font-size:0.85rem;color:var(--accent-cyan);margin-top:6px;">Decimal: ${val}</div>`;
      stage.innerHTML = html;
    },

    renderIntervals(stage, step) {
      const { intervals = [], current = null, merged = [] } = step;
      let html = `<div class="vis-intervals-track">`;
      const minX = 0;
      const maxX = 20;

      intervals.forEach(([s, e], idx) => {
        const leftPercent = ((s - minX) / (maxX - minX)) * 100;
        const widthPercent = Math.max(((e - s) / (maxX - minX)) * 100, 4);
        const top = 15 + idx * 24;
        const isCur = (current === idx);

        html += `
          <div class="vis-interval-bar ${isCur ? 'active' : ''}" style="left:${leftPercent}%;width:${widthPercent}%;top:${top}px;">
            [${s}, ${e}]
          </div>
        `;
      });

      html += `</div>`;
      if (merged && merged.length > 0) {
        html += `<div style="font-size:0.82rem;color:var(--text-secondary);margin-top:8px;">Merged so far: <strong style="color:var(--accent-emerald)">${JSON.stringify(merged)}</strong></div>`;
      }
      stage.innerHTML = html;
    },

    renderTree(stage, step) {
      const { nodes = [], edges = [], activeNode = null, visited = [] } = step;
      // High-precision clean SVG tree layout
      let html = `<svg class="vis-svg-canvas" viewBox="0 0 400 180">`;
      edges.forEach(([u, v]) => {
        const nu = nodes.find(n => n.id === u);
        const nv = nodes.find(n => n.id === v);
        if (nu && nv) {
          html += `<line class="vis-edge-line" x1="${nu.x}" y1="${nu.y}" x2="${nv.x}" y2="${nv.y}" />`;
        }
      });
      nodes.forEach(n => {
        const isActive = (n.id === activeNode);
        const isVis = visited.includes(n.id);
        const fill = isActive ? 'var(--accent-amber)' : isVis ? 'var(--accent-emerald)' : '#1e293b';
        const stroke = isActive ? '#fbbf24' : isVis ? '#34d399' : '#334155';

        html += `
          <g>
            <circle class="vis-node-circle" cx="${n.x}" cy="${n.y}" r="18" fill="${fill}" stroke="${stroke}" stroke-width="2.5" />
            <text class="vis-node-text" x="${n.x}" y="${n.y}">${n.val}</text>
          </g>
        `;
      });
      html += `</svg>`;
      stage.innerHTML = html;
    },

    renderGraph(stage, step) {
      const { nodes = [], edges = [], activeNode = null, visited = [], distances = null } = step;
      let html = `<div style="display:flex;align-items:center;justify-content:center;gap:20px;width:100%;">`;
      html += `<svg class="vis-svg-canvas" style="max-width:320px;height:180px;" viewBox="0 0 300 180">`;
      edges.forEach(([u, v, w]) => {
        const nu = nodes.find(n => n.id === u);
        const nv = nodes.find(n => n.id === v);
        if (nu && nv) {
          html += `<line class="vis-edge-line" x1="${nu.x}" y1="${nu.y}" x2="${nv.x}" y2="${nv.y}" />`;
          if (w !== undefined) {
            const mx = (nu.x + nv.x) / 2;
            const my = (nu.y + nv.y) / 2;
            html += `<text x="${mx}" y="${my - 4}" fill="var(--text-muted)" font-size="10" font-family="var(--font-mono)">${w}</text>`;
          }
        }
      });
      nodes.forEach(n => {
        const isActive = (n.id === activeNode);
        const isVis = visited.includes(n.id);
        const fill = isActive ? 'var(--accent-amber)' : isVis ? 'var(--accent-emerald)' : '#1e293b';
        html += `
          <g>
            <circle class="vis-node-circle" cx="${n.x}" cy="${n.y}" r="16" fill="${fill}" stroke="#334155" stroke-width="2" />
            <text class="vis-node-text" x="${n.x}" y="${n.y}">${n.id}</text>
          </g>
        `;
      });
      html += `</svg>`;

      if (distances) {
        html += `
          <div style="background:#131f38;border:1px solid #1e2e4a;border-radius:6px;padding:8px 12px;font-family:var(--font-mono);font-size:0.75rem;">
            <div style="color:var(--text-muted);margin-bottom:4px;font-weight:700;">DISTANCES:</div>
            ${Object.entries(distances).map(([k, d]) => `<div>Node ${k}: <span style="color:var(--accent-cyan)">${d === Infinity ? '∞' : d}</span></div>`).join('')}
          </div>
        `;
      }
      html += `</div>`;
      stage.innerHTML = html;
    }
  };

  window.VisualizerEngine = VisualizerEngine;
  window.VisualizerRenderers = VisualizerRenderers;

})(window);
