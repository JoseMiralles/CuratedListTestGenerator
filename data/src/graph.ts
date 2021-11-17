
//---START---cloneGraph
/**
 * NOTE: View the charts and examples on leetcode.
 * 
 * Leetcode # 133
 * https://leetcode.com/problems/clone-graph/
 * 
 * Given a reference of a node in a connected undirected graph.
 * 
 * Return a deep copy (clone) of the graph.
 * 
 * Each node in the graph contains a value (int) and a list (List[Node]) of its
 * neighbors.
 * 
 * Constraints:
 * The number of nodes in the graph is in the range [0, 100].
 * 1 <= Node.val <= 100
 * Node.val is unique for each node.
 * There are no repeated edges and no self-loops in the graph.
 * The Graph is connected and all nodes can be visited starting from the given node.
 */
export function cloneGraph(node: cGNode | null): cGNode | null {

    const oldNew = new Map<cGNode, cGNode>();

    function dfs(node: cGNode): cGNode {

        console.log(`NODE:\t${node.val}`);

        // If it was already cloned, return the clone.
        const existing = oldNew.get(node);
        if (existing) return existing;

        // Create a new clone.
        const copy = new cGNode(node.val);
        oldNew.set(node, copy);

        // Itereate trough the neightbors and dfs each one.
        node.neighbors.forEach(n => {

            copy.neighbors.push( dfs(n) );
        });

        return copy;
    }

    if (node) return dfs(node);
    return null;
};
//---END---

export class cGNode {

    val: number
    neighbors: cGNode[]

    constructor(val?: number, neighbors?: cGNode[]) {
        this.val = (val === undefined ? 0 : val)
        this.neighbors = (neighbors === undefined ? [] : neighbors)
    }

    addNeighbor(neighbor: cGNode) {
        if (!this.neighbors.includes(neighbor)) this.neighbors.push(neighbor);
        if (!neighbor.neighbors.includes(this)) neighbor.neighbors.push(this);
    }
}

//---START---canFinish
/**
 * There are a total of numCourses courses you have to take, labeled from 0 to
 * numCourses - 1. You are given an array prerequisites where
 * prerequisites[i] = [ai, bi] indicates that you must take course bi first if you
 * want to take course ai.
 * 
 * For example, the pair [0, 1], indicates that to take course 0 you have to first
 * take course 1.
 * 
 * Return true if you can finish all courses. Otherwise, return false.
 * 
 * # 207. Course Schedule
 * https://leetcode.com/problems/course-schedule/
 * 
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: true
 * Explanation: There are a total of 2 courses to take. 
 * To take course 1 you should have finished course 0. So it is possible.
 * 
 * Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
 * Output: false
 * Explanation: There are a total of 2 courses to take. 
 * To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
 */
export function canFinish(numCourses: number, prerequisites: number[][]): boolean {

    const graph: number[][] = Array.from(Array(numCourses), () => []);
    const ranks: number[] = Array(numCourses).fill(0);
  
    prerequisites.forEach(([u, v]) => {
      graph[v].push(u);
      ranks[u]++;
    });
  
    const queue: number[] = [];
  
    ranks.forEach((r, i) => {
      if (!r) queue.push(i);
    });
  
    while (queue.length) {
      const f = queue.shift();
      numCourses--;
  
      graph[f as number].forEach((neigh) => {
        ranks[neigh]--;
        if (!ranks[neigh]) queue.push(neigh);
      });
    }
  
    return !numCourses;
};
//---END---

//---START---pacificAtlantic
/**
 * NOTE: View description and chart on LeetCode
 * 
 * # 417. Pacific Atlantic Water Flow
 * https://leetcode.com/problems/pacific-atlantic-water-flow/
 * 
 * There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean.
 * The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches
 * the island's right and bottom edges.
 * 
 * The island is partitioned into a grid of square cells. You are given an m x n integer
 * matrix heights where heights[r][c] represents the height above sea level of the cell
 * at coordinate (r, c).
 * 
 * The island receives a lot of rain, and the rain water can flow to neighboring cells
 * directly north, south, east, and west if the neighboring cell's height is less than or
 * equal to the current cell's height. Water can flow from any cell adjacent to an ocean
 * into the ocean.
 * 
 * Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain
 * water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.
 */
