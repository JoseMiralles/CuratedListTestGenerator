
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
 * 
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

//---START---maxPathSum
/** Requires: [TreeNode,arrayToBinaryTree]
 * 
 * A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in
 * the sequence has an edge connecting them. A node can only appear in the sequence at
 * most once. Note that the path does not need to pass through the root.
 * 
 * The path sum of a path is the sum of the node's values in the path.
 * 
 * Given the root of a binary tree, return the maximum path sum of any path.
 * 
 * Leetcode # 124
 * https://leetcode.com/problems/binary-tree-maximum-path-sum/
 * 
 * Example 1:
 * Input: root = [1,2,3]
 * Output: 6
 * Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
 * 
 * Example 2:
 * Input: root = [-10,9,20,null,null,15,7]
 * Output: 42
 * Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
 *  
 * Constraints:
 * The number of nodes in the tree is in the range [1, 3 * 104].
 * -1000 <= Node.val <= 1000
 */
export function maxPathSum(root: TreeNode | null): number {

    let res = -Infinity;

    const traverse = (node: TreeNode | null): number => {
      if (!node) return 0;
      const left = Math.max(0, traverse(node.left));
      const right = Math.max(0, traverse(node.right));
      res = Math.max(res, node.val + left + right);
      return node.val + Math.max(left, right);
    };
  
    traverse(root);
    return res;
};
//---END---

//---START---levelOrder
/** Requires: [TreeNode,arrayToBinaryTree]
 * 
 * Given the root of a binary tree, return the level order traversal of
 * its nodes' values. (i.e., from left to right, level by level).
 * 
 * Leetcode # 102
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 * 
 * Example 1:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[3],[9,20],[15,7]]
 * 
 * Example 2:
 * Input: root = [1]
 * Output: [[1]]
 * 
 * Example 3:
 * Input: root = []
 * Output: []
 *  
 * Constraints:
 * The number of nodes in the tree is in the range [0, 2000].
 * -1000 <= Node.val <= 1000
 */
//---END---
export function levelOrder(root: TreeNode | null): number[][] {

    if (!root) return []
    
    type Memo = {
        val: number
        level: number
    }
	
    const arr: Memo[] = []
    let maxLevel: number = -1
    
    dfs(root, 1)
    
    function dfs(root: TreeNode | null, level: number) {
        if (!root) return
        
        const n: Memo = {
            val: root.val,
            level: level
        }
		
        arr.push(n)
        maxLevel = Math.max(maxLevel, level)
        
        if (root && root.left) {
            dfs(root.left, level+1)
        }
        if (root && root.right) {
            dfs(root.right, level+1)
        }
    }
    
    const result: number[][] = []
    for (let i = 1; i <= maxLevel; ++i) {
        result.push(arr.filter(d => d.level === i).map(n => n.val))
    }
    return result
};
//---END---

//---START---serialize
/**
 * Serialization is the process of converting a data structure or object into a
 * sequence of bits so that it can be stored in a file or memory buffer, or
 * transmitted across a network connection link to be reconstructed later in
 * the same or another computer environment.
 * 
 * Design an algorithm to serialize and deserialize a binary tree. There is
 * no restriction on how your serialization/deserialization algorithm should
 * work. You just need to ensure that a binary tree can be serialized to a
 * string and this string can be deserialized to the original tree structure.
 * 
 * Clarification: The input/output format is the same as how LeetCode serializes
 * a binary tree. You do not necessarily need to follow this format, so please
 * be creative and come up with different approaches yourself.
 * 
 * Leetcode # 297
 * https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
 * 
 * Example 1:
 * Input: root = [1,2,3,null,null,4,5]
 * Output: [1,2,3,null,null,4,5]
 * 
 * Example 2:
 * Input: root = []
 * Output: []
 * 
 * Example 3:
 * Input: root = [1]
 * Output: [1]
 * 
 * Example 4:
 * Input: root = [1,2]
 * Output: [1,2]
 *  
 * Constraints:
 * The number of nodes in the tree is in the range [0, 104].
 * -1000 <= Node.val <= 1000

 */
export function serialize(root: TreeNode | null): string {
    
    const path: (TreeNode | null)[] = [];
    const preorder = (node: TreeNode | null) => {
      path.push(node);
      if (node === null) {
        return;
      }
      preorder(node.left);
      preorder(node.right);
    };
  
    preorder(root);
    return path.map((node) => (node === null ? "#" : node.val)).join(",");
};

