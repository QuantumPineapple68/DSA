# DSA Interview Playbook - Interactive Revision Website

A website for comprehensive Data Structures & Algorithms revision with step-by-step moving animations and visualizers.

> [!IMPORTANT]
> The source file **`DSA_All_in_One_Interview_Playbook_Java.md` has NOT been modified, edited, or altered in any way**. Its SHA-256 checksum remains 100% identical (`773d64aa1badbe8866b3b52df2127440a6b8a9337859808282675bb08e168e74`). The website reads and renders its exact content with 100% verbatim fidelity.

---

## 🚀 Live Local Deployment

The website is actively running locally at:
👉 **[http://localhost:5500](http://localhost:5500)**
👉 **[http://127.0.0.1:5500](http://127.0.0.1:5500)**

*(Alternatively, you can open `index.html` directly in any web browser).*

---

## 🌟 Key Highlights & Features

### 1. 54 Interactive Moving Visualizers
Under every single pattern (P1 through P22) and every single hybrid interview problem (H1 through H31), as well as the Part II worked example, you will find an interactive animated visualization canvas:
- **Playback Controls:** `▶ Play` (auto-advancing animation), `⏸ Pause`, `Step ▶`, `◀ Step`, and `↺ Reset`.
- **Adjustable Speed:** `0.5x`, `1.0x`, and `2.0x`.
- **Live State & Variables Watch:** Monitors indices, pointers (`l`, `r`, `mid`, `lo`, `hi`), window bounds, stack/queue contents, and running sums.
- **Plain-English Step Explanations:** Explains *why* pointers move, *why* elements are pushed/popped, and *what* condition was met.
- **Data Structure Views:**
  - Dynamic Arrays with moving pointers & color-coded states.
  - Stack / Monotonic Stack tubes with bounce push/pop animations.
  - Sliding Window illuminated bracket spans.
  - Prefix Sum & HashMap key-value card tables.
  - Binary Tree & Graph SVG visualizers with path relaxation.
  - Dynamic Programming 1D/2D tables highlighting active and source transition cells.
  - Min-Heap / Max-Heap bubble-up and extract-min animations.
  - Trie prefix search trees.
  - Bit manipulation register boxes (Brian Kernighan `x & (x - 1)`).
  - Trapping Rain Water elevation & water column charts.
  - Timeline intervals merging tracks.

### 2. Spitting Image Markdown Rendering
- 100% verbatim reproduction of all 6 parts:
  - **Part I:** Revision dashboard, Cheat table, Combination matrix, Complexity reference charts, Java collections table.
  - **Part II:** The 10-step framework and Worked Example.
  - **Part III:** Foundations and Java syntax reference (fast I/O, primitives, arrays, strings, collections).
  - **Part IV:** Patterns P1 through P22.
  - **Part V:** All 31 Hybrid interview questions (H1 through H31) with goal, clues, reasoning, Java code, invariants, pitfalls, and alternatives.
  - **Part VI:** Roadmap, Checklist, and "I struggle with..." map.
- Formatted tables with horizontal scroll wrappers and sticky headers.
- Java syntax highlighting with line numbers, macOS dot headers, and 1-click **Copy Code** buttons.

### 3. Revision Productivity Tools
- **Mastery Tracker:** Checkboxes next to every pattern and hybrid problem in the sidebar, tracking overall revision progress with persistence via `localStorage`.
- **Instant Search Modal (`Ctrl + K` or `/`):** Fast fuzzy search across all patterns, algorithms, and LeetCode problem titles.
- **Animations Focus Mode (`▶ Animations Focus` button):** Instantly focuses on the interactive algorithm animations.
- **Dark & Light Mode:** Polished Obsidian / Dracula dark mode by default, switchable to paper light mode (`T` key shortcut).
- **Reading Progress Bar:** Real-time top progress bar indicating scroll position.

---

## 🛠 To Re-run or Restart the Local Server

```powershell
python server.py
```
Server starts on port `5500` (or the next available port).