export function pacificAtlantic(heights: number[][]): number[][] {
    let res: number[][] = [];

    if (!heights || heights.length === 0 || heights[0].length === 0) {
        return res;
    }

    const rows: number = heights.length - 1;
    const cols: number = heights[0].length - 1;

    let atlantic: boolean[][] = new Array(rows + 1)
        .fill(null)
        .map(() => Array(cols + 1).fill(false));
    let pacific: boolean[][] = new Array(rows + 1)
        .fill(null)
        .map(() => Array(cols + 1).fill(false));

    for (let row = 0; row <= rows; row++) {
        helper(0, row, pacific, -1, heights);
        helper(cols, row, atlantic, -1, heights);
    }

    for (let col = 0; col <= cols; col++) {
        helper(col, 0, pacific, -1, heights);
        helper(col, rows, atlantic, -1, heights);
    }

    for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
            if (pacific[row][col] && atlantic[row][col]) {
                res.push([row, col]);
            }
        }
    }

    return res;
};

const helper = function (col: number, row: number, visited: boolean[][], height: number, matrix: number[][]): boolean | void {
    if (
        col < 0 ||
        col >= matrix[0].length ||
        row < 0 ||
        row >= matrix.length ||
        visited[row][col] ||
        matrix[row][col] < height
    ) {
        return;
    }

    visited[row][col] = true;
    helper(col + 1, row, visited, matrix[row][col], matrix);
    helper(col - 1, row, visited, matrix[row][col], matrix);
    helper(col, row + 1, visited, matrix[row][col], matrix);
    helper(col, row - 1, visited, matrix[row][col], matrix);
};
//---END---

//---START---numIslands
/**
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water),
 * return the number of islands.
 * 
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or
 * vertically. You may assume all four edges of the grid are all surrounded by water.
 * 
 * # 200. Number of Islands
 * https://leetcode.com/problems/number-of-islands/
 * 
 * Input: grid = [
 * ["1","1","1","1","0"],
 * ["1","1","0","1","0"],
 * ["1","1","0","0","0"],
 * ["0","0","0","0","0"]
 * ]
 * Output: 1
 * 
 * Input: grid = [
 * ["1","1","0","0","0"],
 * ["1","1","0","0","0"],
 * ["0","0","1","0","0"],
 * ["0","0","0","1","1"]
 * ]
 * Output: 3
 */
export function numIslands(grid: string[][]): number {
	// modify the grid to zero as visited;
	let ret = 0;

	const M = grid.length;
	const N = grid[0].length;

	const dfs = (i: number, j: number): void => {
		// boundary
		if (i < 0 || i >= M || j < 0 || j >= N) return;

		// we've visited or not island
		if (grid[i][j] !== "1") return;

		grid[i][j] = "0";

		dfs(i + 1, j);
		dfs(i, j + 1);
		dfs(i - 1, j);
		dfs(i, j - 1);
	};

	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			if (grid[i][j] === "1") {
				dfs(i, j);
				ret++;
			}
		}
	}
	return ret;
};
//---END---

//---START---longestConsecutive
/**
 * Given an unsorted array of integers nums, return the length of the longest
 * consecutive elements sequence.
 * 
 * You must write an algorithm that runs in O(n) time.
 * 
 * # 128. Longest Consecutive Sequence
 * https://leetcode.com/problems/longest-consecutive-sequence/
 * 
 * Input: nums = [100,4,200,1,3,2]
 * Output: 4
 * Explanation: The longest consecutive elements sequence is [1, 2, 3, 4].
 * Therefore its length is 4.
 * 
 * Input: nums = [0,3,7,2,5,8,4,6,0,1]
 * Output: 9
 */