export function _deserialize(data: string): TreeNode | null {
    
    if (data === "") return null;
    const path = data
      .split(",")
      .map((val) => (val === "#" ? null : new TreeNode(Number(val))));
  
    const preorder = (path: (TreeNode | null)[]): TreeNode | null => {
      if (path.length === 0) return null;
      const node = path.shift();
      if (node === null) return null;
  
      if (node) {
        node.left = preorder(path);
        node.right = preorder(path);
      }
  
      if (node) return node;
      else return null;
    };
    return preorder(path);
};
//---END---

export function deserialize(data: string): TreeNode | null {
    throw new Error('Method not implemented.');
};

//---START---isSubtree
/**
 * Given the roots of two binary trees root and subRoot, return true if there is a subtree
 * of root with the same structure and node values of subRoot and false otherwise.
 * 
 * A subtree of a binary tree tree is a tree that consists of a node in tree and all of this
 * node's descendants. The tree tree could also be considered as a subtree of itself.
 *  
 * Leetcode # 572
 * https://leetcode.com/problems/subtree-of-another-tree/
 * 
 * Example 1:
 * Input: root = [3,4,5,1,2], subRoot = [4,1,2]
 * Output: true
 * 
 * Example 2:
 * Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
 * Output: false
 *  
 * Constraints:
 * The number of nodes in the root tree is in the range [1, 2000].
 * The number of nodes in the subRoot tree is in the range [1, 1000].
 * -104 <= root.val <= 104
 * -104 <= subRoot.val <= 104
 */
export function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {

    if (!root) return false;
    return isSubtreeEqual(root, subRoot) || isSubtree(root.right, subRoot) || isSubtree(root.left, subRoot);
};

export const isSubtreeEqual = (s: TreeNode | null, t: TreeNode | null): boolean => {
    if (!s && !t) return true;
    if (!s || !t) return false;
    return (
      s.val === t.val &&
      isSubtreeEqual(s.left, t.left) &&
      isSubtreeEqual(s.right, t.right)
    );
  };
//---END---

//---START---buildTree
/**
 * Given two integer arrays preorder and inorder where preorder is the preorder traversal
 * of a binary tree and inorder is the inorder traversal of the same tree, construct and
 * return the binary tree.
 * 
 * Leetcode # 105
 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * 
 * Example 1:
 * Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * Output: [3,9,20,null,null,15,7]
 * 
 * Example 2:
 * Input: preorder = [-1], inorder = [-1]
 * Output: [-1]
 *  
 * Constraints:
 * 1 <= preorder.length <= 3000
 * inorder.length == preorder.length
 * -3000 <= preorder[i], inorder[i] <= 3000
 * preorder and inorder consist of unique values.
 * Each value of inorder also appears in preorder.
 * preorder is guaranteed to be the preorder traversal of the tree.
 * inorder is guaranteed to be the inorder traversal of the tree.
 */
export function buildTree(preorder: number[], inorder: number[]): TreeNode | null {

    let p: number = 0
    let i: number = 0
    const build =(stop: number | undefined): TreeNode | null => {
        if(inorder[i] !== stop){
            let root: TreeNode | null = new TreeNode(preorder[p++])
            root.left = build(root.val)
            i++
            root.right = build(stop)
            return root
        }
        return null
    }
    return build(undefined)
};
//---END---

//---START---isValidBST
/**
 * Given the root of a binary tree, determine if it is a valid binary search tree (BST).
 * 
 * A valid BST is defined as follows:
 * - The left subtree of a node contains only nodes with keys less than the node's key.
 * - The right subtree of a node contains only nodes with keys greater than the node's key.
 * - Both the left and right subtrees must also be binary search trees.
 * 
 * Leetcode # 98
 * https://leetcode.com/problems/validate-binary-search-tree/
 * 
 * Example 1:
 * Input: root = [2,1,3]
 * Output: true
 * 
 * Example 2:
 * Input: root = [5,1,4,null,null,3,6]
 * Output: false
 * Explanation: The root node's value is 5 but its right child's value is 4.
 *  
 * Constraints:
 * The number of nodes in the tree is in the range [1, 104].
 * -231 <= Node.val <= 231 - 1
 */
export function isValidBST(root: TreeNode | null): boolean {
    
    const traverse = (
        node: TreeNode | null, min: number, max: number
    ): boolean => {
        if (!node) return true;
    
        if (node.val <= min) return false;
        if (node.val >= max) return false;
    
        return (
          traverse(node.left, min, node.val) && traverse(node.right, node.val, max)
        );
      };
    
      return traverse(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
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
