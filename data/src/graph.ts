
//---START---canJump
/**
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