export function longestConsecutive(nums: number[]): number {

    let max = 0;
    const lens: {[key: number]: number} = {};
    
    for (let n of nums) {
      if (lens[n] != null) continue;
  
      const l = lens[n - 1] || 0;   // left length
      const r = lens[n + 1] || 0;   // right length
  
      const len: number = l + r + 1;
  
      // extend the length to the boundaries
      lens[n - l] = len;
      lens[n] = len;
      lens[n + r] = len;
  
      max = Math.max(max, len);
    }
  
    return max;
};
//---END---

//---START---alienOrder
/**
 * There is a new alien language which uses the latin alphabet. However, the order
 * among letters are unknown to you. You receive a list of non-empty words from the
 * dictionary, where words are sorted lexicographically by the rules of this new language.
 * Derive the order of letters in this language.
 * 
 * 1. You may assume all letters are in lowercase.
 * 2. The dictionary is invalid, if a is prefix of b and b is appear before a.
 * 3. If the order is invalid, return an empty string.
 * 4. There may be multiple valid order of letters, return the smallest in normal
 *    lexicographical order
 * 
 * Leetcode # 269
 * (Premium)        https://leetcode.com/problems/alien-dictionary/
 * (Non-premium)    https://www.lintcode.com/problem/892/
 * 
 * Input：["wrt","wrf","er","ett","rftt"]
 * Output："wertf"
 * Explanation：
 * from "wrt"and"wrf" ,we can get 't'<'f'
 * from "wrt"and"er" ,we can get 'w'<'e'
 * from "er"and"ett" ,we can get 'r'<'t'
 * from "ett"and"rftt" ,we can get 'e'<'r'
 * So return "wertf"
 * 
 * Input：["z","x"]
 * Output："zx"
 * Explanation：
 * from "z" and "x"，we can get 'z' < 'x'
 * So return "zx"
 */
export function alienOrder(words: string[]): string  {

    const letters = new Set<string>()

    // Map<letter, Set<letter>>
    const forwardMap = new Map()
    const backwardMap = new Map()


    const setForward = (from: string, to: string) => {
        if (forwardMap.has(from)) {
            forwardMap.get(from).add(to)
        } else {
            forwardMap.set(from, new Set([to]))
        }

        if (backwardMap.has(to)) {
            backwardMap.get(to).add(from)
        } else {
            backwardMap.set(to, new Set([from]))
        }
    }


    // find the first different letter, that is the relation
    // return if valid or not
    const collectForward = (word1: string, word2: string) => {
        let i = 0
        for (; i < word1.length; i++) {
            if (word2[i] === undefined) {
                return false
            }

            if (word1[i] !== word2[i]) {
                setForward(word1[i], word2[i])
                return true
            }
        }

        return true
    }


    // 1. collect all letters & collect the forward/backward relations
    //  a <-->f  f<-->d 

    for (let i = 0; i < words.length; i++) {
        for (let char of words[i]) {
            letters.add(char)
        }

        if (i > 0) {
            const isValid = collectForward(words[i - 1], words[i])
            if (!isValid) {
                return ''
            }
        }
    }

    // 2. look through the forwardMap, and collect the head layer by layer
    // if backwardMap is empty

    const result: string[] = []

    const collect = (letter: string) => {
        result.push(letter)
        letters.delete(letter)

        if (forwardMap.has(letter)) {
            for (let next of forwardMap.get(letter)) {
                backwardMap.get(next).delete(letter)

                if (backwardMap.get(next).size === 0) {
                    backwardMap.delete(next)
                }
            }

            forwardMap.delete(letter)
        }
    }

    while (letters.size > 0) {

        let isHeadFound = false

        for (let letter of letters) {
            if (!backwardMap.has(letter)) {
                collect(letter)
                isHeadFound = true
            }
        }

        // circle found
        if (!isHeadFound) {
            return ''
        }
    }


    return result.join('');
}
//---END---

