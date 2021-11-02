
//---START---maxDepth
/** Requires: [TreeNode,arrayToBinaryTree]
 * 
 * Given the root of a binary tree, return its maximum depth.
 * 
 * A binary tree's maximum depth is the number of nodes along the longest
 * path from the root node down to the farthest leaf node.
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
    i: number,
    root: TreeNode | null
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

export function printTree(
    root: TreeNode,
): void {

    const stack = [ root ];

    while (stack.length) {

        const current = stack.shift();
        console.log(current?.val);
        if (current?.left) stack.push(current.left);
        if (current?.right) stack.push(current.right);
    }
}
