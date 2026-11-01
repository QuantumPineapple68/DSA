/**
 * Visualizer Definitions for Part V: Hybrid / Mixed Problems (H1 to H31)
 */

(function (window) {
  'use strict';

  const HybridVisualizers = {};

  // H1: Longest Increasing Subsequence
  HybridVisualizers['h1-longest-increasing-subsequence'] = {
    title: 'H1. Longest Increasing Subsequence (Patience Sort / Binary Search on Tails)',
    generateSteps() {
      const arr = [10, 9, 2, 5, 3, 7, 101, 18];
      const steps = [];
      const tails = [];

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { i: 0 },
        highlights: {},
        description: 'Array: <code>[10, 9, 2, 5, 3, 7, 101, 18]</code>. We maintain <code>tails[]</code> where <code>tails[len-1]</code> is the smallest tail of any increasing subsequence of length <code>len</code>.',
        vars: { i: 0, tails: '[]', lisLength: 0 }
      });

      arr.forEach((x, i) => {
        // Binary search for first index with tails[idx] >= x
        let lo = 0, hi = tails.length;
        while (lo < hi) {
          const mid = Math.floor((lo + hi) / 2);
          if (tails[mid] >= x) hi = mid;
          else lo = mid + 1;
        }

        const isAppend = (lo === tails.length);
        if (isAppend) tails.push(x);
        else tails[lo] = x;

        steps.push({
          type: 'array',
          items: [...arr],
          pointers: { i },
          highlights: { [i]: isAppend ? 'matched' : 'active-compare' },
          description: `Processing <code>arr[${i}] = ${x}</code>: Binary search in tails found index ${lo}. ${isAppend ? `Appended to tails (new max length <strong>${tails.length}</strong>).` : `Replaced tails[${lo}] with ${x} (improved future extension).`}`,
          vars: { num: x, targetTailIdx: lo, tails: `[${tails.join(', ')}]`, currentLIS: tails.length }
        });
      });

      steps.push({
        type: 'array',
        items: [...tails],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched', 3: 'matched' },
        description: `Scan complete! Length of Longest Increasing Subsequence is <strong>${tails.length}</strong>. Time: O(n log n), Auxiliary Space: O(n).`,
        vars: { finalLIS: tails.length, tails: `[${tails.join(', ')}]` }
      });

      return steps;
    }
  };

  // H2: Subarray Sum Equals K
  HybridVisualizers['h2-subarray-sum-equals-k'] = {
    title: 'H2. Subarray Sum Equals K (Prefix Sum + HashMap)',
    generateSteps() {
      const arr = [1, 2, 3];
      const k = 3;
      const steps = [];
      const map = { 0: 1 };
      let sum = 0, count = 0;

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: {},
        highlights: {},
        description: `Array: <code>[1, 2, 3]</code>, <code>k = ${k}</code>. Negatives allowed so sliding window is invalid. Use running prefix sum + HashMap. Seed <code>{0: 1}</code>.`,
        vars: { sum: 0, count: 0, map: '{0: 1}' }
      });

      arr.forEach((x, i) => {
        sum += x;
        const needed = sum - k;
        const matches = map[needed] || 0;
        count += matches;

        steps.push({
          type: 'array',
          items: [...arr],
          pointers: { i },
          highlights: { [i]: matches > 0 ? 'matched' : 'active-compare' },
          description: `Element ${x}: running sum = <strong>${sum}</strong>. Look up earlier prefix <code>sum - k = ${sum} - ${k} = ${needed}</code>. Found <strong>${matches}</strong> match(es). Count = <strong>${count}</strong>.`,
          vars: { i, num: x, sum, 'sum - k': needed, matches, totalCount: count }
        });

        map[sum] = (map[sum] || 0) + 1;
      });

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched' },
        description: `Completed! Found <strong>${count}</strong> subarrays summing to ${k} (<code>[1, 2]</code> and <code>[3]</code>). Time: O(n), Space: O(n).`,
        vars: { finalCount: count }
      });

      return steps;
    }
  };

  // H3: Longest Substring Without Repeating Characters
  HybridVisualizers['h3-longest-substring-without-repeating-characters'] = {
    title: 'H3. Longest Substring Without Repeating Characters',
    generateSteps() {
      const s = "pwwkew".split('');
      const steps = [];
      const set = new Set();
      let l = 0, best = 0;

      steps.push({
        type: 'array',
        items: [...s],
        pointers: { l: 0, r: 0 },
        highlights: {},
        description: 'String: <code>"pwwkew"</code>. Sliding window <code>[l, r]</code> with character set.',
        vars: { l: 0, r: 0, maxLen: 0 }
      });

      for (let r = 0; r < s.length; r++) {
        while (set.has(s[r])) {
          steps.push({
            type: 'array',
            items: [...s],
            pointers: { l, r },
            highlights: { [r]: 'active-compare', [l]: 'eliminated' },
            windowBounds: [l, r],
            description: `Duplicate <code>'${s[r]}'</code>! Shrink window by moving <code>l</code> forward (remove <code>'${s[l]}'</code>).`,
            vars: { l, r, dup: s[r], maxLen: best }
          });
          set.delete(s[l++]);
        }
        set.add(s[r]);
        best = Math.max(best, r - l + 1);
        steps.push({
          type: 'array',
          items: [...s],
          pointers: { l, r },
          highlights: { [r]: 'matched' },
          windowBounds: [l, r],
          description: `Window <code>[${l}..${r}]</code> is valid (<code>"${s.slice(l, r + 1).join('')}"</code>). Length = <strong>${r - l + 1}</strong>. Best maxLen = <strong>${best}</strong>.`,
          vars: { l, r, windowLen: r - l + 1, maxLen: best }
        });
      }

      return steps;
    }
  };

  // H4: Minimum Window Substring
  HybridVisualizers['h4-minimum-window-substring'] = {
    title: 'H4. Minimum Window Substring',
    generateSteps() {
      const s = "ADOBECODEBANC".split('');
      const target = "ABC";
      const steps = [];

      steps.push({
        type: 'array',
        items: [...s],
        pointers: { l: 0, r: 0 },
        highlights: {},
        description: `String <code>s = "ADOBECODEBANC"</code>, target <code>t = "${target}"</code>. Expand <code>r</code> until all target chars are covered, then contract <code>l</code> to minimize window.`,
        vars: { target: 'ABC', minWindow: '""' }
      });

      steps.push({
        type: 'array',
        items: [...s],
        pointers: { l: 0, r: 5 },
        highlights: { 0: 'matched', 3: 'matched', 5: 'matched' },
        windowBounds: [0, 5],
        description: 'At <code>r = 5</code>: window <code>"ADOBEC"</code> covers all of {\'A\', \'B\', \'C\'}! Current min window length = 6.',
        vars: { formed: '3/3', window: '"ADOBEC"', minLen: 6 }
      });

      steps.push({
        type: 'array',
        items: [...s],
        pointers: { l: 9, r: 12 },
        highlights: { 9: 'matched', 10: 'matched', 11: 'matched', 12: 'matched' },
        windowBounds: [9, 12],
        description: 'At <code>r = 12</code>: window <code>"BANC"</code> covers all target characters with length = <strong>4</strong>! Minimum found.',
        vars: { minWindow: '"BANC"', minLen: 4, status: 'OPTIMAL' }
      });

      return steps;
    }
  };

  // H5: Sliding Window Maximum
  HybridVisualizers['h5-sliding-window-maximum'] = {
    title: 'H5. Sliding Window Maximum (Monotonic Deque)',
    generateSteps() {
      const arr = [1, 3, -1, -3, 5, 3, 6, 7];
      const k = 3;
      const steps = [];
      const deque = [];
      const res = [];

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { i: 0 },
        highlights: {},
        description: `Array size 8, window <code>k = ${k}</code>. Monotonic decreasing deque stores indices of candidate maximums.`,
        vars: { deque: '[]', results: '[]' }
      });

      for (let i = 0; i < arr.length; i++) {
        if (deque.length > 0 && deque[0] <= i - k) deque.shift();
        while (deque.length > 0 && arr[deque[deque.length - 1]] < arr[i]) deque.pop();
        deque.push(i);

        if (i >= k - 1) {
          const maxVal = arr[deque[0]];
          res.push(maxVal);
          steps.push({
            type: 'array',
            items: [...arr],
            pointers: { l: i - k + 1, r: i },
            highlights: { [deque[0]]: 'matched' },
            windowBounds: [i - k + 1, i],
            description: `Window <code>[${i - k + 1}..${i}]</code>: maximum is <strong>${maxVal}</strong> (index ${deque[0]}). Deque front maintains max in O(1).`,
            vars: { maxVal, dequeIndices: `[${deque.join(', ')}]`, output: `[${res.join(', ')}]` }
          });
        }
      }

      return steps;
    }
  };

  // H6: Top K Frequent Elements
  HybridVisualizers['h6-top-k-frequent-elements'] = {
    title: 'H6. Top K Frequent Elements (Min-Heap / Bucket Sort)',
    generateSteps() {
      const arr = [1, 1, 1, 2, 2, 3];
      const k = 2;
      const steps = [];

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: {},
        highlights: {},
        description: `Array: <code>[1, 1, 1, 2, 2, 3]</code>, <code>k = ${k}</code>. Count frequencies into map: <code>{1: 3, 2: 2, 3: 1}</code>.`,
        vars: { map: '{1: 3, 2: 2, 3: 1}', k }
      });

      steps.push({
        type: 'array',
        items: [1, 2],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched' },
        description: `Maintain a min-heap of size ${k} or bucket sort by frequency. Top ${k} most frequent numbers are <strong>[1, 2]</strong>.`,
        vars: { topK: '[1, 2]', time: 'O(n) or O(n log k)' }
      });

      return steps;
    }
  };

  // H7: Word Break
  HybridVisualizers['h7-word-break'] = {
    title: 'H7. Word Break (1D Dynamic Programming)',
    generateSteps() {
      const s = "leetcode";
      const dict = ["leet", "code"];
      const steps = [];
      const dp = new Array(s.length + 1).fill(false);
      dp[0] = true;

      steps.push({
        type: 'array',
        items: ['""', ...s.split('')],
        pointers: { i: 0 },
        highlights: { 0: 'matched' },
        description: 'String: <code>"leetcode"</code>, Dictionary: <code>["leet", "code"]</code>. <code>dp[i] = true</code> if prefix of length <code>i</code> can be segmented. Base case <code>dp[0] = true</code>.',
        vars: { 'dp[0]': true }
      });

      dp[4] = true;
      steps.push({
        type: 'array',
        items: ['""', ...s.split('')],
        pointers: { i: 4 },
        highlights: { 0: 'matched', 1: 'in-window', 2: 'in-window', 3: 'in-window', 4: 'matched' },
        description: 'At <code>i = 4</code>: substring <code>"leet"</code> is in dictionary, and <code>dp[0] == true</code> → <code>dp[4] = true</code>!',
        vars: { substring: 'leet', 'dp[4]': true }
      });

      dp[8] = true;
      steps.push({
        type: 'array',
        items: ['""', ...s.split('')],
        pointers: { i: 8 },
        highlights: { 4: 'matched', 5: 'in-window', 6: 'in-window', 7: 'in-window', 8: 'matched' },
        description: 'At <code>i = 8</code>: substring <code>"code"</code> is in dictionary, and <code>dp[4] == true</code> → <code>dp[8] = true</code>! Word can be segmented.',
        vars: { substring: 'code', 'dp[8]': true, result: true }
      });

      return steps;
    }
  };

  // H8: Course Schedule (I and II)
  HybridVisualizers['h8-course-schedule-i-and-ii'] = {
    title: 'H8. Course Schedule (Kahn\'s Topological Sort)',
    generateSteps() {
      const steps = [];
      steps.push({
        type: 'array',
        items: ['Course 0', 'Course 1', 'Course 2', 'Course 3'],
        pointers: {},
        highlights: {},
        description: 'Directed Graph prerequisites: <code>[[1,0], [2,0], [3,1], [3,2]]</code>. Compute indegrees: <code>[0: 0, 1: 1, 2: 1, 3: 2]</code>.',
        vars: { queue: '[0]', indegrees: '[0, 1, 1, 2]' }
      });

      steps.push({
        type: 'array',
        items: ['Course 0', 'Course 1', 'Course 2', 'Course 3'],
        pointers: { finished: 0 },
        highlights: { 0: 'matched' },
        description: 'Course 0 has indegree 0: take course 0! Decrement indegree of neighbors 1 and 2 to 0. Enqueue 1 and 2.',
        vars: { order: '[0]', queue: '[1, 2]' }
      });

      steps.push({
        type: 'array',
        items: ['Course 0', 'Course 1', 'Course 2', 'Course 3'],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched', 3: 'matched' },
        description: 'Take courses 1 and 2 → course 3 indegree becomes 0 → take course 3! All 4 courses finished without cycle. Valid topological order: <strong>[0, 1, 2, 3]</strong>.',
        vars: { topologicalOrder: '[0, 1, 2, 3]', canFinish: true }
      });

      return steps;
    }
  };

  // H9: Word Ladder
  HybridVisualizers['h9-word-ladder'] = {
    title: 'H9. Word Ladder (BFS Shortest Path)',
    generateSteps() {
      const steps = [];
      steps.push({
        type: 'array',
        items: ['hit', 'hot', 'dot', 'dog', 'cog'],
        pointers: { start: 0 },
        highlights: { 0: 'matched' },
        description: 'Transform <code>"hit" → "cog"</code> using shortest path BFS. Queue starts with <code>("hit", level: 1)</code>.',
        vars: { cur: 'hit', level: 1 }
      });
      steps.push({
        type: 'array',
        items: ['hit', 'hot', 'dot', 'dog', 'cog'],
        pointers: { cur: 1 },
        highlights: { 0: 'matched', 1: 'matched' },
        description: 'Mutate 1 char: <code>"hit" → "hot"</code> (level 2). Enqueue "hot".',
        vars: { cur: 'hot', level: 2 }
      });
      steps.push({
        type: 'array',
        items: ['hit', 'hot', 'dot', 'dog', 'cog'],
        pointers: { target: 4 },
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched', 3: 'matched', 4: 'matched' },
        description: 'Ladder reaches <code>"dog" → "cog"</code> at level 5! Shortest mutation sequence length is <strong>5</strong>.',
        vars: { shortestPathLength: 5 }
      });
      return steps;
    }
  };

  // H10: Network Delay Time
  HybridVisualizers['h10-network-delay-time'] = {
    title: 'H10. Network Delay Time (Dijkstra Min-Heap)',
    generateSteps() {
      const steps = [];
      steps.push({
        type: 'array',
        items: ['Node 1', 'Node 2 (Src)', 'Node 3', 'Node 4'],
        pointers: { src: 1 },
        highlights: { 1: 'matched' },
        description: 'Source node 2. Dijkstra finds shortest travel time to every other node.',
        vars: { 'dist[2]': 0, 'min-heap': '[(0, 2)]' }
      });
      steps.push({
        type: 'array',
        items: ['Node 1', 'Node 2 (Src)', 'Node 3', 'Node 4'],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched', 3: 'matched' },
        description: 'All nodes relaxed: <code>dist = [1: 1, 2: 0, 3: 1, 4: 2]</code>. Max delay to reach all nodes is <code>max(dist) = <strong>2</strong></code>.',
        vars: { maxDelay: 2, reachable: true }
      });
      return steps;
    }
  };

  // H11: Merge Intervals
  HybridVisualizers['h11-merge-intervals'] = {
    title: 'H11. Merge Intervals (Sort + Sweep)',
    generateSteps() {
      const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
      const steps = [];

      steps.push({
        type: 'intervals',
        intervals,
        current: 0,
        merged: [],
        description: 'Sort intervals by start time: <code>[[1,3], [2,6], [8,10], [15,18]]</code>.',
        vars: { intervals: 4 }
      });

      steps.push({
        type: 'intervals',
        intervals,
        current: 1,
        merged: [[1, 6]],
        description: '<code>[2, 6]</code> overlaps with <code>[1, 3]</code> because <code>2 <= 3</code>. Merge to <code>[1, max(3, 6)] = [1, 6]</code>.',
        vars: { merged: '[1, 6]' }
      });

      steps.push({
        type: 'intervals',
        intervals,
        current: 3,
        merged: [[1, 6], [8, 10], [15, 18]],
        description: 'All intervals processed. Final merged non-overlapping intervals: <code>[[1,6], [8,10], [15,18]]</code>.',
        vars: { resultCount: 3 }
      });

      return steps;
    }
  };

  // H12: Meeting Rooms II
  HybridVisualizers['h12-meeting-rooms-ii'] = {
    title: 'H12. Meeting Rooms II (Min-Heap of End Times)',
    generateSteps() {
      const steps = [];
      steps.push({
        type: 'array',
        items: ['[0, 30]', '[5, 10]', '[15, 20]'],
        pointers: { cur: 0 },
        highlights: { 0: 'matched' },
        description: 'Meetings sorted by start time. Room 1 allocated for <code>[0, 30]</code>. Min-heap of end times: <code>[30]</code>.',
        vars: { rooms: 1, 'heap(endTimes)': '[30]' }
      });

      steps.push({
        type: 'array',
        items: ['[0, 30]', '[5, 10]', '[15, 20]'],
        pointers: { cur: 1 },
        highlights: { 1: 'active-compare' },
        description: 'Meeting <code>[5, 10]</code> starts at 5 < 30. Earliest room is not free! Need new Room 2. Min-heap: <code>[10, 30]</code>.',
        vars: { rooms: 2, 'heap(endTimes)': '[10, 30]' }
      });

      steps.push({
        type: 'array',
        items: ['[0, 30]', '[5, 10]', '[15, 20]'],
        pointers: { cur: 2 },
        highlights: { 2: 'matched' },
        description: 'Meeting <code>[15, 20]</code> starts at 15 >= 10. Earliest room is free! Pop 10, reuse Room 2, push 20. Peak rooms needed = <strong>2</strong>.',
        vars: { minRoomsRequired: 2 }
      });

      return steps;
    }
  };

  // H13: Trapping Rain Water
  HybridVisualizers['h13-trapping-rain-water'] = {
    title: 'H13. Trapping Rain Water (Two Pointers)',
    generateSteps() {
      const heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
      const steps = [];
      let l = 0, r = heights.length - 1;
      let lMax = 0, rMax = 0, water = 0;
      const waterPerCol = new Array(heights.length).fill(0);

      steps.push({
        type: 'water',
        heights, water: [...waterPerCol],
        left: l, right: r,
        lMax: 0, rMax: 0, totalWater: 0,
        description: 'Elevation map. Water trapped at column <code>i</code> is <code>min(lMax, rMax) - height[i]</code>. Process smaller wall side first.',
        vars: { l, r, totalWater: 0 }
      });

      while (l < r) {
        if (heights[l] < heights[r]) {
          lMax = Math.max(lMax, heights[l]);
          const trapped = lMax - heights[l];
          water += trapped;
          waterPerCol[l] = trapped;
          steps.push({
            type: 'water',
            heights, water: [...waterPerCol],
            left: l, right: r,
            lMax, rMax, totalWater: water,
            description: `<code>heights[l=${l}] = ${heights[l]} < heights[r=${r}] = ${heights[r]}</code>: Process left side. <code>lMax = ${lMax}</code>. Water trapped at index ${l} = <strong>${trapped}</strong>. Increment <code>l</code>.`,
            vars: { l, r, lMax, rMax, totalWater: water }
          });
          l++;
        } else {
          rMax = Math.max(rMax, heights[r]);
          const trapped = rMax - heights[r];
          water += trapped;
          waterPerCol[r] = trapped;
          steps.push({
            type: 'water',
            heights, water: [...waterPerCol],
            left: l, right: r,
            lMax, rMax, totalWater: water,
            description: `<code>heights[r=${r}] = ${heights[r]} <= heights[l=${l}] = ${heights[l]}</code>: Process right side. <code>rMax = ${rMax}</code>. Water trapped at index ${r} = <strong>${trapped}</strong>. Decrement <code>r</code>.`,
            vars: { l, r, lMax, rMax, totalWater: water }
          });
          r--;
        }
      }

      steps.push({
        type: 'water',
        heights, water: [...waterPerCol],
        left: l, right: r,
        lMax, rMax, totalWater: water,
        description: `Completed! Total trapped rain water is <strong>${water}</strong> units. Time: O(n), Space: O(1).`,
        vars: { totalRainWater: water }
      });

      return steps;
    }
  };

  // H14: Daily Temperatures
  HybridVisualizers['h14-daily-temperatures'] = {
    title: 'H14. Daily Temperatures (Monotonic Stack)',
    generateSteps() {
      const arr = [73, 74, 75, 71, 69, 72, 76, 73];
      const steps = [];
      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { i: 0 },
        highlights: {},
        description: 'Find number of days until a warmer temperature. Stack stores indices in decreasing temperature order.',
        vars: { stack: '[]', daysToWait: '[]' }
      });
      steps.push({
        type: 'array',
        items: [1, 1, 4, 2, 1, 1, 0, 0],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched', 3: 'matched', 4: 'matched', 5: 'matched' },
        description: 'Output array: <code>[1, 1, 4, 2, 1, 1, 0, 0]</code>. Solved in a single O(n) pass!',
        vars: { status: 'COMPLETE' }
      });
      return steps;
    }
  };

  // H15: 3Sum
  HybridVisualizers['h15-3sum'] = {
    title: 'H15. 3Sum (Sort + Fix i + Two Pointers)',
    generateSteps() {
      const arr = [-4, -1, -1, 0, 1, 2];
      const steps = [];

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { i: 1, l: 2, r: 5 },
        highlights: { 1: 'active-compare', 2: 'matched', 5: 'matched' },
        description: 'Sorted array. Fix <code>i = 1 (val: -1)</code>. Run two pointers on rest: <code>l = 2 (val: -1), r = 5 (val: 2)</code>. Sum = <code>-1 + (-1) + 2 = 0</code>! Found triplet <strong>[-1, -1, 2]</strong>.',
        vars: { 'arr[i]': -1, 'arr[l]': -1, 'arr[r]': 2, sum: 0 }
      });

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { i: 1, l: 3, r: 4 },
        highlights: { 1: 'active-compare', 3: 'matched', 4: 'matched' },
        description: 'Advance past duplicates: <code>l = 3 (val: 0), r = 4 (val: 1)</code>. Sum = <code>-1 + 0 + 1 = 0</code>! Found triplet <strong>[-1, 0, 1]</strong>.',
        vars: { 'arr[i]': -1, 'arr[l]': 0, 'arr[r]': 1, sum: 0 }
      });

      return steps;
    }
  };

  // H16: Kth Largest Element
  HybridVisualizers['h16-kth-largest-element'] = {
    title: 'H16. Kth Largest Element (Quickselect O(n) Average)',
    generateSteps() {
      const arr = [3, 2, 1, 5, 6, 4];
      const steps = [];
      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { pivot: 3 },
        highlights: { 3: 'active-compare' },
        description: 'Find 2nd largest element (target index <code>n - k = 6 - 2 = 4</code> in sorted order). Quickselect partitions around pivot.',
        vars: { k: 2, targetIdx: 4 }
      });
      steps.push({
        type: 'array',
        items: [3, 2, 1, 4, 5, 6],
        pointers: { pivotIdx: 4 },
        highlights: { 4: 'matched' },
        description: 'Pivot placed at index 4 (value <strong>5</strong>). Since pivot index == target index 4, answer is <strong>5</strong>! O(n) average time.',
        vars: { kthLargest: 5 }
      });
      return steps;
    }
  };

  // H17: Median of Two Sorted Arrays
  HybridVisualizers['h17-median-of-two-sorted-arrays'] = {
    title: 'H17. Median of Two Sorted Arrays (Binary Search on Partitions)',
    generateSteps() {
      const steps = [];
      steps.push({
        type: 'array',
        items: ['nums1: [1, 3]', 'nums2: [2]'],
        pointers: {},
        highlights: { 0: 'in-window', 1: 'matched' },
        description: 'Partition both arrays so left half has <code>(m + n + 1) / 2</code> elements and <code>L1 <= R2 && L2 <= R1</code>.',
        vars: { partition1: 1, partition2: 1 }
      });
      steps.push({
        type: 'array',
        items: ['Left: [1, 2]', 'Right: [3]'],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched' },
        description: 'Valid partition found in O(log(min(m, n)))! Median = <code>max(L1, L2) = <strong>2.0</strong></code>.',
        vars: { median: 2.0 }
      });
      return steps;
    }
  };

  // H18: Search in Rotated Sorted Array
  HybridVisualizers['h18-search-in-rotated-sorted-array'] = {
    title: 'H18. Search in Rotated Sorted Array (Binary Search)',
    generateSteps() {
      const arr = [4, 5, 6, 7, 0, 1, 2];
      const target = 0;
      const steps = [];
      let lo = 0, hi = arr.length - 1;

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { lo: 0, mid: 3, hi: 6 },
        highlights: { 3: 'active-compare' },
        description: `Search target <strong>${target}</strong> in rotated array. At <code>mid = 3 (val: 7)</code>: left half <code>[4..7]</code> is normally sorted because <code>arr[lo] <= arr[mid]</code>. Since target 0 is not in <code>[4..7]</code>, search right half!`,
        vars: { lo: 0, mid: 3, hi: 6, sortedHalf: 'Left [4..7]' }
      });

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { lo: 4, mid: 4, hi: 6 },
        highlights: { 4: 'matched' },
        description: `Set <code>lo = 4</code>. <code>mid = 4 (val: 0)</code>: <strong>Target found at index 4!</strong> O(log n) time.`,
        vars: { foundIndex: 4, target: 0 }
      });

      return steps;
    }
  };

  // H19: Number of Islands
  HybridVisualizers['h19-number-of-islands'] = {
    title: 'H19. Number of Islands (2D Grid DFS / Flood Fill)',
    generateSteps() {
      const steps = [];
      const grid = [
        ['1', '1', '0', '0'],
        ['1', '1', '0', '0'],
        ['0', '0', '1', '0'],
        ['0', '0', '0', '1']
      ];
      const rowLabels = ['r0', 'r1', 'r2', 'r3'];
      const colLabels = ['c0', 'c1', 'c2', 'c3'];

      steps.push({
        type: 'dp',
        grid, rowLabels, colLabels,
        activeRow: 0, activeCol: 0,
        description: '2D Grid of lands (\'1\') and waters (\'0\'). Scan cells. When unvisited \'1\' is found, launch DFS to sink entire island.',
        vars: { islandsFound: 0 }
      });

      const sunk1 = [
        ['0', '0', '0', '0'],
        ['0', '0', '0', '0'],
        ['0', '0', '1', '0'],
        ['0', '0', '0', '1']
      ];
      steps.push({
        type: 'dp',
        grid: sunk1, rowLabels, colLabels,
        activeRow: 0, activeCol: 0,
        description: 'DFS sinks first island at top-left! All 4 connected \'1\'s turned to \'0\'. Island count = 1.',
        vars: { islandsFound: 1 }
      });

      const sunkAll = [
        ['0', '0', '0', '0'],
        ['0', '0', '0', '0'],
        ['0', '0', '0', '0'],
        ['0', '0', '0', '0']
      ];
      steps.push({
        type: 'dp',
        grid: sunkAll, rowLabels, colLabels,
        activeRow: 3, activeCol: 3,
        description: 'All islands visited and counted! Total islands = <strong>3</strong>.',
        vars: { totalIslands: 3 }
      });

      return steps;
    }
  };

  // H20: Accounts Merge
  HybridVisualizers['h20-accounts-merge'] = {
    title: 'H20. Accounts Merge (Disjoint Set Union / DSU)',
    generateSteps() {
      const steps = [];
      steps.push({
        type: 'array',
        items: ['johnsmith@mail.com', 'john_newyork@mail.com', 'john00@mail.com'],
        pointers: {},
        highlights: {},
        description: 'Map each email to an ID and track email-to-name. For each account, union all emails with the first email.',
        vars: { DSU: 'initialized' }
      });
      steps.push({
        type: 'array',
        items: ['John: [john00, john_newyork, johnsmith@mail.com]'],
        pointers: {},
        highlights: { 0: 'matched' },
        description: 'Connected components merged by root parent! Sort emails for each component.',
        vars: { accountsMerged: 1 }
      });
      return steps;
    }
  };

  // H21: Count Inversions
  HybridVisualizers['h21-count-inversions'] = {
    title: 'H21. Count Inversions (Modified Merge Sort)',
    generateSteps() {
      const steps = [];
      steps.push({
        type: 'array',
        items: [8, 4, 2, 1],
        pointers: { i: 0 },
        highlights: {},
        description: 'Array: <code>[8, 4, 2, 1]</code>. An inversion is a pair <code>(i, j)</code> such that <code>i < j</code> and <code>arr[i] > arr[j]</code>.',
        vars: { totalInversions: 0 }
      });
      steps.push({
        type: 'array',
        items: [1, 2, 4, 8],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched', 3: 'matched' },
        description: 'During merge step, when right element is chosen before remaining left elements, add <code>mid - i + 1</code> to inversions. Total = <strong>6</strong> inversions.',
        vars: { inversionsCount: 6 }
      });
      return steps;
    }
  };

  // H22: Longest Palindromic Substring
  HybridVisualizers['h22-longest-palindromic-substring'] = {
    title: 'H22. Longest Palindromic Substring (Expand Around Center)',
    generateSteps() {
      const s = "babad".split('');
      const steps = [];
      steps.push({
        type: 'array',
        items: [...s],
        pointers: { center: 1 },
        highlights: { 1: 'active-compare' },
        description: 'String: <code>"babad"</code>. Expand around center <code>i = 1 (\'a\')</code>: <code>s[0]=\'b\' == s[2]=\'b\'</code> → palindrome <code>"bab"</code> of length 3.',
        vars: { center: 1, palindrome: '"bab"', len: 3 }
      });
      steps.push({
        type: 'array',
        items: [...s],
        pointers: { l: 0, r: 2 },
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched' },
        windowBounds: [0, 2],
        description: 'Longest palindrome found: <strong>"bab"</strong> (or "aba"). O(n²) time, O(1) space.',
        vars: { result: '"bab"' }
      });
      return steps;
    }
  };

  // H23: Palindrome Partitioning
  HybridVisualizers['h23-palindrome-partitioning'] = {
    title: 'H23. Palindrome Partitioning (Backtracking DFS)',
    generateSteps() {
      const steps = [];
      steps.push({
        type: 'array',
        items: ['a', 'a', 'b'],
        pointers: {},
        highlights: {},
        description: 'String: <code>"aab"</code>. Partition string such that every substring is a palindrome. Backtracking branch 1: <code>["a", "a", "b"]</code>.',
        vars: { partition1: '["a", "a", "b"]' }
      });
      steps.push({
        type: 'array',
        items: ['aa', 'b'],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched' },
        description: 'Branch 2: <code>"aa"</code> is palindrome → recurse on <code>"b"</code> → valid partition <strong>["aa", "b"]</strong>.',
        vars: { allPartitions: '[["a","a","b"], ["aa","b"]]' }
      });
      return steps;
    }
  };

  // H24: Binary Search on the Answer
  HybridVisualizers['h24-binary-search-on-the-answer'] = {
    title: 'H24. Binary Search on the Answer (Koko Eating Bananas)',
    generateSteps() {
      const piles = [3, 6, 7, 11];
      const h = 8;
      const steps = [];

      steps.push({
        type: 'array',
        items: [...piles],
        pointers: {},
        highlights: {},
        description: `Piles: <code>[3, 6, 7, 11]</code>, hours limit <code>h = ${h}</code>. Binary search speed range <code>[1 .. max(piles) = 11]</code>.`,
        vars: { loSpeed: 1, hiSpeed: 11, maxHours: h }
      });

      steps.push({
        type: 'array',
        items: [...piles],
        pointers: {},
        highlights: {},
        description: 'Test mid speed <code>k = 6</code>: hours = <code>ceil(3/6) + ceil(6/6) + ceil(7/6) + ceil(11/6) = 1 + 1 + 2 + 2 = 6 <= 8</code> (feasible!). Search lower speeds <code>[1..6]</code>.',
        vars: { speed: 6, hoursTaken: 6, feasible: true }
      });

      steps.push({
        type: 'array',
        items: [...piles],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched', 3: 'matched' },
        description: 'Binary search converges on minimum integer eating speed: <strong>k = 4</strong> bananas/hour (hours taken = 8).',
        vars: { optimalSpeed: 4 }
      });

      return steps;
    }
  };

  // H25: Count of Smaller Numbers After Self
  HybridVisualizers['h25-count-of-smaller-numbers-after-self'] = {
    title: 'H25. Count of Smaller Numbers After Self (Fenwick / Merge Sort)',
    generateSteps() {
      const arr = [5, 2, 6, 1];
      const steps = [];
      steps.push({
        type: 'array',
        items: [...arr],
        pointers: {},
        highlights: {},
        description: 'Array: <code>[5, 2, 6, 1]</code>. Traverse from right to left, inserting elements into Fenwick Tree and querying rank prefix count.',
        vars: { res: '[?, ?, ?, ?]' }
      });
      steps.push({
        type: 'array',
        items: [2, 1, 1, 0],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched', 3: 'matched' },
        description: 'Counts computed: after 5 are [2, 1] (count 2), after 2 is [1] (count 1), after 6 is [1] (count 1), after 1 is [] (count 0). Result: <strong>[2, 1, 1, 0]</strong>.',
        vars: { counts: '[2, 1, 1, 0]' }
      });
      return steps;
    }
  };

  // H26: Lowest Common Ancestor
  HybridVisualizers['h26-lowest-common-ancestor-single-query-vs-many-queries'] = {
    title: 'H26. Lowest Common Ancestor (Recursive Tree DFS)',
    generateSteps() {
      const nodes = [
        { id: 3, val: 3, x: 200, y: 30 },
        { id: 5, val: 5, x: 120, y: 90 },
        { id: 1, val: 1, x: 280, y: 90 },
        { id: 6, val: 6, x: 80, y: 150 },
        { id: 2, val: 2, x: 160, y: 150 }
      ];
      const edges = [[3, 5], [3, 1], [5, 6], [5, 2]];
      const steps = [];

      steps.push({
        type: 'tree',
        nodes, edges,
        activeNode: 3,
        visited: [],
        description: 'Find LCA of node <strong>5</strong> and node <strong>1</strong>. Start recursive DFS from root 3.',
        vars: { targetP: 5, targetQ: 1 }
      });

      steps.push({
        type: 'tree',
        nodes, edges,
        activeNode: 5,
        visited: [5],
        description: 'Left subtree returns node <strong>5</strong>.',
        vars: { leftReturn: 5 }
      });

      steps.push({
        type: 'tree',
        nodes, edges,
        activeNode: 1,
        visited: [5, 1],
        description: 'Right subtree returns node <strong>1</strong>.',
        vars: { rightReturn: 1 }
      });

      steps.push({
        type: 'tree',
        nodes, edges,
        activeNode: 3,
        visited: [3, 5, 1],
        description: 'At root 3: both left and right returned non-null! Therefore, root <strong>3</strong> is the Lowest Common Ancestor.',
        vars: { LCA: 3 }
      });

      return steps;
    }
  };

  // H27: Subset Sum / Target Sum
  HybridVisualizers['h27-subset-sum--target-sum'] = {
    title: 'H27. Subset Sum / Target Sum (0/1 Knapsack DP)',
    generateSteps() {
      const arr = [1, 2, 3, 7];
      const target = 6;
      const steps = [];
      steps.push({
        type: 'array',
        items: [...arr],
        pointers: {},
        highlights: {},
        description: `Array: <code>[1, 2, 3, 7]</code>, Target = <strong>${target}</strong>. Boolean DP array of reachable sums up to target.`,
        vars: { target: 6 }
      });
      steps.push({
        type: 'array',
        items: ['dp[0]=T', 'dp[1]=T', 'dp[2]=T', 'dp[3]=T', 'dp[4]=F', 'dp[5]=F', 'dp[6]=T'],
        pointers: {},
        highlights: { 6: 'matched' },
        description: 'Numbers <code>[1, 2, 3]</code> sum to 6 (1 + 2 + 3 = 6). <code>dp[6] == true</code>! Subset sum exists.',
        vars: { reachable: true }
      });
      return steps;
    }
  };

  // H28: Travelling Salesperson Problem
  HybridVisualizers['h28-travelling-salesperson-problem'] = {
    title: 'H28. Travelling Salesperson Problem (Bitmask DP: O(n² · 2ⁿ))',
    generateSteps() {
      const steps = [];
      steps.push({
        type: 'bits',
        val: 1,
        bitWidth: 4,
        description: 'State: <code>dp[mask][u]</code>. Mask <code>0001</code>: only starting city 0 visited.',
        vars: { mask: '0001 (City 0)', currentCity: 0 }
      });
      steps.push({
        type: 'bits',
        val: 15,
        bitWidth: 4,
        description: 'Mask <code>1111</code>: all 4 cities visited! Transition back to start city 0 to complete tour.',
        vars: { mask: '1111 (All 4 Cities)', minTourCost: 35 }
      });
      return steps;
    }
  };

  // H29: Maximal Rectangle
  HybridVisualizers['h29-maximal-rectangle'] = {
    title: 'H29. Maximal Rectangle (Row Heights Histogram + Monotonic Stack)',
    generateSteps() {
      const steps = [];
      steps.push({
        type: 'array',
        items: [3, 1, 3, 2, 2],
        pointers: {},
        highlights: {},
        description: 'For each row of the matrix, accumulate consecutive 1s into a histogram of heights.',
        vars: { rowHistogram: '[3, 1, 3, 2, 2]' }
      });
      steps.push({
        type: 'array',
        items: [3, 1, 3, 2, 2],
        pointers: {},
        highlights: { 2: 'matched', 3: 'matched', 4: 'matched' },
        windowBounds: [2, 4],
        description: 'Run largest rectangle in histogram via monotonic stack: rectangle of height 2 across columns 2..4 has area <code>2 * 3 = <strong>6</strong></code>!',
        vars: { maxArea: 6 }
      });
      return steps;
    }
  };

  // H30: Sum of Subarray Minimums
  HybridVisualizers['h30-sum-of-subarray-minimums'] = {
    title: 'H30. Sum of Subarray Minimums (Monotonic Stack PLE & NLE)',
    generateSteps() {
      const arr = [3, 1, 2, 4];
      const steps = [];
      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { i: 1 },
        highlights: { 1: 'matched' },
        description: 'For element <code>1</code> at index 1: Previous Less Element index = -1, Next Less Element index = 4. Number of subarrays where 1 is the minimum = <code>(1 - (-1)) * (4 - 1) = 2 * 3 = 6</code>!',
        vars: { elem: 1, spanSubarrays: 6, contribution: 6 }
      });
      steps.push({
        type: 'array',
        items: [...arr],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched', 3: 'matched' },
        description: 'Total sum of minimums over all subarrays = <code>(3*1) + (1*6) + (2*2) + (4*1) = <strong>17</strong></code>. O(n) monotonic stack.',
        vars: { totalSumOfMins: 17 }
      });
      return steps;
    }
  };

  // H31: Shortest Path Visiting All Nodes
  HybridVisualizers['h31-shortest-path-visiting-all-nodes'] = {
    title: 'H31. Shortest Path Visiting All Nodes (BFS with Bitmask State)',
    generateSteps() {
      const steps = [];
      steps.push({
        type: 'bits',
        val: 1,
        bitWidth: 4,
        description: 'BFS Queue stores <code>(node, visited_mask)</code> states. Initially all nodes enqueued with their single-bit masks.',
        vars: { queueStates: 4, dist: 0 }
      });
      steps.push({
        type: 'bits',
        val: 15,
        bitWidth: 4,
        description: 'First state reaching <code>mask == 1111</code> (all 4 nodes visited) gives the shortest path! Distance = <strong>4</strong> steps.',
        vars: { allVisitedMask: '1111', shortestPath: 4 }
      });
      return steps;
    }
  };

  window.HybridVisualizers = HybridVisualizers;
})(window);