//---START---validTree
/**
 * Given n nodes labeled from 0 to n - 1 and a list of undirected edges
 * (each edge is a pair of nodes), write a function to check whether these edges make up a
 * valid tree.
 * 
 * You can assume that no duplicate edges will appear in edges. Since all edges are undirected,
 * [0, 1] is the same as [1, 0] and thus will not appear together in edges.
 * 
 * LeetCode #:      261
 * (Premium)        https://leetcode.com/problems/graph-valid-tree/
 * (Non-premium)    https://www.lintcode.com/problem/178/
 * 
 * Input: n = 5 edges = [[0, 1], [0, 2], [0, 3], [1, 4]]
 * Output: true.
 * 
 * Input: n = 5 edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
 * Output: false.
 */
export function validTree(n: number, edges: number[][]): boolean {
    
    let ufs = new UnionFindSet(n);
    for (let edge of edges) {
      if (ufs.union(edge[0], edge[1])) // find cycle
        return false;
    }
  
    return edges.length === n-1; 
}

class UnionFindSet {

    private _parents: number[];
    private _ranks: number[];

    constructor(n: number) {
        this._parents = new Array(n);
        this._ranks = new Array(n);
        for (let i = 0; i < this._parents.length; i += 1) {
            this._parents[i] = i;
            this._ranks[i] = i;
        }
    }

    /**
     * Find u and set u's parent to root of the set
     * 
     * @param {number} u 
     */
    find(u: number) {
        while (this._parents[u] !== u) {
            this._parents[u] = this._parents[this._parents[u]];
            u = this._parents[u];
        }

        return u;
    }

    /**
     * If u and v are connected, return true, else return false 
     * 
     * @param {number} u 
     * @param {number} v 
     * @return {boolean}
     */
    union(u: number, v: number) {
        let parent_u = this.find(u);
        let parent_v = this.find(v);

        if (parent_u === parent_v) return true;

        if (this._ranks[parent_v] > this._ranks[parent_u])
            this._parents[parent_u] = parent_v;
        else if (this._ranks[parent_u] > this._ranks[parent_v])
            this._parents[parent_v] = parent_u;
        else {
            this._parents[parent_v] = parent_u;
            this._ranks[parent_u] += 1;
        }

        return false;
    }
}
//---END---

//---START---countComponents
/**
 * Given n nodes labeled from 0 to n - 1 and a list of undirected edges
 * (each edge is a pair of nodes), write a function to find the number of connected
 * components in an undirected graph.
 * 
 * You can assume that no duplicate edges will appear in edges. Since all edges are undirected,
 * [0, 1] is the same as [1, 0] and thus will not appear together in edges.
 * 
 * LeetCode#    323
 * (Premium)    https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/
 * 
 * Examples:
 * 
 *      0          3
 *      |          |
 *      1 --- 2    4
 * Given n = 5 and edges = [[0, 1], [1, 2], [3, 4]], return 2.
 * 
 *      0           4
 *      |           |
 *      1 --- 2 --- 3
 * Given n = 5 and edges = [[0, 1], [1, 2], [2, 3], [3, 4]], return 1.
 */
export function countComponents (n: number, edges: number[][]): number {

    const adjList = buildAdjList(n, edges);
    const visited: {[key: number]: boolean} = {};
    let numComponents = 0;

    for (let vertex = 0; vertex < adjList.length; vertex++) {
        
        if (!visited[vertex]) {

            numComponents++;
            bfs(vertex, adjList, visited);
        }
    }

    return numComponents;
}

const buildAdjList = (n: number, edges: number[][]) => {

    const adjList: number[][] = Array.from({length: n}, () => []);

    edges.forEach(edge => {
        
        let [src, dest] = edge;

        adjList[src].push(dest);
        adjList[dest].push(src);
    });

    return adjList;
};

const bfs = (
    node: number,
    adjList: number[][],
    visited: { [key: number]: boolean }
) => {
    
    const queue: number[] = [node];
    visited[node] = true;

    while (queue.length) {
        
        const curNode = queue.shift();

        if (curNode !== undefined)
            adjList[curNode].forEach(neighbor => {
                
                if (!visited[neighbor]) {
                    
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
    }
}
//---END---
