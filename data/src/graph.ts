
//---START---cloneGraph
/**
 * NOTE: View the charts and examples on leetcode.
 * 
 * https://leetcode.com/problems/clone-graph/
 * 
 * Given a reference of a node in a connected undirected graph.
 * 
 * Return a deep copy (clone) of the graph.
 * 
 * Each node in the graph contains a value (int) and a list (List[Node]) of its
 * neighbors.
 */
export function cloneGraph(node: cGNode | null): cGNode | null {

    if (node === null) {
        return null;
    }

    const map = new Map();

    const clone = (root: cGNode): cGNode => {

        if (!map.has(root.val)) {

            map.set(root.val, new cGNode(root.val));
            map.get(root.val).neighbors = root.neighbors.map(clone);
        }

        return map.get(root.val);
    }

    return clone(node);
};

//---INCLUDE
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
