/**
 * Visualizer Definitions for Part II (Worked Example) and Part IV (Patterns P1 to P22)
 */

(function (window) {
  'use strict';

  const PatternVisualizers = {};

  // Part II #9: Worked Example - Subarray with Target Sum
  PatternVisualizers['worked-example'] = {
    title: 'Worked Example: Subarray with Target Sum (Sliding Window)',
    generateSteps() {
      const arr = [2, 3, 1, 2, 4, 3];
      const target = 7;
      const steps = [];

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { l: 0, r: 0 },
        highlights: {},
        description: 'Initialize two pointers <code>l = 0</code>, <code>r = 0</code>. Target sum is <strong>7</strong>. We expand <code>r</code> while sum < 7.',
        vars: { l: 0, r: 0, curSum: 0, minLen: '∞' }
      });

      let l = 0, sum = 0, minLen = Infinity;
      for (let r = 0; r < arr.length; r++) {
        sum += arr[r];
        steps.push({
          type: 'array',
          items: [...arr],
          pointers: { l, r },
          highlights: { [r]: 'active-compare' },
          windowBounds: [l, r],
          description: `Add <code>arr[${r}] = ${arr[r]}</code> to window. Current window sum = <strong>${sum}</strong>.`,
          vars: { l, r, curSum: sum, minLen: minLen === Infinity ? '∞' : minLen }
        });

        while (sum >= target) {
          const len = r - l + 1;
          if (len < minLen) minLen = len;
          steps.push({
            type: 'array',
            items: [...arr],
            pointers: { l, r },
            highlights: { [l]: 'matched', [r]: 'matched' },
            windowBounds: [l, r],
            description: `Window sum <strong>${sum} >= ${target}</strong>! Subarray length = <code>${len}</code>. Best minLen updated to <strong>${minLen}</strong>. Now shrinking from left: subtract <code>arr[${l}] = ${arr[l]}</code>.`,
            vars: { l, r, curSum: sum, minLen }
          });
          sum -= arr[l++];
          if (l <= r) {
            steps.push({
              type: 'array',
              items: [...arr],
              pointers: { l, r },
              highlights: {},
              windowBounds: [l, r],
              description: `After shrinking, <code>l</code> advanced to ${l}. Current window sum = <strong>${sum}</strong>.`,
              vars: { l, r, curSum: sum, minLen }
            });
          }
        }
      }

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { l: 4, r: 5 },
        highlights: { 4: 'matched', 5: 'matched' },
        windowBounds: [4, 5],
        description: `Search complete! Minimum subarray length is <strong>${minLen}</strong> (subarray <code>[4, 3]</code> sums to 7).`,
        vars: { minLen, result: '[4, 3]' }
      });

      return steps;
    }
  };

  // P1: Two Pointers
  PatternVisualizers['p1-two-pointers'] = {
    title: 'P1. Two Pointers',
    modes: [
      {
        name: 'Two Sum II (Opposite Ends)',
        generateSteps() {
          const arr = [2, 7, 11, 15];
          const target = 9;
          const steps = [];
          let l = 0, r = arr.length - 1;

          steps.push({
            type: 'array',
            items: [...arr],
            pointers: { l, r },
            highlights: {},
            description: 'Sorted array. Target = <strong>9</strong>. Place <code>l</code> at start, <code>r</code> at end.',
            vars: { l, r, 'arr[l]+arr[r]': arr[l] + arr[r], target }
          });

          while (l < r) {
            const sum = arr[l] + arr[r];
            if (sum === target) {
              steps.push({
                type: 'array',
                items: [...arr],
                pointers: { l, r },
                highlights: { [l]: 'matched', [r]: 'matched' },
                description: `<code>arr[${l}] + arr[${r}] = ${arr[l]} + ${arr[r]} = ${sum} == ${target}</code>! Pair found! Return 1-based indices <strong>[${l + 1}, ${r + 1}]</strong>.`,
                vars: { l, r, sum, status: 'MATCH FOUND' }
              });
              break;
            } else if (sum < target) {
              steps.push({
                type: 'array',
                items: [...arr],
                pointers: { l, r },
                highlights: { [l]: 'active-compare', [r]: 'active-compare' },
                description: `Sum = <code>${sum} < ${target}</code>. Since array is sorted, increment <code>l</code> to increase sum.`,
                vars: { l, r, sum }
              });
              l++;
            } else {
              steps.push({
                type: 'array',
                items: [...arr],
                pointers: { l, r },
                highlights: { [l]: 'active-compare', [r]: 'active-compare' },
                description: `Sum = <code>${sum} > ${target}</code>. Decrement <code>r</code> to decrease sum.`,
                vars: { l, r, sum }
              });
              r--;
            }
          }
          return steps;
        }
      },
      {
        name: 'Dutch National Flag (0, 1, 2)',
        generateSteps() {
          const arr = [2, 0, 2, 1, 1, 0];
          const steps = [];
          let lo = 0, mid = 0, hi = arr.length - 1;

          steps.push({
            type: 'array',
            items: [...arr],
            pointers: { lo, mid, hi },
            highlights: {},
            description: 'Dutch National Flag: 3-way partition. <code>[0..lo)</code> holds 0s, <code>[lo..mid)</code> holds 1s, <code>(hi..n-1]</code> holds 2s.',
            vars: { lo, mid, hi }
          });

          while (mid <= hi) {
            if (arr[mid] === 0) {
              steps.push({
                type: 'array',
                items: [...arr],
                pointers: { lo, mid, hi },
                highlights: { [mid]: 'active-compare', [lo]: 'matched' },
                description: `<code>arr[mid] == 0</code>: Swap with <code>arr[lo]</code>, then <code>lo++</code>, <code>mid++</code>.`,
                vars: { lo, mid, hi }
              });
              [arr[lo], arr[mid]] = [arr[mid], arr[lo]];
              lo++; mid++;
            } else if (arr[mid] === 1) {
              steps.push({
                type: 'array',
                items: [...arr],
                pointers: { lo, mid, hi },
                highlights: { [mid]: 'in-window' },
                description: `<code>arr[mid] == 1</code>: Already in correct middle zone, just <code>mid++</code>.`,
                vars: { lo, mid, hi }
              });
              mid++;
            } else {
              steps.push({
                type: 'array',
                items: [...arr],
                pointers: { lo, mid, hi },
                highlights: { [mid]: 'active-compare', [hi]: 'eliminated' },
                description: `<code>arr[mid] == 2</code>: Swap with <code>arr[hi]</code>, <code>hi--</code>. Do NOT increment <code>mid</code> yet because swapped element needs inspection!`,
                vars: { lo, mid, hi }
              });
              [arr[mid], arr[hi]] = [arr[hi], arr[mid]];
              hi--;
            }
          }

          steps.push({
            type: 'array',
            items: [...arr],
            pointers: { lo, mid, hi },
            highlights: { 0: 'matched', 1: 'matched', 2: 'in-window', 3: 'in-window', 4: 'eliminated', 5: 'eliminated' },
            description: 'Array sorted in-place in single pass O(n) time and O(1) space!',
            vars: { status: 'SORTED' }
          });

          return steps;
        }
      }
    ]
  };

  // P2: Sliding Window
  PatternVisualizers['p2-sliding-window'] = {
    title: 'P2. Sliding Window (Longest Substring Without Repeating Characters)',
    generateSteps() {
      const s = "abcabcbb";
      const arr = s.split('');
      const steps = [];
      const seen = new Set();
      let l = 0, best = 0;

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { l: 0, r: 0 },
        highlights: {},
        description: 'String: <code>"abcabcbb"</code>. Find length of longest substring with unique characters. Initialize <code>l = 0, r = 0</code>.',
        vars: { l: 0, r: 0, windowLen: 0, maxLen: 0 }
      });

      for (let r = 0; r < arr.length; r++) {
        const c = arr[r];
        while (seen.has(c)) {
          steps.push({
            type: 'array',
            items: [...arr],
            pointers: { l, r },
            highlights: { [r]: 'active-compare', [l]: 'eliminated' },
            windowBounds: [l, r],
            description: `Character <code>'${c}'</code> is already in the window! Shrink from left: remove <code>'${arr[l]}'</code> and <code>l++</code>.`,
            vars: { l, r, duplicate: c, maxLen: best }
          });
          seen.delete(arr[l]);
          l++;
        }
        seen.add(c);
        best = Math.max(best, r - l + 1);
        steps.push({
          type: 'array',
          items: [...arr],
          pointers: { l, r },
          highlights: { [r]: 'matched' },
          windowBounds: [l, r],
          description: `Add <code>'${c}'</code>. Valid window <code>[${l}..${r}]</code> has length <strong>${r - l + 1}</strong>. Best maxLen = <strong>${best}</strong>.`,
          vars: { l, r, windowLen: r - l + 1, maxLen: best }
        });
      }

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { l: 0, r: 2 },
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched' },
        windowBounds: [0, 2],
        description: `Finished processing! Longest substring without duplicates is length <strong>${best}</strong> (e.g. <code>"abc"</code>).`,
        vars: { maxLen: best }
      });

      return steps;
    }
  };

  // P3: Prefix Sum + HashMap
  PatternVisualizers['p3-prefix-sum--hashmap'] = {
    title: 'P3. Prefix Sum + HashMap (Subarray Sum Equals K)',
    generateSteps() {
      const arr = [1, 2, 3, -2, 1];
      const k = 3;
      const steps = [];
      const map = { 0: 1 };
      let sum = 0, count = 0;

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: {},
        highlights: {},
        description: `Array: <code>[1, 2, 3, -2, 1]</code>, <code>k = ${k}</code>. Seed map with <code>{0: 1}</code> to count subarrays starting at index 0.`,
        vars: { sum: 0, count: 0, 'seen{0}': 1 }
      });

      arr.forEach((x, i) => {
        sum += x;
        const targetPrefix = sum - k;
        const matches = map[targetPrefix] || 0;
        count += matches;

        steps.push({
          type: 'array',
          items: [...arr],
          pointers: { i },
          highlights: { [i]: matches > 0 ? 'matched' : 'active-compare' },
          description: `At index ${i} (value ${x}): running sum = <strong>${sum}</strong>. Lookup <code>sum - k = ${sum} - ${k} = ${targetPrefix}</code> in HashMap. Found <strong>${matches}</strong> matching prefix(es). Total count = <strong>${count}</strong>.`,
          vars: { i, num: x, sum, 'sum - k': targetPrefix, matches, count }
        });

        map[sum] = (map[sum] || 0) + 1;
      });

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched' },
        description: `Scan complete! Total continuous subarrays summing to ${k} is <strong>${count}</strong>. Time: O(n), Space: O(n).`,
        vars: { finalCount: count }
      });

      return steps;
    }
  };

  // P4: Kadane and Array Tricks
  PatternVisualizers['p4-kadane-and-array-tricks'] = {
    title: 'P4. Kadane\'s Algorithm (Maximum Subarray)',
    generateSteps() {
      const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
      const steps = [];
      let cur = arr[0], best = arr[0];

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { i: 0 },
        highlights: { 0: 'matched' },
        description: `Initialize with first element: <code>cur = ${arr[0]}, best = ${arr[0]}</code>. Invariant: <code>cur</code> is max subarray ending at <code>i</code>.`,
        vars: { i: 0, cur, best }
      });

      for (let i = 1; i < arr.length; i++) {
        const x = arr[i];
        const prevCur = cur;
        cur = Math.max(x, cur + x);
        const updated = cur > best;
        best = Math.max(best, cur);

        steps.push({
          type: 'array',
          items: [...arr],
          pointers: { i },
          highlights: { [i]: updated ? 'matched' : (cur === x ? 'active-compare' : 'in-window') },
          description: `Element <code>arr[${i}] = ${x}</code>. <code>cur = max(${x}, ${prevCur} + ${x}) = ${cur}</code>. ${cur === x ? 'Started fresh subarray.' : 'Extended previous subarray.'} ${updated ? `<strong>New max sum found: ${best}!</strong>` : `Best remains ${best}.`}`,
          vars: { i, x, cur, best }
        });
      }

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: {},
        highlights: { 3: 'matched', 4: 'matched', 5: 'matched', 6: 'matched' },
        windowBounds: [3, 6],
        description: `Completed! Maximum contiguous subarray sum is <strong>${best}</strong> (subarray <code>[4, -1, 2, 1]</code> from index 3 to 6).`,
        vars: { maxSum: best, range: '[3..6]' }
      });

      return steps;
    }
  };

  // P5: Binary Search
  PatternVisualizers['p5-binary-search'] = {
    title: 'P5. Binary Search (Lower Bound / First Element >= Target)',
    generateSteps() {
      const arr = [1, 2, 4, 4, 5, 6, 8];
      const target = 4;
      const steps = [];
      let lo = 0, hi = arr.length;

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { lo: 0, hi: arr.length - 1 },
        highlights: {},
        description: `Sorted array. Find lower bound (first index with <code>arr[idx] >= ${target}</code>). Half-open range <code>[lo=0, hi=${hi})</code>.`,
        vars: { lo: 0, hi, target }
      });

      while (lo < hi) {
        const mid = Math.floor(lo + (hi - lo) / 2);
        const val = arr[mid];

        steps.push({
          type: 'array',
          items: [...arr],
          pointers: { lo, mid, hi: Math.min(hi, arr.length - 1) },
          highlights: { [mid]: 'active-compare' },
          description: `<code>mid = ${mid}</code>, <code>arr[mid] = ${val}</code>. Check: <code>${val} >= ${target}</code>?`,
          vars: { lo, mid, hi, 'arr[mid]': val }
        });

        if (val >= target) {
          steps.push({
            type: 'array',
            items: [...arr],
            pointers: { lo, mid, hi: Math.min(hi, arr.length - 1) },
            highlights: { [mid]: 'matched' },
            description: `<code>${val} >= ${target}</code> is TRUE. Answer could be at <code>mid=${mid}</code> or earlier. Set <code>hi = mid = ${mid}</code>.`,
            vars: { lo, mid, hi: mid }
          });
          hi = mid;
        } else {
          steps.push({
            type: 'array',
            items: [...arr],
            pointers: { lo, mid, hi: Math.min(hi, arr.length - 1) },
            highlights: { [mid]: 'eliminated' },
            description: `<code>${val} < ${target}</code>. Target must be in right half. Set <code>lo = mid + 1 = ${mid + 1}</code>.`,
            vars: { lo: mid + 1, mid, hi }
          });
          lo = mid + 1;
        }
      }

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { lo },
        highlights: { [lo]: 'matched' },
        description: `Terminated with <code>lo == hi == ${lo}</code>. First element <code>>= ${target}</code> is at index <strong>${lo}</strong> (value ${arr[lo]}).`,
        vars: { lowerBoundIndex: lo, value: arr[lo] }
      });

      return steps;
    }
  };

  // P6: HashMap / HashSet / Frequency
  PatternVisualizers['p6-hashmap--hashset--frequency'] = {
    title: 'P6. HashMap / HashSet (Two Sum O(n) One-Pass)',
    generateSteps() {
      const arr = [2, 11, 7, 15];
      const target = 9;
      const steps = [];
      const map = {};

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: {},
        highlights: {},
        description: `Array: <code>[2, 11, 7, 15]</code>, Target = <strong>${target}</strong>. Scan array once. Check if complement <code>target - x</code> exists in map.`,
        vars: { target, map: '{}' }
      });

      for (let i = 0; i < arr.length; i++) {
        const x = arr[i];
        const complement = target - x;

        if (map[complement] !== undefined) {
          const compIdx = map[complement];
          steps.push({
            type: 'array',
            items: [...arr],
            pointers: { i, match: compIdx },
            highlights: { [compIdx]: 'matched', [i]: 'matched' },
            description: `At index ${i} (value ${x}): complement = <code>${target} - ${x} = ${complement}</code>. <strong>FOUND in map at index ${compIdx}!</strong> Answer: <strong>[${compIdx}, ${i}]</strong>.`,
            vars: { i, val: x, complement, matchedIdx: compIdx }
          });
          break;
        } else {
          map[x] = i;
          steps.push({
            type: 'array',
            items: [...arr],
            pointers: { i },
            highlights: { [i]: 'active-compare' },
            description: `At index ${i} (value ${x}): complement = <code>${target} - ${x} = ${complement}</code> not in map. Store <code>map[${x}] = ${i}</code>.`,
            vars: { i, val: x, complement, mapSize: Object.keys(map).length }
          });
        }
      }
      return steps;
    }
  };

  // P7: Stack and Monotonic Stack
  PatternVisualizers['p7-stack-and-monotonic-stack'] = {
    title: 'P7. Stack & Monotonic Stack (Next Greater Element)',
    generateSteps() {
      const arr = [73, 74, 75, 71, 69, 72, 76];
      const steps = [];
      const stack = [];
      const res = new Array(arr.length).fill(0);

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { i: 0 },
        highlights: {},
        description: 'Monotonic decreasing stack of indices. When a warmer temperature is encountered, it resolves pending cooler days on the stack.',
        vars: { stack: '[]', result: `[${res.join(', ')}]` }
      });

      for (let i = 0; i < arr.length; i++) {
        const cur = arr[i];

        while (stack.length > 0 && cur > arr[stack[stack.length - 1]]) {
          const prevIdx = stack.pop();
          res[prevIdx] = i - prevIdx;
          steps.push({
            type: 'array',
            items: [...arr],
            pointers: { i, resolved: prevIdx },
            highlights: { [i]: 'matched', [prevIdx]: 'active-compare' },
            description: `<code>arr[${i}] = ${cur} > arr[${prevIdx}] = ${arr[prevIdx]}</code>! Warmer day found! Distance for index ${prevIdx} is <code>${i} - ${prevIdx} = ${res[prevIdx]}</code> days.`,
            vars: { curDay: i, resolvedDay: prevIdx, distance: res[prevIdx], stack: `[${stack.map(s => arr[s]).join(', ')}]` }
          });
        }

        stack.push(i);
        steps.push({
          type: 'array',
          items: [...arr],
          pointers: { i },
          highlights: { [i]: 'in-window' },
          description: `Push index ${i} (temp ${cur}) onto monotonic stack. Stack remains strictly decreasing.`,
          vars: { i, curTemp: cur, stack: `[${stack.map(s => arr[s]).join(', ')}]` }
        });
      }

      return steps;
    }
  };

  // P8: Queue and Deque
  PatternVisualizers['p8-queue-and-deque'] = {
    title: 'P8. Monotonic Deque (Sliding Window Maximum)',
    generateSteps() {
      const arr = [1, 3, -1, -3, 5, 3, 6, 7];
      const k = 3;
      const steps = [];
      const deque = []; // stores indices
      const res = [];

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { i: 0 },
        highlights: {},
        description: `Array: <code>[${arr.join(', ')}]</code>, window <code>k = ${k}</code>. Monotonic deque stores indices of candidate maximums in decreasing order.`,
        vars: { k, deque: '[]', maxArray: '[]' }
      });

      for (let i = 0; i < arr.length; i++) {
        // Remove indices out of current window
        if (deque.length > 0 && deque[0] <= i - k) {
          const old = deque.shift();
          steps.push({
            type: 'array',
            items: [...arr],
            pointers: { i },
            highlights: { [old]: 'eliminated' },
            description: `Index ${old} is outside sliding window <code>[${i - k + 1}..${i}]</code>. Pop from FRONT of deque.`,
            vars: { i, poppedFront: old, deque: `[${deque.join(', ')}]` }
          });
        }

        // Pop elements from back that are smaller than arr[i]
        while (deque.length > 0 && arr[deque[deque.length - 1]] < arr[i]) {
          const smaller = deque.pop();
          steps.push({
            type: 'array',
            items: [...arr],
            pointers: { i },
            highlights: { [smaller]: 'eliminated', [i]: 'active-compare' },
            description: `<code>arr[${smaller}] = ${arr[smaller]} < arr[${i}] = ${arr[i]}</code>. It can never be window maximum. Pop from BACK of deque.`,
            vars: { i, poppedBack: smaller, deque: `[${deque.join(', ')}]` }
          });
        }

        deque.push(i);
        if (i >= k - 1) {
          const maxVal = arr[deque[0]];
          res.push(maxVal);
          steps.push({
            type: 'array',
            items: [...arr],
            pointers: { l: i - k + 1, r: i, maxIdx: deque[0] },
            highlights: { [deque[0]]: 'matched' },
            windowBounds: [i - k + 1, i],
            description: `Window <code>[${i - k + 1}..${i}]</code>: front of deque is index <strong>${deque[0]}</strong> with max value <strong>${maxVal}</strong>!`,
            vars: { window: `[${i - k + 1}..${i}]`, maxVal, res: `[${res.join(', ')}]` }
          });
        }
      }

      return steps;
    }
  };

  // P9: Linked List
  PatternVisualizers['p9-linked-list'] = {
    title: 'P9. Linked List (In-Place Reversal)',
    generateSteps() {
      const values = [1, 2, 3, 4, 5];
      const steps = [];

      steps.push({
        type: 'array',
        items: [...values],
        pointers: { curr: 0 },
        highlights: {},
        description: 'Linked List: <code>1 → 2 → 3 → 4 → 5 → null</code>. Rewire pointers in-place using <code>prev = null</code>, <code>curr = head</code>.',
        vars: { prev: 'null', curr: values[0] }
      });

      for (let i = 0; i < values.length; i++) {
        steps.push({
          type: 'array',
          items: [...values],
          pointers: { prev: i > 0 ? i - 1 : 0, curr: i },
          highlights: { [i]: 'matched' },
          description: `Node <strong>${values[i]}</strong>: Save <code>next = curr.next</code>. Rewire: <code>curr.next = prev</code>. Advance <code>prev = curr</code>, <code>curr = next</code>.`,
          vars: { step: i + 1, prevNode: values[i], nextNode: i < values.length - 1 ? values[i + 1] : 'null' }
        });
      }

      steps.push({
        type: 'array',
        items: [...values].reverse(),
        pointers: { head: 0 },
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched', 3: 'matched', 4: 'matched' },
        description: 'Reversal complete! New head is <strong>5</strong>. List is now <code>5 → 4 → 3 → 2 → 1 → null</code>. O(n) time, O(1) space.',
        vars: { newHead: 5, status: 'REVERSED' }
      });

      return steps;
    }
  };

  // P10: Recursion and Divide & Conquer
  PatternVisualizers['p10-recursion-and-divide--conquer'] = {
    title: 'P10. Recursion / Divide & Conquer (Merge Sort)',
    generateSteps() {
      const arr = [38, 27, 43, 3, 9, 82, 10];
      const steps = [];

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { lo: 0, hi: arr.length - 1 },
        highlights: {},
        description: 'Unsorted array. Divide & Conquer: recursively split in halves until single elements, then merge sorted halves.',
        vars: { size: arr.length, depth: 0 }
      });

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { mid: 3 },
        highlights: { 0: 'active-compare', 1: 'active-compare', 2: 'active-compare', 3: 'active-compare', 4: 'in-window', 5: 'in-window', 6: 'in-window' },
        description: 'Divide into Left <code>[38, 27, 43, 3]</code> and Right <code>[9, 82, 10]</code>.',
        vars: { leftSize: 4, rightSize: 3 }
      });

      const sorted = [3, 9, 10, 27, 38, 43, 82];
      steps.push({
        type: 'array',
        items: [...sorted],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched', 3: 'matched', 4: 'matched', 5: 'matched', 6: 'matched' },
        description: 'Merge sorted halves: compare heads of each half, pick smaller into auxiliary buffer. Final sorted array in O(n log n) time.',
        vars: { status: 'SORTED', time: 'O(n log n)', space: 'O(n)' }
      });

      return steps;
    }
  };

  // P11: Trees
  PatternVisualizers['p11-trees-binary-tree-and-bst'] = {
    title: 'P11. Trees (Level-Order BFS & DFS)',
    generateSteps() {
      const nodes = [
        { id: 1, val: 3, x: 200, y: 30 },
        { id: 2, val: 9, x: 120, y: 90 },
        { id: 3, val: 20, x: 280, y: 90 },
        { id: 4, val: 15, x: 240, y: 150 },
        { id: 5, val: 7, x: 320, y: 150 }
      ];
      const edges = [[1, 2], [1, 3], [3, 4], [3, 5]];
      const steps = [];

      steps.push({
        type: 'tree',
        nodes, edges,
        activeNode: 1,
        visited: [],
        description: 'Binary Tree Level-Order Traversal (BFS). Queue starts with root node <strong>3</strong>.',
        vars: { queue: '[3]', level: 1 }
      });

      steps.push({
        type: 'tree',
        nodes, edges,
        activeNode: 1,
        visited: [1],
        description: 'Dequeue <strong>3</strong>. Add left child <strong>9</strong> and right child <strong>20</strong> to queue.',
        vars: { popped: 3, queue: '[9, 20]', level: 1 }
      });

      steps.push({
        type: 'tree',
        nodes, edges,
        activeNode: 2,
        visited: [1, 2],
        description: 'Dequeue <strong>9</strong> (leaf). No children.',
        vars: { popped: 9, queue: '[20]', level: 2 }
      });

      steps.push({
        type: 'tree',
        nodes, edges,
        activeNode: 3,
        visited: [1, 2, 3],
        description: 'Dequeue <strong>20</strong>. Add children <strong>15</strong> and <strong>7</strong> to queue.',
        vars: { popped: 20, queue: '[15, 7]', level: 2 }
      });

      steps.push({
        type: 'tree',
        nodes, edges,
        activeNode: null,
        visited: [1, 2, 3, 4, 5],
        description: 'Traversal complete! Levels: <code>[[3], [9, 20], [15, 7]]</code>.',
        vars: { result: '[[3], [9, 20], [15, 7]]' }
      });

      return steps;
    }
  };

  // P12: Heap / Priority Queue
  PatternVisualizers['p12-heap--priority-queue'] = {
    title: 'P12. Min-Heap (Insert and Percolate-Up / Bubble-Up)',
    generateSteps() {
      const steps = [];
      const heap = [4, 10, 8, 20];

      steps.push({
        type: 'array',
        items: [...heap, 2],
        pointers: { insert: 4 },
        highlights: { 4: 'active-compare' },
        description: 'Insert new element <strong>2</strong> at the leaf (end of array at index 4). In min-heap, parent must be <= child.',
        vars: { insertVal: 2, idx: 4, parentIdx: 1, parentVal: 10 }
      });

      steps.push({
        type: 'array',
        items: [4, 2, 8, 20, 10],
        pointers: { cur: 1 },
        highlights: { 1: 'swapping', 4: 'swapping' },
        description: '<code>2 < 10</code>: Violates min-heap property! Bubble up: swap with parent at index 1.',
        vars: { swapped: '2 <-> 10', curIdx: 1, newParentIdx: 0, newParentVal: 4 }
      });

      steps.push({
        type: 'array',
        items: [2, 4, 8, 20, 10],
        pointers: { root: 0 },
        highlights: { 0: 'matched', 1: 'matched' },
        description: '<code>2 < 4</code>: Bubble up to root! Swap with parent at index 0. Element <strong>2</strong> is now minimum at root.',
        vars: { minElement: 2, status: 'VALID MIN-HEAP' }
      });

      return steps;
    }
  };

  // P13: Graphs
  PatternVisualizers['p13-graphs'] = {
    title: 'P13. Graphs (Dijkstra Shortest Path Relaxation)',
    generateSteps() {
      const nodes = [
        { id: 'A', val: 'A', x: 50, y: 90 },
        { id: 'B', val: 'B', x: 150, y: 35 },
        { id: 'C', val: 'C', x: 150, y: 145 },
        { id: 'D', val: 'D', x: 250, y: 90 }
      ];
      const edges = [
        ['A', 'B', 4], ['A', 'C', 2],
        ['C', 'B', 1], ['B', 'D', 3],
        ['C', 'D', 7]
      ];
      const steps = [];

      steps.push({
        type: 'graph',
        nodes, edges,
        activeNode: 'A',
        visited: ['A'],
        distances: { A: 0, B: Infinity, C: Infinity, D: Infinity },
        description: 'Source node <strong>A</strong>. Initialize <code>dist[A] = 0</code>, all other distances = ∞. Add (0, A) to min-heap.',
        vars: { cur: 'A', 'min-heap': '[(0, A)]' }
      });

      steps.push({
        type: 'graph',
        nodes, edges,
        activeNode: 'C',
        visited: ['A', 'C'],
        distances: { A: 0, B: 4, C: 2, D: Infinity },
        description: 'Relax edges from A: <code>dist[B] = 4</code>, <code>dist[C] = 2</code>. Pop minimum from heap: visit <strong>C</strong> (cost 2).',
        vars: { cur: 'C', cost: 2 }
      });

      steps.push({
        type: 'graph',
        nodes, edges,
        activeNode: 'B',
        visited: ['A', 'C', 'B'],
        distances: { A: 0, B: 3, C: 2, D: 9 },
        description: 'From C: path A → C → B costs <code>2 + 1 = 3 < 4</code>! Relax <code>dist[B] = 3</code>. Next min node is <strong>B</strong>.',
        vars: { cur: 'B', cost: 3 }
      });

      steps.push({
        type: 'graph',
        nodes, edges,
        activeNode: 'D',
        visited: ['A', 'C', 'B', 'D'],
        distances: { A: 0, B: 3, C: 2, D: 6 },
        description: 'From B: path A → C → B → D costs <code>3 + 3 = 6</code>! Shortest path to all nodes solved in O((V + E) log V).',
        vars: { shortestToD: 6, status: 'COMPLETE' }
      });

      return steps;
    }
  };

  // P14: Backtracking
  PatternVisualizers['p14-backtracking'] = {
    title: 'P14. Backtracking (Subsets: Choose, Explore, Un-choose)',
    generateSteps() {
      const arr = [1, 2, 3];
      const steps = [];

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: {},
        highlights: {},
        description: 'Array: <code>[1, 2, 3]</code>. Backtracking decision tree: at each step, choose to include an element, explore recursive branch, then backtrack (un-choose).',
        vars: { path: '[]', subsetsCount: 1 }
      });

      const paths = [
        { p: '[1]', desc: 'Choose 1: add to current subset' },
        { p: '[1, 2]', desc: 'Choose 2: add to current subset' },
        { p: '[1, 2, 3]', desc: 'Choose 3: leaf subset [1, 2, 3] generated!' },
        { p: '[1, 2]', desc: 'Backtrack: remove 3' },
        { p: '[1, 3]', desc: 'Explore without 2: choose 3 → subset [1, 3]' },
        { p: '[2]', desc: 'Backtrack up to root: explore branch starting with 2' }
      ];

      paths.forEach(item => {
        steps.push({
          type: 'array',
          items: [...arr],
          pointers: {},
          highlights: { 0: 'matched', 1: 'in-window' },
          description: item.desc,
          vars: { currentPath: item.p }
        });
      });

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched' },
        description: 'Total <code>2³ = 8</code> subsets generated: <code>[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]</code>.',
        vars: { totalSubsets: 8 }
      });

      return steps;
    }
  };

  // P15: Greedy and Intervals
  PatternVisualizers['p15-greedy-and-intervals'] = {
    title: 'P15. Greedy & Intervals (Merge Overlapping Intervals)',
    generateSteps() {
      const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
      const steps = [];

      steps.push({
        type: 'intervals',
        intervals,
        current: 0,
        merged: [],
        description: 'Intervals: <code>[[1,3], [2,6], [8,10], [15,18]]</code>. First step: sort intervals by start time. Initialize merged with <code>[1, 3]</code>.',
        vars: { active: '[1, 3]' }
      });

      steps.push({
        type: 'intervals',
        intervals,
        current: 1,
        merged: [[1, 6]],
        description: 'Inspect <code>[2, 6]</code>: <code>2 <= 3</code> (starts before previous ends). Overlap detected! Merge: <code>[1, max(3, 6)] = [1, 6]</code>.',
        vars: { overlap: true, mergedInterval: '[1, 6]' }
      });

      steps.push({
        type: 'intervals',
        intervals,
        current: 2,
        merged: [[1, 6], [8, 10]],
        description: 'Inspect <code>[8, 10]</code>: <code>8 > 6</code> (no overlap). Add new non-overlapping interval <code>[8, 10]</code>.',
        vars: { overlap: false }
      });

      steps.push({
        type: 'intervals',
        intervals,
        current: 3,
        merged: [[1, 6], [8, 10], [15, 18]],
        description: 'Inspect <code>[15, 18]</code>: <code>15 > 10</code> (no overlap). Merging complete! Result: <code>[[1,6], [8,10], [15,18]]</code>.',
        vars: { resultCount: 3 }
      });

      return steps;
    }
  };

  // P16: Dynamic Programming
  PatternVisualizers['p16-dynamic-programming'] = {
    title: 'P16. Dynamic Programming (0/1 Knapsack Table)',
    generateSteps() {
      const wt = [1, 2, 3];
      const val = [6, 10, 12];
      const W = 5;
      const steps = [];

      const colLabels = ['w=0', 'w=1', 'w=2', 'w=3', 'w=4', 'w=5'];
      const rowLabels = ['item 0', 'item 1 (wt 1)', 'item 2 (wt 2)', 'item 3 (wt 3)'];
      const grid = [
        [0, 0, 0, 0, 0, 0],
        [0, 6, 6, 6, 6, 6],
        [0, 6, 10, 16, 16, 16],
        [0, 6, 10, 16, 18, 22]
      ];

      steps.push({
        type: 'dp',
        grid: grid.map((r, i) => i === 0 ? r : new Array(6).fill(0)),
        rowLabels, colLabels,
        activeRow: 0, activeCol: 0,
        description: '0/1 Knapsack: Items with (wt, val): <code>(1, 6), (2, 10), (3, 12)</code>. Max capacity = 5. Base row: 0 items = 0 value.',
        vars: { capacity: 5, items: 3 }
      });

      steps.push({
        type: 'dp',
        grid: [grid[0], grid[1], new Array(6).fill(0), new Array(6).fill(0)],
        rowLabels, colLabels,
        activeRow: 1, activeCol: 1,
        sourceCells: [[0, 1], [0, 0]],
        description: 'Item 1 (wt 1, val 6): For capacity >= 1, we can take it! Value = 6.',
        vars: { item: 1, val: 6 }
      });

      steps.push({
        type: 'dp',
        grid: [grid[0], grid[1], grid[2], new Array(6).fill(0)],
        rowLabels, colLabels,
        activeRow: 2, activeCol: 3,
        sourceCells: [[1, 3], [1, 1]],
        description: 'Item 2 (wt 2, val 10) at w=3: Take = <code>val[2] + dp[1][3 - 2] = 10 + 6 = 16</code> vs Skip = <code>dp[1][3] = 6</code>. Max = <strong>16</strong>!',
        vars: { take: 16, skip: 6, best: 16 }
      });

      steps.push({
        type: 'dp',
        grid,
        rowLabels, colLabels,
        activeRow: 3, activeCol: 5,
        sourceCells: [[2, 5], [2, 2]],
        description: 'Final cell <code>dp[3][5]</code>: Take item 3 = <code>12 + dp[2][2] = 12 + 10 = 22</code>. Optimal value is <strong>22</strong>!',
        vars: { maxKnapsackValue: 22 }
      });

      return steps;
    }
  };

  // P17: Trie
  PatternVisualizers['p17-trie'] = {
    title: 'P17. Trie (Prefix Tree Insertion & Search)',
    generateSteps() {
      const steps = [];
      steps.push({
        type: 'array',
        items: ['a', 'p', 'p', 'l', 'e'],
        pointers: { char: 0 },
        highlights: { 0: 'matched' },
        description: 'Insert word <code>"apple"</code>: Root node creates branch for letter <strong>\'a\'</strong>.',
        vars: { char: 'a', depth: 1 }
      });
      steps.push({
        type: 'array',
        items: ['a', 'p', 'p', 'l', 'e'],
        pointers: { char: 2 },
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched' },
        description: 'Follow path: \'a\' → \'p\' → \'p\'. If inserting <code>"app"</code>, mark node at 3rd letter with <code>isEndOfWord = true</code>.',
        vars: { prefix: 'app', isWord: true }
      });
      steps.push({
        type: 'array',
        items: ['a', 'p', 'p', 'l', 'e'],
        pointers: { end: 4 },
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched', 3: 'matched', 4: 'matched' },
        description: 'Complete word <code>"apple"</code> inserted! Searching <code>startsWith("app")</code> returns <strong>true</strong> in O(L) time.',
        vars: { searchPrefix: 'app', found: true }
      });
      return steps;
    }
  };

  // P18: Bit Manipulation
  PatternVisualizers['p18-bit-manipulation'] = {
    title: 'P18. Bit Manipulation (Brian Kernighan: x & (x - 1))',
    generateSteps() {
      const steps = [];
      let val = 12; // 00001100

      steps.push({
        type: 'bits',
        val,
        bitWidth: 8,
        description: 'Number <code>x = 12</code> (binary <code>00001100</code>). Brian Kernighan clears the lowest set bit in each step.',
        vars: { x: val, bitsCleared: 0 }
      });

      val = val & (val - 1); // 12 & 11 = 8 (00001000)
      steps.push({
        type: 'bits',
        val,
        bitWidth: 8,
        clearedBit: 2,
        description: '<code>x & (x - 1) = 12 & 11 = 8</code>: Lowest bit at position 2 is flipped from 1 to 0! Set bit count = 1.',
        vars: { x: val, bitsCleared: 1 }
      });

      val = val & (val - 1); // 8 & 7 = 0
      steps.push({
        type: 'bits',
        val,
        bitWidth: 8,
        clearedBit: 3,
        description: '<code>x & (x - 1) = 8 & 7 = 0</code>: Lowest bit at position 3 is cleared! Set bit count = 2.',
        vars: { x: val, bitsCleared: 2 }
      });

      steps.push({
        type: 'bits',
        val: 0,
        bitWidth: 8,
        description: '<code>x == 0</code>: Loop terminates! Number 12 has exactly <strong>2</strong> set bits. Runs in O(number of 1s).',
        vars: { totalSetBits: 2 }
      });

      return steps;
    }
  };

  // P19: String Algorithms
  PatternVisualizers['p19-string-algorithms'] = {
    title: 'P19. String Algorithms (KMP Prefix Function / LPS Array)',
    generateSteps() {
      const pattern = "ABABCABAB".split('');
      const lps = [0, 0, 1, 2, 0, 1, 2, 3, 4];
      const steps = [];

      steps.push({
        type: 'array',
        items: [...pattern],
        pointers: { i: 0 },
        highlights: {},
        description: 'Pattern: <code>"ABABCABAB"</code>. Compute Longest Prefix Suffix (LPS) array to enable O(n + m) matching without backtracking.',
        vars: { len: 0, i: 1 }
      });

      steps.push({
        type: 'array',
        items: [...pattern],
        pointers: { len: 1, i: 3 },
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched', 3: 'matched' },
        description: 'At index 3: prefix <code>"AB"</code> matches suffix <code>"AB"</code>. <code>lps[3] = 2</code>.',
        vars: { 'matchedSubstr': 'AB', 'lps[3]': 2 }
      });

      steps.push({
        type: 'array',
        items: lps,
        pointers: {},
        highlights: { 7: 'matched', 8: 'matched' },
        description: 'Complete LPS array: <code>[0, 0, 1, 2, 0, 1, 2, 3, 4]</code>. On mismatch, KMP jumps to <code>lps[j-1]</code> directly.',
        vars: { status: 'LPS COMPUTED' }
      });

      return steps;
    }
  };

  // P20: Advanced Structures
  PatternVisualizers['p20-advanced-structures'] = {
    title: 'P20. Fenwick Tree / BIT (Point Update & Prefix Query)',
    generateSteps() {
      const bit = [0, 1, 4, 5, 16, 9, 20, 11, 36];
      const steps = [];

      steps.push({
        type: 'array',
        items: bit.slice(1),
        pointers: { i: 0 },
        highlights: {},
        description: 'Fenwick Tree (1-indexed array). Point update jumps via <code>i += (i & -i)</code>; prefix query jumps via <code>i -= (i & -i)</code>.',
        vars: { operation: 'Point Update at index 3' }
      });

      steps.push({
        type: 'array',
        items: bit.slice(1),
        pointers: { jump1: 2, jump2: 3, jump3: 7 },
        highlights: { 2: 'matched', 3: 'matched', 7: 'matched' },
        description: 'To update index 3: updates tree indices 3, 4, 8! Each step adds lowest set bit. Both update and query run in O(log n).',
        vars: { indicesUpdated: '3 -> 4 -> 8', time: 'O(log n)' }
      });

      return steps;
    }
  };

  // P21: Sorting Toolbox
  PatternVisualizers['p21-sorting-toolbox'] = {
    title: 'P21. Sorting Toolbox (Quicksort Dutch Flag 3-Way Partition)',
    generateSteps() {
      const arr = [3, 5, 2, 3, 8, 3, 1];
      const steps = [];

      steps.push({
        type: 'array',
        items: [...arr],
        pointers: { pivot: 0 },
        highlights: { 0: 'active-compare' },
        description: 'Quicksort with 3-Way Partition. Pivot = <strong>3</strong>. Partitions into <code>< 3</code>, <code>== 3</code>, and <code>> 3</code> in a single pass.',
        vars: { pivot: 3 }
      });

      const partitioned = [2, 1, 3, 3, 3, 8, 5];
      steps.push({
        type: 'array',
        items: partitioned,
        pointers: { lo: 2, hi: 4 },
        highlights: { 0: 'matched', 1: 'matched', 2: 'in-window', 3: 'in-window', 4: 'in-window', 5: 'eliminated', 6: 'eliminated' },
        description: 'Partition result: <code>[2, 1]</code> < 3, <code>[3, 3, 3]</code> == 3, <code>[8, 5]</code> > 3. Recursion only needs to sort the left and right slices!',
        vars: { equalZone: '[2..4]', status: 'PARTITIONED' }
      });

      return steps;
    }
  };

  // P22: Math and Number Theory
  PatternVisualizers['p22-math-and-number-theory'] = {
    title: 'P22. Math (Sieve of Eratosthenes up to 30)',
    generateSteps() {
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
      const steps = [];

      steps.push({
        type: 'array',
        items: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        pointers: { p: 0 },
        highlights: {},
        description: 'Sieve of Eratosthenes. Start at first prime <code>p = 2</code>. Cross out all multiples of 2.',
        vars: { p: 2 }
      });

      steps.push({
        type: 'array',
        items: [2, 3, '✕', 5, '✕', 7, '✕', 9, '✕', 11, '✕', 13, '✕', 15],
        pointers: { p: 1 },
        highlights: { 0: 'matched', 2: 'eliminated', 4: 'eliminated', 6: 'eliminated', 8: 'eliminated', 10: 'eliminated', 12: 'eliminated' },
        description: 'Multiples of 2 crossed out! Next unmarked number is prime <strong>3</strong>. Cross out multiples of 3.',
        vars: { p: 3 }
      });

      steps.push({
        type: 'array',
        items: primes,
        pointers: {},
        highlights: { 0: 'matched', 1: 'matched', 2: 'matched', 3: 'matched', 4: 'matched', 5: 'matched', 6: 'matched', 7: 'matched', 8: 'matched', 9: 'matched' },
        description: `Primes found up to 30: <strong>${primes.join(', ')}</strong>. Time complexity: O(n log log n).`,
        vars: { primeCount: primes.length }
      });

      return steps;
    }
  };

  window.PatternVisualizers = PatternVisualizers;
})(window);
