# DSA All-in-One Interview Playbook (Java)

*Recognize → choose a pattern (or a combination) → derive → implement in Java → analyze. Built for coding rounds at product-based companies.*

**How to use this file.** First pass: read Part I and Part II once. Then work through Part IV patterns in priority order, typing each template from memory. Use Part V (hybrid problems) to practice *combining* patterns. During practice, keep Part I open as a lookup. Use Part VI to track mastery and plan revision.

**Importance legend (used in every pattern):** ★★★ asked constantly · ★★ common · ★ advanced / occasional · ☆ rare, learn last. **Difficulty tags:** Easy / Medium / Hard follow LeetCode's labels where a LeetCode problem is named.

**Conventions.** Java 8+ syntax (`var` and text blocks are avoided for portability). Snippets assume `import java.util.*;`. Fragments inside a pattern are *statements meant to sit inside a method* (a reusable template); anything shown as a `class` or a `static` method is self-contained. Nodes: `ListNode { int val; ListNode next; }`, `TreeNode { int val; TreeNode left, right; }`. Complexities are worst case unless marked *average* or *amortized*. "Auxiliary space" excludes the input and the required output.

## Table of Contents

**Part I: Revision dashboard**
1. [One-page quick revision](#1-one-page-quick-revision)
2. [Pattern recognition cheat table](#2-pattern-recognition-cheat-table)
3. [Pattern combination matrix](#3-pattern-combination-matrix)
4. [Constraint-driven selection guide](#4-constraint-driven-selection-guide)
5. [Complexity reference chart](#5-complexity-reference-chart)
6. [Java data structure and collection complexity chart](#6-java-data-structure-and-collection-complexity-chart)
7. [Common interview traps and edge cases](#7-common-interview-traps-and-edge-cases)

**Part II: Deriving solutions from scratch**
8. [The 10-step framework](#8-the-10-step-framework)
9. [Worked example: from brute force to a hybrid solution](#9-worked-example-from-brute-force-to-a-hybrid-solution)

**Part III: Foundations and Java reference**
10. [Complexity foundations, amortized analysis, recursion](#10-complexity-foundations-amortized-analysis-recursion)
11. [Java syntax revision](#11-java-syntax-revision)
12. [Java implementation notes](#12-java-implementation-notes)

**Part IV: Pattern library**
[P1 Two Pointers](#p1-two-pointers) · [P2 Sliding Window](#p2-sliding-window) · [P3 Prefix Sum + HashMap](#p3-prefix-sum--hashmap) · [P4 Kadane and Array Tricks](#p4-kadane-and-array-tricks) · [P5 Binary Search](#p5-binary-search) · [P6 HashMap / HashSet / Frequency](#p6-hashmap--hashset--frequency) · [P7 Stack and Monotonic Stack](#p7-stack-and-monotonic-stack) · [P8 Queue and Deque](#p8-queue-and-deque) · [P9 Linked List](#p9-linked-list) · [P10 Recursion and Divide & Conquer](#p10-recursion-and-divide--conquer) · [P11 Trees](#p11-trees-binary-tree-and-bst) · [P12 Heap / Priority Queue](#p12-heap--priority-queue) · [P13 Graphs](#p13-graphs) · [P14 Backtracking](#p14-backtracking) · [P15 Greedy and Intervals](#p15-greedy-and-intervals) · [P16 Dynamic Programming](#p16-dynamic-programming) · [P17 Trie](#p17-trie) · [P18 Bit Manipulation](#p18-bit-manipulation) · [P19 String Algorithms](#p19-string-algorithms) · [P20 Advanced Structures](#p20-advanced-structures) · [P21 Sorting Toolbox](#p21-sorting-toolbox) · [P22 Math and Number Theory](#p22-math-and-number-theory)

**Part V: Hybrid / mixed patterns**
[31 problems (H1–H31)](#part-v-hybrid--mixed-patterns-31-problems)

**Part VI: Practice and revision**
13. [Must-practice roadmap](#13-must-practice-roadmap)
14. [Pattern mastery checklist](#14-pattern-mastery-checklist)
15. [Last-minute revision](#15-last-minute-revision)
16. ["I struggle with…" revisit map](#16-i-struggle-with-revisit-map)

---

# PART I. REVISION DASHBOARD

## 1. One-page quick revision

**The 60-second routine for any problem.** (1) Restate input/output and one example. (2) Read the constraints and fix the target complexity ([§4](#4-constraint-driven-selection-guide)). (3) State the brute force and its cost. (4) Name the repeated work. (5) Match clues to a pattern ([§2](#2-pattern-recognition-cheat-table)), then verify the pattern's precondition (sorted? non-negative? monotone?). (6) Code the template. (7) Dry-run a small case and an edge case. (8) State time and auxiliary space.

**Core ideas in one line each**

| Pattern | The one idea | Template to know cold |
| --- | --- | --- |
| Two pointers | Sorted order or a symmetric structure lets each pointer move one way only | opposite ends; write pointer; Dutch flag |
| Sliding window | Contiguous range + a validity condition restored by moving `l` | longest valid / shortest valid / fixed size |
| Prefix sum | `sum(i..j) = P[j+1] − P[i]`; pair with a map for "sum equals K" | `{0:1}` seed map |
| Binary search | Any monotone predicate (false…false true…true) | lower bound; search on answer |
| HashMap / Set | Trade space for an O(1) lookup that replaces an inner loop | complement map; group by key |
| Monotonic stack/deque | Keep candidates in sorted order; pop the dominated | next greater; window max |
| Linked list | Dummy head, save `next` before rewiring, fast/slow | reverse; cycle; merge |
| Tree | DFS that returns a value about the subtree; BFS by levels | height/diameter; level order |
| Heap | Repeatedly need the min/max of a changing set | size-k heap; two heaps |
| Graph | Model nodes/edges, pick BFS / DFS / topo / Dijkstra / DSU | adjacency list; Kahn; Dijkstra |
| Backtracking | Choose → explore → un-choose, prune early | subsets; permutations |
| Greedy | Sort by the right key, then one pass; justify with exchange argument | intervals; jump game |
| DP | State + transition + base + order; compress space | knapsack; LCS; grid |
| Bits | XOR cancels pairs; masks are subsets | `x & (x−1)`; mask loop |

**Twelve templates to type from memory:** (1) binary search lower bound, (2) variable sliding window, (3) prefix-sum + HashMap, (4) monotonic stack (next greater), (5) BFS with level loop, (6) Dijkstra with a min-heap, (7) DSU with path compression, (8) Kahn's topological sort, (9) backtracking subsets/permutations, (10) 0/1 knapsack 1D, (11) LCS table, (12) Fenwick tree (if aiming at harder rounds).

**Complexity at a glance:** `n ≤ 20` → 2ⁿ · n · `n ≤ 500` → n³ · `n ≤ 5,000` → n² · `n ≤ 10⁵–10⁶` → n log n or n · `n ≥ 10⁹` → log n or O(1).

## 2. Pattern recognition cheat table

> **Clues are hypotheses, not rules.** Each row lists the *clue*, the *likely approach*, and the *check* that confirms or kills it. If the check fails, fall back to the "otherwise" column.

| Clue in the statement | Likely approach | Verify (precondition) | Otherwise think |
| --- | --- | --- | --- |
| Contiguous subarray / substring, "longest/shortest", "at most K" | Sliding window | Condition is monotone as the window grows (non-negative sums, counts) | Negatives present → prefix sums + map |
| Contiguous subarray with sum = K, range sums | Prefix sums (+ HashMap) | None; works with negatives | All non-negative → window |
| Max/min sum of a contiguous subarray | Kadane | Subarray is non-empty and contiguous | Circular / constrained length → deque on prefix sums |
| Sorted array, pair/triplet with a target | Two pointers or binary search | Array is sorted (or you may sort) | Unsorted and order must be kept → HashMap |
| Sorted, or "minimum X such that feasible", monotone yes/no | Binary search (index or answer) | Predicate flips exactly once | Non-monotone → DP/greedy |
| Repeated states, overlapping subproblems, "count ways", "min/max over choices" | DP / memoization | State is small enough; subproblems are independent | Locally safe choice provable → greedy |
| Top K, K-th, repeatedly extract min/max, streaming | Heap | Only extremes are needed, not full order | Static data → Quickselect |
| Next greater/smaller element, histogram, span | Monotonic stack | Need nearest element satisfying a comparison | Range queries with updates → segment tree |
| Min/max in a moving window | Monotonic deque | Fixed or monotone window boundaries | Sparse table if static |
| Shortest path, unweighted graph or grid, fewest steps | BFS | All edges cost the same | Weighted → Dijkstra |
| Shortest path, non-negative weights | Dijkstra (min-heap) | No negative edges | Negative edges → Bellman-Ford |
| Dependencies / prerequisites / build order | Topological sort | Directed graph; detect cycles | Undirected → DSU / DFS |
| Connectivity under unions / merging groups / "same component" | DSU (Union-Find) | Only merges (no splits) | Deletions → offline reverse or other structure |
| Connected regions in a grid / graph | DFS / BFS (or DSU) | 4/8-neighbor definition clear | |
| Explore all combinations / permutations / partitions under constraints | Backtracking with pruning | n small (≤ ~20); need all solutions | Only count/optimum → DP |
| Intervals, schedules, "minimum number of …" with a sortable rule | Sort + greedy (or heap) | An exchange argument exists | Weighted intervals → DP |
| Overlapping intervals count, "rooms/platforms" | Sweep line / heap | | |
| Range queries and point updates | Fenwick / segment tree | Operation is associative | Static queries → prefix sums / sparse table |
| Prefix search, dictionary of words, autocomplete | Trie | Many words / many prefix queries | Single exact lookup → HashSet |
| Single unique, pairs cancel, subsets of ≤ 20 items, power of two | Bit manipulation | | |
| Tree depth, diameter, path sum, LCA, validity | DFS returning a value | | Level order / views → BFS |
| Frequency, duplicates, anagram, "have I seen this" | HashMap / HashSet / count array | | |
| "Merge K sorted …" | Heap of heads | | Two lists → two pointers |
| Palindromes | Two pointers (check), center expansion, DP table | | Linear time → Manacher |
| Pattern in text, longest border, repeated substring | KMP / Z / rolling hash | | `indexOf` for simple cases |
| Cycle in a linked list / sequence, find the duplicate | Fast and slow pointers | | Hash set (extra space) |
| Matrix: rotate, spiral, set zeros | In-place index manipulation | | |
| Count pairs `i < j` with a relation between values | Merge sort / Fenwick (+ compression) | | n small → O(n²) |

## 3. Pattern combination matrix

Many problems are *two patterns glued by an invariant*. The "glue" column says what makes the combination work. IDs link to [Part V](#part-v-hybrid--mixed-patterns-31-problems).

**Pairs**

| Combination | Why they work together | Representative problems |
| --- | --- | --- |
| Prefix sums + HashMap | Prefix turns range sums into differences; the map finds a matching earlier prefix in O(1) | [H2](#h2-subarray-sum-equals-k), Contiguous Array, Subarray Sums Divisible by K |
| Sliding window + HashMap / count array | The window's validity is tracked by counts instead of recomputation | [H3](#h3-longest-substring-without-repeating-characters), [H4](#h4-minimum-window-substring), Permutation in String |
| Sliding window + monotonic deque | The deque supplies the window's max/min in O(1) | [H5](#h5-sliding-window-maximum), Longest Subarray with Limit |
| Sorting + two pointers | Sorting establishes monotone movement | [H15](#h15-3sum), 3Sum Closest, 4Sum |
| Sorting + greedy | The sort key makes the local choice safe | [H11](#h11-merge-intervals), Non-overlapping Intervals, Assign Cookies |
| Sorting + heap | Process in order, keep the best/earliest-finishing in a heap | [H12](#h12-meeting-rooms-ii), Task Scheduler, Course Schedule III |
| Binary search + greedy check | Feasibility is monotone; greedy verifies a candidate | [H24](#h24-binary-search-on-the-answer), Koko Eating Bananas, Aggressive Cows |
| Binary search + DP | DP gives the optimized transition via a sorted helper | [H1](#h1-longest-increasing-subsequence), Russian Doll Envelopes |
| Binary search + partition invariant | Cut a sorted structure so both halves are ordered | [H17](#h17-median-of-two-sorted-arrays) |
| HashMap + heap | Count, then keep the best K | [H6](#h6-top-k-frequent-elements), Top K Frequent Words |
| HashMap + DLL | O(1) lookup + O(1) reordering | LRU Cache ([P9](#p9-linked-list)) |
| Monotonic stack + index tracking | Index differences give distances/widths | [H14](#h14-daily-temperatures), [H29](#h29-maximal-rectangle), [H30](#h30-sum-of-subarray-minimums) |
| DP + set/trie lookup | DP over positions, set/trie answers "is this piece valid?" | [H7](#h7-word-break), Word Break II |
| DP + bitmask | Subset of used items becomes the state | [H28](#h28-travelling-salesperson-problem) |
| Backtracking + DP precompute | O(1) validity check prunes the search | [H23](#h23-palindrome-partitioning) |
| Graph modeling + BFS | Implicit graph, unit-cost edges | [H9](#h9-word-ladder), Rotting Oranges, Open the Lock |
| Graph + topological sort | Dependencies are directed edges; cycles detected | [H8](#h8-course-schedule-i-and-ii), Alien Dictionary |
| Graph + Dijkstra + heap | Weighted shortest path | [H10](#h10-network-delay-time), Path With Minimum Effort |
| DSU + HashMap | Map keys to ids; unions merge groups | [H20](#h20-accounts-merge), Most Stones Removed |
| Merge sort + counting | Cross-pair counts are cheap when halves are sorted | [H21](#h21-count-inversions), Reverse Pairs |
| Fenwick + coordinate compression | Counts over compressed ranks, with point updates | [H25](#h25-count-of-smaller-numbers-after-self) |
| Binary lifting + tree traversal | Jump tables give O(log n) ancestor queries | [H26](#h26-lowest-common-ancestor-single-query-vs-many-queries) |
| Tree DFS + prefix sums | A path's prefix sum is stored in a map; undo on return | Path Sum III ([P11](#p11-trees-binary-tree-and-bst)) |

**Triples**

| Combination | How the three fit | Example |
| --- | --- | --- |
| Prefix sums + monotonic deque + sliding-window logic | Prefix array makes subarray sums two-point queries; the deque keeps useful starts in increasing order; the window moves forward only | Shortest Subarray with Sum at Least K ([§9](#9-worked-example-from-brute-force-to-a-hybrid-solution)) |
| Sorting + heap + greedy | Sort by start, heap of end times, greedy choice of the earliest-ending resource | Meeting Rooms II, Minimum Number of Arrows variants |
| Binary search + prefix sums + greedy | Binary search on the answer; prefix sums or greedy check feasibility fast | Split Array Largest Sum (check via greedy), Maximum Average Subarray II |
| BFS + bitmask + visited set | State `(node, mask)` with an expanded visited table | [H31](#h31-shortest-path-visiting-all-nodes) |
| DSU + sorting + greedy | Sort edges, union when it connects components | Kruskal MST, Min Cost to Connect All Points |
| Trie + DFS + backtracking | The Trie prunes the board search | Word Search II ([P17](#p17-trie)) |
| HashMap + sliding window + deque/heap | Counts for validity, deque/heap for extremes | Longest Continuous Subarray with Abs Diff ≤ Limit |

## 4. Constraint-driven selection guide

**Input size n → feasible complexity** (about 10⁸ simple operations fit in one second in Java; assume 10⁷–10⁸ for tight judges)

| n (or n·m) | Target complexity | Typical techniques |
| --- | --- | --- |
| ≤ 10 | O(n!), O(n² · 2ⁿ) | permutations, brute-force backtracking |
| ≤ 20–25 | O(2ⁿ · n) | bitmask DP, subset backtracking, meet in the middle (n ≈ 40) |
| ≤ 100 | O(n⁴) | brute force / small DP with 4 loops |
| ≤ 500 | O(n³) | Floyd-Warshall, interval DP |
| ≤ 5,000 | O(n²) | 2D DP, pairwise loops |
| ≤ 10⁵ | O(n log n) | sorting, heap, binary search, segment tree, Dijkstra |
| ≤ 10⁶ | O(n) or O(n log n) with a small constant | prefix sums, window, hashing, sieve |
| ≤ 10⁷–10⁸ | O(n) with a tiny constant | counting arrays, bit tricks |
| ≥ 10⁹ (a value, not a length) | O(log n) or O(√n) | binary search, fast exponentiation, math |

**Other constraints that narrow the choice**

| Constraint / property | What it suggests |
| --- | --- |
| Values are small (≤ 10⁴ or alphabet 26/128) | counting arrays, DP over values, bitset |
| Values are huge or negative but only order matters | coordinate compression |
| Array is sorted or has a monotone property | binary search, two pointers |
| Non-negative numbers | sliding window on sums, Dijkstra (non-negative edges) |
| Negative numbers allowed | prefix sums + map, Bellman-Ford, Kadane variants |
| Many queries on static data | precompute: prefix sums, sparse table, binary lifting |
| Interleaved updates and queries | Fenwick, segment tree, heaps, `TreeMap` |
| Queries can be answered offline | sort queries, sweep with a growing structure |
| Stream / online input | heap, two heaps, counting, sliding structures |
| Graph is a DAG | topological order + DP |
| Graph is a tree (n − 1 edges, connected) | DFS with parent, tree DP, LCA, rerooting |
| Dense graph, n ≤ 400 | Floyd-Warshall, adjacency matrix |
| Sparse graph | adjacency lists (V + E) |
| Recursion depth could reach 10⁴–10⁵ | iterative DFS/BFS, explicit stack, bottom-up DP |
| Memory tight (e.g., 256 MB) | rolling arrays, bitsets, avoid `HashMap<Integer, Integer>` for 10⁷ keys |
| "Modulo 10⁹ + 7" | `long` arithmetic, mod after every operation |
| In-place / O(1) extra space required | two pointers, cyclic sort, XOR, Floyd, index marking |
| Answer is "yes/no" and verifying is easy | search on the answer (monotone?) |

**If the intended complexity is …** `O(log n)` → binary search/exponentiation · `O(n)` → single pass, hash, two pointers, monotonic structure · `O(n log n)` → sort first, heap, divide and conquer, Fenwick · `O(n²)` → DP table, all pairs · `O(2ⁿ)` → subsets/bitmask · `O(n!)` → permutations only.

## 5. Complexity reference chart

*(n = elements, V = vertices, E = edges, m, k = other sizes, L = string length.)*

**Sorting and searching**

| Algorithm | Time (worst) | Time (average) | Auxiliary space | Notes |
| --- | --- | --- | --- | --- |
| Binary search | O(log n) | O(log n) | O(1) | sorted/monotone input |
| Linear scan | O(n) | O(n) | O(1) | |
| Merge sort | O(n log n) | O(n log n) | O(n) | stable |
| Quicksort | O(n²) | O(n log n) | O(log n) stack | randomize pivot |
| Heap sort | O(n log n) | O(n log n) | O(1) | not stable |
| Counting / radix sort | O(n + k) / O(d(n + b)) | same | O(n + k) | integer keys |
| Quickselect | O(n²) | O(n) | O(1) | k-th element |
| Java `Arrays.sort(int[])` | O(n log n) in practice (dual-pivot quicksort) | | O(log n) | |
| Java `Arrays.sort(Object[])` / `List.sort` | O(n log n) | | O(n) | TimSort, stable |

**Graphs**

| Algorithm | Time | Space | Notes |
| --- | --- | --- | --- |
| BFS / DFS | O(V + E) | O(V) | |
| Topological sort (Kahn / DFS) | O(V + E) | O(V + E) | DAG only |
| Dijkstra (binary heap) | O((V + E) log V) | O(V + E) | non-negative weights |
| Bellman-Ford | O(V · E) | O(V) | negative edges; detects negative cycles |
| Floyd-Warshall | O(V³) | O(V²) | all pairs |
| Kruskal (sort + DSU) | O(E log E) | O(V + E) | MST |
| Prim (binary heap) | O(E log V) | O(V + E) | MST |
| DSU (rank + path compression) | O(α(n)) amortized per op | O(n) | α(n) ≤ 4 in practice |
| Tarjan bridges / articulation points | O(V + E) | O(V) | |

**Strings, trees, structures**

| Algorithm / structure | Time | Space | Notes |
| --- | --- | --- | --- |
| KMP / Z algorithm | O(n + m) | O(m) / O(n) | |
| Rabin-Karp | O(n + m) average, O(nm) worst | O(1) | hash collisions |
| Manacher | O(n) | O(n) | |
| Trie insert / search | O(L) | O(Σ L · alphabet) | |
| BST (balanced) ops | O(log n) | O(n) | `TreeMap` |
| BST (unbalanced) ops | O(n) worst | O(n) | |
| Heap push / pop / peek | O(log n) / O(log n) / O(1) | O(n) | build from array: O(n) |
| Fenwick update / query | O(log n) | O(n) | |
| Segment tree build / query / update | O(n) / O(log n) / O(log n) | O(n) | |
| Sparse table build / query | O(n log n) / O(1) | O(n log n) | idempotent ops |
| Binary lifting build / query | O(n log n) / O(log n) | O(n log n) | |

**Dynamic programming (typical)**

| Problem family | States | Time | Space (optimized) |
| --- | --- | --- | --- |
| 1D (stairs, robber, LIS-n²) | n | O(n) – O(n²) | O(1) – O(n) |
| LIS (tails + binary search) | n | O(n log n) | O(n) |
| 0/1 knapsack, subset sum | n · W | O(nW) | O(W) |
| Coin change | amount | O(amount · coins) | O(amount) |
| LCS / edit distance | m · n | O(mn) | O(min(m, n)) |
| Grid paths | m · n | O(mn) | O(n) |
| Interval DP (burst balloons) | n² | O(n³) | O(n²) |
| Bitmask DP (TSP) | 2ⁿ · n | O(2ⁿ n²) | O(2ⁿ n) |

**Recursion recurrences:** `T(n) = T(n/2) + O(1)` → O(log n) · `T(n) = T(n/2) + O(n)` → O(n) · `T(n) = 2T(n/2) + O(n)` → O(n log n) · `T(n) = 2T(n − 1)` → O(2ⁿ) · `T(n) = T(n − 1) + O(1)` → O(n).

## 6. Java data structure and collection complexity chart

| Structure | Access / get | Insert | Remove | Search / contains | Notes |
| --- | --- | --- | --- | --- | --- |
| `int[]` / arrays | O(1) | fixed size | fixed size | O(n) (O(log n) if sorted) | `length` field; zero-initialized |
| `ArrayList` | O(1) | O(1) amortized at end; O(n) in the middle | O(1) at end; O(n) elsewhere (`remove(0)` is O(n)) | O(n) | `remove(int)` vs `remove(Object)` |
| `LinkedList` | O(n) | O(1) at ends; O(1) at an iterator | O(1) at ends / iterator | O(n) | rarely the right choice; use `ArrayDeque` |
| `ArrayDeque` | O(1) at ends, no index access | O(1) amortized at ends | O(1) at ends | O(n) | **no `null` elements**; use for stack/queue/deque |
| `Stack` (legacy) | | | | | avoid: synchronized `Vector`; use `ArrayDeque` |
| `HashMap` / `HashSet` | O(1) average | O(1) average | O(1) average | O(1) average | worst case O(log n) with treeified buckets (Java 8+); iteration order unspecified |
| `LinkedHashMap` / `LinkedHashSet` | O(1) average | O(1) average | O(1) average | O(1) average | insertion order; access-order mode for LRU |
| `TreeMap` / `TreeSet` | O(log n) | O(log n) | O(log n) | O(log n) | sorted; `floor`, `ceiling`, `lower`, `higher`, `first`, `last` |
| `PriorityQueue` | `peek` O(1) | `offer` O(log n) | `poll` O(log n); `remove(Object)` O(n) | `contains` O(n) | min-heap; **iteration order is not sorted**; build from a collection is O(n) |
| `StringBuilder` | `charAt` O(1) | `append` O(1) amortized; `insert(0, …)` O(n) | `deleteCharAt(i)` O(n); `setLength` O(1) | `indexOf` O(n·m) | mutable; `reverse` O(n) |
| `String` | `charAt` O(1) | concatenation O(n) per operation | immutable | `indexOf` O(n·m) worst; `equals` O(L) | `substring` copies: O(k); `+=` in a loop is O(n²) |
| `BitSet` | O(1) | O(1) | O(1) | `nextSetBit` O(n/64) worst | compact boolean arrays |
| `Arrays.sort(int[])` | | | | | O(n log n) typical |
| `Arrays.fill`, `System.arraycopy`, `clone` | | | | | O(n) |
| `Collections.sort` / `List.sort` | | | | | O(n log n), stable |
| `Collections.reverse` / `shuffle` / `max` | | | | | O(n) |

**Equality and hashing.** `int[]`, `List<int[]>` and arrays used as `HashMap` keys use *identity* hashing: two equal arrays are different keys. Use a `String` key, `List<Integer>`, a record-like class with `equals`/`hashCode`, or `Arrays.hashCode` wrapped in a class. `Integer` compares with `.equals`, never `==` outside −128..127. `HashSet<List<Integer>>` works because `List` implements value equality.

## 7. Common interview traps and edge cases

**Edge-case checklist (run through before submitting):**
1. Empty input (`n = 0`, empty string, `null` list/tree root); a single element; two elements.
2. All elements equal; strictly increasing; strictly decreasing.
3. Duplicates (do they change counts, ordering, or uniqueness?).
4. Negative numbers and zeros (sliding windows, products, modulo, division).
5. Extremes: `Integer.MIN_VALUE`/`MAX_VALUE`, sums above 2³¹, `k = 0`, `k > n`.
6. Disconnected graphs, self-loops, parallel edges, cycles.
7. Grid: one row, one column, 1×1, blocked start or end.
8. Answer does not exist (return −1 / empty / false as specified).
9. Large input: recursion depth, quadratic hidden loops (`list.remove(0)`, `String +=`, `substring` in loops).

**Java-specific traps**

| Trap | Symptom | Fix |
| --- | --- | --- |
| `(lo + hi) / 2`, `a * b`, running sums in `int` | silent overflow | `lo + (hi - lo) / 2`, `(long) a * b`, `long sum` |
| Comparator `(x, y) -> x - y` | overflow when values are far apart | `Integer.compare(x, y)` or `Long.compare` |
| `list.remove(5)` on `List<Integer>` | removes **index** 5 | `list.remove(Integer.valueOf(5))` |
| `Integer a = 1000, b = 1000; a == b` | false | `a.equals(b)` |
| `res.add(path)` in backtracking | all results change later | `res.add(new ArrayList<>(path))` |
| `ArrayDeque.offer(null)` | `NullPointerException` | use a sentinel object / `int[]` pair |
| Iterating a `PriorityQueue` | not sorted | `poll` repeatedly |
| Mutating a collection while iterating | `ConcurrentModificationException` | iterate a copy or use an `Iterator` |
| `Arrays.asList(int[])` | produces `List<int[]>` of size 1 | use `Integer[]` or a loop |
| `Arrays.asList` / `List.of` modification | `UnsupportedOperationException` | wrap in `new ArrayList<>(…)` |
| `Arrays.fill(grid, -1)` on a 2D array | does not compile / wrong | loop over rows |
| `new List<Integer>[n]` | generic array creation error | `List<List<Integer>>` or `new List[n]` with a warning |
| `char + int` in string building | prints a number | `(char)` cast or `String.valueOf` |
| `s.split(".")` / `s.split("|")` | regex surprises | `Pattern.quote` or `split("\\.")` |
| `Math.abs(Integer.MIN_VALUE)` | still negative | use `long` |
| `Math.pow` for integer results | rounding errors | integer loop or `modPow` |
| `%` with negatives | negative result | `((x % m) + m) % m` |
| `int[] a = b` copies the reference | aliasing bugs | `b.clone()` / `Arrays.copyOf` |
| Lambda capture of a non-final variable | compile error | copy to a `final` local or use an array/holder |
| Recursion depth ≈ 10⁴–10⁵ | `StackOverflowError` | iterate, or run in `new Thread(null, runnable, "t", 1 << 28)` |
| `HashMap` iteration order assumed | wrong output ordering | `LinkedHashMap` / `TreeMap` / sort keys |
| `Scanner` for 10⁶ numbers | time limit exceeded | `BufferedReader` + `StringTokenizer` |

**Algorithm-specific traps**

| Algorithm | Classic mistake |
| --- | --- |
| Binary search | infinite loop from `lo = mid` with lower mid; wrong `hi` bound; searching a non-monotone predicate |
| Sliding window | using it with negative numbers; shrinking with `if` instead of `while`; forgetting the final window |
| Prefix sums | forgetting the `{0:1}` seed; updating the map before querying |
| BFS | marking visited on dequeue (duplicates in the queue); forgetting multi-source initialization |
| DFS on grids | recursion depth; forgetting to mark before recursing |
| Dijkstra | negative edges; `int` overflow of `dist + w`; missing stale-entry check |
| Topological sort | edge direction reversed; not detecting leftover nodes (cycle) |
| DSU | no path compression; forgetting `find` before comparing roots |
| Backtracking | not un-choosing; duplicate results (sort + `i > start && a[i] == a[i−1]`); storing live references |
| Greedy | applying it without an exchange argument; sorting by the wrong key (end vs start) |
| DP | wrong base case; wrong loop order (0/1 vs unbounded; combinations vs permutations); `INF + INF` overflow |
| Heap | max-heap vs min-heap confusion for top-K (largest K → **min**-heap of size K) |
| Linked list | losing `next` before rewiring; no dummy head; off-by-one in the "gap" technique |
| Trees | treating a one-child node as a leaf (min depth); BST validation with only local comparisons; `int` bounds with `Integer.MIN_VALUE` nodes |
| Intervals | `<` vs `<=` for touching intervals; sorting by the wrong endpoint |
| Strings | `substring` end index exclusive; case sensitivity; Unicode/alphabet size assumptions |

---

# PART II. DERIVING SOLUTIONS FROM SCRATCH

## 8. The 10-step framework

Use it out loud in the interview. Each step lists *what to do*, *the question to ask*, and *what to say*.

| # | Step | Question to ask yourself | Say aloud |
| --- | --- | --- | --- |
| 1 | **Restate** the goal, inputs, outputs | What exactly is returned? Is it a value, an index, a count, a list? One or all answers? | "So given X, I need to return Y. Let me confirm with an example." |
| 2 | **Extract constraints**; estimate acceptable complexity | What is n? Value range? Sorted? Duplicates? Negative numbers? Online or offline? | "n is up to 10⁵ so I need roughly O(n log n)." |
| 3 | **Brute force** | What is the most direct correct approach, and what does it cost? | "The simple approach checks every pair, O(n²)." |
| 4 | **Find the bottleneck** and repeated work | What do I recompute? What am I searching for in an inner loop? | "For every right end I rescan to find a left end. That scan repeats." |
| 5 | **Recognize structure**: data structure, invariant, state, monotonicity | Is there order? A monotone predicate? A dominance relation (this candidate is never better than that one)? | "If one candidate is always worse than a later one, I can discard it, which suggests a monotonic structure." |
| 6 | **Single pattern or a combination?** | Does one technique remove the bottleneck, or does it only fix part of it (e.g., a prefix sum removes the sum but not the search)? | "A prefix sum handles the range sum; I still need a fast lookup, so a hash map." |
| 7 | **Derive** the optimized algorithm and **justify** it | What invariant holds before and after each step? Why is nothing missed? | "At each step the deque holds exactly the useful starts, increasing in prefix value. Here is why a discarded one can never matter." |
| 8 | **Implement** in Java; **test** boundaries | What are the smallest, empty, extreme cases? | "Let me code it, then trace a tiny case and an edge." |
| 9 | **Analyze** time and auxiliary space | How many times does each element enter and leave? What dominates? | "Each index is pushed and popped once, so O(n) time and O(n) space." |
| 10 | **Explain** and discuss alternatives | What would I change for different constraints? | "If values were non-negative, a plain window would suffice with O(1) space." |

**Derivation toolbox (what usually removes a bottleneck)**

| Bottleneck | Typical fix |
| --- | --- |
| "Search for a partner value in an inner loop" | HashMap / sort + two pointers / binary search |
| "Recompute a range sum / count" | prefix sums, difference array, Fenwick |
| "Recompute a window's max/min/validity" | monotonic deque, counts, heap with lazy deletion |
| "Compare with all previous elements" | monotonic stack, sorted structure (`TreeMap`), DP state compression |
| "Same subproblem solved many times" | memoization / DP |
| "Try all subsets" | pruning, DP, meet in the middle, bitmask |
| "Find the best value of a parameter" | binary search on the answer |
| "Many queries" | preprocess (sparse table, lifting), offline sorting |
| "Need the extreme repeatedly" | heap |

**Proving correctness quickly.** State an *invariant* (what is true at the top of each iteration) and an *exchange/dominance* argument (why discarding something is safe). For DP, state what each cell means and why its transition covers all cases. For greedy, show that any optimal solution can be rearranged to include the greedy choice.

**Explaining complexity.** Count (a) how many times each element can enter/leave a structure (amortization), (b) the cost of each operation, (c) the number of states × transition cost for DP, (d) the recursion tree size for backtracking. Mention auxiliary space and recursion stack separately.

## 9. Worked example: from brute force to a hybrid solution

**Problem (unfamiliar-looking).** *Shortest Subarray with Sum at Least K* ([LeetCode 862](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/), Hard). Given an integer array that **may contain negatives** and an integer `k ≥ 1`, return the length of the shortest non-empty contiguous subarray with sum ≥ k, or −1.

**Step 1. Restate.** Input: `int[] a`, `int k`. Output: a length. Example: `a = [2, −1, 2]`, `k = 3` → `3` (the whole array).

**Step 2. Constraints.** Suppose `n ≤ 10⁵` and `|a[i]| ≤ 10⁵`. O(n²) is 10¹⁰: too slow. Target: O(n log n) or O(n). Sums reach 10¹⁰, so use `long`.

**Step 3. Brute force.** For each start, extend the end until the sum reaches k (the first end found is the shortest for that start).

```java
static int bruteForce(int[] a, int k) {                        // O(n^2) time, O(1) space
    int best = Integer.MAX_VALUE;
    for (int i = 0; i < a.length; i++) {
        long sum = 0;
        for (int j = i; j < a.length; j++) {
            sum += a[j];
            if (sum >= k) { best = Math.min(best, j - i + 1); break; }   // first hit = shortest for this start
        }
    }
    return best == Integer.MAX_VALUE ? -1 : best;
}
```

**Step 4. Bottleneck.** Writing `P[i]` for the prefix sums (`P[0] = 0`), a valid subarray is `a[i..j-1]` with `P[j] − P[i] ≥ k`. For each right end `j`, we search for a left end `i` with `P[i] ≤ P[j] − k`, and we want the **largest** such `i`. The brute force finds it by scanning: the repeated work is that scan.

**Step 5. First idea fails: a plain sliding window.** With non-negative numbers, extending `r` only increases the sum and shrinking `l` only decreases it, so the window is monotone. With negatives, `a[r]` may *decrease* the sum, and dropping `a[l]` may *increase* it; the two-pointer logic loses correctness. Counterexample `[2, −1, 2]`, `k = 3`: a window that shrinks at `[2, −1]` (sum 1) loses the start that the answer needs. **Conclusion:** the problem is about *prefix sums*, not raw elements.

**Step 6. Key observations (dominance).** Work with the prefix array and the indices `i < j`.
- **Observation A (discard useless starts).** If `i < j` and `P[j] ≤ P[i]`, then `i` is *never* better than `j` for any future right end: `j` is closer (shorter length) and has a smaller-or-equal prefix, so it satisfies `P[·] − P[j] ≥ k` at least as easily. So drop `i` when `j` arrives. This keeps the candidate prefixes **strictly increasing** from front to back (a monotonic deque).
- **Observation B (each start is used once).** If `P[j] − P[i] ≥ k`, then `i` has produced the shortest valid subarray it ever will (any later right end is farther away). So pop `i` from the front once it succeeds.

**Step 7. Single pattern or a combination?** Prefix sums alone do not give the lookup. The "find the best left end" needs a structure with fast removal from both ends → **monotonic deque**. The result is a hybrid: *prefix sums* (to cope with negatives) + *monotonic deque* (dominance pruning) + *sliding-window-style one-way movement* (front pops are final).

**Step 8. Implementation.**

```java
static int shortestSubarray(int[] a, int k) {                  // O(n) time, O(n) space
    int n = a.length;
    long[] pre = new long[n + 1];
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + a[i];
    Deque<Integer> dq = new ArrayDeque<>();                    // candidate left indices; pre[] strictly increasing
    int best = Integer.MAX_VALUE;
    for (int j = 0; j <= n; j++) {
        while (!dq.isEmpty() && pre[j] - pre[dq.peekFirst()] >= k)
            best = Math.min(best, j - dq.pollFirst());         // Observation B: front is used once, then dropped
        while (!dq.isEmpty() && pre[dq.peekLast()] >= pre[j])
            dq.pollLast();                                     // Observation A: dominated by j
        dq.offerLast(j);
    }
    return best == Integer.MAX_VALUE ? -1 : best;
}
```

**Dry run.** `a = [2, −1, 2]`, `k = 3`, so `P = [0, 2, 1, 3]`.

| j | P[j] | front pops (P[j] − P[front] ≥ 3?) | back pops (P[back] ≥ P[j]?) | deque after (indices) |
| --- | --- | --- | --- | --- |
| 0 | 0 | none | none | [0] |
| 1 | 2 | 2 − 0 = 2 < 3 | P[0] = 0 < 2 | [0, 1] |
| 2 | 1 | 1 − 0 = 1 < 3 | P[1] = 2 ≥ 1 → pop 1 | [0, 2] |
| 3 | 3 | 3 − 0 = 3 ≥ 3 → best = 3 − 0 = 3, pop 0; then 3 − 1 = 2 < 3 | P[2] = 1 < 3 | [2, 3] |

Answer: **3**. Index 1 (prefix 2) was discarded by Observation A when prefix 1 arrived: starting at index 2 is shorter and has the smaller prefix.

**Step 9. Complexity.** Each index is pushed once and popped at most once (front or back): O(n) time amortized. The prefix array and deque take O(n) auxiliary space (can't be reduced below O(n) easily because the deque holds indices).

**Step 10. Explain to the interviewer.** "Because the array can contain negatives, a normal sliding window does not work, so I switch to prefix sums: I need `P[j] − P[i] ≥ k` with the largest valid `i`. I keep a deque of candidate left indices whose prefix values are strictly increasing, since a later index with a smaller-or-equal prefix always dominates an earlier one. When the front satisfies the condition, I record the length and pop it, because later right ends can only make it longer. Each index enters and leaves the deque once, so it is O(n) time and O(n) space."

**Edge cases tested.** `[1]`, `k = 1` → 1; `[1, 2]`, `k = 4` → −1; `[−5]`, `k = 1` → −1; `[84, −37, 32, 40, 95]`, `k = 167` → 3. The solution was also cross-checked against the brute force on 20,000 random small arrays.

**What changes if constraints change?** All non-negative values → plain sliding window, O(1) space. `n ≤ 5,000` → the brute force suffices. If asked for the *longest* subarray with sum ≥ k → different dominance logic (keep the smallest prefix on the left, binary search or a monotone stack of prefix minima).

**Lesson.** The route was: brute force → name the repeated search → show the obvious pattern (window) fails and *why* → reformulate with prefix sums → discover dominance → pick the data structure that supports exactly the two removals (monotonic deque). Practice this route on the problems in [Part V](#part-v-hybrid--mixed-patterns-31-problems).

---

# PART III. FOUNDATIONS AND JAVA REFERENCE

## 10. Complexity foundations, amortized analysis, recursion

**Big-O in practice.** Drop constants and lower-order terms, but keep *which variable* each term depends on (`O(V + E)`, `O(n · m)`). Worst case is the default in interviews; say "average" explicitly for hash tables and Quickselect. Space: report **auxiliary** space and mention the recursion stack separately (DFS on a skewed tree uses O(h) stack, O(n) in the worst case).

**Counting loops.** Nested loops multiply only when the inner bound is independent of the outer. In sliding window and two-pointer code, the inner `while` moves a pointer that never moves backward, so the total is O(n), not O(n²). Likewise, a monotonic stack's inner `while` pops each element at most once.

**Amortized analysis.** The cost of an operation averaged over a worst-case *sequence*. Standard examples: `ArrayList.add` (doubling → O(1) amortized), monotonic stack/deque (each element pushed and popped once → O(1) amortized per element), DSU with path compression (α(n) amortized), `StringBuilder.append`. Amortized ≠ average: it holds for *every* sequence, with no randomness assumed. Individual operations can still be slow (an `ArrayList` resize is O(n)).

**Recursion vs iteration.** Recursion expresses divide-and-conquer, tree and backtracking logic clearly; each call costs stack space (Java's default limit is roughly 10⁴–10⁵ frames, depending on frame size). Convert to iteration for deep structures (linked-list-shaped trees, long paths, grids of 10⁵ cells) using an explicit `Deque` or by making the DP bottom-up. Tail-call optimization does **not** exist in Java.

**Recurrence cheat sheet.** `T(n) = aT(n/b) + O(n^d)`: if `d > log_b a` → O(n^d); if `d = log_b a` → O(n^d log n); if `d < log_b a` → O(n^(log_b a)). Examples: merge sort (a = 2, b = 2, d = 1) → O(n log n); binary search → O(log n); Quickselect average → O(n).

**Common Java complexity traps**
- `String +=` in a loop → O(n²); use `StringBuilder`.
- `list.remove(0)` / `list.add(0, x)` on `ArrayList` → O(n); use `ArrayDeque`.
- `list.contains(x)` → O(n); use a `HashSet`.
- `s.substring(i, j)` copies O(j − i); `s.charAt(i)` is O(1); `sb.insert(0, c)` is O(n).
- Autoboxing: `Map<Integer, Integer>` with 10⁷ entries uses gigabytes; prefer arrays when keys are small ints.
- Recomputing `s.length()` or `list.size()` is O(1), but `Collections.max(list)` inside a loop is O(n) per call.
- Sorting inside a loop; `new int[26]` allocation per iteration (acceptable but measure); `String.valueOf` in a hot loop.
- `PriorityQueue.remove(Object)` and `contains` are O(n).
- Recursion with memo using `HashMap<String, …>` where the key construction costs O(n): the effective complexity is states × key cost.

## 11. Java syntax revision

### 11.1 Boilerplate and fast input

```java
import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        sc.nextLine();                 // eat leftover newline before reading a line
        String line = sc.nextLine();
        System.out.println(solve(a));
    }
    static int solve(int[] a) { return 0; }
}

// Fast input for big n
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
int n = Integer.parseInt(br.readLine().trim());
StringTokenizer st = new StringTokenizer(br.readLine());
for (int i = 0; i < n; i++) a[i] = Integer.parseInt(st.nextToken());

System.out.printf("%d %.2f%n", x, y);       // formatted print
StringBuilder out = new StringBuilder();     // many lines of output
out.append(x).append('\n');
System.out.print(out);
```

On LeetCode-style tests you only write the method inside `class Solution`. Keep `import java.util.*;` at the top.

### 11.2 Primitives, math, traps

```java
int  long  double  char  boolean          // long x = 5L;
Integer.MAX_VALUE   // 2147483647 (~2.1e9)     Integer.MIN_VALUE     Long.MAX_VALUE
int mid = lo + (hi - lo) / 2;             // not (lo+hi)/2 with big values
long prod = (long) a * b;                 // cast BEFORE multiplying
((x % m) + m) % m                         // non-negative mod
5 / 2 == 2     -5 / 2 == -2     -5 % 2 == -1     5 / 2.0 == 2.5
Math.abs(Integer.MIN_VALUE) < 0           // overflow trap
Math.max  Math.min  Math.pow(double)  Math.sqrt  Math.ceil  Math.floor  Math.floorMod(a, m)
(a + b - 1) / b                           // ceil division for positive ints
char c = 'a';   c - 'a' // 0..25    (char)(c + 1)    c - '0' // digit value
Character.isDigit / isLetter / isLetterOrDigit / toUpperCase / toLowerCase
Integer p = 1000, q = 1000;   p.equals(q)  // NEVER == for Integer or String
int INF = Integer.MAX_VALUE / 2;          // safe when adding two INFs
```

### 11.3 Arrays

```java
int[] a = new int[5];  int[] b = {1, 2, 3};  int[][] g = new int[m][n];
Arrays.fill(a, -1);              Arrays.sort(a);          Arrays.sort(a, from, toExclusive);
Arrays.toString(a);              Arrays.deepToString(g);  Arrays.equals(x, y);
int[] c = Arrays.copyOf(a, n);   int[] d = Arrays.copyOfRange(a, l, rExclusive);
int[] e = a.clone();             // shallow; a 2D array needs a loop
Arrays.stream(a).sum();          Arrays.stream(a).max().getAsInt();
System.arraycopy(src, srcPos, dst, dstPos, len);
Arrays.binarySearch(a, key);     // sorted only; if missing -> -(insertionPoint) - 1
a.length (array)     s.length() (String)     list.size() (collection)

// sort 2D by first column. Use Integer.compare, NOT x[0]-y[0] (overflow)
Arrays.sort(iv, (x, y) -> Integer.compare(x[0], y[0]));
// descending needs a boxed type
Integer[] boxed = {3, 1, 2};  Arrays.sort(boxed, Collections.reverseOrder());
// int[] <-> List<Integer>
int[] arr = list.stream().mapToInt(Integer::intValue).toArray();
List<Integer> lst = new ArrayList<>(); for (int v : a) lst.add(v);
```

### 11.4 String and StringBuilder

```java
s.length()  s.charAt(i)  s.substring(i, jExclusive)  s.substring(i)
s.indexOf("ab")  s.indexOf('a', from)  s.lastIndexOf  s.contains  s.startsWith  s.endsWith
s.equals(t)  s.equalsIgnoreCase(t)  s.compareTo(t)  s.isEmpty()  s.trim()
s.toCharArray()   new String(chars)   String.valueOf(chars)   String.valueOf(5)   s.toLowerCase()
s.replace("a", "b")   s.split(" ")   String.join(",", list)   s.repeat(3)
Integer.parseInt("123")   Integer.toString(5)   Integer.toBinaryString(5)   Long.parseLong

// Strings are immutable -> build with StringBuilder
StringBuilder sb = new StringBuilder();
sb.append(x);  sb.insert(0, 'c');  sb.reverse();  sb.setCharAt(i, 'x');
sb.deleteCharAt(sb.length() - 1);  sb.setLength(sb.length() - 1);  sb.length();  sb.toString();

// anagram key
char[] ch = s.toCharArray(); Arrays.sort(ch); String key = new String(ch);
// frequency array for lowercase letters
int[] freq = new int[26]; for (char c : s.toCharArray()) freq[c - 'a']++;
```

### 11.5 Collections

```java
// ---- List
List<Integer> list = new ArrayList<>();
list.add(5); list.add(0, 9); list.get(0); list.set(0, 7); list.size(); list.contains(5);
list.remove(list.size() - 1);          // by index
list.remove(Integer.valueOf(5));       // by VALUE (list.remove(5) removes INDEX 5!)
Collections.sort(list);  Collections.sort(list, (x, y) -> Integer.compare(y, x));  Collections.reverse(list);
Collections.max(list);   Collections.swap(list, i, j);  List.of(1, 2, 3);  Arrays.asList(1, 2, 3);
res.add(new ArrayList<>(path));        // ALWAYS copy a path before storing it

// ---- Stack / Queue / Deque: use ArrayDeque (not Stack, not LinkedList)
Deque<Integer> st = new ArrayDeque<>();
st.push(x); st.pop(); st.peek(); st.isEmpty();                 // top = front
Queue<Integer> q = new ArrayDeque<>();
q.offer(x); q.poll(); q.peek(); q.size();                      // poll/peek return null when empty
Deque<Integer> dq = new ArrayDeque<>();
dq.offerFirst(x); dq.offerLast(x); dq.pollFirst(); dq.pollLast(); dq.peekFirst(); dq.peekLast();

// ---- PriorityQueue (min-heap by default)
PriorityQueue<Integer> minH = new PriorityQueue<>();
PriorityQueue<Integer> maxH = new PriorityQueue<>(Collections.reverseOrder());
PriorityQueue<int[]> pq = new PriorityQueue<>((x, y) -> Integer.compare(x[1], y[1]));   // order by 2nd element
pq.offer(v); pq.poll(); pq.peek(); pq.size();

// ---- Map / Set
Map<String, Integer> map = new HashMap<>();
map.put(k, v);  map.get(k);  map.getOrDefault(k, 0);  map.containsKey(k);  map.remove(k);  map.putIfAbsent(k, v);
map.merge(k, 1, Integer::sum);                              // counting
map.computeIfAbsent(k, z -> new ArrayList<>()).add(v);      // grouping / adjacency list
for (Map.Entry<String, Integer> e : map.entrySet()) { e.getKey(); e.getValue(); }
map.keySet(); map.values();
Set<Integer> set = new HashSet<>();  set.add(v) /* false if present */;  set.contains(v);  set.remove(v);

// ---- TreeMap / TreeSet (sorted, O(log n))
TreeMap<Integer, Integer> tm = new TreeMap<>();
tm.firstKey(); tm.lastKey(); tm.floorKey(v) /* <= v */; tm.ceilingKey(v) /* >= v */;
tm.lowerKey(v) /* < v */; tm.higherKey(v) /* > v */; tm.pollFirstEntry();
TreeSet<Integer> ts = new TreeSet<>();  ts.first(); ts.last(); ts.floor(v); ts.ceiling(v);

// LinkedHashMap keeps insertion order (access-order mode = LRU, see P9)
```

### 11.6 Handy snippets

```java
class ListNode { int val; ListNode next; ListNode(int v) { val = v; } }
class TreeNode { int val; TreeNode left, right; TreeNode(int v) { val = v; } }
int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};              // 4-directional grid moves
static void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }
static void reverse(int[] a, int l, int r) { while (l < r) swap(a, l++, r--); }
boolean inGrid = x >= 0 && y >= 0 && x < m && y < n;
int mx = (a > b) ? a : b;        outer: for (...) { for (...) { if (c) break outer; } }
// Lambda parameter names cannot reuse an existing local variable's name.
// Pair of ints: use int[]{a, b} inside queues / PQs, or a tiny class.
```

## 12. Java implementation notes

**Arrays vs collections.** Prefer primitive arrays (`int[]`, `boolean[]`, `long[]`) when the size is known or bounded: no boxing, better cache behavior, 4 bytes per `int`. Use `ArrayList<Integer>` when the size is dynamic; convert at the end (`list.stream().mapToInt(Integer::intValue).toArray()`). A `Map<Integer, Integer>` costs several times the memory of an `int[]` and is slower; replace it with an array when keys are small and dense (counts of letters, values ≤ 10⁶). `List<List<Integer>>` for adjacency lists is fine up to ~10⁶ edges; for tighter limits use arrays (`head[]`, `next[]`, `to[]`).

**Pairs and tuples.** `int[]{a, b}` is the quickest pair inside queues and heaps. For `Set`/`Map` keys use a `String` key (`a + "," + b`), a `long` encoding (`(long) a * M + b`), or a small class with `equals`/`hashCode`. Never use `int[]` directly as a key (identity semantics).

**Comparators.**

```java
PriorityQueue<int[]> pq = new PriorityQueue<>((x, y) -> Integer.compare(x[1], y[1]));      // by 2nd field
PriorityQueue<int[]> pq2 = new PriorityQueue<>(
    Comparator.<int[]>comparingInt(x -> x[1]).thenComparingInt(x -> x[0]));                 // tie-break
Arrays.sort(intervals, Comparator.comparingInt(x -> x[0]));                                 // int[][]
Integer[] boxed = ...; Arrays.sort(boxed, Collections.reverseOrder());                      // descending
List<String> words = ...; words.sort(Comparator.comparing(String::length).thenComparing(Comparator.naturalOrder()));
```

Never write `x - y` for ints or `(int) (a - b)` for longs. Comparators must be consistent (a total order); inconsistent ones can throw `IllegalArgumentException: Comparison method violates its general contract!` in TimSort.

**Generics.** No `new T[n]` and no `new List<Integer>[n]`; use `List<List<Integer>>`, or `List<Integer>[] g = new List[n];` (unchecked warning, works). Primitives cannot be type arguments (`Map<int, …>` does not compile). Autoboxing creates objects: `Integer` values outside −128..127 are distinct objects, so compare with `equals`.

**Integer overflow.** `int` wraps silently at ±2³¹. Use `long` for sums, products, prefix sums, and `dist + weight`. Cast *before* the operation: `(long) a * b`. Prefer `Math.addExact` / `Math.multiplyExact` while debugging (they throw). `Integer.MAX_VALUE + 1 == Integer.MIN_VALUE`. For sentinels, use `Integer.MAX_VALUE / 2` (or `Long.MAX_VALUE / 4`) when two sentinels may be added.

**Recursion depth.** Default stack handles roughly 10⁴ frames (less with large frames). If depth may hit 10⁵: write the DFS/BFS iteratively, or run the solution on a thread with a larger stack:

```java
public static void main(String[] args) throws Exception {
    Thread t = new Thread(null, () -> { solve(); }, "solver", 1L << 28);   // 256 MB stack
    t.start();
    t.join();
}
static void solve() { /* recursive code */ }
```

**Empty and boundary inputs.** Guard at the top: `if (a == null || a.length == 0) return …;`. For trees and lists, handle `null` first. For matrices use `m = g.length`, `n = m == 0 ? 0 : g[0].length`. For windows check `k <= n`. For binary search, decide the invariant (`[lo, hi]` inclusive vs `[lo, hi)` half-open) once and keep it consistent. For `substring`, remember the end index is exclusive.

**Strings and characters.** `char` arithmetic yields `int`: `char c = (char) (c + 1)`. `c - '0'` converts a digit; `c - 'a'` indexes a lower-case alphabet. Use `new String(charArray)` or `String.valueOf(charArray)`, not `charArray.toString()`. `StringBuilder.reverse()`, `setLength(len - 1)` for pop, `deleteCharAt(sb.length() - 1)` also works. Build strings with `StringBuilder`, join with `String.join(",", list)`.

**Output and input speed.** `Scanner` is fine for small input; use `BufferedReader` + `StringTokenizer` for ≥ 10⁵ numbers, and `StringBuilder`/`PrintWriter` for many output lines. Competitive-judge templates need `public class Main`; interview platforms such as LeetCode need only the method inside `class Solution`.

**Testing habit.** Write the signature, then three tests before coding: a normal case, the smallest case, and a tricky case (duplicates / negatives / no answer). Trace the template on the smallest one.

---

# PART IV. PATTERN LIBRARY

**Study order by importance.** ★★★ first: P1 Two Pointers, P2 Sliding Window, P3 Prefix Sum, P5 Binary Search, P6 HashMap, P7 Stack, P9 Linked List, P11 Trees, P12 Heap, P13 Graphs, P14 Backtracking, P15 Greedy, P16 DP. Then ★★: P4, P8, P10, P17, P18, P19 (hashing/palindromes), P21, P22. Then ★ and ☆: P20 and the advanced parts of P19.

**Each pattern has:** the trick (definition and intuition), a **pattern card** (recognition clues and counterexamples, brute force → optimized, invariant, complexity, common bugs, follow-ups, difficulty-tagged practice), then Java templates and the existing problem list. Fragments are templates to place inside a method; classes and `static` methods are self-contained. Cross-references: hybrid problems are in [Part V](#part-v-hybrid--mixed-patterns-31-problems).

## P1. Two Pointers

**Trick:** two indexes walking an array so each element is visited O(1) times. Opposite ends (sorted, palindrome, area), same direction (write-pointer compacts in place), or 3 zones (Dutch flag). Not sorted and you need pairs? Use a HashMap instead.

**Importance: ★★★.** **Pattern card**

- **Recognize:** sorted array with a pair/triplet target; in-place compaction or partition; palindromes; merging sorted sequences. **Not this:** unsorted input where original indices matter → HashMap (Two Sum).
- **Brute force → optimized:** all pairs O(n²) → one pass O(n) (plus O(n log n) if you must sort), because each pointer only moves one way.
- **Invariant:** opposite ends: no answer exists outside `[l, r]`. Write pointer: `a[0..w)` holds the kept elements. Dutch flag: `[0,lo)` = 0s, `[lo,mid)` = 1s, `(hi,n)` = 2s.
- **Complexity:** O(n) time after sorting, O(1) auxiliary space.
- **Common bugs:** not skipping duplicates in 3Sum; moving the wrong pointer on a tie; `mid++` after swapping with `hi` in Dutch flag; `l < r` vs `l <= r`.
- **Follow-ups:** generalize to kSum; solve without sorting (hash set); return indices instead of values.
- **Practice:** *Easy* Valid Palindrome · Move Zeroes · Merge Sorted Array · Remove Duplicates from Sorted Array. *Medium* 3Sum ([H15](#h15-3sum)) · Container With Most Water · Sort Colors · 3Sum Closest · 4Sum. *Hard* Trapping Rain Water ([H13](#h13-trapping-rain-water)).

```java
// A) Opposite ends: Two Sum II (sorted)
int l = 0, r = n - 1;
while (l < r) {
    int s = a[l] + a[r];
    if (s == target) return new int[]{l + 1, r + 1};
    if (s < target) l++; else r--;
}

// B) Same direction write-pointer: Move Zeroes / Remove Duplicates
int w = 0;
for (int i = 0; i < n; i++) if (a[i] != 0) a[w++] = a[i];
while (w < n) a[w++] = 0;
// Remove duplicates (sorted): if (i == 0 || a[i] != a[i - 1]) a[w++] = a[i];

// C) Dutch National Flag: Sort Colors (0,1,2)
int lo = 0, mid = 0, hi = n - 1;
while (mid <= hi) {
    if (a[mid] == 0) swap(a, lo++, mid++);
    else if (a[mid] == 1) mid++;
    else swap(a, mid, hi--);          // do NOT mid++ here
}

// 3Sum: sort, fix i, two pointers on the rest, skip duplicates
Arrays.sort(a);
List<List<Integer>> res = new ArrayList<>();
for (int i = 0; i < n - 2; i++) {
    if (i > 0 && a[i] == a[i - 1]) continue;
    int l = i + 1, r = n - 1;
    while (l < r) {
        int s = a[i] + a[l] + a[r];
        if (s == 0) {
            res.add(Arrays.asList(a[i], a[l], a[r]));
            while (l < r && a[l] == a[l + 1]) l++;
            while (l < r && a[r] == a[r - 1]) r--;
            l++; r--;
        } else if (s < 0) l++; else r--;
    }
}

// Container With Most Water: always move the shorter wall
int l = 0, r = n - 1, best = 0;
while (l < r) {
    best = Math.max(best, Math.min(h[l], h[r]) * (r - l));
    if (h[l] < h[r]) l++; else r--;
}

// Trapping Rain Water: water at i = min(maxLeft, maxRight) - h[i]; process the smaller side
int l = 0, r = n - 1, lMax = 0, rMax = 0, water = 0;
while (l < r) {
    if (h[l] < h[r]) { lMax = Math.max(lMax, h[l]); water += lMax - h[l]; l++; }
    else             { rMax = Math.max(rMax, h[r]); water += rMax - h[r]; r--; }
}

// Merge Sorted Array (nums1 has trailing space): fill from the BACK
int i = m - 1, j = n - 1, k = m + n - 1;
while (j >= 0) nums1[k--] = (i >= 0 && nums1[i] > nums2[j]) ? nums1[i--] : nums2[j--];
```

**Problems:** Two Sum II · 3Sum (sort + skip dups) · 3Sum Closest · 4Sum (one more outer loop) · Container With Most Water · Trapping Rain Water · Sort Colors · Move Zeroes · Remove Duplicates from Sorted Array · Valid Palindrome (skip non-alphanumerics, compare ends) · Valid Palindrome II (on mismatch, try skipping either side once) · Merge Sorted Array · Squares of a Sorted Array (fill result from the back with the larger abs) · Reverse String · Sort Array By Parity.

## P2. Sliding Window

**Trick:** window \[l..r\] over a contiguous subarray or substring. Expand r every step; while the window is invalid, shrink l. Fixed size k: add a\[i\], drop a\[i-k\]. Sum-based shrinking needs non-negative numbers (with negatives use P3). 'Exactly K' = atMost(K) − atMost(K−1).

**Importance: ★★★.** **Pattern card**

- **Recognize:** contiguous subarray/substring + "longest", "shortest", "at most K", "exactly K", counts with a condition. **Not this:** negative numbers in a sum condition (use [P3](#p3-prefix-sum--hashmap)); subsequences (DP).
- **Brute force → optimized:** enumerate all windows O(n²)–O(n³) → O(n), since each element enters and leaves the window once.
- **Invariant:** the window state describes exactly `a[l..r]`. "Longest": the window is valid after the shrink loop. "Shortest": record the answer *while* valid, before shrinking.
- **Complexity:** O(n) time; O(1) to O(alphabet) or O(k) space.
- **Common bugs:** `if` instead of `while` when shrinking; not updating state when removing `a[l]`; using a sum window with negatives; "exactly K" without `atMost(K) − atMost(K−1)`; forgetting to record after the loop.
- **Follow-ups:** track max/min inside the window ([H5](#h5-sliding-window-maximum)); streaming input; count (not just length) of valid windows.
- **Practice:** *Easy* Maximum Average Subarray I. *Medium* Longest Substring Without Repeating Characters ([H3](#h3-longest-substring-without-repeating-characters)) · Longest Repeating Character Replacement · Permutation in String · Minimum Size Subarray Sum · Fruit Into Baskets · Max Consecutive Ones III. *Hard* Minimum Window Substring ([H4](#h4-minimum-window-substring)) · Sliding Window Maximum ([H5](#h5-sliding-window-maximum)) · Substring with Concatenation of All Words.

```java
// Fixed size k: max sum
int sum = 0, best = Integer.MIN_VALUE;
for (int i = 0; i < n; i++) {
    sum += a[i];
    if (i >= k) sum -= a[i - k];
    if (i >= k - 1) best = Math.max(best, sum);
}

// Variable window, LONGEST valid (template)
int l = 0, best = 0;
for (int r = 0; r < n; r++) {
    // add a[r] to window state
    while (/* window invalid */) { /* remove a[l] from state */ l++; }
    best = Math.max(best, r - l + 1);
}

// Longest Substring Without Repeating Characters
int[] cnt = new int[128]; int l = 0, best = 0;
for (int r = 0; r < s.length(); r++) {
    cnt[s.charAt(r)]++;
    while (cnt[s.charAt(r)] > 1) cnt[s.charAt(l++)]--;
    best = Math.max(best, r - l + 1);
}

// Max Consecutive Ones III: longest window with at most k zeros
int l = 0, zeros = 0, best = 0;
for (int r = 0; r < n; r++) {
    if (a[r] == 0) zeros++;
    while (zeros > k) if (a[l++] == 0) zeros--;
    best = Math.max(best, r - l + 1);
}

// Variable window, SHORTEST valid: Minimum Size Subarray Sum (positives)
int l = 0, sum = 0, best = Integer.MAX_VALUE;
for (int r = 0; r < n; r++) {
    sum += a[r];
    while (sum >= target) { best = Math.min(best, r - l + 1); sum -= a[l++]; }
}
return best == Integer.MAX_VALUE ? 0 : best;

// Longest Repeating Character Replacement (valid if size - maxFreq <= k)
int[] cnt = new int[26]; int l = 0, maxF = 0, best = 0;
for (int r = 0; r < n; r++) {
    maxF = Math.max(maxF, ++cnt[s.charAt(r) - 'A']);
    while ((r - l + 1) - maxF > k) cnt[s.charAt(l++) - 'A']--;
    best = Math.max(best, r - l + 1);
}

// Minimum Window Substring
int[] need = new int[128];
for (char c : t.toCharArray()) need[c]++;
int missing = t.length(), l = 0, bestL = 0, bestLen = Integer.MAX_VALUE;
for (int r = 0; r < s.length(); r++) {
    if (need[s.charAt(r)]-- > 0) missing--;
    while (missing == 0) {
        if (r - l + 1 < bestLen) { bestLen = r - l + 1; bestL = l; }
        if (++need[s.charAt(l++)] > 0) missing++;
    }
}
return bestLen == Integer.MAX_VALUE ? "" : s.substring(bestL, bestL + bestLen);

// At most K distinct (Fruit Into Baskets = k 2). Counts valid subarrays ending at r.
int atMost(int[] a, int k) {
    Map<Integer, Integer> m = new HashMap<>(); int l = 0, res = 0;
    for (int r = 0; r < a.length; r++) {
        m.merge(a[r], 1, Integer::sum);
        while (m.size() > k) { if (m.merge(a[l], -1, Integer::sum) == 0) m.remove(a[l]); l++; }
        res += r - l + 1;
    }
    return res;
}
// Subarrays with exactly K distinct = atMost(a, k) - atMost(a, k - 1)

// Permutation in String / Find All Anagrams: fixed window + count arrays
int[] need = new int[26], win = new int[26];
for (char c : p.toCharArray()) need[c - 'a']++;
for (int i = 0; i < s.length(); i++) {
    win[s.charAt(i) - 'a']++;
    if (i >= p.length()) win[s.charAt(i - p.length()) - 'a']--;
    if (Arrays.equals(need, win)) res.add(i - p.length() + 1);
}

// Sliding Window Maximum: monotonic decreasing deque of INDICES
Deque<Integer> dq = new ArrayDeque<>();
int[] res = new int[n - k + 1];
for (int i = 0; i < n; i++) {
    while (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();      // out of window
    while (!dq.isEmpty() && a[dq.peekLast()] <= a[i]) dq.pollLast();     // smaller can never win
    dq.offerLast(i);
    if (i >= k - 1) res[i - k + 1] = a[dq.peekFirst()];
}
```

**Problems:** Max Sum Subarray of Size K · Longest Substring Without Repeating · Longest Repeating Character Replacement · Minimum Window Substring · Permutation in String · Find All Anagrams · Fruit Into Baskets · Max Consecutive Ones III · Minimum Size Subarray Sum · Subarray Product Less Than K (product < k, `res += r-l+1`, shrink with division) · Subarrays with K Different Integers · Longest Substring with At Most K Distinct · Sliding Window Maximum · Substring with Concatenation of All Words (window over word-sized steps).

## P3. Prefix Sum + HashMap

**Trick:** prefix\[j\] − prefix\[i\] = sum of a\[i..j-1\]. 'Subarray with sum K' becomes 'have I seen prefix − K before?'. Seed the map with {0: 1} for the empty prefix. Works with negatives (sliding window does not).

**Importance: ★★★.** **Pattern card**

- **Recognize:** "subarray sum equals / divisible by K", "range sum queries", "equal numbers of 0s and 1s", negatives allowed, many range queries on static data.
- **Brute force → optimized:** O(n²) pairs (or O(n) per query) → O(n) preprocessing, O(1) per query, or one pass with a map.
- **Invariant:** before processing index `i`, the map holds counts (or first indices) of every prefix of the elements already processed.
- **Complexity:** O(n) time, O(n) space; static range queries are O(1) after the O(n) build.
- **Common bugs:** missing the `{0: 1}` seed; updating the map before querying; negative remainders; `int` overflow of the running sum; using counts when the problem wants the *longest* (store first index).
- **Follow-ups:** 2D prefix sums; difference arrays for range updates; "at most K" with non-negatives → window; online updates → Fenwick ([P20](#p20-advanced-structures)).
- **Practice:** *Easy* Find Pivot Index · Range Sum Query - Immutable. *Medium* Subarray Sum Equals K ([H2](#h2-subarray-sum-equals-k)) · Contiguous Array · Subarray Sums Divisible by K · Continuous Subarray Sum · Product of Array Except Self. *Hard* Shortest Subarray with Sum at Least K ([§9](#9-worked-example-from-brute-force-to-a-hybrid-solution)) · Count of Range Sum.

```java
// Subarray Sum Equals K (count)
Map<Integer, Integer> seen = new HashMap<>();
seen.put(0, 1);
int sum = 0, count = 0;
for (int x : a) {
    sum += x;
    count += seen.getOrDefault(sum - k, 0);
    seen.merge(sum, 1, Integer::sum);
}

// Longest subarray with sum K: store FIRST index of each prefix
Map<Integer, Integer> first = new HashMap<>();
first.put(0, -1);
int sum = 0, best = 0;
for (int i = 0; i < n; i++) {
    sum += a[i];
    if (first.containsKey(sum - k)) best = Math.max(best, i - first.get(sum - k));
    first.putIfAbsent(sum, i);
}

// Subarray Sum Divisible by K: key is the remainder (make it non-negative)
int[] cnt = new int[k]; cnt[0] = 1; int sum = 0, res = 0;
for (int x : a) {
    sum = ((sum + x) % k + k) % k;
    res += cnt[sum]++;
}

// Product of Array Except Self (no division): prefix pass, then suffix pass
int[] res = new int[n]; res[0] = 1;
for (int i = 1; i < n; i++) res[i] = res[i - 1] * a[i - 1];
int right = 1;
for (int i = n - 1; i >= 0; i--) { res[i] *= right; right *= a[i]; }

// Prefix array + range query
int[] pre = new int[n + 1];
for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + a[i];
// sum(l..r) = pre[r + 1] - pre[l]

// 2D prefix (Range Sum Query 2D, Matrix Block Sum)
for (int i = 0; i < m; i++) for (int j = 0; j < n; j++)
    p[i + 1][j + 1] = g[i][j] + p[i][j + 1] + p[i + 1][j] - p[i][j];
// sum(r1,c1,r2,c2) = p[r2+1][c2+1] - p[r1][c2+1] - p[r2+1][c1] + p[r1][c1]

// Find Pivot Index: left == total - left - a[i]
int total = 0, left = 0; for (int x : a) total += x;
for (int i = 0; i < n; i++) { if (left == total - left - a[i]) return i; left += a[i]; }
```

**Variants:** Contiguous Array (equal 0s and 1s) → treat 0 as −1, find the longest subarray with sum 0 (first-index map). Continuous Subarray Sum (multiple of k, length ≥ 2) → map remainder → first index, need i − idx ≥ 2. Car Pooling / Range Addition → difference array (diff\[l\]++, diff\[r+1\]--, prefix-sum it). Longest Subarray with Sum 0 → first-index map.

**Problems:** Subarray Sum Equals K · Subarray Sum Divisible by K · Continuous Subarray Sum · Contiguous Array · Product of Array Except Self · Find Pivot Index · Range Sum Query (1D and 2D) · Matrix Block Sum · Count Subarrays with Sum K · Longest Subarray with Sum 0 · Car Pooling.

## P4. Kadane and Array Tricks

**Trick:** Kadane: best subarray ending at i = max(a\[i\], prevBest + a\[i\]). Many array problems are one-liners once you know the trick below.

**Importance: ★★★.** **Pattern card**

- **Recognize:** maximum sum/product of a *contiguous* subarray; circular variants; in-place array rearrangements (rotate, next permutation, spiral, set zeros).
- **Brute force → optimized:** O(n²) subarrays → O(n) single pass.
- **Invariant (Kadane):** `cur` = best sum of a subarray *ending at i*; `best` = maximum of all `cur`.
- **Complexity:** O(n) time, O(1) space.
- **Common bugs:** initializing `best = 0` when all numbers can be negative; tracking only the max for products (a negative flips max and min); circular case when all numbers are negative.
- **Follow-ups:** return the indices; subarray of length ≥ k (prefix minimum); maximum sum rectangle (O(n³) by compressing rows).
- **Practice:** *Easy* Majority Element · Missing Number. *Medium* Maximum Subarray · Maximum Product Subarray · Maximum Sum Circular Subarray · Rotate Array · Next Permutation · Spiral Matrix · Rotate Image · Set Matrix Zeroes. *Hard* First Missing Positive.

```java
// Kadane: Maximum Subarray
int cur = a[0], best = a[0];
for (int i = 1; i < n; i++) {
    cur = Math.max(a[i], cur + a[i]);
    best = Math.max(best, cur);
}

// Maximum Product Subarray: track max AND min (a negative flips them)
int mx = a[0], mn = a[0], best = a[0];
for (int i = 1; i < n; i++) {
    int x = a[i], prevMx = mx;
    mx = Math.max(x, Math.max(mx * x, mn * x));
    mn = Math.min(x, Math.min(prevMx * x, mn * x));
    best = Math.max(best, mx);
}
// Circular max subarray = max(kadaneMax, total - kadaneMin). If kadaneMax < 0 return kadaneMax.

// Rotate Array right by k: reverse all, reverse first k, reverse the rest
k %= n; reverse(a, 0, n - 1); reverse(a, 0, k - 1); reverse(a, k, n - 1);

// Majority Element (Boyer-Moore voting)
int cand = 0, cnt = 0;
for (int x : a) { if (cnt == 0) cand = x; cnt += (x == cand) ? 1 : -1; }

// Next Permutation
int i = n - 2;
while (i >= 0 && a[i] >= a[i + 1]) i--;               // first dip from the right
if (i >= 0) { int j = n - 1; while (a[j] <= a[i]) j--; swap(a, i, j); }
reverse(a, i + 1, n - 1);

// Cyclic sort for values 1..n: put value v at index v-1 (Missing Number, Find Duplicates, First Missing Positive)
for (int i = 0; i < n; i++)
    while (a[i] > 0 && a[i] <= n && a[a[i] - 1] != a[i]) swap(a, i, a[i] - 1);
// first i with a[i] != i + 1  ->  missing value is i + 1, and a[i] is a duplicate

// Spiral Matrix: shrink four borders
List<Integer> res = new ArrayList<>(); int t = 0, b = m - 1, l = 0, r = n - 1;
while (t <= b && l <= r) {
    for (int j = l; j <= r; j++) res.add(g[t][j]); t++;
    for (int i = t; i <= b; i++) res.add(g[i][r]); r--;
    if (t <= b) { for (int j = r; j >= l; j--) res.add(g[b][j]); b--; }
    if (l <= r) { for (int i = b; i >= t; i--) res.add(g[i][l]); l++; }
}

// Rotate Image 90 degrees clockwise: transpose, then reverse each row
for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) { int t = g[i][j]; g[i][j] = g[j][i]; g[j][i] = t; }
for (int[] row : g) reverse(row, 0, n - 1);
```

**One-liners:** Missing Number → n(n+1)/2 minus sum, or XOR. Find the Duplicate Number → Floyd cycle on indices (same as Linked List Cycle II). Set Matrix Zeroes → record zero rows/cols first, then zero them. Pascal's Triangle → row\[j\] = prev\[j-1\] + prev\[j\]. Best Time to Buy and Sell Stock → see P16.

**Problems:** Maximum Subarray · Maximum Product Subarray · Maximum Sum Circular Subarray · Rotate Array · Majority Element · Next Permutation · First Missing Positive · Missing Number · Find the Duplicate Number · Spiral Matrix · Rotate Image · Set Matrix Zeroes · Pascal's Triangle · Leaders in an Array (scan from the right, keep max) · Merge Intervals (see P15).

## P5. Binary Search

**Trick:** you can binary search anything MONOTONIC (a yes/no condition that flips once), not just a sorted array. Decide: search an index or search the ANSWER. Use `lo + (hi - lo) / 2`. For 'first true' use `hi = mid`; for 'last true' use upper mid `lo + (hi - lo + 1) / 2` with `lo = mid` (avoids an infinite loop).

**Importance: ★★★.** **Pattern card**

- **Recognize:** sorted or rotated input; required O(log n); "smallest/largest X such that …"; huge numeric range (≤ 10⁹); a yes/no check that flips once.
- **Brute force → optimized:** linear scan or testing every candidate O(n · check) → O(log n · check).
- **Invariant:** the answer always lies in `[lo, hi]` (or `[lo, hi)`); every iteration shrinks the range. Choose the invariant once and keep it.
- **Complexity:** O(log n) comparisons (× the cost of the feasibility check when searching on the answer); O(1) space.
- **Common bugs:** infinite loop from `lo = mid` with a lower mid; overflow in `(lo + hi) / 2`; wrong bounds for search on the answer; non-monotone predicate; rotated arrays with duplicates.
- **Follow-ups:** first/last occurrence; duplicates in a rotated array; 2D matrices; real-valued answers (fixed iteration count).
- **Practice:** *Easy* Binary Search · Search Insert Position · Sqrt(x) · First Bad Version. *Medium* Search in Rotated Sorted Array ([H18](#h18-search-in-rotated-sorted-array)) · Find First and Last Position · Find Minimum in Rotated Sorted Array · Find Peak Element · Koko Eating Bananas · Capacity to Ship Packages · Search a 2D Matrix. *Hard* Median of Two Sorted Arrays ([H17](#h17-median-of-two-sorted-arrays)) · Split Array Largest Sum ([H24](#h24-binary-search-on-the-answer)).

```java
// Template A: exact match
int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == target) return mid;
    else if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}
return -1;

// Template B: FIRST index where cond is true (lower bound). hi = n means 'not found'
int lo = 0, hi = n;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (cond(mid)) hi = mid; else lo = mid + 1;
}
return lo;
// lowerBound(x): first i with a[i] >= x.   upperBound(x): first i with a[i] > x
// First/last position = lowerBound(x), upperBound(x) - 1.   Count of x = upperBound(x) - lowerBound(x)
// Search Insert Position = lowerBound(target)

// Search in Rotated Sorted Array: one half is always sorted
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == t) return mid;
    if (a[lo] <= a[mid]) {                        // left half sorted
        if (a[lo] <= t && t < a[mid]) hi = mid - 1; else lo = mid + 1;
    } else {                                      // right half sorted
        if (a[mid] < t && t <= a[hi]) lo = mid + 1; else hi = mid - 1;
    }
}

// Find Minimum in Rotated Sorted Array
int lo = 0, hi = n - 1;
while (lo < hi) { int mid = lo + (hi - lo) / 2; if (a[mid] > a[hi]) lo = mid + 1; else hi = mid; }
return a[lo];

// Find Peak Element / Peak in Mountain Array
int lo = 0, hi = n - 1;
while (lo < hi) { int mid = lo + (hi - lo) / 2; if (a[mid] < a[mid + 1]) lo = mid + 1; else hi = mid; }
return lo;

// BINARY SEARCH ON ANSWER: Koko Eating Bananas (min speed so hours <= h)
int lo = 1, hi = 0;
for (int p : piles) hi = Math.max(hi, p);
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    long hours = 0;
    for (int p : piles) hours += (p + mid - 1) / mid;      // ceil
    if (hours <= h) hi = mid; else lo = mid + 1;
}
return lo;
// Ship Packages in D Days / Split Array Largest Sum / Allocate Pages:
//   lo = max(a), hi = sum(a); feasible(cap) = greedily pack, count groups <= D

// Maximize the minimum (Aggressive Cows, Magnetic Force): upper mid + lo = mid
int lo = 1, hi = a[n - 1] - a[0];                          // a sorted
while (lo < hi) {
    int mid = lo + (hi - lo + 1) / 2;
    if (canPlace(mid)) lo = mid; else hi = mid - 1;
}
return lo;
// canPlace(d): place the first cow at a[0], then next one at the first spot >= last + d; count >= k

// Sqrt(x): largest mid with mid * mid <= x
int lo = 1, hi = x, ans = 0;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (mid <= x / mid) { ans = mid; lo = mid + 1; } else hi = mid - 1;
}

// Search a 2D Matrix (rows sorted, each row starts above previous end): treat as 1D
int lo = 0, hi = m * n - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2, v = g[mid / n][mid % n];
    if (v == t) return true; else if (v < t) lo = mid + 1; else hi = mid - 1;
}
// Search a 2D Matrix II (rows AND cols sorted): start top-right; too big -> col--, too small -> row++

// Median of Two Sorted Arrays: binary search the partition on the SMALLER array
if (A.length > B.length) return findMedianSortedArrays(B, A);
int m = A.length, n = B.length, lo = 0, hi = m;
while (lo <= hi) {
    int i = (lo + hi) / 2, j = (m + n + 1) / 2 - i;
    int aL = i == 0 ? Integer.MIN_VALUE : A[i - 1], aR = i == m ? Integer.MAX_VALUE : A[i];
    int bL = j == 0 ? Integer.MIN_VALUE : B[j - 1], bR = j == n ? Integer.MAX_VALUE : B[j];
    if (aL <= bR && bL <= aR) {
        if ((m + n) % 2 == 1) return Math.max(aL, bL);
        return ((long) Math.max(aL, bL) + Math.min(aR, bR)) / 2.0;
    } else if (aL > bR) hi = i - 1; else lo = i + 1;
}
return 0;
```

**Problems:** Binary Search · Search Insert Position · First and Last Position · Search in Rotated Sorted Array (I and II with duplicates: shrink both ends when a\[lo\]==a\[mid\]==a\[hi\]) · Find Minimum in Rotated Array · Find Peak Element · Peak Index in Mountain Array · Sqrt(x) · Koko Eating Bananas · Capacity to Ship Packages · Min Speed to Arrive on Time · Minimum Days to Make m Bouquets · Aggressive Cows · Magnetic Force Between Two Balls · Allocate Minimum Pages · Split Array Largest Sum · Search a 2D Matrix (I, II) · Kth Smallest in Sorted Matrix (binary search on value, count <= mid per row) · Median of Two Sorted Arrays · Floor/Ceiling in Sorted Array.

## P6. HashMap / HashSet / Frequency

**Trick:** trade space for time: O(1) lookup replaces an inner loop. Store 'what I need to find' as you scan (complement, prefix, last index, count). Group by a canonical key (sorted string, count signature).

**Importance: ★★★.** **Pattern card**

- **Recognize:** "have I seen this", complement lookup, frequency/duplicates, grouping by a canonical form, set membership.
- **Brute force → optimized:** nested search O(n²) → O(n) average with one map pass.
- **Invariant:** the map describes only the elements processed so far (the lookup key is "what I still need").
- **Complexity:** O(n) average time, O(n) space; worst-case hash degradation is rarely relevant.
- **Common bugs:** array keys (identity hashing); `Integer ==`; mutating a map while iterating it; assuming iteration order; forgetting that duplicates change the answer (two equal numbers summing to target).
- **Follow-ups:** O(1) space → sort + two pointers; streaming data; very large key counts → counting arrays or Bloom-filter-style approximations.
- **Practice:** *Easy* Two Sum · Valid Anagram · Contains Duplicate · Ransom Note. *Medium* Group Anagrams · Top K Frequent Elements ([H6](#h6-top-k-frequent-elements)) · Longest Consecutive Sequence · 4Sum II · LRU Cache. *Hard* LFU Cache · Max Points on a Line.

```java
// Two Sum: store value -> index, look up the complement
Map<Integer, Integer> idx = new HashMap<>();
for (int i = 0; i < n; i++) {
    int need = target - a[i];
    if (idx.containsKey(need)) return new int[]{idx.get(need), i};
    idx.put(a[i], i);
}

// Group Anagrams: key = sorted characters
Map<String, List<String>> m = new HashMap<>();
for (String s : strs) {
    char[] c = s.toCharArray(); Arrays.sort(c);
    m.computeIfAbsent(new String(c), z -> new ArrayList<>()).add(s);
}
return new ArrayList<>(m.values());

// Longest Consecutive Sequence: only start counting from a sequence START (x-1 absent)
Set<Integer> set = new HashSet<>();
for (int x : a) set.add(x);
int best = 0;
for (int x : set) {
    if (!set.contains(x - 1)) {
        int y = x;
        while (set.contains(y + 1)) y++;
        best = Math.max(best, y - x + 1);
    }
}

// Top K Frequent Elements: count, then bucket by frequency (O(n))
Map<Integer, Integer> f = new HashMap<>();
for (int x : a) f.merge(x, 1, Integer::sum);
List<Integer>[] bucket = new List[n + 1];
for (Map.Entry<Integer, Integer> e : f.entrySet()) {
    int c = e.getValue();
    if (bucket[c] == null) bucket[c] = new ArrayList<>();
    bucket[c].add(e.getKey());
}
int[] res = new int[k]; int p = 0;
for (int c = n; c >= 1 && p < k; c--)
    if (bucket[c] != null) for (int x : bucket[c]) if (p < k) res[p++] = x;

// Isomorphic Strings / Word Pattern: two maps (a->b and b->a) must both stay consistent
// Valid Anagram / Ransom Note: int[26] counts, +1 for one string, -1 for the other
// Contains Duplicate: if (!set.add(x)) return true;
// First Unique Character: freq[26], then first index with freq 1
// 4Sum II: map of (a+b) sums -> count, then look up -(c+d)
// Happy Number: HashSet of seen values (or Floyd slow/fast)
// Design HashMap: array of buckets (linked lists), index = key % size, handle collisions by chaining
```

**Problems:** Two Sum · Group Anagrams · Valid Anagram · Top K Frequent Elements · Longest Consecutive Sequence · Majority Element · Contains Duplicate (I, II with index gap, III with TreeSet) · Isomorphic Strings · Word Pattern · Ransom Note · First Unique Character · Intersection of Two Arrays · 4Sum II · Sort Characters by Frequency · Remove Letter to Equalize Frequency · Design HashMap / HashSet · Subarray Sum Equals K (P3).

## P7. Stack and Monotonic Stack

**Trick:** LIFO = 'most recent unmatched thing'. Brackets, undo, nested structures, expression evaluation. MONOTONIC stack: keep stack values sorted; when a new element breaks the order, pop and resolve the popped ones ('next greater/smaller', histogram). Store INDICES to compute distances.

**Importance: ★★★.** **Pattern card**

- **Recognize:** matching brackets, undo, nested structures, expression evaluation, "next greater/smaller element", histogram/rectangle, stock span.
- **Brute force → optimized:** scan right for each element O(n²) → O(n) amortized, since each index is pushed and popped once.
- **Invariant:** the stack is monotone; an element is popped exactly when its answer (next greater/smaller) is known.
- **Complexity:** O(n) time, O(n) space.
- **Common bugs:** `<` vs `<=` with equal values; storing values instead of indices; missing the end-of-array sentinel pass; peeking an empty stack; operator precedence/associativity in calculators.
- **Follow-ups:** circular arrays (loop to `2n`); previous smaller + next smaller on both sides (contribution counting, [H30](#h30-sum-of-subarray-minimums)); 2D histograms ([H29](#h29-maximal-rectangle)).
- **Practice:** *Easy* Valid Parentheses · Next Greater Element I · Backspace String Compare. *Medium* Daily Temperatures ([H14](#h14-daily-temperatures)) · Min Stack · Decode String · Basic Calculator II · Remove K Digits · Asteroid Collision · Evaluate Reverse Polish Notation. *Hard* Largest Rectangle in Histogram · Trapping Rain Water ([H13](#h13-trapping-rain-water)) · Maximal Rectangle ([H29](#h29-maximal-rectangle)) · Basic Calculator.

```java
// Valid Parentheses
Deque<Character> st = new ArrayDeque<>();
for (char c : s.toCharArray()) {
    if (c == '(' || c == '[' || c == '{') st.push(c);
    else {
        if (st.isEmpty()) return false;
        char o = st.pop();
        if ((c == ')' && o != '(') || (c == ']' && o != '[') || (c == '}' && o != '{')) return false;
    }
}
return st.isEmpty();

// Next Greater Element (to the right): monotonic decreasing stack of indices
int[] res = new int[n]; Arrays.fill(res, -1);
Deque<Integer> st = new ArrayDeque<>();
for (int i = 0; i < n; i++) {
    while (!st.isEmpty() && a[st.peek()] < a[i]) res[st.pop()] = a[i];
    st.push(i);
}
// Circular (NGE II): loop i from 0 to 2n-1, use a[i % n], push only when i < n
// Daily Temperatures: res[idx] = i - idx.   Stock Span: pop while price <= current, span = i - st.peek()

// Largest Rectangle in Histogram
Deque<Integer> st = new ArrayDeque<>(); int best = 0;
for (int i = 0; i <= n; i++) {
    int h = (i == n) ? 0 : heights[i];
    while (!st.isEmpty() && heights[st.peek()] > h) {
        int height = heights[st.pop()];
        int left = st.isEmpty() ? -1 : st.peek();
        best = Math.max(best, height * (i - left - 1));
    }
    st.push(i);
}
// Maximal Rectangle: build histogram heights row by row, run the above per row

// Min Stack: store (value, minSoFar)
class MinStack {
    Deque<int[]> st = new ArrayDeque<>();
    void push(int x) { int mn = st.isEmpty() ? x : Math.min(x, st.peek()[1]); st.push(new int[]{x, mn}); }
    void pop() { st.pop(); }
    int top() { return st.peek()[0]; }
    int getMin() { return st.peek()[1]; }
}

// Decode String: 3[a2[c]] -> accaccacc  (stack of counts + stack of builders)
Deque<Integer> counts = new ArrayDeque<>(); Deque<StringBuilder> strs = new ArrayDeque<>();
StringBuilder cur = new StringBuilder(); int k = 0;
for (char c : s.toCharArray()) {
    if (Character.isDigit(c)) k = k * 10 + (c - '0');
    else if (c == '[') { counts.push(k); strs.push(cur); cur = new StringBuilder(); k = 0; }
    else if (c == ']') { StringBuilder prev = strs.pop(); int t = counts.pop(); for (int i = 0; i < t; i++) prev.append(cur); cur = prev; }
    else cur.append(c);
}
return cur.toString();

// Evaluate Reverse Polish Notation: pop b, then pop a, push (a op b). Order matters for - and /

// Basic Calculator II (+ - * /): stack of terms, apply * and / immediately
Deque<Integer> st = new ArrayDeque<>(); int num = 0; char op = '+';
for (int i = 0; i < s.length(); i++) {
    char c = s.charAt(i);
    if (Character.isDigit(c)) num = num * 10 + (c - '0');
    if ((!Character.isDigit(c) && c != ' ') || i == s.length() - 1) {
        if (op == '+') st.push(num); else if (op == '-') st.push(-num);
        else if (op == '*') st.push(st.pop() * num); else if (op == '/') st.push(st.pop() / num);
        op = c; num = 0;
    }
}
int res = 0; for (int x : st) res += x; return res;
// Basic Calculator I (with parentheses): push (result, sign) when '(' and restore on ')'

// Remove K Digits: smallest number. Pop while the previous digit is bigger
StringBuilder sb = new StringBuilder();
for (char c : num.toCharArray()) {
    while (k > 0 && sb.length() > 0 && sb.charAt(sb.length() - 1) > c) { sb.setLength(sb.length() - 1); k--; }
    sb.append(c);
}
sb.setLength(sb.length() - k);                       // leftover removals from the end
int i = 0; while (i < sb.length() && sb.charAt(i) == '0') i++;
String r = sb.substring(i);
return r.isEmpty() ? "0" : r;

// Asteroid Collision
Deque<Integer> st = new ArrayDeque<>();
for (int x : asteroids) {
    boolean alive = true;
    while (alive && x < 0 && !st.isEmpty() && st.peek() > 0) {
        if (st.peek() < -x) st.pop();
        else if (st.peek() == -x) { st.pop(); alive = false; }
        else alive = false;
    }
    if (alive) st.push(x);
}

// Longest Valid Parentheses: stack of indices with base -1
Deque<Integer> st = new ArrayDeque<>(); st.push(-1); int best = 0;
for (int i = 0; i < s.length(); i++) {
    if (s.charAt(i) == '(') st.push(i);
    else { st.pop(); if (st.isEmpty()) st.push(i); else best = Math.max(best, i - st.peek()); }
}

// Queue using Stacks: 'in' stack for push, 'out' stack for pop/peek (refill only when out is empty)
class MyQueue {
    Deque<Integer> in = new ArrayDeque<>(), out = new ArrayDeque<>();
    void push(int x) { in.push(x); }
    int pop() { peek(); return out.pop(); }
    int peek() { if (out.isEmpty()) while (!in.isEmpty()) out.push(in.pop()); return out.peek(); }
    boolean empty() { return in.isEmpty() && out.isEmpty(); }
}
// Stack using Queues: after offering x, rotate the queue size-1 times so x is at the front
```

**Problems:** Valid Parentheses · Min Stack · Max Stack · Next Greater Element I and II · Daily Temperatures · Online Stock Span · Largest Rectangle in Histogram · Maximal Rectangle · Trapping Rain Water (stack version) · Asteroid Collision · Decode String · Evaluate RPN · Basic Calculator I and II · Backspace String Compare · Remove All Adjacent Duplicates · Remove K Digits · Remove Duplicate Letters · Minimum Remove to Make Valid Parentheses (stack of indices to delete) · Minimum Add to Make Parentheses Valid (counters) · Longest Valid Parentheses · Score of Parentheses · Implement Queue using Stacks / Stack using Queues · Reverse a Stack and Insert at Bottom (recursion).

## P8. Queue and Deque

**Trick:** FIFO = process in arrival order; BFS; 'rotate' simulations. Deque = both ends (sliding window max in P2).

**Importance: ★★.** **Pattern card**

- **Recognize:** FIFO processing, BFS, simulations with rotation, "recent N calls", moving-window extremes (deque).
- **Brute force → optimized:** rescanning a window O(nk) → monotonic deque O(n).
- **Invariant:** the queue holds items in arrival order; a monotonic deque holds only candidates that can still become the extreme.
- **Complexity:** O(1) amortized per operation; O(n) space.
- **Common bugs:** `ArrayDeque` rejects `null`; `poll`/`peek` return `null` on empty (not an exception); `Stack`/`LinkedList` instead of `ArrayDeque`; off-by-one in circular indexing.
- **Follow-ups:** thread-safe or bounded queues (out of scope here); implement with two stacks (amortized O(1)).
- **Practice:** *Easy* Implement Queue using Stacks · Number of Recent Calls · Time Needed to Buy Tickets. *Medium* Design Circular Queue · Find the Winner of the Circular Game · Longest Continuous Subarray With Absolute Diff ≤ Limit. *Hard* Sliding Window Maximum ([H5](#h5-sliding-window-maximum)) · Shortest Subarray with Sum at Least K.

```java
// Design Circular Queue (array, head + size, wrap with %)
class MyCircularQueue {
    int[] q; int head = 0, size = 0, cap;
    MyCircularQueue(int k) { q = new int[k]; cap = k; }
    boolean enQueue(int v) { if (size == cap) return false; q[(head + size) % cap] = v; size++; return true; }
    boolean deQueue() { if (size == 0) return false; head = (head + 1) % cap; size--; return true; }
    int Front() { return size == 0 ? -1 : q[head]; }
    int Rear() { return size == 0 ? -1 : q[(head + size - 1) % cap]; }
    boolean isEmpty() { return size == 0; }
    boolean isFull() { return size == cap; }
}

// Time Needed to Buy Tickets (person k): everyone before or at k buys min(t[i], t[k]); those after buy min(t[i], t[k]-1)
int time = 0;
for (int i = 0; i < n; i++) time += Math.min(t[i], i <= k ? t[k] : t[k] - 1);

// Josephus / Find the Winner of the Circular Game: iterative, 0-indexed result j
int j = 0;
for (int i = 2; i <= n; i++) j = (j + k) % i;
return j + 1;
// Or simulate: queue of 1..n; rotate k-1 times (poll + offer), then poll once to eliminate
```

**Problems:** Design Circular Queue / Deque · Implement Queue using Array · Time Needed to Buy Tickets · Find the Winner of the Circular Game · Josephus Problem · Number of Recent Calls (poll while front is too old) · First Non-Repeating Character in a Stream (queue + counts) · Sliding Window Maximum (P2) · all BFS problems (P11, P13).

### Monotonic deque (window min/max) and queue patterns, added

**Idea.** A deque of indices whose values are monotone (decreasing for a max-window, increasing for a min-window). The back pops dominated elements; the front pops expired indices; the front is always the extreme. Each index enters and leaves once, so the total cost is O(n) amortized. The core template is in [H5](#h5-sliding-window-maximum); a second use is on *prefix sums* ([§9](#9-worked-example-from-brute-force-to-a-hybrid-solution)).

```java
class MonotonicDequeExamples {
    // Longest Continuous Subarray With Absolute Diff <= limit: variable window + two deques (max and min)
    static int longestSubarray(int[] a, int limit) {
        Deque<Integer> maxD = new ArrayDeque<>(), minD = new ArrayDeque<>();   // indices; values decreasing / increasing
        int l = 0, best = 0;
        for (int r = 0; r < a.length; r++) {
            while (!maxD.isEmpty() && a[maxD.peekLast()] <= a[r]) maxD.pollLast();
            maxD.offerLast(r);
            while (!minD.isEmpty() && a[minD.peekLast()] >= a[r]) minD.pollLast();
            minD.offerLast(r);
            while (a[maxD.peekFirst()] - a[minD.peekFirst()] > limit) {          // window invalid: shrink
                l++;
                if (maxD.peekFirst() < l) maxD.pollFirst();                      // expire indices left of the window
                if (minD.peekFirst() < l) minD.pollFirst();
            }
            best = Math.max(best, r - l + 1);
        }
        return best;
    }
}
```

**Complexity.** O(n) time, O(n) space. **Dry run.** `[8,2,4,7]`, `limit = 4`: windows `[8,2]` invalid (diff 6) → shrink to `[2]`; `[2,4]` diff 2 ok; `[2,4,7]` diff 5 invalid → shrink to `[4,7]` diff 3 ok. Best length 2. **Pitfall.** Compare *indices* to `l` when expiring, never values. **Other uses:** Jump Game VI (DP with a window-max deque), Constrained Subsequence Sum, Shortest Subarray with Sum at Least K.

**Queue simulation reminders.** BFS uses `Queue<int[]>` with a `for (sz = q.size(); sz > 0; sz--)` level loop; a circular array queue avoids reallocation; `ArrayDeque` is the default for every queue/stack/deque need.

## P9. Linked List

**Trick:** (1) use a DUMMY head node whenever the head can change; (2) save `next` BEFORE rewiring; (3) fast/slow pointers for middle, cycle, kth-from-end; (4) reverse in place; (5) draw 3 nodes on paper.

**Importance: ★★★.** **Pattern card**

- **Recognize:** "in place", O(1) extra space, cycle, middle, k-th from the end, merge/reorder/reverse pieces.
- **Brute force → optimized:** copy to an array (O(n) space) → pointer manipulation in O(1) space.
- **Invariant:** `prev` is the already-processed (reversed/merged) prefix; `cur` is the first unprocessed node; `next` is saved before any rewiring.
- **Complexity:** O(n) time; O(1) space iterative (O(n) recursion stack).
- **Common bugs:** losing `next`; no dummy head when the head can change; off-by-one in the two-pointer gap; forgetting to set the tail's `next = null`; infinite loops after a partial rewiring.
- **Follow-ups:** do it recursively; in groups of k; on a doubly linked list; detect the cycle's length.
- **Practice:** *Easy* Reverse Linked List · Merge Two Sorted Lists · Middle of the Linked List · Linked List Cycle · Palindrome Linked List · Intersection of Two Linked Lists. *Medium* Remove Nth Node From End · Add Two Numbers · Linked List Cycle II · Reorder List · Sort List · Copy List with Random Pointer · LRU Cache. *Hard* Merge k Sorted Lists · Reverse Nodes in k-Group.

```java
// Reverse Linked List (iterative)
ListNode prev = null, cur = head;
while (cur != null) { ListNode nxt = cur.next; cur.next = prev; prev = cur; cur = nxt; }
return prev;
// Recursive: if (head == null || head.next == null) return head;
//   ListNode p = reverse(head.next); head.next.next = head; head.next = null; return p;

// Middle of the list (even length -> second middle)
ListNode slow = head, fast = head;
while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }

// Cycle detection + cycle start (Linked List Cycle I and II)
ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next; fast = fast.next.next;
    if (slow == fast) {                                  // cycle exists
        slow = head;
        while (slow != fast) { slow = slow.next; fast = fast.next; }
        return slow;                                     // start of cycle
    }
}
return null;

// Remove Nth Node From End: dummy + gap of n
ListNode dummy = new ListNode(0); dummy.next = head;
ListNode fast = dummy, slow = dummy;
for (int i = 0; i < n; i++) fast = fast.next;
while (fast.next != null) { fast = fast.next; slow = slow.next; }
slow.next = slow.next.next;
return dummy.next;

// Merge Two Sorted Lists
ListNode dummy = new ListNode(0), t = dummy;
while (a != null && b != null) {
    if (a.val <= b.val) { t.next = a; a = a.next; } else { t.next = b; b = b.next; }
    t = t.next;
}
t.next = (a != null) ? a : b;
return dummy.next;

// Merge K Sorted Lists: min-heap of list heads
PriorityQueue<ListNode> pq = new PriorityQueue<>((x, y) -> Integer.compare(x.val, y.val));
for (ListNode h : lists) if (h != null) pq.offer(h);
ListNode dummy = new ListNode(0), t = dummy;
while (!pq.isEmpty()) {
    ListNode nd = pq.poll(); t.next = nd; t = nd;
    if (nd.next != null) pq.offer(nd.next);
}
return dummy.next;

// Add Two Numbers (digits reversed)
ListNode dummy = new ListNode(0), t = dummy; int carry = 0;
while (a != null || b != null || carry > 0) {
    int s = carry + (a != null ? a.val : 0) + (b != null ? b.val : 0);
    t.next = new ListNode(s % 10); t = t.next; carry = s / 10;
    if (a != null) a = a.next;
    if (b != null) b = b.next;
}
return dummy.next;
// Add Two Numbers II (digits not reversed): push both lists on stacks, or reverse both first

// Intersection of Two Lists: switch heads at the end, pointers meet at the intersection (or null)
ListNode a = headA, b = headB;
while (a != b) { a = (a == null) ? headB : a.next; b = (b == null) ? headA : b.next; }
return a;

// Palindrome Linked List: find middle, reverse second half, compare, (optionally restore)
// Reorder List (L0,Ln,L1,Ln-1...): find middle, reverse second half, interleave the two halves

// Odd Even Linked List
if (head == null) return null;
ListNode odd = head, even = head.next, evenHead = even;
while (even != null && even.next != null) {
    odd.next = even.next; odd = odd.next;
    even.next = odd.next; even = even.next;
}
odd.next = evenHead;
return head;

// Reverse Nodes in k-Group
ListNode dummy = new ListNode(0); dummy.next = head; ListNode groupPrev = dummy;
while (true) {
    ListNode kth = groupPrev;
    for (int i = 0; i < k && kth != null; i++) kth = kth.next;
    if (kth == null) break;
    ListNode groupNext = kth.next, prev = groupNext, cur = groupPrev.next;
    while (cur != groupNext) { ListNode nx = cur.next; cur.next = prev; prev = cur; cur = nx; }
    ListNode oldFirst = groupPrev.next;
    groupPrev.next = kth; groupPrev = oldFirst;
}
return dummy.next;

// Sort List: merge sort (split at middle, sort halves, merge)
ListNode sortList(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode slow = head, fast = head.next;
    while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }
    ListNode right = slow.next; slow.next = null;
    return merge(sortList(head), sortList(right));      // merge = Merge Two Sorted Lists
}

// Rotate List: make it circular, new tail is at index len - k%len - 1, cut there
// Remove Duplicates from Sorted List: while (cur.next != null) if equal skip next else advance
// Partition List: two dummy lists (< x and >= x), then join
// Swap Nodes in Pairs: dummy + swap each pair, or recursion

// Copy List with Random Pointer: map old -> new, two passes
Map<Node, Node> m = new HashMap<>();
for (Node c = head; c != null; c = c.next) m.put(c, new Node(c.val));
for (Node c = head; c != null; c = c.next) { m.get(c).next = m.get(c.next); m.get(c).random = m.get(c.random); }
return m.get(head);

// LRU Cache (the interview version): HashMap + doubly linked list, O(1) get and put
class LRUCache {
    class Node { int k, v; Node prev, next; Node(int k, int v) { this.k = k; this.v = v; } }
    Map<Integer, Node> map = new HashMap<>();
    Node head = new Node(0, 0), tail = new Node(0, 0);       // sentinels
    int cap;
    LRUCache(int cap) { this.cap = cap; head.next = tail; tail.prev = head; }
    void remove(Node n) { n.prev.next = n.next; n.next.prev = n.prev; }
    void addFront(Node n) { n.next = head.next; n.prev = head; head.next.prev = n; head.next = n; }
    int get(int k) {
        if (!map.containsKey(k)) return -1;
        Node n = map.get(k); remove(n); addFront(n); return n.v;
    }
    void put(int k, int v) {
        if (map.containsKey(k)) { Node n = map.get(k); n.v = v; remove(n); addFront(n); return; }
        if (map.size() == cap) { Node lru = tail.prev; remove(lru); map.remove(lru.k); }
        Node n = new Node(k, v); map.put(k, n); addFront(n);
    }
}
// Shortcut: class LRUCache extends LinkedHashMap<Integer,Integer> with super(cap, 0.75f, true)
//   and protected boolean removeEldestEntry(Map.Entry<Integer,Integer> e) { return size() > cap; }
```

**Problems:** Reverse Linked List (I, II between m and n) · Middle of the Linked List · Linked List Cycle (I, II) · Remove Nth Node From End · Merge Two Sorted Lists · Merge K Sorted Lists · Add Two Numbers (I, II) · Intersection of Two Linked Lists · Palindrome Linked List · Reorder List · Odd Even Linked List · Reverse Nodes in k-Group · Swap Nodes in Pairs · Rotate List · Sort List · Remove Duplicates from Sorted List (I, II) · Partition List · Copy List with Random Pointer · Flatten a Multilevel Doubly Linked List (DFS, splice child between node and next) · Delete Node in a Linked List (copy next.val, skip next) · LRU Cache · LFU Cache (hard: freq map of DLLs) · Design Linked List · Maximum Twin Sum (reverse second half).

## P10. Recursion and Divide & Conquer

**Trick:** write the function in words first ('returns the height of this subtree'), then: base case → call on smaller input → combine. Trust the recursive call. If the same arguments repeat, memoize (P16). Divide & conquer = split, solve halves, merge.

**Importance: ★★.** **Pattern card**

- **Recognize:** problems that split into independent smaller copies (sort, power, tree-shaped), divide-and-conquer counting (inversions), recursive definitions.
- **Brute force → optimized:** O(n²) pairwise → O(n log n) by merging sorted halves; O(n) multiplication loop → O(log n) fast exponentiation.
- **Invariant:** the recursive call solves its sub-range completely and leaves it in a known state (e.g., sorted).
- **Complexity:** read off the recurrence ([§10](#10-complexity-foundations-amortized-analysis-recursion)); recursion stack O(log n) for balanced splits.
- **Common bugs:** missing base case; overlapping ranges `[l, m]`/`[m+1, r]` mix-ups; Quickselect worst case on sorted input or many duplicates.
- **Follow-ups:** iterative merge sort; external sort; parallel merge sort (conceptual).
- **Practice:** *Easy* Fibonacci Number · Power of Two. *Medium* Pow(x, n) · Sort an Array · Kth Largest Element in an Array ([H16](#h16-kth-largest-element)). *Hard* Reverse Pairs ([H21](#h21-count-inversions)) · Median of Two Sorted Arrays ([H17](#h17-median-of-two-sorted-arrays)).

```java
// Fast power: x^n in O(log n)
double myPow(double x, int n) {
    long N = n;
    if (N < 0) { x = 1 / x; N = -N; }
    double res = 1;
    while (N > 0) { if ((N & 1) == 1) res *= x; x *= x; N >>= 1; }
    return res;
}

// Merge Sort: O(n log n), stable
void mergeSort(int[] a, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(a, l, m); mergeSort(a, m + 1, r);
    int[] tmp = new int[r - l + 1]; int i = l, j = m + 1, k = 0;
    while (i <= m && j <= r) tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
    while (i <= m) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];
    System.arraycopy(tmp, 0, a, l, tmp.length);
}
// Count Inversions: in the merge step, when you take from the RIGHT half, add (m - i + 1)

// Quick Sort (Lomuto partition) + Quickselect for Kth element
int partition(int[] a, int l, int r) {
    int pivot = a[r], i = l;
    for (int j = l; j < r; j++) if (a[j] < pivot) swap(a, i++, j);
    swap(a, i, r);
    return i;
}
void quickSort(int[] a, int l, int r) { if (l < r) { int p = partition(a, l, r); quickSort(a, l, p - 1); quickSort(a, p + 1, r); } }
int select(int[] a, int l, int r, int k) {           // k-th smallest, 0-indexed, average O(n)
    while (true) {
        int p = partition(a, l, r);
        if (p == k) return a[p];
        if (p < k) l = p + 1; else r = p - 1;
    }
}
// Kth largest = select(a, 0, n - 1, n - k)
// Lomuto partition degrades to O(n^2) on sorted or duplicate-heavy input: randomize the pivot or use a 3-way partition (H16).

// Tower of Hanoi: hanoi(n-1, src, aux, dst); move n; hanoi(n-1, aux, dst, src)   (2^n - 1 moves)
```

**Problems:** Factorial · Fibonacci · Power(x, n) · Print 1 to N · Check Palindrome (recursive) · Merge Sort · Quick Sort · Kth Largest (quickselect) · Count Inversions · Median of Two Sorted Arrays (P5) · Tower of Hanoi · Reverse / Merge Linked Lists recursively (P9) · Generate Subsets (P14).

## P11. Trees (Binary Tree and BST)

**Trick:** two modes. (1) DFS: write a function that RETURNS something about a subtree (height, sum, validity) and combine children's answers, updating a global best when the answer 'bends' through the node (diameter, max path sum). (2) BFS: queue + `for (sz = q.size(); sz > 0; sz--)` loop = one level at a time. BST: inorder is sorted; go left if smaller, right if larger. Remember `ArrayDeque` rejects null.

**Importance: ★★★.** **Pattern card**

- **Recognize:** tree/BST terms (depth, diameter, path, ancestor, level, views, serialization), or any hierarchical structure.
- **Brute force → optimized:** recomputing subtree heights per node O(n²) → one DFS that returns the height and updates a global answer, O(n).
- **Invariant:** the DFS function returns exactly the information the parent needs, and updates the global best only for paths that bend at this node.
- **Complexity:** O(n) time; O(h) stack (h = height; O(n) for a skewed tree, O(log n) for balanced). BST operations O(h).
- **Common bugs:** a node with one child is not a leaf (min depth); validating a BST using only parent comparisons; `null` checks; `ArrayDeque.offer(null)`; forgetting the level-size snapshot in BFS.
- **Follow-ups:** iterative traversals; Morris traversal (O(1) space); convert recursion to an explicit stack; balanced BSTs (AVL/red-black, conceptual).
- **Practice:** *Easy* Maximum Depth · Invert Binary Tree · Symmetric Tree · Diameter of Binary Tree · Path Sum. *Medium* Binary Tree Level Order Traversal · Validate BST · Lowest Common Ancestor ([H26](#h26-lowest-common-ancestor-single-query-vs-many-queries)) · Kth Smallest in a BST · Construct from Preorder and Inorder · Path Sum III · Right Side View. *Hard* Binary Tree Maximum Path Sum · Serialize and Deserialize Binary Tree · Binary Tree Cameras.

```java
// DFS traversals (recursive): move the add() line for pre/in/post
void inorder(TreeNode r, List<Integer> out) {
    if (r == null) return;
    inorder(r.left, out); out.add(r.val); inorder(r.right, out);
}

// Iterative inorder
Deque<TreeNode> st = new ArrayDeque<>(); TreeNode cur = root;
while (cur != null || !st.isEmpty()) {
    while (cur != null) { st.push(cur); cur = cur.left; }
    cur = st.pop(); out.add(cur.val); cur = cur.right;
}

// Iterative preorder (postorder = same but push left first, then right, and reverse the result)
if (root == null) return out;
st.push(root);
while (!st.isEmpty()) {
    TreeNode n = st.pop(); out.add(n.val);
    if (n.right != null) st.push(n.right);
    if (n.left != null) st.push(n.left);
}

// BFS level order (template for zigzag, right side view, level averages, min depth)
List<List<Integer>> res = new ArrayList<>();
if (root == null) return res;
Queue<TreeNode> q = new ArrayDeque<>(); q.offer(root);
while (!q.isEmpty()) {
    int sz = q.size(); List<Integer> level = new ArrayList<>();
    for (int i = 0; i < sz; i++) {
        TreeNode n = q.poll(); level.add(n.val);          // right side view: if (i == sz - 1) take n.val
        if (n.left != null) q.offer(n.left);
        if (n.right != null) q.offer(n.right);
    }
    res.add(level);                                       // zigzag: reverse level when depth is odd
}

// Max Depth
int maxDepth(TreeNode n) { return n == null ? 0 : 1 + Math.max(maxDepth(n.left), maxDepth(n.right)); }
// Min Depth: a node with one child is NOT a leaf
int minDepth(TreeNode n) {
    if (n == null) return 0;
    if (n.left == null) return 1 + minDepth(n.right);
    if (n.right == null) return 1 + minDepth(n.left);
    return 1 + Math.min(minDepth(n.left), minDepth(n.right));
}

// Diameter: return height, update global with left + right
int diameter = 0;
int height(TreeNode n) {
    if (n == null) return 0;
    int l = height(n.left), r = height(n.right);
    diameter = Math.max(diameter, l + r);
    return 1 + Math.max(l, r);
}

// Balanced Binary Tree: return -1 as the 'unbalanced' signal
int check(TreeNode n) {
    if (n == null) return 0;
    int l = check(n.left); if (l == -1) return -1;
    int r = check(n.right); if (r == -1 || Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
}

// Binary Tree Maximum Path Sum: gain from a child can't be negative
int best = Integer.MIN_VALUE;
int gain(TreeNode n) {
    if (n == null) return 0;
    int l = Math.max(0, gain(n.left)), r = Math.max(0, gain(n.right));
    best = Math.max(best, n.val + l + r);                 // path bending at n
    return n.val + Math.max(l, r);                        // path going up
}

// Same Tree / Symmetric / Subtree of Another Tree
boolean same(TreeNode a, TreeNode b) {
    if (a == null || b == null) return a == b;
    return a.val == b.val && same(a.left, b.left) && same(a.right, b.right);
}
boolean mirror(TreeNode a, TreeNode b) {                  // Symmetric: mirror(root.left, root.right)
    if (a == null || b == null) return a == b;
    return a.val == b.val && mirror(a.left, b.right) && mirror(a.right, b.left);
}
// isSubtree(root, sub) = same(root, sub) || isSubtree(root.left, sub) || isSubtree(root.right, sub)
// Invert Binary Tree: swap left and right at every node (recursively)

// Path Sum I: root-to-leaf
boolean hasPath(TreeNode n, int rem) {
    if (n == null) return false;
    if (n.left == null && n.right == null) return n.val == rem;
    return hasPath(n.left, rem - n.val) || hasPath(n.right, rem - n.val);
}

// Path Sum II: backtracking (add, recurse, remove)
void dfs(TreeNode n, int rem, List<Integer> path, List<List<Integer>> res) {
    if (n == null) return;
    path.add(n.val); rem -= n.val;
    if (n.left == null && n.right == null && rem == 0) res.add(new ArrayList<>(path));
    dfs(n.left, rem, path, res); dfs(n.right, rem, path, res);
    path.remove(path.size() - 1);
}

// Path Sum III (any downward path): prefix sums on the tree
int count = 0; Map<Long, Integer> pre = new HashMap<>();
int pathSum(TreeNode root, int target) { pre.put(0L, 1); dfs(root, 0L, target); return count; }
void dfs(TreeNode n, long sum, int target) {
    if (n == null) return;
    sum += n.val;
    count += pre.getOrDefault(sum - target, 0);
    pre.merge(sum, 1, Integer::sum);
    dfs(n.left, sum, target); dfs(n.right, sum, target);
    pre.merge(sum, -1, Integer::sum);                     // undo on the way back
}

// Lowest Common Ancestor (binary tree)
TreeNode lca(TreeNode r, TreeNode p, TreeNode q) {
    if (r == null || r == p || r == q) return r;
    TreeNode L = lca(r.left, p, q), R = lca(r.right, p, q);
    if (L != null && R != null) return r;
    return L != null ? L : R;
}
// LCA of BST: while (true) { if (both < r.val) r = r.left; else if (both > r.val) r = r.right; else return r; }

// Build tree from Preorder + Inorder (map inorder value -> index first)
Map<Integer, Integer> idx = new HashMap<>(); int pi = 0;
TreeNode build(int[] pre, int l, int r) {
    if (l > r) return null;
    TreeNode root = new TreeNode(pre[pi++]);
    int m = idx.get(root.val);
    root.left = build(pre, l, m - 1);
    root.right = build(pre, m + 1, r);
    return root;
}
// Inorder + Postorder: same idea, walk postorder from the END and build RIGHT before left

// Serialize / Deserialize (preorder with # for null)
String serialize(TreeNode r) { StringBuilder sb = new StringBuilder(); ser(r, sb); return sb.toString(); }
void ser(TreeNode n, StringBuilder sb) {
    if (n == null) { sb.append("#,"); return; }
    sb.append(n.val).append(',');
    ser(n.left, sb); ser(n.right, sb);
}
TreeNode deserialize(String data) { return des(new ArrayDeque<>(Arrays.asList(data.split(",")))); }
TreeNode des(Deque<String> q) {
    String s = q.poll();
    if (s.equals("#")) return null;
    TreeNode n = new TreeNode(Integer.parseInt(s));
    n.left = des(q); n.right = des(q);
    return n;
}

// Flatten Binary Tree to Linked List: reverse postorder with a prev pointer
TreeNode prev = null;
void flatten(TreeNode r) {
    if (r == null) return;
    flatten(r.right); flatten(r.left);
    r.right = prev; r.left = null; prev = r;
}

// Count Complete Tree Nodes: O(log^2 n)
int countNodes(TreeNode r) {
    if (r == null) return 0;
    int lh = 0, rh = 0; TreeNode a = r, b = r;
    while (a != null) { lh++; a = a.left; }
    while (b != null) { rh++; b = b.right; }
    if (lh == rh) return (1 << lh) - 1;                   // perfect tree
    return 1 + countNodes(r.left) + countNodes(r.right);
}

// Top View / Bottom View / Vertical Order: BFS carrying a column index
Queue<TreeNode> q = new ArrayDeque<>(); Queue<Integer> cols = new ArrayDeque<>();
TreeMap<Integer, Integer> top = new TreeMap<>();
q.offer(root); cols.offer(0);
while (!q.isEmpty()) {
    TreeNode n = q.poll(); int c = cols.poll();
    top.putIfAbsent(c, n.val);                            // bottom view: top.put(c, n.val) (overwrite)
    if (n.left != null) { q.offer(n.left); cols.offer(c - 1); }
    if (n.right != null) { q.offer(n.right); cols.offer(c + 1); }
}

// All Nodes Distance K: parent map (fill with a BFS from root), then BFS outward from target
Set<TreeNode> seen = new HashSet<>(); Queue<TreeNode> q = new ArrayDeque<>();
q.offer(target); seen.add(target); int dist = 0;
while (!q.isEmpty() && dist < k) {
    for (int sz = q.size(); sz > 0; sz--) {
        TreeNode n = q.poll();
        for (TreeNode nb : new TreeNode[]{n.left, n.right, parent.get(n)})
            if (nb != null && seen.add(nb)) q.offer(nb);
    }
    dist++;
}
// answer = values left in q

// ---------- BST ----------
// Validate BST: pass allowed (lo, hi) bounds down (use long to survive Integer.MIN_VALUE nodes)
boolean valid(TreeNode n, long lo, long hi) {
    if (n == null) return true;
    if (n.val <= lo || n.val >= hi) return false;
    return valid(n.left, lo, n.val) && valid(n.right, n.val, hi);
}
// call: valid(root, Long.MIN_VALUE, Long.MAX_VALUE)

// Insert into BST
TreeNode insert(TreeNode r, int v) {
    if (r == null) return new TreeNode(v);
    if (v < r.val) r.left = insert(r.left, v); else r.right = insert(r.right, v);
    return r;
}

// Delete Node in BST: 0 or 1 child -> return the other; 2 children -> copy inorder successor, delete it
TreeNode delete(TreeNode r, int key) {
    if (r == null) return null;
    if (key < r.val) r.left = delete(r.left, key);
    else if (key > r.val) r.right = delete(r.right, key);
    else {
        if (r.left == null) return r.right;
        if (r.right == null) return r.left;
        TreeNode s = r.right; while (s.left != null) s = s.left;
        r.val = s.val; r.right = delete(r.right, s.val);
    }
    return r;
}

// Kth Smallest in BST: iterative inorder, stop at the kth pop
Deque<TreeNode> st = new ArrayDeque<>(); TreeNode cur = root;
while (cur != null || !st.isEmpty()) {
    while (cur != null) { st.push(cur); cur = cur.left; }
    cur = st.pop();
    if (--k == 0) return cur.val;
    cur = cur.right;
}

// Sorted Array to Height-Balanced BST: middle is the root
TreeNode build(int[] a, int l, int r) {
    if (l > r) return null;
    int m = l + (r - l) / 2; TreeNode n = new TreeNode(a[m]);
    n.left = build(a, l, m - 1); n.right = build(a, m + 1, r);
    return n;
}
// Two Sum IV in BST: inorder to a list then two pointers, or HashSet while traversing
// Inorder Successor: if node has right subtree -> leftmost of it; else last ancestor where you went left
// BST Iterator: iterative inorder stack; next() pops and pushes the left chain of the right child
```

**Problems (DFS):** Inorder / Preorder / Postorder · Maximum and Minimum Depth · Same Tree · Symmetric Tree · Invert Tree · Subtree of Another Tree · Diameter · Balanced Tree · Path Sum I / II / III · Binary Tree Maximum Path Sum · Lowest Common Ancestor · Count Complete Tree Nodes · Flatten to Linked List · Construct from Pre+In / In+Post / Pre+Post · Serialize and Deserialize · Boundary Traversal (left boundary + leaves + reversed right boundary) · Sum Root to Leaf Numbers (carry `cur * 10 + val`) · Binary Tree Cameras (greedy DFS with 3 states) · House Robber III (P16).

**Problems (BFS):** Level Order · Zigzag Level Order · Right Side View · Left View · Average of Levels · Vertical Order · Top / Bottom View · Maximum Width (carry index 2i and 2i+1; width = last - first + 1) · Cousins in Binary Tree · Populating Next Right Pointers · All Nodes Distance K.

**Problems (BST):** Validate BST · Search / Insert / Delete in BST · Kth Smallest · LCA of BST · Sorted Array to BST · BST Iterator · Two Sum IV · Recover BST (inorder: find the two out-of-order nodes, swap values) · Closest BST Value · Convert BST to Greater Tree (reverse inorder running sum) · Construct BST from Preorder · Largest BST Subtree / Max Sum BST (DFS returns min, max, sum, isBST).

## P12. Heap / Priority Queue

**Trick:** need the min or max repeatedly while elements arrive or change. TOP K LARGEST → keep a MIN-heap of size k (the root is the kth largest). TOP K SMALLEST → MAX-heap of size k. Two heaps split a stream around the median. Heap ops are O(log n).

**Importance: ★★★.** **Pattern card**

- **Recognize:** top K / K-th, "repeatedly take the smallest/largest", merging K sorted streams, running median, scheduling by earliest deadline.
- **Brute force → optimized:** sort every time O(n log n) → heap of size K, O(n log K).
- **Invariant:** a size-K **min**-heap contains the K largest seen so far; its root is the K-th largest. (Smallest K → max-heap.)
- **Complexity:** push/pop O(log n), peek O(1); building from n elements O(n); space O(K).
- **Common bugs:** wrong heap direction; comparator subtraction overflow; assuming `PriorityQueue` iteration is sorted; `remove(Object)` is O(n); mutating objects already in the heap.
- **Follow-ups:** streaming K-th; sliding-window median (two heaps with lazy deletion or a `TreeMap`); decrease-key (use lazy deletion).
- **Practice:** *Easy* Last Stone Weight · Kth Largest Element in a Stream. *Medium* Kth Largest Element ([H16](#h16-kth-largest-element)) · Top K Frequent Elements ([H6](#h6-top-k-frequent-elements)) · K Closest Points to Origin · Task Scheduler · Reorganize String · Meeting Rooms II ([H12](#h12-meeting-rooms-ii)). *Hard* Merge k Sorted Lists · Find Median from Data Stream · Smallest Range Covering Elements from K Lists.

```java
// Kth Largest Element: min-heap of size k
PriorityQueue<Integer> pq = new PriorityQueue<>();
for (int x : a) { pq.offer(x); if (pq.size() > k) pq.poll(); }
return pq.peek();

// Top K Frequent Elements: min-heap by frequency, size k
PriorityQueue<Integer> pq = new PriorityQueue<>((x, y) -> Integer.compare(f.get(x), f.get(y)));
for (int key : f.keySet()) { pq.offer(key); if (pq.size() > k) pq.poll(); }

// K Closest Points to Origin: MAX-heap by distance, size k
PriorityQueue<int[]> pq = new PriorityQueue<>((p, q) -> Integer.compare(q[0]*q[0] + q[1]*q[1], p[0]*p[0] + p[1]*p[1]));
for (int[] pt : points) { pq.offer(pt); if (pq.size() > k) pq.poll(); }

// Find Median from Data Stream: lo = max-heap (lower half), hi = min-heap (upper half)
PriorityQueue<Integer> lo = new PriorityQueue<>(Collections.reverseOrder());
PriorityQueue<Integer> hi = new PriorityQueue<>();
void addNum(int x) {
    lo.offer(x); hi.offer(lo.poll());
    if (hi.size() > lo.size()) lo.offer(hi.poll());
}
double findMedian() { return lo.size() > hi.size() ? lo.peek() : (lo.peek() + hi.peek()) / 2.0; }

// Task Scheduler (cooldown n): formula, no heap needed
int[] f = new int[26]; for (char c : tasks) f[c - 'A']++;
int max = 0; for (int x : f) max = Math.max(max, x);
int cntMax = 0; for (int x : f) if (x == max) cntMax++;
return Math.max(tasks.length, (max - 1) * (n + 1) + cntMax);

// Reorganize String: always place the two most frequent different letters
PriorityQueue<int[]> pq = new PriorityQueue<>((x, y) -> Integer.compare(y[1], x[1]));      // {letter, count}
for (int i = 0; i < 26; i++) if (cnt[i] > 0) pq.offer(new int[]{'a' + i, cnt[i]});
StringBuilder sb = new StringBuilder();
while (pq.size() >= 2) {
    int[] x = pq.poll(), y = pq.poll();
    sb.append((char) x[0]).append((char) y[0]);
    if (--x[1] > 0) pq.offer(x);
    if (--y[1] > 0) pq.offer(y);
}
if (!pq.isEmpty()) { int[] last = pq.poll(); if (last[1] > 1) return ""; sb.append((char) last[0]); }
return sb.toString();

// Minimum Cost to Connect Ropes / Sticks (Huffman): repeatedly merge the two smallest
while (pq.size() > 1) { int s = pq.poll() + pq.poll(); cost += s; pq.offer(s); }

// K Pairs with Smallest Sums: heap of {sum, i, j}; start with (a[i] + b[0]) for each i, pop and push (i, j+1)
// Merge K Sorted Lists / Arrays: heap of the current head of each list (P9)
// Kth Smallest in Sorted Matrix: min-heap of row heads, pop k times (or binary search on value)
// Sort Characters by Frequency: count, max-heap by count, append char count times

// Implement Min Heap by hand (array, parent (i-1)/2, children 2i+1 and 2i+2)
class MinHeap {
    int[] h = new int[1000]; int size = 0;
    void push(int x) {
        h[size] = x; int i = size++;
        while (i > 0 && h[(i - 1) / 2] > h[i]) { swap(i, (i - 1) / 2); i = (i - 1) / 2; }   // sift up
    }
    int pop() {
        int top = h[0]; h[0] = h[--size]; int i = 0;
        while (true) {                                                                     // sift down
            int l = 2 * i + 1, r = 2 * i + 2, s = i;
            if (l < size && h[l] < h[s]) s = l;
            if (r < size && h[r] < h[s]) s = r;
            if (s == i) break;
            swap(i, s); i = s;
        }
        return top;
    }
    void swap(int i, int j) { int t = h[i]; h[i] = h[j]; h[j] = t; }
}
```

**Problems:** Kth Largest Element in an Array · Kth Largest in a Stream · Top K Frequent Elements / Words · Sort Characters by Frequency · K Closest Points · Find Median from Data Stream · Merge K Sorted Lists · Find K Pairs with Smallest Sums · Smallest Range Covering K Lists · Task Scheduler · Reorganize String · Minimum Cost to Connect Sticks / Ropes · Last Stone Weight (max-heap) · Meeting Rooms II (min-heap of end times) · Implement Priority Queue / Min Heap / Max Heap · Dijkstra (P13).

## P13. Graphs

**Trick:** first model it: nodes, edges, directed or not, weighted or not. Grid = graph with 4 neighbors. Pick the tool: reachability / components / cycle → DFS or Union-Find. Fewest steps (unweighted) → BFS. Ordering with dependencies → topological sort. Weighted shortest path → Dijkstra (no negative edges), Bellman-Ford (negative edges / at most K edges), Floyd-Warshall (all pairs, n ≤ 400). Always keep a `visited` structure.

**Importance: ★★★.** **Pattern card**

- **Recognize:** explicit edges, grids, dependencies, networks, "connected", "shortest", "minimum cost to connect", states that transition (words, puzzles, locks).
- **Brute force → optimized:** re-explore from every node O(V · (V + E)) → one traversal with a visited set O(V + E); weighted shortest paths with a heap.
- **Invariant:** BFS: nodes are dequeued in non-decreasing distance. Dijkstra: a popped node's distance is final. DSU: the roots represent connected components.
- **Complexity:** BFS/DFS/topological O(V + E); Dijkstra O((V + E) log V); Bellman-Ford O(VE); Floyd-Warshall O(V³).
- **Common bugs:** marking visited on dequeue (BFS); negative edges with Dijkstra; reversed edge direction in topological sort; `int` overflow of distances; recursion depth on large grids; forgetting multi-source initialization.
- **Follow-ups:** print the path (parent array); count shortest paths; detect negative cycles; dynamic connectivity (offline); 0-1 BFS.
- **Practice:** *Easy* Find if Path Exists in Graph. *Medium* Number of Islands ([H19](#h19-number-of-islands)) · Clone Graph · Course Schedule ([H8](#h8-course-schedule-i-and-ii)) · Rotting Oranges · Network Delay Time ([H10](#h10-network-delay-time)) · Accounts Merge ([H20](#h20-accounts-merge)) · Is Graph Bipartite · Cheapest Flights Within K Stops. *Hard* Word Ladder ([H9](#h9-word-ladder)) · Critical Connections in a Network · Alien Dictionary.

```java
// Build adjacency list
List<List<Integer>> g = new ArrayList<>();
for (int i = 0; i < n; i++) g.add(new ArrayList<>());
for (int[] e : edges) { g.get(e[0]).add(e[1]); g.get(e[1]).add(e[0]); }   // drop 2nd add if directed
// Weighted: List<int[]>[] g = new List[n]; init each; g[u].add(new int[]{v, w});

// ---------- GRID DFS: Number of Islands (also Flood Fill, Max Area of Island, Surrounded Regions)
// Recursive DFS can reach depth m*n (90,000 on a 300x300 grid) and overflow the stack: see the iterative version in H19.
int islands = 0;
for (int i = 0; i < m; i++) for (int j = 0; j < n; j++)
    if (g[i][j] == '1') { islands++; dfs(g, i, j); }
void dfs(char[][] g, int i, int j) {
    if (i < 0 || j < 0 || i >= g.length || j >= g[0].length || g[i][j] != '1') return;
    g[i][j] = '0';                                  // mark visited by sinking the land
    dfs(g, i + 1, j); dfs(g, i - 1, j); dfs(g, i, j + 1); dfs(g, i, j - 1);
}
// Surrounded Regions: DFS from border 'O's marking safe '#', then flip remaining O -> X and # -> O
// Pacific Atlantic: DFS INWARD from each ocean's border (to cells >= height), answer = cells reached by both

// ---------- BFS (shortest path / multi-source). Rotting Oranges:
Queue<int[]> q = new ArrayDeque<>(); int fresh = 0;
for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) {
    if (g[i][j] == 2) q.offer(new int[]{i, j}); else if (g[i][j] == 1) fresh++;
}
int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}}; int minutes = 0;
while (!q.isEmpty() && fresh > 0) {
    for (int sz = q.size(); sz > 0; sz--) {
        int[] c = q.poll();
        for (int[] d : dirs) {
            int x = c[0] + d[0], y = c[1] + d[1];
            if (x < 0 || y < 0 || x >= m || y >= n || g[x][y] != 1) continue;
            g[x][y] = 2; fresh--; q.offer(new int[]{x, y});
        }
    }
    minutes++;
}
return fresh == 0 ? minutes : -1;
// 01 Matrix: push ALL zeros first with dist 0, BFS, set dist of unvisited neighbor = dist + 1
// Shortest Path in Binary Matrix: BFS with 8 directions, answer = steps + 1

// ---------- Cycle detection
// Undirected: DFS with parent; a visited neighbor that is not the parent = cycle
boolean dfs(int u, int parent, boolean[] vis, List<List<Integer>> g) {
    vis[u] = true;
    for (int v : g.get(u)) {
        if (!vis[v]) { if (dfs(v, u, vis, g)) return true; }
        else if (v != parent) return true;
    }
    return false;
}
// Directed: state 0 = new, 1 = on current path, 2 = finished. Meeting state 1 = cycle
boolean dfs(int u, int[] state, List<List<Integer>> g) {
    state[u] = 1;
    for (int v : g.get(u)) {
        if (state[v] == 1) return true;
        if (state[v] == 0 && dfs(v, state, g)) return true;
    }
    state[u] = 2;
    return false;
}

// ---------- Topological sort (Kahn / BFS): Course Schedule I and II
int[] indeg = new int[n];
for (int[] p : prereq) { g.get(p[1]).add(p[0]); indeg[p[0]]++; }       // p[1] must come before p[0]
Queue<Integer> q = new ArrayDeque<>();
for (int i = 0; i < n; i++) if (indeg[i] == 0) q.offer(i);
List<Integer> order = new ArrayList<>();
while (!q.isEmpty()) {
    int u = q.poll(); order.add(u);
    for (int v : g.get(u)) if (--indeg[v] == 0) q.offer(v);
}
return order.size() == n;                // false means a cycle; 'order' is the valid ordering
// Alien Dictionary: for each adjacent word pair, first differing chars c1 -> c2 is an edge; if word2 is a
//   proper prefix of word1 -> invalid; topo sort the letters; cycle -> return empty string
// Eventual Safe Nodes: topo sort on the REVERSED graph, or DFS colors (state 2 = safe)

// ---------- Bipartite (2-coloring)
int[] color = new int[n]; Arrays.fill(color, -1);
for (int s = 0; s < n; s++) {
    if (color[s] != -1) continue;
    Queue<Integer> q = new ArrayDeque<>(); q.offer(s); color[s] = 0;
    while (!q.isEmpty()) {
        int u = q.poll();
        for (int v : graph[u]) {
            if (color[v] == -1) { color[v] = 1 - color[u]; q.offer(v); }
            else if (color[v] == color[u]) return false;
        }
    }
}
return true;

// ---------- Clone Graph: map old -> new
Map<Node, Node> map = new HashMap<>();
Node clone(Node n) {
    if (n == null) return null;
    if (map.containsKey(n)) return map.get(n);
    Node c = new Node(n.val); map.put(n, c);
    for (Node nb : n.neighbors) c.neighbors.add(clone(nb));
    return c;
}

// ---------- Word Ladder: BFS on words; remove from the set to mark visited
Set<String> dict = new HashSet<>(wordList);
if (!dict.contains(endWord)) return 0;
Queue<String> q = new ArrayDeque<>(); q.offer(beginWord); int steps = 1;
while (!q.isEmpty()) {
    for (int sz = q.size(); sz > 0; sz--) {
        String w = q.poll();
        if (w.equals(endWord)) return steps;
        char[] c = w.toCharArray();
        for (int i = 0; i < c.length; i++) {
            char orig = c[i];
            for (char ch = 'a'; ch <= 'z'; ch++) {
                c[i] = ch;
                if (dict.remove(new String(c))) q.offer(new String(c));
            }
            c[i] = orig;
        }
    }
    steps++;
}
return 0;

// ---------- DIJKSTRA (non-negative weights)
int[] dist = new int[n]; Arrays.fill(dist, Integer.MAX_VALUE); dist[src] = 0;
PriorityQueue<int[]> pq = new PriorityQueue<>((x, y) -> Integer.compare(x[1], y[1]));   // {node, distance}; use long dist if sums can exceed 2^31
pq.offer(new int[]{src, 0});
while (!pq.isEmpty()) {
    int[] cur = pq.poll(); int u = cur[0], d = cur[1];
    if (d > dist[u]) continue;                              // stale entry
    for (int[] e : g[u]) {                                  // e = {v, w}
        int v = e[0], nd = d + e[1];
        if (nd < dist[v]) { dist[v] = nd; pq.offer(new int[]{v, nd}); }
    }
}
// Network Delay Time: max(dist) or -1 if any is MAX.   Path With Minimum Effort / Swim in Rising Water:
//   same loop on a grid, but the 'distance' is max(prevCost, edgeCost) instead of a sum

// ---------- BELLMAN-FORD (negative edges, or 'at most K edges'): Cheapest Flights Within K Stops
int INF = Integer.MAX_VALUE; int[] dist = new int[n]; Arrays.fill(dist, INF); dist[src] = 0;
for (int i = 0; i <= k; i++) {                              // k stops = k + 1 edges
    int[] tmp = dist.clone();                               // relax from the OLD array only
    for (int[] f : flights)
        if (dist[f[0]] != INF) tmp[f[1]] = Math.min(tmp[f[1]], dist[f[0]] + f[2]);
    dist = tmp;
}
return dist[dst] == INF ? -1 : dist[dst];
// Negative cycle: run one more round; if anything still improves, there is one

// ---------- FLOYD-WARSHALL (all pairs); k MUST be the outer loop
for (int k = 0; k < n; k++) for (int i = 0; i < n; i++) for (int j = 0; j < n; j++)
    if (d[i][k] != INF && d[k][j] != INF) d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);
// Find the City With Smallest Number of Neighbors at a Threshold: run it, count d[i][j] <= threshold

// ---------- UNION-FIND (DSU)
class DSU {
    int[] parent, rank;
    DSU(int n) { parent = new int[n]; rank = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }
    int find(int x) { return parent[x] == x ? x : (parent[x] = find(parent[x])); }   // path compression
    boolean union(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;                         // already connected -> this edge makes a cycle
        if (rank[ra] < rank[rb]) { int t = ra; ra = rb; rb = t; }
        parent[rb] = ra; if (rank[ra] == rank[rb]) rank[ra]++;
        return true;
    }
}
// Kruskal MST: sort edges by weight, take an edge if union() succeeds
Arrays.sort(edges, (x, y) -> Integer.compare(x[2], y[2])); int cost = 0, used = 0;
for (int[] e : edges) if (dsu.union(e[0], e[1])) { cost += e[2]; if (++used == n - 1) break; }
// Prim: PQ of {node, edgeCost}, pop the cheapest edge to an unvisited node
// Number of Provinces: count successful unions, components = n - unions
// Redundant Connection: the first edge where union() returns false
// Accounts Merge: union accounts that share an email, then group emails by root
// Most Stones Removed: union row i with column (j + 10001), answer = stones - components
// Network Connected: if edges < n - 1 return -1, else components - 1
// Min Cost to Connect All Points: Kruskal/Prim on all pairs with Manhattan distance

// ---------- Bridges / Critical Connections (Tarjan): tin = discovery time, low = lowest reachable
void dfs(int u, int parent) {
    tin[u] = low[u] = timer++; vis[u] = true;
    for (int v : g.get(u)) {
        if (v == parent) continue;
        if (vis[v]) low[u] = Math.min(low[u], tin[v]);
        else {
            dfs(v, u);
            low[u] = Math.min(low[u], low[v]);
            if (low[v] > tin[u]) bridges.add(Arrays.asList(u, v));      // articulation point: low[v] >= tin[u]
        }
    }
}
```

**Problems:** Number of Islands · Flood Fill · Max Area of Island · Surrounded Regions · Pacific Atlantic Water Flow · Clone Graph · Number of Provinces · All Paths Source to Target · Keys and Rooms · Is Graph Bipartite · Cycle in Undirected / Directed Graph · Rotting Oranges · 01 Matrix · Shortest Path in Binary Matrix · Word Ladder · Snakes and Ladders (BFS over cells 1..n\*n) · Shortest Path Visiting All Nodes (BFS over bitmask state) · Course Schedule I and II · Alien Dictionary · Find Eventual Safe States · Find All Possible Recipes · Network Delay Time · Cheapest Flights Within K Stops · Path With Minimum Effort · Swim in Rising Water · City With Smallest Neighbors · Redundant Connection · Accounts Merge · Most Stones Removed · Making a Large Island (DSU or DFS labeling) · Min Cost to Connect All Points · Critical Connections / Bridges · Articulation Points · Longest Cycle in a Graph (functional graph: walk with step stamps).

## P14. Backtracking

**Trick:** CHOOSE → EXPLORE → UN-CHOOSE. It is DFS over a decision tree. Store a COPY of the path at the goal. Avoid duplicate results: sort, then `if (i > start && a[i] == a[i-1]) continue;`. Reuse allowed → recurse with `i`; no reuse → `i + 1`. Prune early (target exceeded, constraint broken). Time is exponential; n is small (≤ 20).

**Importance: ★★★.** **Pattern card**

- **Recognize:** "generate all", "return every", subsets/permutations/combinations/partitions, constraint satisfaction (N-Queens, Sudoku), n ≤ ~20.
- **Brute force → optimized:** generate everything then filter → prune as soon as a partial choice is impossible; precompute checks ([H23](#h23-palindrome-partitioning)).
- **Invariant:** `path` always represents a valid partial solution; after un-choosing, the state is exactly as before the choice.
- **Complexity:** exponential (subsets O(n · 2ⁿ); permutations O(n · n!)); stack depth O(n).
- **Common bugs:** adding the live `path` instead of a copy; not restoring state; duplicates (sort + skip equal siblings: `i > start && a[i] == a[i−1]`); reuse vs no-reuse index (`i` vs `i + 1`).
- **Follow-ups:** count only → DP; first solution only → return `true` early; large n → DP/bitmask or smarter search.
- **Practice:** *Easy* none canonical. *Medium* Subsets · Subsets II · Permutations · Combination Sum · Combination Sum II · Generate Parentheses · Palindrome Partitioning ([H23](#h23-palindrome-partitioning)) · Letter Combinations of a Phone Number · Word Search. *Hard* N-Queens · Sudoku Solver · Word Search II · Expression Add Operators.

```java
// Template
void backtrack(int start, List<Integer> path) {
    if (/* goal */) { res.add(new ArrayList<>(path)); return; }
    for (int i = start; i < n; i++) {
        if (i > start && a[i] == a[i - 1]) continue;       // skip duplicates (array sorted)
        path.add(a[i]);                                    // choose
        backtrack(i + 1, path);                            // explore (i if reuse allowed)
        path.remove(path.size() - 1);                      // un-choose
    }
}

// Subsets (I and II): every node of the tree is an answer
void sub(int[] a, int start, List<Integer> path) {
    res.add(new ArrayList<>(path));
    for (int i = start; i < a.length; i++) {
        if (i > start && a[i] == a[i - 1]) continue;       // only needed for Subsets II (sort first)
        path.add(a[i]); sub(a, i + 1, path); path.remove(path.size() - 1);
    }
}

// Permutations (I and II): used[] array
void perm(int[] a, boolean[] used, List<Integer> path) {
    if (path.size() == a.length) { res.add(new ArrayList<>(path)); return; }
    for (int i = 0; i < a.length; i++) {
        if (used[i]) continue;
        if (i > 0 && a[i] == a[i - 1] && !used[i - 1]) continue;   // Permutations II (sorted)
        used[i] = true; path.add(a[i]);
        perm(a, used, path);
        path.remove(path.size() - 1); used[i] = false;
    }
}

// Combination Sum (reuse allowed). Combination Sum II: recurse i + 1 and skip duplicates
void cs(int[] c, int start, int rem, List<Integer> path) {
    if (rem == 0) { res.add(new ArrayList<>(path)); return; }
    for (int i = start; i < c.length; i++) {
        if (c[i] > rem) break;                              // sorted -> prune
        path.add(c[i]); cs(c, i, rem - c[i], path); path.remove(path.size() - 1);
    }
}

// Generate Parentheses
void gen(int open, int close, int n, StringBuilder sb) {
    if (sb.length() == 2 * n) { res.add(sb.toString()); return; }
    if (open < n) { sb.append('('); gen(open + 1, close, n, sb); sb.deleteCharAt(sb.length() - 1); }
    if (close < open) { sb.append(')'); gen(open, close + 1, n, sb); sb.deleteCharAt(sb.length() - 1); }
}

// Palindrome Partitioning: try every prefix that is a palindrome
void part(String s, int start, List<String> path) {
    if (start == s.length()) { res.add(new ArrayList<>(path)); return; }
    for (int end = start; end < s.length(); end++)
        if (isPal(s, start, end)) { path.add(s.substring(start, end + 1)); part(s, end + 1, path); path.remove(path.size() - 1); }
}

// Letter Combinations of a Phone Number (return empty list if digits is empty)
String[] map = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
void go(String d, int i, StringBuilder sb) {
    if (i == d.length()) { res.add(sb.toString()); return; }
    for (char c : map[d.charAt(i) - '0'].toCharArray()) { sb.append(c); go(d, i + 1, sb); sb.deleteCharAt(sb.length() - 1); }
}

// N-Queens: columns + two diagonals as boolean arrays (r + c and r - c + n)
boolean[] cols = new boolean[n], d1 = new boolean[2 * n], d2 = new boolean[2 * n]; int[] pos = new int[n];
void solve(int r) {
    if (r == n) { /* build board from pos[] */ return; }
    for (int c = 0; c < n; c++) {
        if (cols[c] || d1[r + c] || d2[r - c + n]) continue;
        cols[c] = d1[r + c] = d2[r - c + n] = true; pos[r] = c;
        solve(r + 1);
        cols[c] = d1[r + c] = d2[r - c + n] = false;
    }
}

// Word Search: mark visited in place, restore on the way back
boolean dfs(char[][] b, String w, int i, int j, int k) {
    if (k == w.length()) return true;
    if (i < 0 || j < 0 || i >= b.length || j >= b[0].length || b[i][j] != w.charAt(k)) return false;
    char t = b[i][j]; b[i][j] = '#';
    boolean found = dfs(b, w, i + 1, j, k + 1) || dfs(b, w, i - 1, j, k + 1)
                 || dfs(b, w, i, j + 1, k + 1) || dfs(b, w, i, j - 1, k + 1);
    b[i][j] = t;
    return found;
}

// Restore IP Addresses: 4 segments, each 1-3 digits, 0-255, no leading zeros
void ip(String s, int start, List<String> parts, List<String> res) {
    if (parts.size() == 4) { if (start == s.length()) res.add(String.join(".", parts)); return; }
    for (int len = 1; len <= 3 && start + len <= s.length(); len++) {
        String seg = s.substring(start, start + len);
        if ((seg.length() > 1 && seg.charAt(0) == '0') || Integer.parseInt(seg) > 255) continue;
        parts.add(seg); ip(s, start + len, parts, res); parts.remove(parts.size() - 1);
    }
}

// Sudoku Solver: first empty cell, try 1-9, recurse, undo on failure
boolean solve(char[][] b) {
    for (int r = 0; r < 9; r++) for (int c = 0; c < 9; c++) {
        if (b[r][c] != '.') continue;
        for (char v = '1'; v <= '9'; v++)
            if (ok(b, r, c, v)) { b[r][c] = v; if (solve(b)) return true; b[r][c] = '.'; }
        return false;
    }
    return true;
}
boolean ok(char[][] b, int r, int c, char v) {
    for (int i = 0; i < 9; i++) {
        if (b[r][i] == v || b[i][c] == v) return false;
        if (b[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == v) return false;
    }
    return true;
}
// Rat in a Maze: grid DFS, mark visited, try D, L, R, U (lexicographic), unmark on return
// Partition to K Equal Sum Subsets: fill k buckets of size sum/k, sort descending to prune
// Subsets via bitmask when n <= 20: for (mask = 0; mask < (1 << n); mask++) ... (P18)
```

**Problems:** Subsets I / II · Permutations I / II · Combination Sum I / II / III · Generate Parentheses · Palindrome Partitioning · Letter Combinations of a Phone Number · Restore IP Addresses · N-Queens I / II · Word Search I / II (II uses a Trie, P17) · Sudoku Solver · Rat in a Maze · Path with Maximum Gold · Unique Paths III · Partition to K Equal Sum Subsets · Matchsticks to Square · Expression Add Operators · Word Break II · M-Coloring · Knight's Tour.

## P15. Greedy and Intervals

**Trick:** make the locally best choice and never look back. Almost always: SORT first, then one pass. Pick the sort key that makes the choice safe: END time for max non-overlapping, START time for merging, ratio for knapsack, custom comparator for 'largest number'. If you can't justify why greedy works with an exchange argument, check DP.

**Importance: ★★★.** **Pattern card**

- **Recognize:** intervals, scheduling, "minimum number of …", "can you reach", resource allocation; a natural sort key exists; local choices never hurt.
- **Brute force → optimized:** try all choices (exponential) or DP O(n²) → sort + one pass O(n log n).
- **Invariant:** after processing a prefix of the sorted order, the greedy partial solution is as good as any optimal partial solution (exchange argument).
- **Complexity:** typically O(n log n) (the sort) with O(1)–O(n) space.
- **Common bugs:** sorting by the wrong key (end vs start); `<` vs `<=` for touching intervals; applying greedy where DP is needed (weighted intervals, coin change with arbitrary coins); skipping the proof.
- **Follow-ups:** "prove it" (exchange argument); weighted version → DP; online version → heap.
- **Practice:** *Easy* Assign Cookies · Lemonade Change. *Medium* Best Time to Buy and Sell Stock II · Merge Intervals ([H11](#h11-merge-intervals)) · Non-overlapping Intervals · Jump Game · Jump Game II · Gas Station · Meeting Rooms II ([H12](#h12-meeting-rooms-ii)) · Partition Labels · Task Scheduler. *Hard* Candy · Minimum Number of Taps to Open to Water a Garden · The Skyline Problem.

```java
// Merge Intervals: sort by start
Arrays.sort(iv, (x, y) -> Integer.compare(x[0], y[0]));
List<int[]> res = new ArrayList<>();
for (int[] cur : iv) {
    if (res.isEmpty() || res.get(res.size() - 1)[1] < cur[0]) res.add(cur);
    else res.get(res.size() - 1)[1] = Math.max(res.get(res.size() - 1)[1], cur[1]);
}
return res.toArray(new int[0][]);

// Insert Interval (list already sorted): add before, merge overlaps, add after
List<int[]> res = new ArrayList<>(); int i = 0, n = iv.length;
while (i < n && iv[i][1] < nw[0]) res.add(iv[i++]);
while (i < n && iv[i][0] <= nw[1]) { nw[0] = Math.min(nw[0], iv[i][0]); nw[1] = Math.max(nw[1], iv[i][1]); i++; }
res.add(nw);
while (i < n) res.add(iv[i++]);

// Non-overlapping Intervals (min removals) = n - max kept. Sort by END. Same as Activity Selection
Arrays.sort(iv, (x, y) -> Integer.compare(x[1], y[1]));
int keep = 1, end = iv[0][1];
for (int i = 1; i < n; i++) if (iv[i][0] >= end) { keep++; end = iv[i][1]; }
return n - keep;

// Minimum Arrows to Burst Balloons: sort by END, new arrow when start > end
Arrays.sort(p, (x, y) -> Integer.compare(x[1], y[1]));
int arrows = 1, end = p[0][1];
for (int i = 1; i < n; i++) if (p[i][0] > end) { arrows++; end = p[i][1]; }

// Meeting Rooms II / Minimum Platforms: sort starts and ends separately
int[] s = new int[n], e = new int[n];
for (int i = 0; i < n; i++) { s[i] = iv[i][0]; e[i] = iv[i][1]; }
Arrays.sort(s); Arrays.sort(e);
int rooms = 0, j = 0;
for (int i = 0; i < n; i++) { if (s[i] < e[j]) rooms++; else j++; }     // platforms problem: use <=

// Jump Game: furthest reachable index
int reach = 0;
for (int i = 0; i < n; i++) { if (i > reach) return false; reach = Math.max(reach, i + a[i]); }
return true;

// Jump Game II: BFS by levels without a queue
int jumps = 0, curEnd = 0, far = 0;
for (int i = 0; i < n - 1; i++) {
    far = Math.max(far, i + a[i]);
    if (i == curEnd) { jumps++; curEnd = far; }
}

// Gas Station: if total gas >= total cost an answer exists; restart whenever the tank goes negative
int total = 0, tank = 0, start = 0;
for (int i = 0; i < n; i++) {
    int d = gas[i] - cost[i]; total += d; tank += d;
    if (tank < 0) { start = i + 1; tank = 0; }
}
return total >= 0 ? start : -1;

// Candy: two passes (left-to-right, then right-to-left)
int[] c = new int[n]; Arrays.fill(c, 1);
for (int i = 1; i < n; i++) if (r[i] > r[i - 1]) c[i] = c[i - 1] + 1;
for (int i = n - 2; i >= 0; i--) if (r[i] > r[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);

// Partition Labels: extend the end to the last occurrence of every char seen
int[] last = new int[26];
for (int i = 0; i < n; i++) last[s.charAt(i) - 'a'] = i;
int start = 0, end = 0;
for (int i = 0; i < n; i++) {
    end = Math.max(end, last[s.charAt(i) - 'a']);
    if (i == end) { res.add(end - start + 1); start = i + 1; }
}

// Largest Number: order strings by (b + a) vs (a + b)
String[] s = new String[n]; for (int i = 0; i < n; i++) s[i] = String.valueOf(a[i]);
Arrays.sort(s, (x, y) -> (y + x).compareTo(x + y));
if (s[0].equals("0")) return "0";
return String.join("", s);

// Fractional Knapsack: sort by value/weight descending; take whole items, then a fraction
Arrays.sort(items, (x, y) -> Double.compare((double) y[0] / y[1], (double) x[0] / x[1]));   // {value, weight}
double total = 0; int cap = W;
for (int[] it : items) {
    if (cap >= it[1]) { total += it[0]; cap -= it[1]; }
    else { total += (double) it[0] * cap / it[1]; break; }
}

// Assign Cookies: sort both, match smallest cookie that satisfies the smallest greed
Arrays.sort(g); Arrays.sort(s); int i = 0;
for (int j = 0; j < s.length && i < g.length; j++) if (s[j] >= g[i]) i++;
return i;
// Lemonade Change: keep counts of 5s and 10s; give change preferring a 10 + 5 over three 5s
// Car Pooling / Min Taps: difference array / interval cover. Task Scheduler: formula (P12)
```

**Problems:** Merge Intervals · Insert Interval · Non-overlapping Intervals · Minimum Arrows to Burst Balloons · Meeting Rooms I / II · Minimum Platforms · Activity Selection · Jump Game I / II · Gas Station · Candy · Partition Labels · Largest Number · Fractional Knapsack · Assign Cookies · Lemonade Change · Task Scheduler · Maximum Units on a Truck · Minimum Number of Taps to Water a Garden · Car Pooling · Hand of Straights · Best Time to Buy and Sell Stock II (sum of positive diffs) · Next Permutation (P4).

### Sweep line and interval utilities, added

**Idea.** Convert intervals to *events* (position, +1 for start, −1 for end), sort by position (ends before starts at equal positions when touching intervals do **not** overlap), then scan while maintaining a running count. Use it for "maximum overlap", "is there any overlap", "how many at time t" and capacity problems. When coordinates are small, a difference array replaces the sort.

```java
class IntervalUtilities {
    // Maximum number of simultaneously active half-open intervals [start, end): events sorted, ends first on ties
    static int maxOverlap(int[][] intervals) {
        int n = intervals.length;
        int[][] events = new int[2 * n][];
        for (int i = 0; i < n; i++) {
            events[2 * i] = new int[]{intervals[i][0], +1};
            events[2 * i + 1] = new int[]{intervals[i][1], -1};
        }
        Arrays.sort(events, (x, y) -> x[0] != y[0] ? Integer.compare(x[0], y[0]) : Integer.compare(x[1], y[1]));   // -1 before +1
        int cur = 0, best = 0;
        for (int[] e : events) { cur += e[1]; best = Math.max(best, cur); }
        return best;
    }

    // Car Pooling: trips {passengers, from, to}; difference array over positions 0..1000
    static boolean carPooling(int[][] trips, int capacity) {
        int[] diff = new int[1002];
        for (int[] t : trips) { diff[t[1]] += t[0]; diff[t[2]] -= t[0]; }       // passengers leave at 'to'
        int load = 0;
        for (int d : diff) { load += d; if (load > capacity) return false; }
        return true;
    }

    // Interval List Intersections: both lists sorted and internally disjoint. Two pointers.
    static int[][] intersect(int[][] A, int[][] B) {
        List<int[]> res = new ArrayList<>();
        int i = 0, j = 0;
        while (i < A.length && j < B.length) {
            int lo = Math.max(A[i][0], B[j][0]), hi = Math.min(A[i][1], B[j][1]);
            if (lo <= hi) res.add(new int[]{lo, hi});                           // overlap exists
            if (A[i][1] < B[j][1]) i++; else j++;                               // advance the one that ends first
        }
        return res.toArray(new int[0][]);
    }

    // Remove Covered Intervals: sort by start asc, end desc; count intervals whose end exceeds the max end seen
    static int removeCovered(int[][] iv) {
        int[][] a = iv.clone();
        Arrays.sort(a, (x, y) -> x[0] != y[0] ? Integer.compare(x[0], y[0]) : Integer.compare(y[1], x[1]));
        int kept = 0, maxEnd = Integer.MIN_VALUE;
        for (int[] cur : a) if (cur[1] > maxEnd) { kept++; maxEnd = cur[1]; }
        return kept;
    }
}
```

**Complexity.** Sorting dominates: O(n log n) time, O(n) space (Car Pooling with fixed bounds: O(n + range)). **Dry run (`intersect`).** A = `[[0,2],[5,10]]`, B = `[[1,5],[8,12]]`: `[0,2]∩[1,5] = [1,2]`; A[0] ends first → next A; `[5,10]∩[1,5] = [5,5]`; B[0] ends first → next B; `[5,10]∩[8,12] = [8,10]`. **Pitfalls.** Tie order of events (touching intervals); half-open vs closed endpoints (confirm with the interviewer); sorting `int[][]` with subtraction comparators. **Related:** Meeting Rooms I/II ([H12](#h12-meeting-rooms-ii)), The Skyline Problem (events + max-heap, Hard), My Calendar I/II/III, Employee Free Time (merge + gaps), Minimum Interval to Include Each Query (offline: sort queries + min-heap).

## P16. Dynamic Programming

**Importance: ★★★ (core).** **Trick:** DP = recursion with a cache. Define the state in words first ("`dp[i]` = best answer using the first i items" / "ending at i"), write the transition from smaller states, set the base cases, fix the evaluation order, then compress space if only the last row/value is needed. If you cannot state what `dp[i][j]` *means* in a sentence, the state is wrong.

**Recognition clues.** "Count the number of ways", "minimum/maximum cost", "is it possible", "longest/shortest subsequence", choices at each step, the same arguments recur, constraints around n ≤ 5,000 (O(n²)) or n·m ≤ 10⁷. **Counterexamples.** If a locally best choice is provably safe (sort + scan), greedy is enough ([P15](#p15-greedy-and-intervals)). If you must *list* every solution, it is backtracking ([P14](#p14-backtracking)), not DP.

**Core invariant.** Each `dp` entry is final when computed and depends only on entries computed earlier (check the loop order!). **Complexity.** (number of states) × (transition cost). **Brute force.** Exponential recursion; **DP fix:** memoize or tabulate.

**Choose the form.** Memoization (top-down): easiest to write, computes only reachable states, risks deep recursion (n ≈ 10⁴ can overflow Java's default stack). Tabulation (bottom-up): no recursion, enables rolling arrays, but you must get the order right.

### 16.1 Framework and templates

```java
// Top-down template (1D). Use Integer/long arrays with a sentinel for "not computed".
int[] memo;                                   // fill with -1
int f(int i) {
    if (i <= 1) return i;                     // base case(s)
    if (memo[i] != -1) return memo[i];
    return memo[i] = f(i - 1) + f(i - 2);     // transition from smaller states
}

// Bottom-up with O(1) space: Climbing Stairs / Fibonacci
int prev2 = 1, prev1 = 1;
for (int i = 2; i <= n; i++) { int cur = prev1 + prev2; prev2 = prev1; prev1 = cur; }
// answer = prev1   (n = 0 and n = 1 both give 1)

// House Robber: dp[i] = max(dp[i-1], dp[i-2] + a[i])   (rolling variables)
int take = 0, skip = 0;
for (int x : a) { int newTake = skip + x; skip = Math.max(skip, take); take = newTake; }
return Math.max(take, skip);
// House Robber II (circular): max(rob(a[0..n-2]), rob(a[1..n-1])); handle n == 1 separately

// Best Time to Buy and Sell Stock (one transaction): track the min so far
int minPrice = Integer.MAX_VALUE, profit = 0;
for (int p : prices) { minPrice = Math.min(minPrice, p); profit = Math.max(profit, p - minPrice); }
// Stock II (unlimited): sum of positive day-to-day gains (see P15)
// Stock with cooldown / fee: states hold/sold/rest, each updated from the previous day's states
```

### 16.2 Knapsack family

```java
// 0/1 knapsack: each item once. Iterate capacity DOWNWARD so item i is not reused.
int[] dp = new int[W + 1];
for (int i = 0; i < n; i++)
    for (int w = W; w >= wt[i]; w--) dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
// answer dp[W]

// Unbounded knapsack / Coin Change (min coins): iterate UPWARD so items repeat
int INF = Integer.MAX_VALUE / 2;
int[] dp = new int[amount + 1]; Arrays.fill(dp, INF); dp[0] = 0;
for (int c : coins)
    for (int a = c; a <= amount; a++) dp[a] = Math.min(dp[a], dp[a - c] + 1);
return dp[amount] >= INF ? -1 : dp[amount];

// Coin Change II (count COMBINATIONS): coins in the OUTER loop. Swapping loops counts permutations.
int[] ways = new int[amount + 1]; ways[0] = 1;
for (int c : coins) for (int a = c; a <= amount; a++) ways[a] += ways[a - c];

// Combination Sum IV (count ORDERED sequences / permutations): amount in the OUTER loop
// Perfect Squares: coin change with coins = 1, 4, 9, ...
// Subset Sum / Partition Equal Subset Sum / Target Sum: see H27
// Rod Cutting / Integer Break: unbounded knapsack variants
```

**Loop-order cheat:** `0/1` → inner loop *downward*; `unbounded` → inner loop *upward*; *combinations* → items outer; *permutations* → target outer.

### 16.3 Sequences and strings (2D DP)

```java
// Longest Common Subsequence: dp[i][j] over prefixes s[0..i), t[0..j)
int[][] dp = new int[m + 1][n + 1];
for (int i = 1; i <= m; i++)
    for (int j = 1; j <= n; j++)
        dp[i][j] = s.charAt(i - 1) == t.charAt(j - 1) ? dp[i - 1][j - 1] + 1
                                                       : Math.max(dp[i - 1][j], dp[i][j - 1]);
// answer dp[m][n]. Longest Palindromic Subsequence = LCS(s, reverse(s)).
// Space: only the previous row is needed -> two rolling int[n + 1] arrays.

// Edit Distance (insert, delete, replace)
for (int i = 0; i <= m; i++) dp[i][0] = i;
for (int j = 0; j <= n; j++) dp[0][j] = j;
for (int i = 1; i <= m; i++)
    for (int j = 1; j <= n; j++)
        dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1) ? dp[i - 1][j - 1]
                 : 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));

// Longest Common Substring (CONTIGUOUS): reset to 0 on mismatch, track the global best
// Distinct Subsequences: dp[i][j] = dp[i-1][j] + (s[i-1]==t[j-1] ? dp[i-1][j-1] : 0)
// Interleaving String, Wildcard Matching, Regular Expression Matching: dp[i][j] on prefixes, branch on pattern char
// Shortest Common Supersequence = m + n - LCS (reconstruct by walking the table)
// Longest Increasing Subsequence: O(n^2) DP and O(n log n) tails array, see H1
// Number of LIS: keep len[i] and cnt[i]; Russian Doll Envelopes: sort, then LIS
// Maximum Length of Repeated Subarray: longest common substring
// Palindromic Substrings (count): center expansion, or pal[i][j] table (see H22, H23)
```

### 16.4 Grid DP and path counting

```java
// Unique Paths: dp[j] += dp[j - 1] (rolling row)
int[] dp = new int[n]; Arrays.fill(dp, 1);
for (int i = 1; i < m; i++) for (int j = 1; j < n; j++) dp[j] += dp[j - 1];
// Unique Paths II (obstacles): set dp[j] = 0 on an obstacle cell; seed dp[0] from the first cell
// Minimum Path Sum: dp[i][j] = g[i][j] + min(dp[i-1][j], dp[i][j-1])
// Triangle: bottom-up, dp[j] = tri[i][j] + min(dp[j], dp[j + 1])
// Maximal Square: dp[i][j] = 1 + min(up, left, diag) when g[i][j] == '1'; answer = best^2
// Dungeon Game: process from the bottom-right (min health needed), not the top-left
// Cherry Pickup: two walkers moving together, state (step, r1, r2)
// Longest Increasing Path in a Matrix: DFS + memo (the DAG of strictly increasing moves has no cycles)
```

### 16.5 Interval DP, tree DP, bitmask DP

```java
// Interval DP: dp[l][r] built by increasing LENGTH, splitting at k. O(n^3).
// Burst Balloons: dp[l][r] = max over k (last balloon burst in (l, r)) of dp[l][k] + dp[k][r] + a[l]*a[k]*a[r]
int[] v = new int[n + 2]; v[0] = v[n + 1] = 1;
for (int i = 0; i < n; i++) v[i + 1] = nums[i];
int[][] dp = new int[n + 2][n + 2];
for (int len = 2; len <= n + 1; len++)
    for (int l = 0; l + len <= n + 1; l++) {
        int r = l + len;
        for (int k = l + 1; k < r; k++)
            dp[l][r] = Math.max(dp[l][r], dp[l][k] + v[l] * v[k] * v[r] + dp[k][r]);
    }
// answer dp[0][n + 1]
// Same shape: Matrix Chain Multiplication, Minimum Cost to Merge Stones, Palindrome Partitioning II, Strange Printer

// Tree DP (House Robber III): each node returns {robThis, skipThis}
int[] rob(TreeNode n) {
    if (n == null) return new int[]{0, 0};
    int[] L = rob(n.left), R = rob(n.right);
    int take = n.val + L[1] + R[1];                 // children must be skipped
    int skip = Math.max(L[0], L[1]) + Math.max(R[0], R[1]);
    return new int[]{take, skip};
}
// Other tree DPs: Diameter, Max Path Sum (P11), Binary Tree Cameras (3 states), Largest BST Subtree

// Bitmask DP: state = subset of items used. Practical for n <= 20. Full example: TSP in H28.
// Partition to K Equal Sum Subsets: dp[mask] = sum of items in mask mod target, or -1 if unreachable
// Count/Assign tasks to people: dp[mask] = ways with the first popcount(mask) people assigned
```

### 16.6 Recognition, pitfalls, follow-ups

| Problem statement says | State to try |
| --- | --- |
| "ending at i", best subsequence/subarray | `dp[i]` (1D) |
| two strings or two sequences | `dp[i][j]` on prefixes |
| items + capacity / target sum | `dp[i][w]` or `dp[w]` (knapsack) |
| grid path, moves right/down | `dp[i][j]` over cells |
| choose a split point in a range | interval DP `dp[l][r]` |
| subset of ≤ 20 things | `dp[mask]` or `dp[mask][last]` |
| tree rooted decisions (take/skip a node) | DFS returning a small tuple per node |
| digits of a number with a constraint | digit DP `(position, tight, state)` *(advanced, rare)* |

**Common bugs.** Wrong base case (`dp[0]` meaning); iterating in an order where a dependency is not yet computed; `INF + INF` overflow (use `MAX_VALUE / 2`); mixing combinations and permutations; forgetting that 1D compression of 0/1 knapsack requires a *downward* loop; `StackOverflowError` from memoized recursion at depth ~10⁴ (convert to bottom-up or raise the thread stack).

**Typical follow-ups.** "Print the actual solution" → store parents or walk the table backward. "Reduce space" → keep only the last row/column. "Now the array is huge / values are large" → look for a different state (LIS tails, bitset) or greedy structure. "Count modulo 1e9+7" → add `% MOD` at every addition and watch `long` overflow in products.

**Difficulty-tagged practice.** *Easy:* Climbing Stairs · Min Cost Climbing Stairs · Best Time to Buy and Sell Stock · House Robber. *Medium:* Coin Change · Coin Change II · Longest Increasing Subsequence · Longest Common Subsequence · Unique Paths I/II · Minimum Path Sum · Partition Equal Subset Sum · Target Sum · Word Break · Decode Ways · Maximum Product Subarray · Edit Distance (Medium) · Longest Palindromic Subsequence · House Robber II/III · Best Time to Buy and Sell Stock with Cooldown · Perfect Squares · Triangle · Maximal Square · Longest Increasing Path in a Matrix. *Hard:* Burst Balloons · Regular Expression Matching · Wildcard Matching · Distinct Subsequences · Interleaving String · Minimum Window Subsequence · Cherry Pickup · Dungeon Game · Russian Doll Envelopes · Partition to K Equal Sum Subsets · Shortest Path Visiting All Nodes.

## P17. Trie

**Importance: ★★ (common).** **Trick:** a tree where each edge is a character; a root-to-node path spells a prefix. Use it for prefix queries (autocomplete, "starts with"), many-word dictionary lookups, and word-search-on-grid pruning. For single-word lookup a `HashSet` is simpler.

**Recognition clues.** "Prefix", "dictionary of many words", "autocomplete", "words on a board", "maximum XOR of two numbers". **Counterexamples.** Exact membership only → `HashSet`; one pattern in one text → KMP/Z ([P19](#p19-string-algorithms)).

**Invariant.** The node reached by walking a string's characters represents exactly that prefix; `isEnd` marks complete words. **Complexity.** Insert/search/startsWith: O(L) per word of length L; memory O(total characters × alphabet) in the array version.

```java
class Trie {
    private static class Node {
        Node[] next = new Node[26];          // lowercase letters; use HashMap<Character, Node> for large alphabets
        boolean end;
    }
    private final Node root = new Node();

    void insert(String w) {
        Node cur = root;
        for (char c : w.toCharArray()) {
            int i = c - 'a';
            if (cur.next[i] == null) cur.next[i] = new Node();
            cur = cur.next[i];
        }
        cur.end = true;
    }

    boolean search(String w) { Node n = find(w); return n != null && n.end; }
    boolean startsWith(String p) { return find(p) != null; }

    private Node find(String s) {
        Node cur = root;
        for (char c : s.toCharArray()) {
            cur = cur.next[c - 'a'];
            if (cur == null) return null;
        }
        return cur;
    }
}
```

```java
// Word Search II: build a Trie of words, DFS the board once, prune when the current prefix leaves the Trie.
//   Store the full word at the end node (node.word != null) and set it to null after finding it to avoid duplicates.
// Replace Words / Longest Word in Dictionary: walk the Trie and stop at the first/last end marker
// Design Add and Search Words (with '.'): DFS over children when the pattern char is '.'
// Count prefix matches: keep an int count on every node (Map Sum Pairs, Prefix and Suffix Search)

// Maximum XOR of Two Numbers: binary Trie over the bits (31 down to 0).
// For each number, greedily walk the OPPOSITE bit when it exists.
int[][] ch = new int[32 * n + 1][2]; int size = 1;                    // node 0 is the root; ch[v][b] = 0 means none
void insert(int x) {
    int cur = 0;
    for (int b = 30; b >= 0; b--) {                                    // values are non-negative ints
        int bit = x >> b & 1;
        if (ch[cur][bit] == 0) ch[cur][bit] = size++;
        cur = ch[cur][bit];
    }
}
int maxXorWith(int x) {
    int cur = 0, res = 0;
    for (int b = 30; b >= 0; b--) {
        int want = (x >> b & 1) ^ 1;
        if (ch[cur][want] != 0) { res |= 1 << b; cur = ch[cur][want]; }
        else cur = ch[cur][1 - want];
    }
    return res;
}
```

**Pitfalls.** Forgetting `end` (prefix ≠ word); `new Node[26]` per node is heavy for huge dictionaries (use compact arrays or maps); uppercase/non-letter input crashes `c - 'a'`; for the XOR Trie, call `insert` before `maxXorWith` on a non-empty structure.

**Problems.** *Medium:* Implement Trie · Design Add and Search Words · Replace Words · Map Sum Pairs · Maximum XOR of Two Numbers in an Array · Longest Word in Dictionary · Search Suggestions System. *Hard:* Word Search II · Palindrome Pairs · Concatenated Words.

## P18. Bit Manipulation

**Importance: ★★ (common, high payoff).** **Trick:** integers are bit vectors. XOR cancels pairs (`a ^ a = 0`, `a ^ 0 = a`), `x & (x - 1)` clears the lowest set bit, `x & -x` isolates it, masks represent subsets for n ≤ 20.

**Recognition clues.** "Appears twice except one", "power of two", "count set bits", "all subsets of ≤ 20 items", "without extra space", "XOR", "parity". **Counterexamples.** Need order or counts → a map.

```java
// Essentials (use >>> for logical shift of negative ints)
x & 1                       // is odd
x >> k & 1                  // k-th bit (0-indexed from the right)
x | (1 << k)                // set bit k           x & ~(1 << k)   // clear bit k       x ^ (1 << k)  // toggle
x & (x - 1)                 // clear the lowest set bit (x != 0)
x & -x                      // isolate the lowest set bit
(x & (x - 1)) == 0 && x > 0 // power of two
Integer.bitCount(x)  Integer.numberOfTrailingZeros(x)  Integer.highestOneBit(x)  Long.bitCount(v)
1 << 31 == Integer.MIN_VALUE        // careful: shifting by >= 32 uses (shift % 32) in Java
1L << 40                            // use a long literal for wide masks

// Single Number: XOR everything
int r = 0; for (int x : a) r ^= x;

// Single Number III (two unique): split by the lowest differing bit
int xor = 0; for (int x : a) xor ^= x;
int low = xor & -xor, p = 0, q = 0;
for (int x : a) { if ((x & low) == 0) p ^= x; else q ^= x; }

// Single Number II (others appear 3 times): count each bit position mod 3
int res = 0;
for (int b = 0; b < 32; b++) { int cnt = 0; for (int x : a) cnt += x >> b & 1; if (cnt % 3 != 0) res |= 1 << b; }

// Counting Bits: dp[i] = dp[i >> 1] + (i & 1)
// Missing Number: XOR of 0..n with all elements. Hamming Distance: bitCount(x ^ y)
// Reverse Bits / Number of 1 Bits: loop 32 times or use x & (x - 1)
// Subsets by mask (n <= 20): for (int mask = 0; mask < (1 << n); mask++) for (int i = 0; i < n; i++) if ((mask >> i & 1) == 1) ...
// Iterate all submasks of m: for (int s = m; s > 0; s = (s - 1) & m) { ... }   // then handle s = 0 separately
// Gray code: i ^ (i >> 1)
// Sum of Two Integers (no +): while (b != 0) { int carry = (a & b) << 1; a ^= b; b = carry; }
```

**Pitfalls.** Operator precedence: `==` binds tighter than `&`, so write `(x & 1) == 1`. `>>` keeps the sign bit; `>>>` does not. `Math.abs(Integer.MIN_VALUE)` and `-Integer.MIN_VALUE` stay negative. Shift counts wrap modulo 32 (or 64 for `long`).

**Problems.** *Easy:* Single Number · Number of 1 Bits · Missing Number · Power of Two · Counting Bits · Reverse Bits · Hamming Distance. *Medium:* Single Number II / III · Subsets (bitmask) · Sum of Two Integers · Maximum XOR of Two Numbers (with a Trie) · Bitwise AND of Numbers Range (common prefix of both ends) · Maximum Product of Word Lengths. *Hard:* Minimum Number of Work Sessions · Smallest Sufficient Team · Shortest Path Visiting All Nodes (bitmask DP/BFS).

## P19. String Algorithms

**Importance: ★★ (KMP/Z/rolling hash: occasionally asked; hashing/frequency/palindromes: very common).** Everyday string problems use the patterns in P1, P2, P6 and P16. Reach for the algorithms below when asked for **linear-time substring search**, **repeated-pattern detection**, or **comparing many substrings quickly**.

### 19.1 Quick map

| Task | Tool |
| --- | --- |
| Anagram / permutation check | count array `int[26]` or a sorted-key map (P6) |
| Longest palindromic substring | center expansion O(n²), Manacher O(n) (H22) |
| Is `p` a substring of `s`? Find all occurrences | KMP or Z (O(n + m)); `indexOf` is fine in practice |
| Longest prefix that is also a suffix; repeated-substring checks | KMP failure function |
| Compare / search many substrings, duplicates of length L | rolling hash (Rabin-Karp) |
| Prefix queries over many words | Trie (P17) |
| Matching with wildcards | DP (P16) |

### 19.2 KMP (prefix function)

`lps[i]` = length of the longest proper prefix of `p[0..i]` that is also a suffix of it. On a mismatch, fall back to `lps[len - 1]` instead of restarting.

```java
class Kmp {
    static int[] buildLps(String p) {
        int[] lps = new int[p.length()];
        for (int i = 1, len = 0; i < p.length(); ) {
            if (p.charAt(i) == p.charAt(len)) lps[i++] = ++len;
            else if (len > 0) len = lps[len - 1];             // fall back, do not advance i
            else lps[i++] = 0;
        }
        return lps;
    }

    // Starting indices of all occurrences of p in s
    static List<Integer> findAll(String s, String p) {
        List<Integer> res = new ArrayList<>();
        if (p.isEmpty()) return res;
        int[] lps = buildLps(p);
        for (int i = 0, j = 0; i < s.length(); ) {
            if (s.charAt(i) == p.charAt(j)) { i++; j++; }
            if (j == p.length()) { res.add(i - j); j = lps[j - 1]; }
            else if (i < s.length() && s.charAt(i) != p.charAt(j)) {
                if (j > 0) j = lps[j - 1]; else i++;
            }
        }
        return res;
    }
}
// Repeated Substring Pattern: let L = lps[n - 1]; true iff L > 0 and n % (n - L) == 0
// Shortest Palindrome: lps of s + "#" + reverse(s); answer = reverse(s.substring(lps_last)) + s
```

**Complexity.** O(n + m) time, O(m) space. **Dry run** for `p = "abab"`: `lps = [0,0,1,2]`. Searching `"ababab"` finds matches at 0 and 2.

### 19.3 Z algorithm

`z[i]` = length of the longest substring starting at `i` that matches a prefix of the string. Search by building `z` for `p + '#' + s`; every `z[i] == |p|` is an occurrence.

```java
class ZAlgo {
    static int[] zArray(String s) {
        int n = s.length();
        int[] z = new int[n];
        for (int i = 1, l = 0, r = 0; i < n; i++) {               // [l, r) is the rightmost matching window
            if (i < r) z[i] = Math.min(r - i, z[i - l]);
            while (i + z[i] < n && s.charAt(z[i]) == s.charAt(i + z[i])) z[i]++;
            if (i + z[i] > r) { l = i; r = i + z[i]; }
        }
        return z;
    }
}
```

**Complexity.** O(n). Choose Z when you think in terms of "matches the prefix"; choose KMP when you think "longest border".

### 19.4 Rolling hash (Rabin-Karp) and Manacher

```java
// Polynomial hash with a large modulus. Use long, and a second modulus (or a random base) to avoid collisions.
class RollingHash {
    static final long MOD = 1_000_000_007L, BASE = 911_382_323L;
    final long[] h, pw;
    RollingHash(String s) {
        int n = s.length();
        h = new long[n + 1]; pw = new long[n + 1]; pw[0] = 1;
        for (int i = 0; i < n; i++) {
            h[i + 1] = (h[i] * BASE + s.charAt(i)) % MOD;
            pw[i + 1] = pw[i] * BASE % MOD;
        }
    }
    long get(int l, int r) {                                       // hash of s[l..r) in O(1)
        return ((h[r] - h[l] * pw[r - l]) % MOD + MOD) % MOD;
    }
}
// Longest Duplicate Substring: binary search on length L (monotone: if length L repeats, L - 1 does),
//   slide a window of L with get(i, i + L), store hashes in a HashSet, verify matches to guard against collisions.
// Repeated DNA Sequences: fixed window of 10, HashSet of window strings (or hashes)
// Hash collisions: equal hashes do NOT prove equal strings. Verify with equals() when correctness matters.
```

```java
// Manacher: longest palindromic substring in O(n) (advanced). Interleave separators: "abc" -> "^#a#b#c#$".
class Manacher {
    static String longestPalindrome(String s) {
        StringBuilder sb = new StringBuilder("^");
        for (char c : s.toCharArray()) sb.append('#').append(c);
        sb.append("#$");
        String t = sb.toString();
        int n = t.length(), center = 0, right = 0, bestLen = 0, bestCenter = 0;
        int[] p = new int[n];                                      // p[i] = palindrome radius in t
        for (int i = 1; i < n - 1; i++) {
            if (i < right) p[i] = Math.min(right - i, p[2 * center - i]);
            while (t.charAt(i + 1 + p[i]) == t.charAt(i - 1 - p[i])) p[i]++;
            if (i + p[i] > right) { center = i; right = i + p[i]; }
            if (p[i] > bestLen) { bestLen = p[i]; bestCenter = i; }
        }
        int start = (bestCenter - bestLen) / 2;
        return s.substring(start, start + bestLen);
    }
}
```

**Pitfalls.** Off-by-one in the KMP fallback (never advance `i` on a fallback); Rabin-Karp with a small modulus (collisions) or negative modulo results; forgetting that sentinels `^`/`$`/`#` must not appear in the input.

**Problems.** *Easy:* Find the Index of the First Occurrence in a String · Valid Anagram · Valid Palindrome · Longest Common Prefix. *Medium:* Repeated Substring Pattern · Longest Palindromic Substring · Palindromic Substrings · Group Anagrams · Find All Anagrams · Repeated DNA Sequences · Shortest Palindrome (Hard in LeetCode; KMP). *Hard:* Longest Duplicate Substring (rolling hash + binary search) · Distinct Echo Substrings · Palindrome Pairs (Trie or hashing).

## P20. Advanced Structures

**Importance: ★ (advanced; learn Fenwick and prefix sums first, the rest if time permits).** Use these when the problem asks for **many range queries with updates**, **offline processing**, or **ancestor/range queries on static data**. Mark: ★★ Fenwick tree, coordinate compression; ★ segment tree, sparse table, binary lifting; ☆ offline techniques.

### 20.1 Which range structure?

| Operations needed | Static array | With point updates | With range updates |
| --- | --- | --- | --- |
| Range **sum** | prefix sums | Fenwick (BIT) or segment tree | segment tree + lazy, or two Fenwicks |
| Range **min/max** | sparse table O(1) per query, O(n log n) build | segment tree | segment tree + lazy |
| Range **add**, point query | difference array | Fenwick on the difference array | |
| Count of elements < x so far | sort + binary search | Fenwick + coordinate compression | |

### 20.2 Fenwick tree (Binary Indexed Tree)

Point update, prefix query, both O(log n). `i & -i` is the lowest set bit; each cell stores the sum of a block that ends at that index. **1-indexed.**

```java
class Fenwick {
    private final long[] t;
    Fenwick(int n) { t = new long[n + 1]; }
    void add(int i, long delta) { for (; i < t.length; i += i & -i) t[i] += delta; }       // a[i] += delta, i in 1..n
    long prefix(int i) { long s = 0; for (; i > 0; i -= i & -i) s += t[i]; return s; }      // sum of a[1..i]
    long range(int l, int r) { return prefix(r) - prefix(l - 1); }                          // sum of a[l..r]
}
// Range add + point query: add(l, +v); add(r + 1, -v) on a Fenwick of differences; point query = prefix(i)
// Counting inversions / smaller-to-the-right: see H25
// Initialization in O(n): copy values, then for each i do { int j = i + (i & -i); if (j <= n) t[j] += t[i]; }
```

### 20.3 Segment tree (sum, point update, range query)

Iterative bottom-up version: shortest to write. Use the recursive version only when you need lazy propagation.

```java
class SegmentTree {
    private final int n;
    private final long[] t;                                     // leaves at [n, 2n)
    SegmentTree(int[] a) {
        n = a.length;
        t = new long[2 * n];
        for (int i = 0; i < n; i++) t[n + i] = a[i];
        for (int i = n - 1; i > 0; i--) t[i] = t[2 * i] + t[2 * i + 1];
    }
    void update(int i, long value) {                            // a[i] = value, 0-indexed
        for (t[i += n] = value; i > 1; i >>= 1) t[i >> 1] = t[i] + t[i ^ 1];
    }
    long query(int l, int r) {                                  // sum over [l, r), half-open
        long res = 0;
        for (l += n, r += n; l < r; l >>= 1, r >>= 1) {
            if ((l & 1) == 1) res += t[l++];
            if ((r & 1) == 1) res += t[--r];
        }
        return res;
    }
}
// For min/max: replace + by Math.min/Math.max and the identity by Long.MAX_VALUE / Long.MIN_VALUE.
// Range-update + range-query: add lazy propagation (recursive version). Rarely required in interviews.
// Problems: Range Sum Query - Mutable, Count of Range Sum, The Skyline Problem, My Calendar III, Falling Squares
```

### 20.4 Sparse table (static range min/max in O(1))

```java
class SparseTable {
    private final int[][] st;                                   // st[k][i] = min of a[i .. i + 2^k)
    private final int[] log;
    SparseTable(int[] a) {
        int n = a.length;
        log = new int[n + 1];
        for (int i = 2; i <= n; i++) log[i] = log[i / 2] + 1;
        int K = log[n] + 1;
        st = new int[K][n];
        st[0] = a.clone();
        for (int k = 1; k < K; k++)
            for (int i = 0; i + (1 << k) <= n; i++)
                st[k][i] = Math.min(st[k - 1][i], st[k - 1][i + (1 << (k - 1))]);
    }
    int min(int l, int r) {                                      // inclusive [l, r]
        int k = log[r - l + 1];
        return Math.min(st[k][l], st[k][r - (1 << k) + 1]);      // two overlapping blocks (fine for min/max, not for sums)
    }
}
```

### 20.5 Coordinate compression and offline queries

```java
// Coordinate compression: replace huge/negative values with ranks 0..m-1 (order-preserving)
int[] sorted = Arrays.stream(a).distinct().sorted().toArray();
int rank = Arrays.binarySearch(sorted, a[i]);                   // 0-based rank of a[i]
// Use it before a Fenwick/segment tree when values are up to 1e9 or negative.
```

**Offline idea.** If queries need not be answered online, sort them (by right endpoint, by threshold, by time) and process them together with a growing structure: e.g., "count of distinct values in [l, r]": sort queries by `r`, sweep `r`, keep a Fenwick tree with a 1 at each value's *latest* position. Also: Number of Islands II (DSU adds), Sliding-window medians. Mo's algorithm, persistent trees, and heavy-light decomposition are **out of scope** here.

**Binary lifting / LCA:** full implementation in [H26](#h26-lowest-common-ancestor-single-query-vs-many-queries).

**Pitfalls.** 0-indexed vs 1-indexed Fenwick (index 0 loops forever); segment tree half-open vs inclusive ranges; sparse table is for *idempotent* operations only (min/max/gcd, not sum); forgetting compression when values are negative.

**Problems.** *Medium:* Range Sum Query - Mutable · Count of Smaller Numbers After Self (Hard) · Reverse Pairs (Hard) · Range Sum Query 2D - Mutable (Hard) · Kth Ancestor of a Tree Node (Hard) · Queue Reconstruction by Height · Count of Range Sum (Hard) · The Skyline Problem (Hard) · My Calendar III (Hard).

## P21. Sorting Toolbox

**Importance: ★★.** Know *which* sort Java uses, when a non-comparison sort beats O(n log n), and how partition-based selection works.

| Sort | Time (worst / average) | Space | Stable | Notes |
| --- | --- | --- | --- | --- |
| Merge sort | n log n / n log n | O(n) | Yes | D&C, counting inversions (H21), linked lists (P9) |
| Quicksort | n² / n log n | O(log n) avg stack | No | partition; randomize the pivot; 3-way for duplicates |
| Heap sort | n log n / n log n | O(1) | No | in-place, poor cache behavior |
| Insertion sort | n² / n² (n best on sorted) | O(1) | Yes | fastest for tiny n and nearly-sorted data |
| Counting sort | n + k | O(n + k) | Yes (as written) | small integer range k |
| Radix sort | d · (n + b) | O(n + b) | Yes | fixed-width keys; LSD with a stable inner sort |
| Bucket sort | n + k / n² worst | O(n + k) | Depends | uniform distribution, Top K Frequent |

**Java specifics.** `Arrays.sort(int[])` and other primitive arrays use a dual-pivot quicksort (O(n log n) typical). To my knowledge, JDK 14+ adds a heap-sort fallback that bounds the worst case; on older judges (e.g., Java 8) adversarial inputs can still trigger O(n²), which people mitigate by shuffling first or sorting an `Integer[]`. `Arrays.sort(Object[])`, `Collections.sort` and `List.sort` use TimSort (stable, O(n log n) worst case, O(n) on nearly sorted input).

```java
class SortUtils {
// Counting sort for values in [0, k)
static int[] countingSort(int[] a, int k) {
    int[] cnt = new int[k], out = new int[a.length];
    for (int x : a) cnt[x]++;
    int idx = 0;
    for (int v = 0; v < k; v++) while (cnt[v]-- > 0) out[idx++] = v;
    return out;
}

// LSD radix sort for non-negative ints, base 10, stable counting sort per digit
static void radixSort(int[] a) {
    int max = 0; for (int x : a) max = Math.max(max, x);
    int[] out = new int[a.length];
    for (int exp = 1; max / exp > 0; exp *= 10) {
        int[] cnt = new int[10];
        for (int x : a) cnt[x / exp % 10]++;
        for (int d = 1; d < 10; d++) cnt[d] += cnt[d - 1];            // prefix: end positions
        for (int i = a.length - 1; i >= 0; i--) out[--cnt[a[i] / exp % 10]] = a[i];   // backward keeps it stable
        System.arraycopy(out, 0, a, 0, a.length);
    }
}
// Heap sort: build a max-heap in place (sift-down from n/2 - 1), then swap root to the end and sift down
// Quicksort/quickselect and merge sort templates: P10.   Partition-based problems: Sort Colors (Dutch flag, P1),
//   Kth Largest (H16), Wiggle Sort II, Sort Array By Parity.
// Custom orderings: Largest Number (comparator on a+b vs b+a, P15), Meeting Rooms (sort by start), Merge Intervals (H11)
}
```

**Pitfalls.** Comparator subtraction `x - y` overflows (use `Integer.compare`); `Arrays.sort(int[], comparator)` does not compile (box to `Integer[]` or sort an index array); sorting is not stable for primitives (irrelevant because equal primitives are indistinguishable); counting sort on negative numbers needs an offset.

**Problems.** *Easy:* Sort Colors (Medium) · Sort Array By Parity · Squares of a Sorted Array · Relative Sort Array. *Medium:* Sort an Array · Maximum Gap (radix/bucket) · Wiggle Sort II · Largest Number · Sort List · Kth Largest Element.

## P22. Math and Number Theory

**Importance: ★★ (appears as sub-steps in many problems; deep number theory is rare).** **Trick:** most interview math reduces to GCD, modular arithmetic with overflow care, fast exponentiation, sieve/primality, and digit manipulation. Always ask: does the result fit in `int`? Does the problem ask for it modulo 10⁹ + 7?

**Recognition clues.** "Modulo 1e9 + 7", "return the count mod…", "primes up to n", "divisible", "GCD/LCM", "power", "n up to 1e18", "digits". **Counterexamples.** If constraints are tiny, simulate instead of finding a formula.

```java
class MathToolkit {
    static final long MOD = 1_000_000_007L;

    static long gcd(long a, long b) { while (b != 0) { long t = a % b; a = b; b = t; } return a; }
    static long lcm(long a, long b) { return a / gcd(a, b) * b; }            // divide first to limit overflow

    // Fast exponentiation: base^exp mod m, O(log exp). Products of two values < 2^31 fit in long.
    static long modPow(long base, long exp, long m) {
        long result = 1;
        base %= m;
        while (exp > 0) {
            if ((exp & 1) == 1) result = result * base % m;
            base = base * base % m;
            exp >>= 1;
        }
        return result;
    }

    // Modular inverse for PRIME m (Fermat's little theorem): a^(m-2) mod m, requires a % m != 0
    static long modInverse(long a, long m) { return modPow(a, m - 2, m); }

    static long modAdd(long a, long b) { return (a + b) % MOD; }
    static long modSub(long a, long b) { return ((a - b) % MOD + MOD) % MOD; }  // keep the result non-negative
    static long modMul(long a, long b) { return a % MOD * (b % MOD) % MOD; }

    // Primality in O(sqrt n)
    static boolean isPrime(long n) {
        if (n < 2) return false;
        for (long d = 2; d * d <= n; d++) if (n % d == 0) return false;
        return true;
    }

    // Sieve of Eratosthenes: all primes <= n in O(n log log n)
    static boolean[] sieve(int n) {
        boolean[] composite = new boolean[n + 1];
        for (long i = 2; i * i <= n; i++)
            if (!composite[(int) i])
                for (long j = i * i; j <= n; j += i) composite[(int) j] = true;
        return composite;                                                        // prime iff i >= 2 && !composite[i]
    }

    // Prime factorization by trial division, O(sqrt n). Returns primes with repetition.
    static List<Long> factorize(long n) {
        List<Long> f = new ArrayList<>();
        for (long d = 2; d * d <= n; d++) while (n % d == 0) { f.add(d); n /= d; }
        if (n > 1) f.add(n);
        return f;
    }

    // nCr mod prime using precomputed factorials and inverse factorials (needs n < MOD)
    static long[] fact, invFact;
    static void precompute(int n) {
        fact = new long[n + 1]; invFact = new long[n + 1];
        fact[0] = 1;
        for (int i = 1; i <= n; i++) fact[i] = fact[i - 1] * i % MOD;
        invFact[n] = modInverse(fact[n], MOD);
        for (int i = n; i > 0; i--) invFact[i - 1] = invFact[i] * i % MOD;
    }
    static long nCr(int n, int r) { return (r < 0 || r > n) ? 0 : fact[n] * invFact[r] % MOD * invFact[n - r] % MOD; }
}
```

```java
// Digits: reverse an int safely, count digits, sum digits
int rev = 0;
while (x != 0) {
    int d = x % 10; x /= 10;
    if (rev > Integer.MAX_VALUE / 10 || rev < Integer.MIN_VALUE / 10) return 0;   // overflow guard (Reverse Integer)
    rev = rev * 10 + d;
}
// Palindrome Number without strings: reverse only half the digits
// Excel Sheet Column Title: while (n > 0) { n--; sb.append((char) ('A' + n % 26)); n /= 26; } then reverse
// Roman to Integer: subtract a symbol that is smaller than its right neighbour
// Count Primes: sieve(n - 1) and count; Ugly Number II: three pointers or a min-heap of multiples
// Pow(x, n): fast exponentiation (P10). Sqrt(x): binary search (P5). Happy Number: Floyd or HashSet
// Trailing Zeroes in n!: sum of n/5 + n/25 + n/125 + ...
// Fizz Buzz / simulation: build with StringBuilder
// Random / reservoir sampling: keep the i-th item with probability 1/i (Linked List Random Node)
// Geometry: cross product sign for orientation; Max Points on a Line: group by reduced slope (dy/g, dx/g) with gcd
```

**Pitfalls.** `a * b` overflows `int` before widening: `(long) a * b`. `%` of a negative number is negative in Java; add the modulus before the final `%`. Division is not allowed under a modulus (use the modular inverse; Fermat's inverse works only for prime moduli). `Math.pow` returns `double` (loses precision beyond 2⁵³; use `modPow` for exact integers). `d * d <= n` with `int d` can overflow when `n` is near `Integer.MAX_VALUE`; use `long`.

**Problems.** *Easy:* Fizz Buzz · Palindrome Number · Roman to Integer · Count Primes · Excel Sheet Column Number · Happy Number. *Medium:* Pow(x, n) · Reverse Integer · Ugly Number II · Max Points on a Line (Hard in LeetCode) · Factorial Trailing Zeroes · Count Good Numbers (modPow) · Unique Paths (nCr view) · Super Pow. *Hard:* Number of Ways to Reorder Array to Get Same BST (nCr mod) · Count Numbers with Unique Digits patterns.

---

# PART V. HYBRID / MIXED PATTERNS (31 problems)

**How to read this section.** Each entry uses the same ten fields: **Goal · Clues · Patterns combined · Brute force → bottleneck · Reasoning · Java · Complexity · Invariant + dry run · Pitfalls · Alternatives**. Entries say explicitly whether the techniques are *truly combined* (one algorithm needs both) or are *alternatives* (pick one). Difficulty tags follow LeetCode's labels. Links use LeetCode's standard problem slugs; confirm a link opens the intended problem before relying on it. All hybrid code was compiled and run against the dry-run examples (see the completion summary). Every snippet assumes `import java.util.*;`; extra imports are shown inline.

**Quick index:** [H1 LIS](#h1-longest-increasing-subsequence) · [H2 Subarray Sum K](#h2-subarray-sum-equals-k) · [H3 Longest Substring](#h3-longest-substring-without-repeating-characters) · [H4 Min Window](#h4-minimum-window-substring) · [H5 Window Max](#h5-sliding-window-maximum) · [H6 Top K Frequent](#h6-top-k-frequent-elements) · [H7 Word Break](#h7-word-break) · [H8 Course Schedule](#h8-course-schedule-i-and-ii) · [H9 Word Ladder](#h9-word-ladder) · [H10 Network Delay](#h10-network-delay-time) · [H11 Merge Intervals](#h11-merge-intervals) · [H12 Meeting Rooms II](#h12-meeting-rooms-ii) · [H13 Rain Water](#h13-trapping-rain-water) · [H14 Daily Temps](#h14-daily-temperatures) · [H15 3Sum](#h15-3sum) · [H16 Kth Largest](#h16-kth-largest-element) · [H17 Median of Two](#h17-median-of-two-sorted-arrays) · [H18 Rotated Search](#h18-search-in-rotated-sorted-array) · [H19 Islands](#h19-number-of-islands) · [H20 Accounts Merge](#h20-accounts-merge) · [H21 Inversions](#h21-count-inversions) · [H22 Longest Palindrome](#h22-longest-palindromic-substring) · [H23 Palindrome Partition](#h23-palindrome-partitioning) · [H24 Search on Answer](#h24-binary-search-on-the-answer) · [H25 Count Smaller](#h25-count-of-smaller-numbers-after-self) · [H26 LCA](#h26-lowest-common-ancestor-single-query-vs-many-queries) · [H27 Subset Sum](#h27-subset-sum--target-sum) · [H28 TSP](#h28-travelling-salesperson-problem) · [H29 Maximal Rectangle](#h29-maximal-rectangle) · [H30 Subarray Minimums](#h30-sum-of-subarray-minimums) · [H31 Visit All Nodes](#h31-shortest-path-visiting-all-nodes)

---

### H1. Longest Increasing Subsequence
**Medium** · [LeetCode 300](https://leetcode.com/problems/longest-increasing-subsequence/) · *True combination: DP definition → binary-search optimization.*

- **Goal.** Length of the longest strictly increasing subsequence (not necessarily contiguous).
- **Clues / constraints.** "Subsequence", order matters, choices at each element. n ≤ 2,500 allows O(n²); n ≤ 1e5 demands O(n log n).
- **Patterns combined.** DP (state = best subsequence ending at i) + binary search over a *monotonic* helper array (`tails`). Binary search is valid only because `tails` is always strictly increasing.
- **Brute force → bottleneck.** Try every subset: O(2ⁿ). DP `dp[i] = 1 + max(dp[j])` for `j < i, a[j] < a[i]` is O(n²) because each i scans all earlier j.
- **Reasoning.** Instead of "best length ending at i", track for each length L the *smallest possible tail* of an increasing subsequence of length L. A smaller tail is always better for future extension. A new value x either extends the longest subsequence (append) or improves some tail (replace the first tail ≥ x). That first tail ≥ x is found with a lower-bound binary search.

```java
class H01Lis {
    // O(n log n). tails[len-1] = smallest tail of any increasing subsequence of length len
    static int lengthOfLIS(int[] a) {
        int[] tails = new int[a.length];
        int size = 0;
        for (int x : a) {
            int lo = 0, hi = size;                        // first index with tails[idx] >= x
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                if (tails[mid] >= x) hi = mid; else lo = mid + 1;
            }
            tails[lo] = x;                                // replace (or append when lo == size)
            if (lo == size) size++;
        }
        return size;
    }

    // O(n^2) DP: the version to write first, then optimize
    static int lengthOfLISQuadratic(int[] a) {
        int n = a.length, best = 0;
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) {
            dp[i] = 1;
            for (int j = 0; j < i; j++) if (a[j] < a[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
            best = Math.max(best, dp[i]);
        }
        return best;
    }
}
```

- **Complexity.** O(n log n) time, O(n) auxiliary space (O(n²) time / O(n) space for the DP version).
- **Invariant + dry run.** `tails[0..size-1]` is strictly increasing, and `tails[k]` is the minimum tail over all increasing subsequences of length k+1. `[10,9,2,5,3,7,101,18]`: `[10]` → `[9]` → `[2]` → `[2,5]` → `[2,3]` → `[2,3,7]` → `[2,3,7,101]` → `[2,3,7,18]`. Answer 4. Note `tails` is **not** an actual subsequence; only its *length* is meaningful.
- **Pitfalls.** Using upper bound (`>`) accepts equal elements (that solves *non-decreasing* LIS). Printing `tails` as the answer. To reconstruct the sequence, store predecessor indices and the index stored in each tail slot.
- **Alternatives.** O(n²) DP when n is small or you need reconstruction simply. LIS = LCS(a, sorted unique a) is a valid but slower reduction. Variants: Russian Doll Envelopes (sort by width ascending, height descending on ties, then LIS on heights), Number of LIS (DP plus counts, or Fenwick).

---

### H2. Subarray Sum Equals K
**Medium** · [LeetCode 560](https://leetcode.com/problems/subarray-sum-equals-k/) · *True combination: prefix sums + HashMap.*

- **Goal.** Count contiguous subarrays whose sum equals k.
- **Clues / constraints.** "Contiguous", "sum equals", **negatives allowed** → sliding window is invalid (shrinking does not monotonically reduce the sum).
- **Patterns combined.** Prefix sums turn "sum of a[i..j]" into `P[j+1] − P[i]`. A HashMap of prefix-sum frequencies turns "find a matching earlier prefix" into an O(1) lookup.
- **Brute force → bottleneck.** All (i, j) pairs with running sums: O(n²). The bottleneck is the inner loop searching for a start index.
- **Reasoning.** A subarray ending at j sums to k exactly when some earlier prefix equals `P[j+1] − k`. Store how many times each prefix has occurred and add that count. Seed `{0: 1}` so subarrays that start at index 0 are counted.

```java
class H02SubarraySumK {
    static int subarraySum(int[] a, int k) {
        Map<Long, Integer> seen = new HashMap<>();
        seen.put(0L, 1);                                   // empty prefix
        long sum = 0;
        int count = 0;
        for (int x : a) {
            sum += x;
            count += seen.getOrDefault(sum - k, 0);        // earlier prefixes that complete a subarray
            seen.merge(sum, 1, Integer::sum);              // update AFTER querying
        }
        return count;
    }
}
```

- **Complexity.** O(n) average time (HashMap), O(n) space. Worst-case hash behavior is not a concern with `Long` keys in practice.
- **Invariant + dry run.** Before processing x, `seen` holds counts of every prefix sum of the elements *before* it. `[1,2,3]`, k=3: seen={0:1}; sum=1 → look up −2: 0; sum=3 → look up 0: +1; sum=6 → look up 3: +1. Answer 2 (`[1,2]`, `[3]`).
- **Pitfalls.** Forgetting the `{0:1}` seed; inserting the current prefix *before* the lookup (wrongly counts an empty subarray when k = 0); `int` overflow on the running sum.
- **Alternatives.** If all values are non-negative, a sliding window is O(1) space. For *longest* subarray with sum k, store the **first** index per prefix instead of a count. See also [P3](#p3-prefix-sum--hashmap).

---

### H3. Longest Substring Without Repeating Characters
**Medium** · [LeetCode 3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) · *True combination: variable sliding window + last-seen map.*

- **Goal.** Length of the longest substring with all distinct characters.
- **Clues / constraints.** "Substring", "longest", validity condition (no duplicates) that can only be *restored* by shrinking from the left.
- **Patterns combined.** Sliding window (the window is always valid) + a last-index table so the left pointer can jump directly past a repeat instead of shrinking one step at a time.
- **Brute force → bottleneck.** Check every substring for uniqueness: O(n³), or O(n²) with early exit. Re-scanning overlapping substrings is the wasted work.
- **Reasoning.** When `s[r]` was last seen at index p inside the window, the new left edge must be `p + 1`. Take `max(l, p + 1)` because a stale occurrence left of `l` must be ignored.

```java
class H03LongestUnique {
    static int lengthOfLongestSubstring(String s) {
        int[] last = new int[256];
        Arrays.fill(last, -1);                              // last index of each char
        int l = 0, best = 0;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            l = Math.max(l, last[c] + 1);                   // jump past the previous occurrence
            last[c] = r;
            best = Math.max(best, r - l + 1);
        }
        return best;
    }
}
```

- **Complexity.** O(n) time, O(Σ) space (alphabet size, here 256).
- **Invariant + dry run.** `s[l..r]` has no duplicate characters. `"abba"`: r=0 `a` → len 1; r=1 `b` → len 2; r=2 `b` → last[b]=1 so l=2, len 1; r=3 `a` → last[a]=0 but `max(2, 1) = 2`, len 2. Answer 2. Without the `max`, l would move *backward* to 1 and report 3 (wrong).
- **Pitfalls.** Missing the `max` (the classic bug above). Using a fixed `int[128]` when input may contain non-ASCII characters; use 256, or a `HashMap<Character,Integer>`.
- **Alternatives.** Count-array version with a `while (cnt[c] > 1)` shrink loop (see [P2](#p2-sliding-window)); equivalent complexity, easier to generalize to "at most K repeats".

---

### H4. Minimum Window Substring
**Hard** · [LeetCode 76](https://leetcode.com/problems/minimum-window-substring/) · *True combination: sliding window + frequency counting with a "missing" counter.*

- **Goal.** Shortest substring of s containing every character of t (with multiplicity).
- **Clues / constraints.** "Smallest window containing all", multiset requirement, characters may repeat.
- **Patterns combined.** Expand/shrink window (variable, *shortest* valid) + a need-count array. A single integer `missing` makes the "is the window valid?" check O(1) instead of comparing two frequency arrays.
- **Brute force → bottleneck.** Check every substring against t's counts: O(n² · Σ). Re-counting from scratch for each substring is the waste.
- **Reasoning.** Expand `r` until the window covers t. Then shrink `l` as long as it stays valid, recording the best window each time. `need[c]` goes negative for surplus characters, so only `need[c] > 0` before decrement means a *useful* character arrived.

```java
class H04MinWindow {
    static String minWindow(String s, String t) {
        int[] need = new int[128];
        for (char c : t.toCharArray()) need[c]++;
        int missing = t.length(), l = 0, bestL = 0, bestLen = Integer.MAX_VALUE;
        for (int r = 0; r < s.length(); r++) {
            if (need[s.charAt(r)]-- > 0) missing--;          // a still-needed char arrived
            while (missing == 0) {                            // window valid: try to shrink
                if (r - l + 1 < bestLen) { bestLen = r - l + 1; bestL = l; }
                if (++need[s.charAt(l++)] > 0) missing++;     // dropped a needed char
            }
        }
        return bestLen == Integer.MAX_VALUE ? "" : s.substring(bestL, bestL + bestLen);
    }
}
```

- **Complexity.** O(|s| + |t|) time (each pointer moves at most |s| steps), O(Σ) space.
- **Invariant + dry run.** `missing` = number of characters of t still absent from `s[l..r]`; `need[c] > 0` means more copies of c are required. `s = "ADOBECODEBANC"`, `t = "ABC"`: the first valid window is `ADOBEC` (len 6); shrinking drops `A` and the window becomes invalid; expanding to `…BA` then `…ANC` yields valid windows, and the last shrink produces `BANC` (len 4). Answer `"BANC"`.
- **Pitfalls.** Using a `Set` for t (ignores multiplicity); shrinking with `if` instead of `while`; comparing `bestLen` before the first valid window; returning `""` correctly when impossible.
- **Alternatives.** Same skeleton solves Permutation in String (fixed window) and Smallest Range variants. A "filtered s" optimization helps when t is tiny and s is huge.

---

### H5. Sliding Window Maximum
**Hard** · [LeetCode 239](https://leetcode.com/problems/sliding-window-maximum/) · *True combination: fixed window + monotonic deque.*

- **Goal.** Maximum of every window of size k.
- **Clues / constraints.** "Max/min in a moving window" with n up to 1e5.
- **Patterns combined.** Fixed-size window (what to expire) + monotonic decreasing deque of indices (who can still become the max).
- **Brute force → bottleneck.** Scan each window: O(nk). A max-heap with lazy deletion gives O(n log n).
- **Reasoning.** If a new element is ≥ older elements in the window, those older elements can *never* be a maximum again (they are smaller and leave sooner). So pop them from the back. Expire from the front when the index leaves the window. The front is always the maximum.

```java
class H05WindowMax {
    static int[] maxSlidingWindow(int[] a, int k) {
        int n = a.length;
        int[] res = new int[n - k + 1];
        Deque<Integer> dq = new ArrayDeque<>();                       // indices, values decreasing
        for (int i = 0; i < n; i++) {
            while (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();   // expired
            while (!dq.isEmpty() && a[dq.peekLast()] <= a[i]) dq.pollLast();   // dominated
            dq.offerLast(i);
            if (i >= k - 1) res[i - k + 1] = a[dq.peekFirst()];
        }
        return res;
    }
}
```

- **Complexity.** O(n) time (each index is pushed and popped once: *amortized* O(1) per element), O(k) space.
- **Invariant + dry run.** Deque holds indices of candidates in strictly decreasing value order; the front is the window max. `[1,3,-1,-3,5,3,6,7]`, k=3: windows give `[3,3,5,5,6,7]`. At i=4 (value 5) the deque `[1,2,3]` is fully popped, leaving `[4]`.
- **Pitfalls.** Storing values instead of indices (cannot expire); `<` vs `<=` (both correct for the max; `<=` keeps the deque smaller); validating `k ≥ 1` and `k ≤ n`.
- **Alternatives.** Heap with lazy deletion (simpler to reason about, O(n log n)); sparse table for static range-max queries (see [P20](#p20-advanced-structures)). See also [P8](#p8-queue-and-deque).

---

### H6. Top K Frequent Elements
**Medium** · [LeetCode 347](https://leetcode.com/problems/top-k-frequent-elements/) · *HashMap (counting) + one of two **alternative** selection strategies.*

- **Goal.** The k most frequent values.
- **Clues / constraints.** "Top K" + counts. Answer required better than full sort when k ≪ n.
- **Patterns combined.** HashMap to count, then **either** a size-k min-heap **or** bucket-by-frequency. These two are alternatives, not a single combined algorithm.
- **Brute force → bottleneck.** Count, then sort all distinct values by frequency: O(n log n). Only the top k are needed.
- **Reasoning.** A min-heap of size k holds the k best seen so far; the root is the weakest and is evicted when something better arrives (O(n log k)). Alternatively, frequencies are bounded by n, so bucket index = frequency, and a descending scan collects k values in O(n).

```java
class H06TopK {
    static int[] viaHeap(int[] a, int k) {
        Map<Integer, Integer> f = new HashMap<>();
        for (int x : a) f.merge(x, 1, Integer::sum);
        PriorityQueue<Map.Entry<Integer, Integer>> pq =
            new PriorityQueue<>((x, y) -> Integer.compare(x.getValue(), y.getValue()));
        for (Map.Entry<Integer, Integer> e : f.entrySet()) {
            pq.offer(e);
            if (pq.size() > k) pq.poll();                    // evict the least frequent
        }
        int[] res = new int[k];
        for (int i = k - 1; i >= 0; i--) res[i] = pq.poll().getKey();   // most frequent first
        return res;
    }

    static int[] viaBuckets(int[] a, int k) {
        Map<Integer, Integer> f = new HashMap<>();
        for (int x : a) f.merge(x, 1, Integer::sum);
        List<List<Integer>> bucket = new ArrayList<>();
        for (int i = 0; i <= a.length; i++) bucket.add(new ArrayList<>());
        for (Map.Entry<Integer, Integer> e : f.entrySet()) bucket.get(e.getValue()).add(e.getKey());
        int[] res = new int[k];
        int p = 0;
        for (int c = a.length; c >= 1 && p < k; c--)
            for (int x : bucket.get(c)) if (p < k) res[p++] = x;
        return res;
    }
}
```

- **Complexity.** Heap: O(n + d log k) time, O(d) space (d = distinct values). Buckets: O(n) time, O(n) space.
- **Invariant + dry run.** Heap: after each step it holds the k most frequent entries seen so far. `[1,1,1,2,2,3]`, k=2: counts {1:3, 2:2, 3:1}. Heap grows to 3, evicts `3` (count 1). Result `[1, 2]`.
- **Pitfalls.** Max-heap of all entries then k polls is O(d log d); use a size-k *min*-heap. Subtracting counts in the comparator is safe here but prefer `Integer.compare`. Assumes `k ≤ d`.
- **Alternatives.** Quickselect on distinct frequencies (average O(d)). Use buckets when frequencies are bounded by n; use the heap when the data is a **stream** or k is tiny. See also [P12](#p12-heap--priority-queue).

---

### H7. Word Break
**Medium** · [LeetCode 139](https://leetcode.com/problems/word-break/) · *True combination: DP over prefixes + hash-set lookup (+ length pruning).*

- **Goal.** Can string s be segmented into dictionary words?
- **Clues / constraints.** "Can be split", overlapping subproblems (the same suffix is reached by many splits).
- **Patterns combined.** 1D DP on prefix length + `HashSet` for O(1)-ish word membership. The max word length bounds the inner loop.
- **Brute force → bottleneck.** Recursive try-all-splits: exponential, because the same suffix is re-solved repeatedly.
- **Reasoning.** `dp[i]` = "prefix of length i can be segmented". `dp[i]` is true if some `j` has `dp[j]` true and `s[j..i)` is a word. Only lengths ≤ max word length can match, so `j` ranges over a short window.

```java
class H07WordBreak {
    static boolean wordBreak(String s, List<String> dict) {
        Set<String> words = new HashSet<>(dict);
        int maxLen = 0;
        for (String w : dict) maxLen = Math.max(maxLen, w.length());
        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;                                         // empty prefix
        for (int i = 1; i <= n; i++) {
            for (int len = 1; len <= maxLen && len <= i; len++) {
                if (dp[i - len] && words.contains(s.substring(i - len, i))) { dp[i] = true; break; }
            }
        }
        return dp[n];
    }
}
```

- **Complexity.** O(n · L²) time (L = max word length; each `substring` + hash costs O(L)), O(n + total dictionary size) space.
- **Invariant + dry run.** `dp[i]` is true iff `s[0..i)` is a concatenation of dictionary words. `"leetcode"`, `{"leet","code"}`: dp[4] is true (`leet`), and dp[8] is true because `dp[4]` and `code ∈ dict`.
- **Pitfalls.** Forgetting `dp[0] = true`; not capping the inner loop (becomes O(n²) substrings); duplicate words are harmless in a set.
- **Alternatives.** Trie instead of a set (avoids substring allocation, see [P17](#p17-trie)). Word Break II (return all sentences) adds memoized backtracking: build results only for reachable suffixes. Memoized DFS is equivalent top-down.

---

### H8. Course Schedule (I and II)
**Medium** · [LeetCode 207](https://leetcode.com/problems/course-schedule/) · [LeetCode 210](https://leetcode.com/problems/course-schedule-ii/) · *True combination: graph modeling + topological sort (cycle detection as a by-product).*

- **Goal.** Decide if all courses can be finished (I), or output a valid order (II).
- **Clues / constraints.** "Prerequisites", "ordering", directed dependencies.
- **Patterns combined.** Model courses as nodes and prerequisites as directed edges; Kahn's algorithm (BFS on in-degree 0). A cycle is detected because some nodes never reach in-degree 0.
- **Brute force → bottleneck.** Try permutations of courses: O(n!). Re-checking dependencies by repeated scanning is also quadratic.
- **Reasoning.** A course with no remaining prerequisites can safely go next. Remove it, decrement dependents' in-degrees, repeat. If fewer than n courses were emitted, the rest sit on a cycle.

```java
class H08CourseSchedule {
    // prereq[i] = {course, mustTakeFirst}. Returns a valid order, or an empty array if a cycle exists.
    static int[] findOrder(int n, int[][] prereq) {
        List<List<Integer>> g = new ArrayList<>();
        for (int i = 0; i < n; i++) g.add(new ArrayList<>());
        int[] indeg = new int[n];
        for (int[] p : prereq) { g.get(p[1]).add(p[0]); indeg[p[0]]++; }   // edge: first -> course
        Deque<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < n; i++) if (indeg[i] == 0) q.offer(i);
        int[] order = new int[n];
        int cnt = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            order[cnt++] = u;
            for (int v : g.get(u)) if (--indeg[v] == 0) q.offer(v);
        }
        return cnt == n ? order : new int[0];
    }

    static boolean canFinish(int n, int[][] prereq) { return findOrder(n, prereq).length == n; }
}
```

- **Complexity.** O(V + E) time, O(V + E) space.
- **Invariant + dry run.** A node is enqueued exactly when all its prerequisites have been emitted. `n=4`, `[[1,0],[2,0],[3,1],[3,2]]`: queue `[0]` → emit 0, nodes 1 and 2 reach indegree 0 → emit 1, 2 → node 3 reaches 0 → emit 3. Order `0,1,2,3`.
- **Pitfalls.** Reversed edge direction (the most common bug); returning the order when `cnt < n`; duplicate edges (harmless as long as indegree counts them symmetrically).
- **Alternatives.** DFS with three colors (0/1/2) and post-order reversal. Prefer Kahn when you need *layers* (Parallel Courses) or the lexicographically smallest order (swap the queue for a min-heap). See also [P13](#p13-graphs).

---

### H9. Word Ladder
**Hard** · [LeetCode 127](https://leetcode.com/problems/word-ladder/) · *True combination: implicit graph modeling + BFS + hashed lookup.*

- **Goal.** Fewest words in a transformation sequence from `begin` to `end`, changing one letter at a time, every intermediate word in the list.
- **Clues / constraints.** "Shortest sequence", unit-cost transitions → BFS. The graph is *implicit* (never build all edges up front).
- **Patterns combined.** Graph modeling (word = node, one-letter difference = edge) + BFS for the unweighted shortest path + `HashSet` for O(1) neighbor validation (and as the visited set).
- **Brute force → bottleneck.** Compare every pair of words to build edges: O(N² · L). Instead, generate neighbors by substituting each of the L positions with 26 letters: O(L · 26) candidates per word, each validated by a set lookup.
- **Reasoning.** BFS explores by number of transformations, so the first time `end` is dequeued is optimal. Removing a word from the set when it is enqueued doubles as the visited check.

```java
class H09WordLadder {
    static int ladderLength(String begin, String end, List<String> wordList) {
        Set<String> dict = new HashSet<>(wordList);
        if (!dict.contains(end)) return 0;
        dict.remove(begin);                                    // begin may or may not be in the list
        Deque<String> q = new ArrayDeque<>();
        q.offer(begin);
        int steps = 1;                                         // counts words, not edges
        while (!q.isEmpty()) {
            for (int sz = q.size(); sz > 0; sz--) {
                String w = q.poll();
                if (w.equals(end)) return steps;
                char[] c = w.toCharArray();
                for (int i = 0; i < c.length; i++) {
                    char orig = c[i];
                    for (char ch = 'a'; ch <= 'z'; ch++) {
                        if (ch == orig) continue;
                        c[i] = ch;
                        String next = new String(c);
                        if (dict.remove(next)) q.offer(next);  // remove == mark visited
                    }
                    c[i] = orig;
                }
            }
            steps++;
        }
        return 0;
    }
}
```

- **Complexity.** O(N · L² · 26) time (N words of length L; each candidate costs O(L) to build and hash), O(N · L) space.
- **Invariant + dry run.** Each queue level holds all words at distance `steps − 1` from `begin`. `hit → cog` with `{hot, dot, dog, lot, log, cog}`: level 1 `hit`; level 2 `hot`; level 3 `dot, lot`; level 4 `dog, log`; level 5 `cog` → return 5.
- **Pitfalls.** Returning the number of *edges* instead of words (off by one); forgetting `end` must be in the list; not marking visited (cycles / exponential blow-up).
- **Alternatives.** **Bidirectional BFS** (expand the smaller frontier from both ends) is the standard optimization for big dictionaries. Wildcard buckets (`h*t → [hot,hat]`) avoid the 26× factor when the alphabet is large. Word Ladder II (all shortest paths) adds parent tracking.

---

### H10. Network Delay Time
**Medium** · [LeetCode 743](https://leetcode.com/problems/network-delay-time/) · *True combination: weighted graph + Dijkstra + min-heap.*

- **Goal.** Time for a signal from node k to reach all nodes (max shortest-path distance), or −1.
- **Clues / constraints.** Directed weighted edges, non-negative weights, single source.
- **Patterns combined.** Adjacency list + Dijkstra's greedy "settle the closest unsettled node" + priority queue to find that node in O(log n).
- **Brute force → bottleneck.** Bellman-Ford O(VE) works but is slow; plain Dijkstra with an O(V) scan for the minimum is O(V²) (acceptable when dense).
- **Reasoning.** With non-negative weights, the unsettled node with the smallest tentative distance can no longer be improved. Pop it, relax its edges, push improved entries. Stale heap entries (distance larger than the recorded best) are skipped instead of decreased in place.

```java
class H10NetworkDelay {
    static int networkDelayTime(int[][] times, int n, int k) {         // nodes are 1..n
        List<List<int[]>> g = new ArrayList<>();
        for (int i = 0; i <= n; i++) g.add(new ArrayList<>());
        for (int[] t : times) g.get(t[0]).add(new int[]{t[1], t[2]});  // {to, weight}
        long[] dist = new long[n + 1];
        Arrays.fill(dist, Long.MAX_VALUE);
        dist[k] = 0;
        PriorityQueue<long[]> pq = new PriorityQueue<>((x, y) -> Long.compare(x[1], y[1]));
        pq.offer(new long[]{k, 0});
        while (!pq.isEmpty()) {
            long[] cur = pq.poll();
            int u = (int) cur[0];
            long d = cur[1];
            if (d > dist[u]) continue;                                  // stale entry
            for (int[] e : g.get(u)) {
                long nd = d + e[1];
                if (nd < dist[e[0]]) { dist[e[0]] = nd; pq.offer(new long[]{e[0], nd}); }
            }
        }
        long ans = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == Long.MAX_VALUE) return -1;                   // unreachable node
            ans = Math.max(ans, dist[i]);
        }
        return (int) ans;
    }
}
```

- **Complexity.** O((V + E) log V) time (a lazy-deletion heap holds up to E entries), O(V + E) space.
- **Invariant + dry run.** When a node is popped with `d == dist[u]`, `dist[u]` is final (requires non-negative edges). `n=4, k=2, edges 2→1(1), 2→3(1), 3→4(1)`: dist = {1:1, 2:0, 3:1, 4:2}; answer 2.
- **Pitfalls.** Negative edges break correctness (use Bellman-Ford); `Integer.MAX_VALUE + w` overflow (use `long`); forgetting the stale-entry check (still correct but slower); 1-indexed nodes.
- **Alternatives.** Bellman-Ford / SPFA for negative edges; BFS only if all weights are equal; 0-1 BFS with a deque for weights in {0,1}. See also [P13](#p13-graphs).

---

### H11. Merge Intervals
**Medium** · [LeetCode 56](https://leetcode.com/problems/merge-intervals/) · *Two-step combination: sort, then one linear sweep (sorting makes the sweep valid).*

- **Goal.** Merge all overlapping intervals.
- **Clues / constraints.** Intervals given in arbitrary order; "overlapping", "merge", "union".
- **Patterns combined.** Sorting by start establishes the invariant; a single pass maintaining the "current merged interval" does the rest.
- **Brute force → bottleneck.** Repeatedly compare all pairs until nothing merges: O(n²) or worse. Order is the missing structure.
- **Reasoning.** After sorting by start, an interval can only overlap the *last* merged interval (everything earlier ended before the previous start). Overlap means `next.start ≤ last.end`; then extend `last.end = max(last.end, next.end)`.

```java
class H11MergeIntervals {
    static int[][] merge(int[][] intervals) {
        int[][] iv = intervals.clone();
        Arrays.sort(iv, (x, y) -> Integer.compare(x[0], y[0]));
        List<int[]> res = new ArrayList<>();
        for (int[] cur : iv) {
            if (res.isEmpty() || res.get(res.size() - 1)[1] < cur[0]) {
                res.add(new int[]{cur[0], cur[1]});                       // no overlap: start a new interval
            } else {
                int[] last = res.get(res.size() - 1);
                last[1] = Math.max(last[1], cur[1]);                      // overlap: extend
            }
        }
        return res.toArray(new int[0][]);
    }
}
```

- **Complexity.** O(n log n) time (sort dominates), O(n) output space (O(log n) to O(n) sort space depending on implementation).
- **Invariant + dry run.** `res` contains disjoint intervals sorted by start; only its last element can still grow. `[[1,3],[2,6],[8,10],[15,18]]`: `[1,3]`; `[2,6]` overlaps → `[1,6]`; `[8,10]` new; `[15,18]` new.
- **Pitfalls.** Treating touching intervals (`[1,4]`, `[4,5]`) as non-overlapping when the problem says they merge (`<` vs `<=` is a requirement question: ask); forgetting `Math.max` for nested intervals like `[1,10]`, `[2,3]`; mutating the caller's input arrays.
- **Alternatives.** Sweep line over (position, ±1) events solves the *counting* variants. For a sorted list with one new interval, Insert Interval is a linear three-phase scan ([P15](#p15-greedy-and-intervals)).

---

### H12. Meeting Rooms II
**Medium** · [LeetCode 253](https://leetcode.com/problems/meeting-rooms-ii/) (premium) · *Two **equivalent** formulations: sort + min-heap, or sort endpoints separately (sweep line).*

- **Goal.** Minimum number of rooms so no two overlapping meetings share one (= maximum number of simultaneously active intervals).
- **Clues / constraints.** "Minimum resources", intervals, concurrency.
- **Patterns combined.** Sorting by start + min-heap of end times (a room is reusable when the earliest end ≤ next start). Alternative: sorted starts and ends as two arrays (a sweep line).
- **Brute force → bottleneck.** For every meeting, count overlaps with all others: O(n²).
- **Reasoning.** Process meetings in start order. The heap holds the end times of rooms in use; if the earliest-ending room is free by the new start, reuse it (pop), otherwise a new room is added. The heap's final size is the answer. In the sweep version, each start that precedes the earliest unfinished end needs a new room; otherwise it consumes (advances past) that end.

```java
class H12MeetingRooms {
    static int minRoomsHeap(int[][] iv) {
        int[][] a = iv.clone();
        Arrays.sort(a, (x, y) -> Integer.compare(x[0], y[0]));
        PriorityQueue<Integer> ends = new PriorityQueue<>();
        for (int[] m : a) {
            if (!ends.isEmpty() && ends.peek() <= m[0]) ends.poll();   // reuse a freed room
            ends.offer(m[1]);
        }
        return ends.size();
    }

    static int minRoomsSweep(int[][] iv) {
        int n = iv.length;
        int[] s = new int[n], e = new int[n];
        for (int i = 0; i < n; i++) { s[i] = iv[i][0]; e[i] = iv[i][1]; }
        Arrays.sort(s);
        Arrays.sort(e);
        int rooms = 0, j = 0;
        for (int i = 0; i < n; i++) {
            if (s[i] < e[j]) rooms++;                                   // everything so far still running
            else j++;                                                    // a meeting ended: reuse its room
        }
        return rooms;
    }
}
```

- **Complexity.** O(n log n) time for both; O(n) space (heap: up to n entries; sweep: two arrays).
- **Invariant + dry run.** Heap size = rooms in use at the current start time. `[[0,30],[5,10],[15,20]]`: heap `{30}`; `5 < 30` add → `{10,30}`; at start 15, `10 ≤ 15` so reuse → `{20,30}`. Size 2.
- **Pitfalls.** End time equal to next start should *free* the room (`<=` in the heap version; `<` in the sweep version's room test), a requirement to confirm. Comparators on `int` ends are safe from overflow only because `Integer.compare` is used.
- **Alternatives.** Difference array / `TreeMap` of ±1 events when coordinates are sparse; the sweep version needs no heap. Weighted variants (Car Pooling) use the event-sum form.

---

### H13. Trapping Rain Water
**Hard** · [LeetCode 42](https://leetcode.com/problems/trapping-rain-water/) · ***Three alternative* solutions to the same formula (not one combined algorithm).**

- **Goal.** Total water trapped above bars of given heights.
- **Clues / constraints.** Water above bar i = `min(maxLeft, maxRight) − h[i]`. Linear-time target for n up to 2·10⁴ and beyond.
- **Patterns combined (alternatives).** (a) Prefix/suffix maxima arrays; (b) two pointers that keep only the running side maxima; (c) monotonic stack that fills water layer by layer.
- **Brute force → bottleneck.** For each bar, scan left and right for maxima: O(n²).
- **Reasoning.** (a) precompute both maxima in O(n). (b) The side with the *smaller* current wall is bounded by that wall's own side maximum, so it can be resolved immediately: move that pointer. (c) A bar taller than the stack top closes a basin whose floor is the popped bar; add `width × (min(left, right) − floor)`.

```java
class H13RainWater {
    static int twoPointers(int[] h) {
        int l = 0, r = h.length - 1, lMax = 0, rMax = 0, water = 0;
        while (l < r) {
            if (h[l] < h[r]) { lMax = Math.max(lMax, h[l]); water += lMax - h[l]; l++; }
            else             { rMax = Math.max(rMax, h[r]); water += rMax - h[r]; r--; }
        }
        return water;
    }

    static int prefixSuffix(int[] h) {
        int n = h.length;
        if (n == 0) return 0;
        int[] left = new int[n], right = new int[n];
        left[0] = h[0];
        for (int i = 1; i < n; i++) left[i] = Math.max(left[i - 1], h[i]);
        right[n - 1] = h[n - 1];
        for (int i = n - 2; i >= 0; i--) right[i] = Math.max(right[i + 1], h[i]);
        int water = 0;
        for (int i = 0; i < n; i++) water += Math.min(left[i], right[i]) - h[i];
        return water;
    }

    static int monotonicStack(int[] h) {
        Deque<Integer> st = new ArrayDeque<>();                  // indices, heights decreasing
        int water = 0;
        for (int i = 0; i < h.length; i++) {
            while (!st.isEmpty() && h[st.peek()] < h[i]) {
                int floor = h[st.pop()];
                if (st.isEmpty()) break;                         // no left wall
                int left = st.peek();
                int width = i - left - 1;
                water += width * (Math.min(h[left], h[i]) - floor);
            }
            st.push(i);
        }
        return water;
    }
}
```

- **Complexity.** Two pointers: O(n) time, O(1) space. Prefix/suffix: O(n) time, O(n) space. Stack: O(n) time, O(n) space (amortized pops).
- **Invariant + dry run.** Two pointers: all bars strictly between `l` and `r` are not yet resolved; `lMax`/`rMax` are the maxima of the scanned parts. `[0,1,0,2,1,0,1,3,2,1,2,1]` → 6.
- **Pitfalls.** In the stack version, popping the floor and then breaking when no left wall exists; using `<` vs `<=` to handle equal heights (equal bars create zero-height layers, harmless); `int` overflow is not a concern within the problem's bounds.
- **Alternatives.** Choose two pointers by default (O(1) space). Choose the prefix/suffix version for clarity/proof. Choose the stack when the follow-up asks for *layer-by-layer* water or the 2D variant uses a heap instead (Trapping Rain Water II).

---

### H14. Daily Temperatures
**Medium** · [LeetCode 739](https://leetcode.com/problems/daily-temperatures/) · *True combination: monotonic stack + index tracking.*

- **Goal.** For each day, the number of days to wait for a warmer temperature (0 if never).
- **Clues / constraints.** "Next greater element" with a *distance* output.
- **Patterns combined.** Monotonic decreasing stack of **indices** (values give the comparison, indices give the answer distance).
- **Brute force → bottleneck.** Scan forward from each day: O(n²) on non-increasing input.
- **Reasoning.** Days still waiting for a warmer day sit on the stack in decreasing temperature order. A new warmer day resolves *every* waiting day colder than it.

```java
class H14DailyTemperatures {
    static int[] dailyTemperatures(int[] t) {
        int n = t.length;
        int[] res = new int[n];
        Deque<Integer> st = new ArrayDeque<>();                  // indices of unresolved days
        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && t[st.peek()] < t[i]) {
                int j = st.pop();
                res[j] = i - j;
            }
            st.push(i);
        }
        return res;                                              // unresolved days stay 0
    }
}
```

- **Complexity.** O(n) time (each index pushed/popped once), O(n) space.
- **Invariant + dry run.** Stack temperatures are non-increasing from bottom to top. `[73,74,75,71,69,72,76,73]` → `[1,1,4,2,1,1,0,0]`: at 75 the stack is `[2]`; 71, 69 push; 72 pops 69 (1) and 71 (2); 76 pops 72 (distance 1) and 75 (distance 4); the last two days stay 0.
- **Pitfalls.** Storing values (loses distances); `<` vs `<=` (strictly warmer requires `<`); not defaulting unresolved entries to 0.
- **Alternatives.** Right-to-left scan using already computed answers to jump ahead (O(n) amortized, O(1) extra). Same skeleton: Next Greater Element I/II, Stock Span, Largest Rectangle. See [P7](#p7-stack-and-monotonic-stack).

---

### H15. 3Sum
**Medium** · [LeetCode 15](https://leetcode.com/problems/3sum/) · *True combination: sorting + two pointers + duplicate skipping.*

- **Goal.** All unique triplets summing to zero.
- **Clues / constraints.** "All unique triplets" with a target sum; n ≤ 3000 → O(n²) expected.
- **Patterns combined.** Sort (enables two pointers and trivial duplicate skipping) + fix one element + two pointers on the remainder.
- **Brute force → bottleneck.** Triple loop: O(n³), plus a set to deduplicate.
- **Reasoning.** For fixed `a[i]`, the pair problem on a sorted suffix is solvable with two pointers: a sum too small moves `l` right, too large moves `r` left. Sorting makes equal values adjacent, so skipping repeats at each of the three positions yields unique triplets with no set.

```java
class H15ThreeSum {
    static List<List<Integer>> threeSum(int[] nums) {
        int[] a = nums.clone();
        Arrays.sort(a);
        List<List<Integer>> res = new ArrayList<>();
        int n = a.length;
        for (int i = 0; i < n - 2; i++) {
            if (a[i] > 0) break;                                   // sorted: no more zero sums
            if (i > 0 && a[i] == a[i - 1]) continue;               // skip duplicate anchors
            int l = i + 1, r = n - 1;
            while (l < r) {
                int s = a[i] + a[l] + a[r];
                if (s == 0) {
                    res.add(Arrays.asList(a[i], a[l], a[r]));
                    while (l < r && a[l] == a[l + 1]) l++;         // skip duplicates on both sides
                    while (l < r && a[r] == a[r - 1]) r--;
                    l++; r--;
                } else if (s < 0) l++;
                else r--;
            }
        }
        return res;
    }
}
```

- **Complexity.** O(n²) time, O(1) auxiliary space beyond the sort and output (sort space depends on Java's algorithm).
- **Invariant + dry run.** For the current `i`, no valid pair has been skipped within `[l, r]` (monotonic movement is safe because the array is sorted). `[-1,0,1,2,-1,-4]` sorted → `[-4,-1,-1,0,1,2]`: i=1 (`-1`): pairs `(−1,2)` and `(0,1)` → `[-1,-1,2]`, `[-1,0,1]`; i=2 is a duplicate anchor and is skipped.
- **Pitfalls.** Skipping duplicates *before* recording the first match; `a[i] > 0` early exit only valid for target 0 and sorted input; mutating the input without cloning; `int` overflow of the sum for large values (use `long`).
- **Alternatives.** Hash-set based 3Sum (O(n²), but dedup is awkward). Generalizes to kSum: k−2 nested loops over a base two-pointer scan. 3Sum Closest uses the same loop with a "best difference" variable.

---

### H16. Kth Largest Element
**Medium** · [LeetCode 215](https://leetcode.com/problems/kth-largest-element-in-an-array/) · ***Alternatives:** size-k min-heap or Quickselect.*

- **Goal.** The kth largest value of an unsorted array (k = 1 is the max).
- **Clues / constraints.** "Kth largest/smallest", no need for full order.
- **Patterns combined (alternatives).** Heap-based selection vs partition-based selection.
- **Brute force → bottleneck.** Sort the array: O(n log n).
- **Reasoning.** A min-heap of size k keeps the k largest seen; its root is the kth largest (O(n log k), works on streams). Quickselect partitions around a pivot and recurses into the one side containing the target index (average O(n)). A **three-way partition** with a random pivot protects against both adversarial and many-duplicate inputs.

```java
class H16KthLargest {
    static int viaHeap(int[] a, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int x : a) {
            pq.offer(x);
            if (pq.size() > k) pq.poll();
        }
        return pq.peek();
    }

    // Quickselect with 3-way partition. Reorders a copy of the input.
    static int viaQuickselect(int[] input, int k) {
        int[] a = input.clone();
        int target = a.length - k;                                  // index in sorted order
        int lo = 0, hi = a.length - 1;
        Random rnd = new Random();
        while (lo <= hi) {
            int pivot = a[lo + rnd.nextInt(hi - lo + 1)];
            int lt = lo, i = lo, gt = hi;                           // [lo,lt) < pivot, [lt,gt] == pivot, (gt,hi] > pivot
            while (i <= gt) {
                if (a[i] < pivot) swap(a, lt++, i++);
                else if (a[i] > pivot) swap(a, i, gt--);
                else i++;
            }
            if (target < lt) hi = lt - 1;
            else if (target > gt) lo = gt + 1;
            else return pivot;
        }
        throw new IllegalArgumentException("k out of range");
    }

    private static void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }
}
```

- **Complexity.** Heap: O(n log k) time, O(k) space. Quickselect: O(n) average, O(n²) worst case (negligible with a random pivot), O(1) extra space.
- **Invariant + dry run.** Heap holds the k largest elements seen so far. Quickselect keeps the target index inside `[lo, hi]` and shrinks the range every round. `[3,2,1,5,6,4]`, k=2 → 5.
- **Pitfalls.** Using a max-heap of size n (O(n log n)); Lomuto partition with many equal values degrades to O(n²); off-by-one between "kth largest" (index `n − k`) and "kth smallest" (index `k − 1`).
- **Alternatives.** Choose the heap for streaming / large n with small k / when mutating the input is not allowed. Choose Quickselect for the fastest one-shot answer on an in-memory array. Median of Medians gives guaranteed O(n) (rarely required).

---

### H17. Median of Two Sorted Arrays
**Hard** · [LeetCode 4](https://leetcode.com/problems/median-of-two-sorted-arrays/) · *True combination: binary search + partition invariants (divide-and-conquer on the answer's structure).*

- **Goal.** Median of the union of two sorted arrays in O(log(min(m, n))).
- **Clues / constraints.** Two **sorted** arrays + a required log-time bound → merging (O(m + n)) is too slow.
- **Patterns combined.** Binary search over the *cut position* in the smaller array + the invariant that a correct partition splits the union into a left half and right half with every left element ≤ every right element.
- **Brute force → bottleneck.** Merge both arrays and read the middle: O(m + n) time. The target needs only a boundary, not the merged order.
- **Reasoning.** Choose cut `i` in A and the matching cut `j = (m + n + 1)/2 − i` in B so the left side holds half the elements. The cut is correct iff `A[i−1] ≤ B[j]` and `B[j−1] ≤ A[i]` (cross-conditions; within-array order is already guaranteed). If `A[i−1] > B[j]`, A's cut is too far right; otherwise too far left. Sentinels ±∞ handle empty sides.

```java
class H17Median {
    static double findMedianSortedArrays(int[] A, int[] B) {
        if (A.length > B.length) return findMedianSortedArrays(B, A);   // binary search the smaller array
        int m = A.length, n = B.length, lo = 0, hi = m;
        while (lo <= hi) {
            int i = lo + (hi - lo) / 2, j = (m + n + 1) / 2 - i;
            int aL = (i == 0) ? Integer.MIN_VALUE : A[i - 1];
            int aR = (i == m) ? Integer.MAX_VALUE : A[i];
            int bL = (j == 0) ? Integer.MIN_VALUE : B[j - 1];
            int bR = (j == n) ? Integer.MAX_VALUE : B[j];
            if (aL <= bR && bL <= aR) {                                  // valid partition
                if ((m + n) % 2 == 1) return Math.max(aL, bL);
                return ((long) Math.max(aL, bL) + Math.min(aR, bR)) / 2.0;
            } else if (aL > bR) hi = i - 1;                              // took too many from A
            else lo = i + 1;                                             // took too few from A
        }
        throw new IllegalArgumentException("input arrays must be sorted");
    }
}
```

- **Complexity.** O(log min(m, n)) time, O(1) space.
- **Invariant + dry run.** The left half always has `(m + n + 1) / 2` elements. `A=[1,2]`, `B=[3,4]`: i=1, j=1 gives `aR=2 < bL=3`, so move `lo` right; i=2, j=0 gives left `{1,2}`, right `{3,4}` → `(2 + 3) / 2 = 2.5`.
- **Pitfalls.** Not swapping so A is the smaller array (j can go negative); `int` overflow when averaging extremes (cast to `long`); mixing up which side holds the extra element for odd totals (the left half does in this formulation).
- **Alternatives.** "Find the kth element of two sorted arrays" by discarding `k/2` elements each round (also O(log(m + n)), easier to reason about for some). Linear merge when arrays are small or the bound is not required.

---

### H18. Search in Rotated Sorted Array
**Medium** · [LeetCode 33](https://leetcode.com/problems/search-in-rotated-sorted-array/) · *Modified binary search: "one half is always sorted".*

- **Goal.** Index of target in a rotated sorted array of distinct values, or −1.
- **Clues / constraints.** Sorted array rotated at an unknown pivot, O(log n) required.
- **Patterns combined.** Binary search + a per-step test that decides which half is ordered and whether the target lies inside it.
- **Brute force → bottleneck.** Linear scan O(n); or find the pivot then binary search (two passes, also valid).
- **Reasoning.** For any `mid`, at least one of `[lo..mid]` and `[mid..hi]` is sorted. Identify the sorted half by comparing `a[lo]` and `a[mid]`; check whether the target falls in that half's range; discard the half that cannot contain it.

```java
class H18RotatedSearch {
    static int search(int[] a, int target) {
        int lo = 0, hi = a.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (a[mid] == target) return mid;
            if (a[lo] <= a[mid]) {                                     // left half sorted
                if (a[lo] <= target && target < a[mid]) hi = mid - 1;
                else lo = mid + 1;
            } else {                                                   // right half sorted
                if (a[mid] < target && target <= a[hi]) lo = mid + 1;
                else hi = mid - 1;
            }
        }
        return -1;
    }
}
```

- **Complexity.** O(log n) time, O(1) space (distinct values). With duplicates, worst case degrades to O(n).
- **Invariant + dry run.** If the target exists, it is always inside `[lo, hi]`. `[4,5,6,7,0,1,2]`, target 0: mid=3 (7), left sorted, 0 not in `[4,7)` → lo=4; mid=5 (1), left `[0,1]` sorted... `a[lo]=0 ≤ a[mid]=1`, 0 in `[0,1)` → hi=4; mid=4 → found, index 4.
- **Pitfalls.** `<` vs `<=` when comparing `a[lo]` and `a[mid]` (needed when `lo == mid`); duplicates (Search II): when `a[lo] == a[mid] == a[hi]` shrink both ends by one.
- **Alternatives.** Find the pivot (minimum) with `a[mid] > a[hi]` and then run two standard binary searches. Same idea: Find Minimum in Rotated Array ([P5](#p5-binary-search)).

---

### H19. Number of Islands
**Medium** · [LeetCode 200](https://leetcode.com/problems/number-of-islands/) · *Grid modeling + **alternatives**: DFS / BFS flood fill, or DSU.*

- **Goal.** Count connected groups of `'1'` cells (4-directional).
- **Clues / constraints.** Grid, "connected components", "regions".
- **Patterns combined (alternatives).** Treat each cell as a node with up to 4 edges. Traversal (DFS/BFS) counts components in one pass; DSU counts components via unions and is better when cells are *added over time* (Number of Islands II).
- **Brute force → bottleneck.** There is no simpler brute force than a traversal; the pitfall is revisiting cells without marking them.
- **Reasoning.** For each unvisited land cell, start one traversal that marks the entire island, and increment the counter. Using an explicit stack/queue avoids recursion-depth failures on large grids (a 300×300 all-land grid is 90,000 deep).

```java
class H19Islands {
    static final int[][] DIRS = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    static int numIslands(char[][] grid) {
        int m = grid.length, n = m == 0 ? 0 : grid[0].length, count = 0;
        boolean[][] seen = new boolean[m][n];
        Deque<int[]> st = new ArrayDeque<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] != '1' || seen[i][j]) continue;
                count++;
                seen[i][j] = true;
                st.push(new int[]{i, j});
                while (!st.isEmpty()) {                                    // iterative DFS
                    int[] c = st.pop();
                    for (int[] d : DIRS) {
                        int x = c[0] + d[0], y = c[1] + d[1];
                        if (x < 0 || y < 0 || x >= m || y >= n || grid[x][y] != '1' || seen[x][y]) continue;
                        seen[x][y] = true;
                        st.push(new int[]{x, y});
                    }
                }
            }
        }
        return count;
    }

    // DSU alternative: components = land cells - successful unions
    static int numIslandsDsu(char[][] grid) {
        int m = grid.length, n = m == 0 ? 0 : grid[0].length;
        int[] parent = new int[m * n];
        for (int i = 0; i < parent.length; i++) parent[i] = i;
        int comps = 0;
        for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) if (grid[i][j] == '1') comps++;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] != '1') continue;
                if (i + 1 < m && grid[i + 1][j] == '1' && union(parent, i * n + j, (i + 1) * n + j)) comps--;
                if (j + 1 < n && grid[i][j + 1] == '1' && union(parent, i * n + j, i * n + j + 1)) comps--;
            }
        }
        return comps;
    }

    private static int find(int[] p, int x) {
        while (p[x] != x) { p[x] = p[p[x]]; x = p[x]; }                    // path halving
        return x;
    }

    private static boolean union(int[] p, int a, int b) {
        int ra = find(p, a), rb = find(p, b);
        if (ra == rb) return false;
        p[rb] = ra;
        return true;
    }
}
```

- **Complexity.** Traversal: O(mn) time, O(mn) space for `seen` (O(min(m, n)) for a BFS frontier if you instead sink land in place). DSU: O(mn · α(mn)) time.
- **Invariant + dry run.** A cell is marked the moment it is *pushed*, so it is never pushed twice. Grid `11000/11000/00100/00011` → 3 islands (the 2×2 block, the single middle cell, the bottom-right pair).
- **Pitfalls.** Marking visited when *popped* (duplicates in the stack/queue); recursion depth on large grids; diagonal neighbors (not connected here); mutating the input when the caller still needs it.
- **Alternatives.** Recursive DFS (shortest code; risk of `StackOverflowError`); BFS (same complexity, bounded frontier). Prefer DSU for incremental additions and online queries. See [P13](#p13-graphs).

---

### H20. Accounts Merge
**Medium** · [LeetCode 721](https://leetcode.com/problems/accounts-merge/) · *True combination: DSU (connectivity) + HashMap (shared-email detection).*

- **Goal.** Merge accounts that share at least one email, grouping by person.
- **Clues / constraints.** "Shared identifiers imply the same entity", transitive merging (A shares with B, B with C → all one).
- **Patterns combined.** Union-Find to merge accounts transitively + `HashMap<email, firstAccountIndex>` to discover which accounts share an email in O(1) each.
- **Brute force → bottleneck.** Compare every pair of accounts for a common email, repeatedly until stable: O(n²) with a hard-to-bound repeat loop.
- **Reasoning.** Scan each email once. If it was already owned by another account, union the two accounts. After all unions, group every email by its account's root, sort each group, and prefix the name.

```java
class H20AccountsMerge {
    static List<List<String>> accountsMerge(List<List<String>> accounts) {
        int n = accounts.size();
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        Map<String, Integer> owner = new HashMap<>();                   // email -> first account index seen
        for (int i = 0; i < n; i++) {
            List<String> acc = accounts.get(i);
            for (int j = 1; j < acc.size(); j++) {                      // index 0 is the name
                Integer prev = owner.putIfAbsent(acc.get(j), i);
                if (prev != null) union(parent, i, prev);
            }
        }
        Map<Integer, TreeSet<String>> groups = new HashMap<>();
        for (Map.Entry<String, Integer> e : owner.entrySet())
            groups.computeIfAbsent(find(parent, e.getValue()), k -> new TreeSet<>()).add(e.getKey());
        List<List<String>> res = new ArrayList<>();
        for (Map.Entry<Integer, TreeSet<String>> g : groups.entrySet()) {
            List<String> row = new ArrayList<>();
            row.add(accounts.get(g.getKey()).get(0));                   // name
            row.addAll(g.getValue());                                    // sorted emails
            res.add(row);
        }
        return res;
    }

    private static int find(int[] p, int x) {
        while (p[x] != x) { p[x] = p[p[x]]; x = p[x]; }
        return x;
    }

    private static void union(int[] p, int a, int b) { p[find(p, a)] = find(p, b); }
}
```

- **Complexity.** O(E · α(n) + E log E) time (E = total emails; sorting each group), O(E) space.
- **Invariant + dry run.** Two accounts are in the same DSU set iff they are connected through a chain of shared emails. Accounts `John[a,b]`, `John[b,c]`, `Mary[x]`: email `b` links accounts 0 and 1 → one group `John a b c`, plus `Mary x`.
- **Pitfalls.** Merging by *name* (different people can share names); using the root of the *email's first owner* (use `find` after all unions); forgetting to sort emails.
- **Alternatives.** DFS over a bipartite graph of accounts and emails (equivalent). Union by size/rank is optional here; path halving already gives near-linear behavior in practice.

---

### H21. Count Inversions
**Hard (classic)** · closest LeetCode form: [Reverse Pairs](https://leetcode.com/problems/reverse-pairs/) (Hard) · *True combination: divide and conquer + merge sort counting.*

- **Goal.** Number of pairs `i < j` with `a[i] > a[j]`.
- **Clues / constraints.** "Pairs out of order", n up to 1e5–1e6 → O(n²) too slow.
- **Patterns combined.** Merge sort's divide-and-conquer structure + counting *cross* inversions during the merge, when both halves are already sorted.
- **Brute force → bottleneck.** Check all pairs: O(n²).
- **Reasoning.** Inversions = left-only + right-only + cross. The first two come from recursion. For cross pairs, both halves are sorted, so when the next element comes from the **right** half, it is smaller than every remaining left element: add `(mid − i + 1)` at once.

```java
class H21Inversions {
    static long countInversions(int[] input) {
        int[] a = input.clone();
        return sort(a, new int[a.length], 0, a.length - 1);
    }

    private static long sort(int[] a, int[] tmp, int l, int r) {
        if (l >= r) return 0;
        int m = l + (r - l) / 2;
        long count = sort(a, tmp, l, m) + sort(a, tmp, m + 1, r);
        int i = l, j = m + 1, k = l;
        while (i <= m && j <= r) {
            if (a[i] <= a[j]) tmp[k++] = a[i++];                     // equal: not an inversion
            else { tmp[k++] = a[j++]; count += m - i + 1; }          // a[j] is smaller than all of a[i..m]
        }
        while (i <= m) tmp[k++] = a[i++];
        while (j <= r) tmp[k++] = a[j++];
        System.arraycopy(tmp, l, a, l, r - l + 1);
        return count;
    }
}
```

- **Complexity.** O(n log n) time, O(n) auxiliary space. Count needs `long` (up to n(n−1)/2).
- **Invariant + dry run.** After `sort(l, r)`, `a[l..r]` is sorted and the returned value equals the inversions inside that range. `[2,4,1,3,5]`: left `[2,4]` and right `[1,3,5]` merge: take 1 from the right (adds 2: both 2 and 4 exceed it), take 2, take 3 from the right (adds 1: only 4 exceeds it), take 4, take 5 → total 3.
- **Pitfalls.** `int` counter overflow; using `<` instead of `<=` for equal elements; skipping the copy-back (parents see an unsorted half).
- **Alternatives.** Fenwick tree + coordinate compression ([P20](#p20-advanced-structures)) for online or per-element counts (see [H25](#h25-count-of-smaller-numbers-after-self)). Reverse Pairs (`a[i] > 2·a[j]`) needs a separate counting pass *before* merging (two pointers on the sorted halves).

---

### H22. Longest Palindromic Substring
**Medium** · [LeetCode 5](https://leetcode.com/problems/longest-palindromic-substring/) · ***Alternatives:** expand around centers, interval DP, or Manacher.*

- **Goal.** Longest contiguous palindromic substring.
- **Clues / constraints.** n ≤ 1000 → O(n²) is expected.
- **Patterns combined (alternatives).** Center expansion (two pointers outward) vs 2D DP `pal[i][j]` vs Manacher (linear, advanced, see [P19](#p19-string-algorithms)).
- **Brute force → bottleneck.** Check every substring: O(n³).
- **Reasoning.** Every palindrome has a center (a character for odd length, a gap for even length). Expanding while characters match gives the longest palindrome per center, 2n − 1 centers, O(n) each. DP uses `pal[i][j] = s[i]==s[j] && pal[i+1][j-1]` filled by increasing length.

```java
class H22LongestPalindrome {
    static String longestPalindrome(String s) {
        if (s.isEmpty()) return "";
        int start = 0, maxLen = 1;
        for (int c = 0; c < s.length(); c++) {
            int odd = expand(s, c, c), even = expand(s, c, c + 1);
            int len = Math.max(odd, even);
            if (len > maxLen) { maxLen = len; start = c - (len - 1) / 2; }
        }
        return s.substring(start, start + maxLen);
    }

    private static int expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
        return r - l - 1;                                           // length of the palindrome found
    }
}
```

- **Complexity.** Expand: O(n²) time, O(1) space. DP: O(n²) time, O(n²) space. Manacher: O(n) time, O(n) space.
- **Invariant + dry run.** `expand` returns the length of the longest palindrome centered at the given center. `"babad"`: center 1 (`a`) expands to `bab` (3); start = `1 − (3 − 1)/2 = 0` → `"bab"`.
- **Pitfalls.** Forgetting the even-length centers (`"cbbd"` → `"bb"`); wrong start index for even lengths (`c − (len − 1)/2` works for both parities); `substring` end index.
- **Alternatives.** Prefer expand-around-center in interviews (short, O(1) space). Use DP when the follow-up asks to count palindromic substrings or query `isPal(i, j)` many times. Use Manacher only if O(n) is demanded.

---

### H23. Palindrome Partitioning
**Medium** · [LeetCode 131](https://leetcode.com/problems/palindrome-partitioning/) · *True combination: backtracking + palindrome precomputation (DP).*

- **Goal.** All ways to split s so every piece is a palindrome.
- **Clues / constraints.** "Return all partitions", n ≤ 16 → exponential output is inherent.
- **Patterns combined.** Backtracking over cut positions + a DP table `pal[i][j]` so each palindrome check is O(1) instead of O(length).
- **Brute force → bottleneck.** Generate all 2^(n−1) partitions and test each piece: O(n · 2ⁿ · n). Most partitions die at the first non-palindromic piece; pruning is the improvement, and the O(1) check removes the inner cost.
- **Reasoning.** From position `start`, try every `end` where `s[start..end]` is a palindrome (table lookup), recurse on `end + 1`, then undo. Reaching the end of the string records the current path.

```java
class H23PalindromePartition {
    static List<List<String>> partition(String s) {
        int n = s.length();
        boolean[][] pal = new boolean[n][n];
        for (int i = n - 1; i >= 0; i--)
            for (int j = i; j < n; j++)
                pal[i][j] = s.charAt(i) == s.charAt(j) && (j - i < 2 || pal[i + 1][j - 1]);
        List<List<String>> res = new ArrayList<>();
        dfs(s, 0, pal, new ArrayList<>(), res);
        return res;
    }

    private static void dfs(String s, int start, boolean[][] pal, List<String> path, List<List<String>> res) {
        if (start == s.length()) { res.add(new ArrayList<>(path)); return; }
        for (int end = start; end < s.length(); end++) {
            if (!pal[start][end]) continue;                          // prune immediately
            path.add(s.substring(start, end + 1));
            dfs(s, end + 1, pal, path, res);
            path.remove(path.size() - 1);                            // un-choose
        }
    }
}
```

- **Complexity.** O(n²) for the table; backtracking is O(n · 2ⁿ) worst case (e.g., all identical characters), O(n) recursion stack plus output.
- **Invariant + dry run.** `path` is always a concatenation of palindromes covering `s[0..start)`. `"aab"`: `a|a|b` and `aa|b` → `[["a","a","b"],["aa","b"]]`.
- **Pitfalls.** Storing `path` without copying; recomputing `isPalindrome` each time (acceptable for tiny n but slower); DP loop order (rows must run from bottom to top, so `pal[i + 1][j − 1]` is ready).
- **Alternatives.** Palindrome Partitioning II (minimum cuts) is *pure DP* (no enumeration): `cuts[j] = min(cuts[i−1] + 1)` over palindromic `s[i..j]`. See [P14](#p14-backtracking) and [P16](#p16-dynamic-programming).

---

### H24. Binary Search on the Answer
**Hard (as Split Array Largest Sum)** · [LeetCode 410](https://leetcode.com/problems/split-array-largest-sum/) · also [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) (Medium) · *True combination: binary search + monotone feasibility check (usually greedy).*

- **Goal.** Minimize the largest subarray sum when splitting an array into at most m contiguous parts.
- **Clues / constraints.** "Minimize the maximum" / "maximize the minimum", answer range is numeric and known, a candidate answer is easy to *verify*, and feasibility is monotone (if cap `x` works, `x + 1` works).
- **Patterns combined.** Binary search over the answer space + greedy feasibility check (pack as much as possible into each part).
- **Brute force → bottleneck.** DP over (position, parts): O(n² · m), or testing every candidate answer: O(n · sum).
- **Reasoning.** The answer lies in `[max(a), sum(a)]`. For a cap `c`, greedily fill each part until adding the next element would exceed `c`; count parts. If parts ≤ m the cap is feasible, so try smaller. The predicate flips from false to true exactly once, so binary search finds the smallest feasible cap.

```java
class H24SearchOnAnswer {
    static int splitArray(int[] a, int m) {
        long lo = 0, hi = 0;
        for (int x : a) { lo = Math.max(lo, x); hi += x; }           // answer in [max, sum]
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2;
            if (partsNeeded(a, mid) <= m) hi = mid;                  // feasible: try smaller
            else lo = mid + 1;
        }
        return (int) lo;
    }

    private static int partsNeeded(int[] a, long cap) {
        int parts = 1;
        long cur = 0;
        for (int x : a) {
            if (cur + x > cap) { parts++; cur = x; }
            else cur += x;
        }
        return parts;
    }
}
```

- **Complexity.** O(n log(sum)) time, O(1) space.
- **Invariant + dry run.** `lo` is infeasible-or-answer and `hi` is feasible; the answer stays in `[lo, hi]`. `[7,2,5,10,8]`, m=2: range `[10, 32]`. Cap 21 needs 2 parts (feasible); cap 15 needs 3 (infeasible); cap 18 needs 2 (`[7,2,5]` + `[10,8]`, feasible); cap 17 needs 3 (infeasible). Answer 18.
- **Pitfalls.** Wrong bounds (`lo` must be at least `max(a)`); using the wrong template for "maximize" (use upper mid with `lo = mid`, see [P5](#p5-binary-search)); non-monotone predicates; overflow of `hi` on large sums.
- **Alternatives.** DP with prefix sums (slower). Same template: Koko Eating Bananas (feasibility = hours ≤ h), Capacity to Ship Packages, Aggressive Cows, Minimum Days to Make m Bouquets, Smallest Divisor. When feasibility needs DP instead of greedy, cost multiplies: O(check · log range).

---

### H25. Count of Smaller Numbers After Self
**Hard** · [LeetCode 315](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) · *True combination: coordinate compression + Fenwick tree (scan right to left). Merge sort is an alternative.*

- **Goal.** For each i, count `j > i` with `a[j] < a[i]`.
- **Clues / constraints.** "Per-element" count of smaller elements to the right, n up to 1e5, values up to ±1e4 (or larger): O(n²) too slow.
- **Patterns combined.** Coordinate compression (map values to ranks 1..m) + Fenwick tree (frequency prefix sums with point updates) + a right-to-left scan so "elements to the right" are exactly what has been inserted.
- **Brute force → bottleneck.** Count to the right for every element: O(n²).
- **Reasoning.** Processing from the right, the Fenwick tree holds the multiset of elements already seen (those to the right). The answer for `a[i]` is the prefix count of ranks strictly below `rank(a[i])`. Then insert `a[i]`.

```java
class H25CountSmaller {
    static int[] countSmaller(int[] a) {
        int n = a.length;
        int[] sorted = a.clone();
        Arrays.sort(sorted);
        int m = 0;
        int[] uniq = new int[n];
        for (int x : sorted) if (m == 0 || uniq[m - 1] != x) uniq[m++] = x;     // distinct sorted values
        int[] bit = new int[m + 1];                                              // Fenwick over ranks 1..m
        int[] res = new int[n];
        for (int i = n - 1; i >= 0; i--) {
            int rank = Arrays.binarySearch(uniq, 0, m, a[i]) + 1;               // 1-based rank
            res[i] = query(bit, rank - 1);                                       // strictly smaller values
            update(bit, rank, m);
        }
        return res;
    }

    private static void update(int[] bit, int i, int size) {
        for (; i <= size; i += i & -i) bit[i]++;
    }

    private static int query(int[] bit, int i) {
        int s = 0;
        for (; i > 0; i -= i & -i) s += bit[i];
        return s;
    }
}
```

- **Complexity.** O(n log n) time, O(n) space.
- **Invariant + dry run.** Before processing index i, the Fenwick tree counts exactly the elements `a[i+1..]`. `[5,2,6,1]`: from the right: 1 → 0; 6 → 1 (the `1`); 2 → 1 (the `1`); 5 → 2 (`2` and `1`). Result `[2,1,1,0]`.
- **Pitfalls.** Using `rank` instead of `rank − 1` (counts equal values); scanning left to right (counts the wrong side); skipping compression when values are huge or negative; Fenwick index 0 (must be 1-based).
- **Alternatives.** **Merge sort** on `(value, original index)` pairs: when an element from the left half is placed, add the count of right-half elements already placed (O(n log n), no compression). Balanced BST with subtree sizes is also valid but heavier to write. See [P20](#p20-advanced-structures).

---

### H26. Lowest Common Ancestor: single query vs many queries
**Medium** · [LeetCode 236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) (single query) · [LeetCode 1483](https://leetcode.com/problems/kth-ancestor-of-a-tree-node/) (binary lifting, Hard) · ***Alternatives driven by query volume.***

- **Goal.** Lowest node having both u and v in its subtree.
- **Clues / constraints.** One query on a binary tree → a recursive pass. **Many queries** on a fixed tree with up to ~1e5 nodes → preprocess for O(log n) per query.
- **Patterns combined.** Single query: tree DFS returning information from children (see [P11](#p11-trees-binary-tree-and-bst) for the recursion). Many queries: BFS for depth and parent + **binary lifting** table `up[k][v]` = the 2ᵏ-th ancestor.
- **Brute force → bottleneck.** Walk both nodes up one step at a time after equalizing depth: O(n) per query. With q queries: O(nq).
- **Reasoning.** Lift the deeper node to the same depth using the bits of the depth difference. If they coincide, done. Otherwise lift both together, from the largest power down to the smallest, whenever the ancestors differ; the parent of the result is the LCA.

```java
class H26BinaryLifting {
    private final int LOG;
    private final int[][] up;           // up[k][v] = 2^k-th ancestor of v (the root is its own ancestor)
    private final int[] depth;

    H26BinaryLifting(int n, int[][] edges, int root) {
        int log = 1;
        while ((1 << log) < n) log++;
        LOG = log;
        List<List<Integer>> g = new ArrayList<>();
        for (int i = 0; i < n; i++) g.add(new ArrayList<>());
        for (int[] e : edges) { g.get(e[0]).add(e[1]); g.get(e[1]).add(e[0]); }
        up = new int[LOG][n];
        depth = new int[n];
        boolean[] seen = new boolean[n];
        Deque<Integer> q = new ArrayDeque<>();
        q.offer(root);
        seen[root] = true;
        up[0][root] = root;
        while (!q.isEmpty()) {                                       // BFS: no recursion-depth risk
            int u = q.poll();
            for (int v : g.get(u)) {
                if (seen[v]) continue;
                seen[v] = true;
                depth[v] = depth[u] + 1;
                up[0][v] = u;
                q.offer(v);
            }
        }
        for (int k = 1; k < LOG; k++)
            for (int v = 0; v < n; v++) up[k][v] = up[k - 1][up[k - 1][v]];
    }

    int lca(int u, int v) {
        if (depth[u] < depth[v]) { int t = u; u = v; v = t; }
        int diff = depth[u] - depth[v];
        for (int k = 0; k < LOG; k++) if ((diff >> k & 1) == 1) u = up[k][u];   // lift u to v's depth
        if (u == v) return u;
        for (int k = LOG - 1; k >= 0; k--) {
            if (up[k][u] != up[k][v]) { u = up[k][u]; v = up[k][v]; }          // jump while ancestors differ
        }
        return up[0][u];
    }
}

// Single query on a binary tree (no preprocessing), shown for contrast:
//   TreeNode lca(TreeNode r, TreeNode p, TreeNode q) {
//       if (r == null || r == p || r == q) return r;
//       TreeNode L = lca(r.left, p, q), R = lca(r.right, p, q);
//       return (L != null && R != null) ? r : (L != null ? L : R);
//   }
```

- **Complexity.** Single query: O(n) time, O(h) recursion. Binary lifting: O(n log n) preprocessing and space, O(log n) per query.
- **Invariant + dry run.** After equalizing depths, `u` and `v` are at the same depth, and every jump keeps them *below* the LCA. Tree edges `0-1, 0-2, 1-3, 1-4` with root 0: `lca(3, 4) = 1`, `lca(3, 2) = 0`, `lca(3, 1) = 1`.
- **Pitfalls.** Forgetting the root's self-ancestor (`up[0][root] = root`), which lets jumps run past the root safely; `LOG` too small for the deepest chain; recursive DFS preprocessing on a path graph (stack overflow); forgetting the `u == v` check.
- **Alternatives.** Euler tour + sparse table (O(1) queries). Offline Tarjan LCA with DSU. For a BST, walk down comparing values (O(h)). If the tree is a parent-pointer tree, use the two-pointer "swap heads at the end" trick (as in intersecting linked lists).

---

### H27. Subset Sum / Target Sum
**Medium** · [Partition Equal Subset Sum, LeetCode 416](https://leetcode.com/problems/partition-equal-subset-sum/) · [Target Sum, LeetCode 494](https://leetcode.com/problems/target-sum/) · *True combination: problem transformation + 0/1 knapsack DP. The bitset form is an optimization of the same DP.*

- **Goal.** (Target Sum) Count ways to assign `+`/`−` to every element so the total equals `target`. (Partition) Decide if the array splits into two equal-sum subsets.
- **Clues / constraints.** Each element used once, sum-like target, small total sum (≲ 10⁴).
- **Patterns combined.** Algebraic reduction + 0/1 knapsack counting (or boolean reachability) in one dimension. If `P` is the sum of elements with `+` and `N` with `−`: `P − N = target` and `P + N = total`, so `P = (total + target) / 2`. The task becomes "count subsets with sum P".
- **Brute force → bottleneck.** Try 2ⁿ sign assignments (or subsets).
- **Reasoning.** `dp[s]` = number of subsets with sum `s`. Iterate each element and sums *downward* so each element is used at most once. Infeasible when `|target| > total` or `(total + target)` is odd or negative.

```java
import java.math.BigInteger;

class H27SubsetSum {
    // Count assignments of +/- to reach target (Target Sum)
    static int findTargetSumWays(int[] nums, int target) {
        int total = 0;
        for (int x : nums) total += x;
        if (Math.abs(target) > total || ((total + target) & 1) != 0) return 0;
        int need = (total + target) / 2;                              // sum of the '+' group
        int[] dp = new int[need + 1];
        dp[0] = 1;                                                    // empty subset
        for (int x : nums)
            for (int s = need; s >= x; s--) dp[s] += dp[s - x];       // descending: use each x once
        return dp[need];
    }

    // Boolean reachability (Partition Equal Subset Sum)
    static boolean canPartition(int[] nums) {
        int total = 0;
        for (int x : nums) total += x;
        if ((total & 1) == 1) return false;
        int half = total / 2;
        boolean[] dp = new boolean[half + 1];
        dp[0] = true;
        for (int x : nums)
            for (int s = half; s >= x; s--) dp[s] |= dp[s - x];
        return dp[half];
    }

    // Bitset form: bit s is set iff sum s is reachable. One shift-or per element.
    static boolean canPartitionBitset(int[] nums) {
        int total = 0;
        for (int x : nums) total += x;
        if ((total & 1) == 1) return false;
        BigInteger bits = BigInteger.ONE;                             // only sum 0 reachable
        for (int x : nums) bits = bits.or(bits.shiftLeft(x));
        return bits.testBit(total / 2);
    }
}
```

- **Complexity.** O(n · S) time and O(S) space for the DPs (S = target subset sum). The bitset form is O(n · S / 64) word operations.
- **Invariant + dry run.** After processing the first i elements, `dp[s]` counts subsets of those elements with sum `s`. `nums=[1,1,1,1,1]`, `target=3`: total 5, `need = (5 + 3)/2 = 4`; subsets with sum 4: choose 4 of 5 ones = 5. Answer 5.
- **Pitfalls.** Iterating sums *upward* (reuses an element: that is the unbounded knapsack); skipping the parity/range checks (negative array index); zeros in the input (each zero doubles the count, which the descending loop handles as long as the bound is `s >= x` and not `s > x`); counting vs feasibility mix-up.
- **Alternatives.** Memoized DFS on `(index, current sum)` (needs a map; fine when sums are sparse). Meet-in-the-middle (split in two halves, 2^(n/2) each) when n ≈ 40 and values are large.

---

### H28. Travelling Salesperson Problem
**Hard (classic)** · closest LeetCode form: [Shortest Path Visiting All Nodes](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) · *True combination: bitmask DP + graph (complete weighted graph) optimization (Held-Karp).*

- **Goal.** Minimum-cost tour that visits every city exactly once and returns to the start.
- **Clues / constraints.** n ≤ ~16–20, "visit all", "exactly once", costs on pairs.
- **Patterns combined.** A subset of visited nodes encoded as a bitmask + the current node as the DP state + shortest-cost transitions over the graph's edges.
- **Brute force → bottleneck.** Try all (n−1)! permutations. 12! is already 479 million.
- **Reasoning.** The cheapest way to finish depends only on *which* cities were visited and *where* we are now, not on the order. `dp[mask][i]` = minimum cost of a path that starts at city 0, visits exactly the cities in `mask`, and ends at `i`. Extend to an unvisited `j`. Close the tour by adding the edge back to 0.

```java
class H28Tsp {
    // dist[i][j] = cost of going from i to j. Returns the minimum Hamiltonian cycle cost starting/ending at 0.
    static int tsp(int[][] dist) {
        int n = dist.length;
        if (n == 1) return 0;
        final int INF = Integer.MAX_VALUE / 2;                       // safe against INF + INF
        int full = 1 << n;
        int[][] dp = new int[full][n];
        for (int[] row : dp) Arrays.fill(row, INF);
        dp[1][0] = 0;                                                // only city 0 visited, standing at 0
        for (int mask = 1; mask < full; mask++) {
            if ((mask & 1) == 0) continue;                           // every state must contain city 0
            for (int i = 0; i < n; i++) {
                if ((mask >> i & 1) == 0 || dp[mask][i] >= INF) continue;
                for (int j = 0; j < n; j++) {
                    if ((mask >> j & 1) == 1) continue;              // already visited
                    int next = mask | (1 << j);
                    dp[next][j] = Math.min(dp[next][j], dp[mask][i] + dist[i][j]);
                }
            }
        }
        int best = INF;
        for (int i = 1; i < n; i++) best = Math.min(best, dp[full - 1][i] + dist[i][0]);
        return best;
    }
}
```

- **Complexity.** O(2ⁿ · n²) time, O(2ⁿ · n) space (n = 16 → ~16.7M ops, 1M states; n = 20 → ~420M ops, 20M ints ≈ 80 MB).
- **Invariant + dry run.** `dp[mask][i]` is minimal over all orders of visiting `mask \ {i}` first. Four cities with `{{0,10,15,20},{10,0,35,25},{15,35,0,30},{20,25,30,0}}`: the best tour is `0→1→3→2→0` with cost `10 + 25 + 30 + 15 = 80`.
- **Pitfalls.** `Integer.MAX_VALUE` overflow (use `INF = MAX/2`); forgetting to close the cycle; iterating masks out of increasing order (every transition goes to a larger mask, so plain increasing order is correct); memory at n > 20.
- **Alternatives.** For "visit all nodes in an *unweighted* graph, nodes may repeat" (Shortest Path Visiting All Nodes), BFS over `(node, mask)` is simpler ([H31](#h31-shortest-path-visiting-all-nodes)). For large n use heuristics/approximations (nearest neighbor, 2-opt, Christofides). Held-Karp is exact; no polynomial exact algorithm is known.

---

### H29. Maximal Rectangle
**Hard** · [LeetCode 85](https://leetcode.com/problems/maximal-rectangle/) · *True combination: row-wise DP for histogram heights + monotonic stack for each histogram.*

- **Goal.** Area of the largest rectangle containing only `'1'` in a binary matrix.
- **Clues / constraints.** Binary matrix, "largest rectangle", up to ~200 × 200.
- **Patterns combined.** A running DP `h[j]` (consecutive ones ending at the current row) reduces each row to a *histogram*; Largest Rectangle in Histogram (monotonic stack) solves it in O(n).
- **Brute force → bottleneck.** Enumerate all rectangles: O(m²n²) or O((mn)²) with prefix sums. Many rectangles share structure.
- **Reasoning.** Any maximal rectangle has a bottom row. Treating each row as the bottom, the heights of consecutive ones above it form a histogram; the best rectangle with that bottom row is the largest rectangle in that histogram.

```java
class H29MaximalRectangle {
    static int maximalRectangle(char[][] g) {
        if (g.length == 0 || g[0].length == 0) return 0;
        int n = g[0].length, best = 0;
        int[] h = new int[n];
        for (char[] row : g) {
            for (int j = 0; j < n; j++) h[j] = (row[j] == '1') ? h[j] + 1 : 0;   // row becomes a histogram
            best = Math.max(best, largestInHistogram(h));
        }
        return best;
    }

    private static int largestInHistogram(int[] h) {
        int n = h.length, best = 0;
        Deque<Integer> st = new ArrayDeque<>();                                    // indices, heights increasing
        for (int i = 0; i <= n; i++) {
            int cur = (i == n) ? 0 : h[i];                                         // sentinel flushes the stack
            while (!st.isEmpty() && h[st.peek()] > cur) {
                int height = h[st.pop()];
                int left = st.isEmpty() ? -1 : st.peek();
                best = Math.max(best, height * (i - left - 1));
            }
            st.push(i);
        }
        return best;
    }
}
```

- **Complexity.** O(m · n) time, O(n) space.
- **Invariant + dry run.** After row r, `h[j]` is the count of consecutive `'1'`s ending at row r in column j. Grid `10100/10111/11111/10010`: histograms `[1,0,1,0,0]`, `[2,0,2,1,1]`, `[3,1,3,2,2]` (largest 6), `[4,0,0,3,0]`. Answer 6.
- **Pitfalls.** Forgetting to reset `h[j]` to 0 on a `'0'`; the sentinel pass (`i == n`); `char` vs `int` comparison (`'1'`).
- **Alternatives.** The three-array DP (`height`, `left`, `right` per column) is equivalent and avoids the stack. The brute-force prefix-sum rectangle check is O(m²n²). See [P7](#p7-stack-and-monotonic-stack).

---

### H30. Sum of Subarray Minimums
**Medium** · [LeetCode 907](https://leetcode.com/problems/sum-of-subarray-minimums/) · *True combination: monotonic stack + contribution counting.*

- **Goal.** Sum of `min(subarray)` over all contiguous subarrays (mod 1e9 + 7).
- **Clues / constraints.** "Sum over all subarrays of a min/max", n up to 3·10⁴ or more.
- **Patterns combined.** Instead of enumerating subarrays, count in how many subarrays each element is the minimum (a *contribution* argument), using a monotonic stack to find each element's extent.
- **Brute force → bottleneck.** O(n²) subarrays with an O(1) running minimum; O(n³) naive.
- **Reasoning.** Element `a[j]` is the minimum of exactly `(j − left) × (right − j)` subarrays, where `left` is the previous element ≤ it and `right` is the next strictly smaller element. Using ≤ on one side and < on the other assigns every subarray to exactly one minimum when values repeat.

```java
class H30SubarrayMinimums {
    static int sumSubarrayMins(int[] a) {
        final long MOD = 1_000_000_007L;
        int n = a.length;
        long sum = 0;
        Deque<Integer> st = new ArrayDeque<>();                          // indices, values non-decreasing
        for (int i = 0; i <= n; i++) {
            int cur = (i == n) ? Integer.MIN_VALUE : a[i];               // sentinel pops everything
            while (!st.isEmpty() && a[st.peek()] > cur) {
                int j = st.pop();
                int left = st.isEmpty() ? -1 : st.peek();                // previous element <= a[j]
                long count = (long) (j - left) * (i - j);                // subarrays where a[j] is the (leftmost) min
                sum = (sum + a[j] * count) % MOD;
            }
            st.push(i);
        }
        return (int) sum;
    }
}
```

- **Complexity.** O(n) time, O(n) space.
- **Invariant + dry run.** Elements on the stack are waiting for a strictly smaller right boundary. `[3,1,2,4]`: contributions: `3 × (1 × 1) = 3`, `1 × (2 × 3) = 6`, `2 × (1 × 2) = 4`, `4 × (1 × 1) = 4`. Total 17.
- **Pitfalls.** Using strict comparisons on both sides (double counts with duplicates) or ≤ on both (undercounts); `int` overflow in `count` and `a[j] * count` (cast to `long`); forgetting the sentinel.
- **Alternatives.** DP on "sum of minimums of subarrays ending at i" with a stack (same stack, different bookkeeping). The mirrored problem (Sum of Subarray Ranges) uses two such passes: sum of maxima minus sum of minima.

---

### H31. Shortest Path Visiting All Nodes
**Hard** · [LeetCode 847](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) · *True combination: BFS on an expanded state space `(node, visited-mask)`.*

- **Goal.** Length of the shortest walk that visits every node of an undirected unweighted graph (start anywhere, nodes/edges may repeat).
- **Clues / constraints.** n ≤ 12–16, "visit all nodes", unweighted → BFS.
- **Patterns combined.** Bitmask to remember which nodes were visited + BFS over states `(current node, mask)` for the fewest edges. The *state graph* has `n · 2ⁿ` vertices.
- **Brute force → bottleneck.** Enumerate all walks: unbounded. Plain BFS on nodes loses the "what have I visited" information and is wrong.
- **Reasoning.** The answer depends only on `(node, mask)`. Start from all nodes at once (multi-source BFS with mask = that single node). The first time any state has `mask == full`, BFS has found the minimum number of edges. Each state is visited once.

```java
class H31VisitAllNodes {
    static int shortestPathLength(int[][] graph) {
        int n = graph.length, full = (1 << n) - 1;
        boolean[][] seen = new boolean[n][1 << n];
        Deque<int[]> q = new ArrayDeque<>();                          // {node, mask}
        for (int i = 0; i < n; i++) {                                 // multi-source: start anywhere
            seen[i][1 << i] = true;
            q.offer(new int[]{i, 1 << i});
        }
        int steps = 0;
        while (!q.isEmpty()) {
            for (int sz = q.size(); sz > 0; sz--) {
                int[] cur = q.poll();
                if (cur[1] == full) return steps;
                for (int nb : graph[cur[0]]) {
                    int nm = cur[1] | (1 << nb);
                    if (!seen[nb][nm]) { seen[nb][nm] = true; q.offer(new int[]{nb, nm}); }
                }
            }
            steps++;
        }
        return -1;                                                     // disconnected graph
    }
}
```

- **Complexity.** O(2ⁿ · n · deg) time = O(2ⁿ · (n + E)); O(2ⁿ · n) space.
- **Invariant + dry run.** BFS layer `d` contains exactly the states first reachable in `d` edges. Star graph `[[1,2,3],[0],[0],[0]]`: e.g., `1→0→2→0→3` visits all in 4 edges. Answer 4.
- **Pitfalls.** Marking `seen` on dequeue instead of enqueue; single-node graph (answer 0, handled since the first state is full); forgetting multi-source initialization (running BFS from one start only).
- **Alternatives.** Held-Karp DP ([H28](#h28-travelling-salesperson-problem)) when edges have weights. Floyd-Warshall + TSP-DP on the metric closure for weighted "walks may repeat" variants.

---

### Alternatives vs. true combinations: summary

| Problem | Relationship between techniques |
| --- | --- |
| H1 LIS | DP **→** binary search (optimizes the DP's transition) |
| H2, H3, H4, H5, H7, H8, H9, H10, H14, H15, H17, H20, H23, H24, H25, H27, H28, H29, H30, H31 | **Truly combined:** one algorithm needs both techniques |
| H6 Top K Frequent | HashMap + **either** heap **or** buckets (alternatives for the selection step) |
| H11 Merge Intervals, H12 Meeting Rooms II | Sort first, then a scan. H12 has two equivalent formulations (heap or sweep) |
| H13 Trapping Rain Water | **Three alternatives** (prefix/suffix, two pointers, stack) |
| H16 Kth Largest | **Alternatives** (heap vs Quickselect) |
| H18 Rotated Search | One technique (binary search) with a modified predicate |
| H19 Islands | Alternatives (DFS, BFS, DSU) |
| H21 Inversions | Divide and conquer + counting (merge sort) |
| H22 Longest Palindrome | **Alternatives** (expand, DP, Manacher) |
| H26 LCA | **Alternatives chosen by query volume** |

---

---

# PART VI. PRACTICE AND REVISION

## 13. Must-practice roadmap

Work top to bottom. Each stage ends with a *gate*: you can solve the stage's problems in the time shown without hints. Difficulty tags are LeetCode's labels. Problems marked **(H#)** are in [Part V](#part-v-hybrid--mixed-patterns-31-problems).

| Stage | Focus | Problems (canonical names) | Gate |
| --- | --- | --- | --- |
| **0. Warm-up** (Java fluency) | Arrays, strings, maps, loops, input/output | Two Sum (Easy) · Valid Anagram (Easy) · Contains Duplicate (Easy) · Valid Palindrome (Easy) · Best Time to Buy and Sell Stock (Easy) · Move Zeroes (Easy) · Maximum Subarray (Medium) | Easy in ≤ 10 min |
| **1. Core linear patterns** | Two pointers, sliding window, prefix sums, hashing | Merge Sorted Array (Easy) · Container With Most Water (Medium) · 3Sum (Medium) **(H15)** · Sort Colors (Medium) · Longest Substring Without Repeating Characters (Medium) **(H3)** · Permutation in String (Medium) · Minimum Size Subarray Sum (Medium) · Subarray Sum Equals K (Medium) **(H2)** · Product of Array Except Self (Medium) · Group Anagrams (Medium) · Longest Consecutive Sequence (Medium) · Top K Frequent Elements (Medium) **(H6)** | Medium in ≤ 25 min |
| **2. Search and sort** | Binary search variants, search on the answer, selection | Binary Search (Easy) · Search Insert Position (Easy) · Search in Rotated Sorted Array (Medium) **(H18)** · Find Minimum in Rotated Sorted Array (Medium) · Find First and Last Position (Medium) · Koko Eating Bananas (Medium) · Kth Largest Element in an Array (Medium) **(H16)** · Merge Intervals (Medium) **(H11)** | explain monotone predicate |
| **3. Stacks, queues, lists** | Monotonic structures, in-place pointers | Valid Parentheses (Easy) · Min Stack (Medium) · Daily Temperatures (Medium) **(H14)** · Next Greater Element II (Medium) · Reverse Linked List (Easy) · Linked List Cycle II (Medium) · Merge Two Sorted Lists (Easy) · Remove Nth Node From End (Medium) · Reorder List (Medium) · LRU Cache (Medium) · Largest Rectangle in Histogram (Hard) | write each from memory |
| **4. Trees** | DFS returns, BFS levels, BST | Maximum Depth (Easy) · Invert Binary Tree (Easy) · Diameter of Binary Tree (Easy) · Binary Tree Level Order Traversal (Medium) · Validate BST (Medium) · Lowest Common Ancestor (Medium) **(H26)** · Kth Smallest in a BST (Medium) · Construct Binary Tree from Preorder and Inorder (Medium) · Path Sum III (Medium) · Binary Tree Maximum Path Sum (Hard) · Serialize and Deserialize Binary Tree (Hard) | Medium in ≤ 25 min |
| **5. Heaps and intervals** | Priority queues, scheduling | Last Stone Weight (Easy) · K Closest Points to Origin (Medium) · Task Scheduler (Medium) · Meeting Rooms II (Medium) **(H12)** · Non-overlapping Intervals (Medium) · Find Median from Data Stream (Hard) · Merge k Sorted Lists (Hard) | choose heap direction instantly |
| **6. Graphs I** | Traversals, components, ordering | Number of Islands (Medium) **(H19)** · Clone Graph (Medium) · Rotting Oranges (Medium) · Course Schedule I/II (Medium) **(H8)** · Is Graph Bipartite (Medium) · Pacific Atlantic Water Flow (Medium) · Number of Provinces (Medium) · Accounts Merge (Medium) **(H20)** · Redundant Connection (Medium) | model a grid/graph in 2 min |
| **7. Graphs II** | Weighted paths, MST, state-space BFS | Network Delay Time (Medium) **(H10)** · Cheapest Flights Within K Stops (Medium) · Path With Minimum Effort (Medium) · Min Cost to Connect All Points (Medium) · Word Ladder (Hard) **(H9)** · Alien Dictionary (Hard) · Shortest Path Visiting All Nodes (Hard) **(H31)** · Critical Connections in a Network (Hard) | pick BFS/Dijkstra/Bellman-Ford correctly |
| **8. Backtracking** | Choose/explore/un-choose | Subsets (Medium) · Permutations (Medium) · Combination Sum (Medium) · Combination Sum II (Medium) · Generate Parentheses (Medium) · Palindrome Partitioning (Medium) **(H23)** · Word Search (Medium) · N-Queens (Hard) · Sudoku Solver (Hard) | no duplicate results |
| **9. Dynamic programming** | 1D → 2D → knapsack → intervals → bitmask | Climbing Stairs (Easy) · House Robber (Medium) · Coin Change (Medium) · Longest Increasing Subsequence (Medium) **(H1)** · Word Break (Medium) **(H7)** · Unique Paths (Medium) · Longest Common Subsequence (Medium) · Partition Equal Subset Sum (Medium) **(H27)** · Target Sum (Medium) **(H27)** · Edit Distance (Medium) · Decode Ways (Medium) · Best Time to Buy and Sell Stock with Cooldown (Medium) · Burst Balloons (Hard) · Regular Expression Matching (Hard) · Shortest Path Visiting All Nodes (Hard) | state in one sentence |
| **10. Hybrid mastery** | Combining patterns | Minimum Window Substring (Hard) **(H4)** · Sliding Window Maximum (Hard) **(H5)** · Trapping Rain Water (Hard) **(H13)** · Median of Two Sorted Arrays (Hard) **(H17)** · Split Array Largest Sum (Hard) **(H24)** · Maximal Rectangle (Hard) **(H29)** · Sum of Subarray Minimums (Medium) **(H30)** · Count of Smaller Numbers After Self (Hard) **(H25)** · Reverse Pairs (Hard) **(H21)** · Shortest Subarray with Sum at Least K (Hard) | derive without recall |
| **11. Bits, strings, math, advanced** | Selective depth | Single Number (Easy) · Number of 1 Bits (Easy) · Counting Bits (Easy) · Missing Number (Easy) · Maximum XOR of Two Numbers in an Array (Medium) · Implement Trie (Medium) · Word Search II (Hard) · Find the Index of the First Occurrence in a String (Easy) · Repeated Substring Pattern (Easy) · Count Primes (Medium) · Pow(x, n) (Medium) · Range Sum Query - Mutable (Medium) · Kth Ancestor of a Tree Node (Hard) | one clean implementation each |

**Pacing suggestion (adjustable):** stages 0–3 in the first two weeks, 4–7 in the next two, 8–9 in weeks 5–6, 10–11 in weeks 7–8; revisit missed problems after 3 and 10 days (spaced repetition). When you fail a problem, record the *clue you missed* ([§16](#16-i-struggle-with-revisit-map)).

## 14. Pattern mastery checklist

Mark a pattern as mastered only when you can tick **all four** columns without notes: **Recognize** (spot it from a new statement), **Derive** (explain why it works and what the invariant is), **Implement** (correct Java in ≤ 15 min), **Analyze** (time and auxiliary space, including edge cases).

| Pattern | Recognize | Derive | Implement | Analyze | Evidence (problems solved cold) |
| --- | :-: | :-: | :-: | :-: | --- |
| Two pointers (opposite, same-direction, Dutch flag) | ☐ | ☐ | ☐ | ☐ | |
| Fixed and variable sliding windows | ☐ | ☐ | ☐ | ☐ | |
| Prefix sums, difference arrays, prefix + HashMap | ☐ | ☐ | ☐ | ☐ | |
| Binary search: exact, lower bound, rotated, on the answer | ☐ | ☐ | ☐ | ☐ | |
| HashMap/HashSet counting and grouping | ☐ | ☐ | ☐ | ☐ | |
| Monotonic stack | ☐ | ☐ | ☐ | ☐ | |
| Monotonic deque | ☐ | ☐ | ☐ | ☐ | |
| Linked-list reversal, fast/slow, merge, dummy node | ☐ | ☐ | ☐ | ☐ | |
| Tree DFS (returns value) and BFS (levels) | ☐ | ☐ | ☐ | ☐ | |
| BST operations, LCA, serialization | ☐ | ☐ | ☐ | ☐ | |
| Heap: top-K, K-way merge, two heaps | ☐ | ☐ | ☐ | ☐ | |
| Intervals: merge, schedule, sweep line | ☐ | ☐ | ☐ | ☐ | |
| Graph BFS/DFS, grids, components | ☐ | ☐ | ☐ | ☐ | |
| Topological sort and cycle detection | ☐ | ☐ | ☐ | ☐ | |
| Dijkstra, Bellman-Ford, Floyd-Warshall | ☐ | ☐ | ☐ | ☐ | |
| DSU and MST (Kruskal/Prim) | ☐ | ☐ | ☐ | ☐ | |
| Backtracking with pruning and duplicate handling | ☐ | ☐ | ☐ | ☐ | |
| Greedy with an exchange argument | ☐ | ☐ | ☐ | ☐ | |
| DP: 1D, knapsack, sequences, grid | ☐ | ☐ | ☐ | ☐ | |
| DP: interval, tree, bitmask | ☐ | ☐ | ☐ | ☐ | |
| Bit manipulation (XOR tricks, masks) | ☐ | ☐ | ☐ | ☐ | |
| Trie | ☐ | ☐ | ☐ | ☐ | |
| KMP / Z / rolling hash | ☐ | ☐ | ☐ | ☐ | |
| Fenwick tree / segment tree / sparse table | ☐ | ☐ | ☐ | ☐ | |
| Binary lifting / LCA queries | ☐ | ☐ | ☐ | ☐ | |
| Math: GCD, modular arithmetic, fast power, sieve | ☐ | ☐ | ☐ | ☐ | |
| Combining patterns (≥ 15 of H1–H31 derived from scratch) | ☐ | ☐ | ☐ | ☐ | |

**Self-test for the whole sheet.** Pick a random problem you have not seen. Within 5 minutes you should be able to state: the brute force and its cost; the constraint-implied target; two candidate patterns with the check that distinguishes them; and the invariant of your chosen approach.

## 15. Last-minute revision

**Read in this order (≈ 30 minutes):**
1. [§2 recognition table](#2-pattern-recognition-cheat-table) and [§4 constraints](#4-constraint-driven-selection-guide).
2. [§7 traps and edge cases](#7-common-interview-traps-and-edge-cases).
3. The templates listed in [§1](#1-one-page-quick-revision): binary search, window, prefix + map, monotonic stack, BFS, Dijkstra, DSU, Kahn, backtracking, knapsack, LCS.
4. Skim the "Common bugs" line of each pattern card.

**The 12 sentences to remember**
1. Constraints decide the complexity; complexity decides the pattern.
2. Contiguous + condition → window (non-negatives) or prefix sums (anything).
3. Monotone yes/no → binary search, including on the answer.
4. Need the extreme repeatedly → heap; extreme in a moving window → monotonic deque.
5. Next greater/smaller → monotonic stack of indices.
6. Unweighted shortest path → BFS; weighted non-negative → Dijkstra; negative edges → Bellman-Ford.
7. Prerequisites → topological sort; "same group" under merges → DSU.
8. All solutions → backtracking; count or optimum with repeated states → DP.
9. Sort first when order unlocks greedy or two pointers.
10. `long` for sums and products; `Integer.compare` in comparators; copy before storing a path.
11. Mark BFS nodes visited when *enqueued*; restore state when backtracking.
12. State the invariant, then complexity, then the edge cases.

**In the interview:** clarify → brute force → optimize → code → test → complexity. Think aloud. If stuck for more than five minutes, state the brute force, code it, then improve. Partial progress beats silence.

**Five-minute pre-submit checklist:** empty/one element · duplicates · negatives/zero · overflow · off-by-one at both ends · `null` · visited marking · loop termination · return value for "not found".

## 16. "I struggle with…" revisit map

| If you struggle with … | Revisit | Then practice |
| --- | --- | --- |
| Spotting which pattern applies | [§2](#2-pattern-recognition-cheat-table), [§3](#3-pattern-combination-matrix), [§8](#8-the-10-step-framework) | Part V problems *without* reading the solution first |
| Off-by-one errors in loops/binary search | [P5](#p5-binary-search), [§7](#7-common-interview-traps-and-edge-cases) | lower bound by hand on 5-element arrays |
| Sliding window validity / when to shrink | [P2](#p2-sliding-window), [H3](#h3-longest-substring-without-repeating-characters), [H4](#h4-minimum-window-substring) | Max Consecutive Ones III, Fruit Into Baskets |
| Negatives breaking window logic | [P3](#p3-prefix-sum--hashmap), [§9](#9-worked-example-from-brute-force-to-a-hybrid-solution) | Subarray Sum Equals K, Continuous Subarray Sum |
| "Next greater/smaller", histograms | [P7](#p7-stack-and-monotonic-stack), [H14](#h14-daily-temperatures), [H29](#h29-maximal-rectangle), [H30](#h30-sum-of-subarray-minimums) | Largest Rectangle in Histogram |
| Moving-window extremes | [P8](#p8-queue-and-deque), [H5](#h5-sliding-window-maximum) | Longest Continuous Subarray With Abs Diff ≤ Limit |
| Pointer rewiring in linked lists | [P9](#p9-linked-list) | Reverse Linked List II, Reverse Nodes in k-Group |
| Recursion on trees (what to return?) | [P11](#p11-trees-binary-tree-and-bst), [§10](#10-complexity-foundations-amortized-analysis-recursion) | Diameter, Max Path Sum, House Robber III |
| Heap direction and top-K | [P12](#p12-heap--priority-queue), [H6](#h6-top-k-frequent-elements), [H16](#h16-kth-largest-element) | K Closest Points, Find Median from Data Stream |
| Graph modeling | [P13](#p13-graphs), [H9](#h9-word-ladder), [H31](#h31-shortest-path-visiting-all-nodes) | Open the Lock, Snakes and Ladders |
| Choosing a shortest-path algorithm | [P13](#p13-graphs), [§5](#5-complexity-reference-chart), [H10](#h10-network-delay-time) | Cheapest Flights Within K Stops, Path With Minimum Effort |
| Union-Find usage | [P13](#p13-graphs), [H19](#h19-number-of-islands), [H20](#h20-accounts-merge) | Redundant Connection, Most Stones Removed |
| Duplicates in backtracking, state restoration | [P14](#p14-backtracking), [H23](#h23-palindrome-partitioning) | Subsets II, Permutations II, Combination Sum II |
| Proving a greedy is correct | [P15](#p15-greedy-and-intervals), [§8](#8-the-10-step-framework) | Jump Game II, Gas Station, Non-overlapping Intervals |
| Defining a DP state | [P16](#p16-dynamic-programming) | 1D (House Robber) → 2D (LCS) → knapsack → interval |
| DP loop order (0/1 vs unbounded; combinations vs permutations) | [P16.2](#p16-dynamic-programming), [H27](#h27-subset-sum--target-sum) | Coin Change II vs Combination Sum IV |
| Space optimization of DP | [P16](#p16-dynamic-programming) | Unique Paths, LCS with two rows |
| Exponential problems with small n | [P18](#p18-bit-manipulation), [H28](#h28-travelling-salesperson-problem), [H31](#h31-shortest-path-visiting-all-nodes) | Partition to K Equal Sum Subsets |
| Counting pairs / inversions | [H21](#h21-count-inversions), [H25](#h25-count-of-smaller-numbers-after-self), [P20](#p20-advanced-structures) | Reverse Pairs, Count of Range Sum |
| Range queries with updates | [P20](#p20-advanced-structures) | Range Sum Query - Mutable |
| String matching, palindromes | [P19](#p19-string-algorithms), [H22](#h22-longest-palindromic-substring) | Repeated Substring Pattern, Longest Duplicate Substring |
| Overflow and modulo | [P22](#p22-math-and-number-theory), [§12](#12-java-implementation-notes) | Pow(x, n), Count Good Numbers |
| Java collection pitfalls | [§6](#6-java-data-structure-and-collection-complexity-chart), [§7](#7-common-interview-traps-and-edge-cases), [§11](#11-java-syntax-revision) | rewrite one solution using only `ArrayDeque`/`PriorityQueue` |
| Complexity analysis | [§5](#5-complexity-reference-chart), [§10](#10-complexity-foundations-amortized-analysis-recursion) | explain amortized cost of a monotonic stack out loud |
| Running out of time | [§15](#15-last-minute-revision) | timed sets: 2 Medium in 45 minutes |

---

*End of playbook. Scope notes are in the completion summary delivered with this file: topics intentionally left out include advanced flow/matching, suffix structures, persistent/lazy segment trees, Mo's algorithm, heavy-light decomposition, and computational geometry beyond a few pointers.*
