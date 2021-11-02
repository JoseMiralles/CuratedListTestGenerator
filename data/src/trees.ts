
//---START---maxDepth
/** Requires: [TreeNode,arrayToBinaryTree]
 * 
 * Given the root of a binary tree, return its maximum depth.
 * 
 * A binary tree's maximum depth is the number of nodes along the longest
 * path from the root node down to the farthest leaf node.
 * 
 * Leetcode # 104
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 * 
 * Example 1:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: 3
 * 
 * Example 2:
 * Input: root = [1,null,2]
 * Output: 2
 * 
 * Example 3:
 * Input: root = []
 * Output: 0
 * 
 * Example 4:
 * Input: root = [0]
 * Output: 1
 * 
 * Constraints:
 * The number of nodes in the tree is in the range [0, 104].
 * -100 <= Node.val <= 100
 */
export function maxDepth(root: TreeNode | null): number {

    const helper = (node: TreeNode | null, i: number): number => {
        if (!node) return i;
        return Math.max(i, helper(node.left, i + 1), helper(node.right, i + 1));
      };
    
    return helper(root, 0);
};
//---END---

//---START---isSameTree
/** Requires: [TreeNode,arrayToBinaryTree]
 * Given the roots of two binary trees p and q, write a function to check if they are the same
 * or not.
 * 
 * Two binary trees are considered the same if they are structurally identical, and the nodes
 * have the same value.
 * 
 * Leetcode # 100
 * https://leetcode.com/problems/same-tree/
 * 
 * Example 1:
 * Input: p = [1,2,3], q = [1,2,3]
 * Output: true
 * 
 * Example 2:
 * Input: p = [1,2], q = [1,null,2]
 * Output: false
 * 
 * Example 3:
 * Input: p = [1,2,1], q = [1,1,2]
 * Output: false
 */
export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {

    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
//---END---

//---START---invertTree
/** Requires: [TreeNode,arrayToBinaryTree,compareTwoTreesTest]
 * Given the root of a binary tree, invert the tree, and return its root.
 * 
 * Leetcode # 226
 * https://leetcode.com/problems/invert-binary-tree/
 * 
 * Example 1:
 * Input: root = [4,2,7,1,3,6,9]
 * Output: [4,7,2,9,6,3,1]
 * 
 * Example 2:
 * Input: root = [2,1,3]
 * Output: [2,3,1]
 * 
 * Example 3:
 * Input: root = []
 * Output: []
 *  
 * Constraints:
 * The number of nodes in the tree is in the range [0, 100].
 * -100 <= Node.val <= 100
 */
export function invertTree(root: TreeNode | null): TreeNode | null {

    if (!root) return null;
    if (root.left && root.right) {
      const temp = root.left;
      root.left = root.right;
      root.right = temp;
    } else if (root.left) {
      root.right = root.left;
      root.left = null;
    } else if (root.right) {
      root.left = root.right;
      root.right = null;
    }
    invertTree(root.left);
    invertTree(root.right);
    return root;
};
//---END---

/**SHARED ITEMS**/

//---START---TreeNode
export class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

//---START---arrayToBinaryTree
export function arrayToBinaryTree(
    arr: (number | null)[],
    i: number = 0,
    root: TreeNode | null = null
): TreeNode | null {

    if (i < arr.length) {

        const num = arr[i];
        let temp;

        if (num !== null) {

            temp = root ? root : new TreeNode(num);
            root = temp;
            root.left = arrayToBinaryTree(arr, 2 * i + 1, root.left);
            root.right = arrayToBinaryTree(arr, 2 * i + 2, root.right);
        }
    }

    return root;
}

//---START---compareTwoTreesTest
export function compareTwoTreesTest(
    root1: TreeNode,
    root2: TreeNode
): void {
    const que1 = [root1];
    const que2 = [root2]

    while(que1.length && que2.length){

        const node1 = que1.shift();
        const node2 = que2.shift();

        expect(node1?.val).toBe(node2?.val);

        if (node1?.left) que1.push(node1.left);
        if (node1?.right) que1.push(node1.right);
        if (node2?.left) que2.push(node2.left);
        if (node2?.right) que2.push(node2.right);
    }

    if (que1.length || que2.length) {
        fail("Either some leaves are missing, or extra nodes are included.");
    }
}
