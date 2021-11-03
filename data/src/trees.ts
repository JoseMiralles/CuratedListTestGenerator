
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
/** Requires: [TreeNode,arrayToBinaryTree,compareTwoTreesTest]
 * 
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
/** Requires: [TreeNode,arrayToBinaryTree]
 * 
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
/** Requires: [TreeNode,arrayToBinaryTree,compareTwoTreesTest]
 * 
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
/** Requires: [TreeNode,arrayToBinaryTree]
 * 
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

//---START---kthSmallest
/** Requires: [TreeNode,arrayToBinaryTree]
 * 
 * Given the root of a binary search tree, and an integer k, return the kth smallest
 * value (1-indexed) of all the values of the nodes in the tree.
 * 
 * Leetcode # 230
 * https://leetcode.com/problems/kth-smallest-element-in-a-bst/
 * 
 * Example 1:
 * Input: root = [3,1,4,null,2], k = 1
 * Output: 1
 * 
 * Example 2:
 * Input: root = [5,3,6,2,4,null,null,1], k = 3
 * Output: 3
 *  
 * Constraints:
 * The number of nodes in the tree is n.
 * 1 <= k <= n <= 104
 * 0 <= Node.val <= 104
 */
export function kthSmallest(root: TreeNode | null, k: number): number {

    const path: number[] = [];
    dfsKthSmallest(root, k, path);
    return path[k - 1];
};

function dfsKthSmallest(tree: TreeNode | null, k: number, path: number[] = []) {
    if (path.length >= k) {
      return;
    } else {
      if (tree) {
        if (tree.left) {
          dfsKthSmallest(tree.left, k, path);
        }
        path.push(tree.val);
        if (tree.right) {
          dfsKthSmallest(tree.right, k, path);
        }
      }
    }
  }
//---END---

//---START---lowestCommonAncestor
/** Requires: [TreeNode,arrayToBinaryTree]
 * 
 * Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes
 * in the BST.
 * 
 * According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined
 * between two nodes p and q as the lowest node in T that has both p and q as descendants
 * (where we allow a node to be a descendant of itself).”
 *  
 * Example 1:
 * Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
 * Output: 6
 * Explanation: The LCA of nodes 2 and 8 is 6.
 * 
 * Example 2:
 * Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
 * Output: 2
 * Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of
 *              itself according to the LCA definition.
 * 
 * Example 3:
 * Input: root = [2,1], p = 2, q = 1
 * Output: 2
 *  
 * Constraints:
 * The number of nodes in the tree is in the range [2, 105].
 * -109 <= Node.val <= 109
 * All Node.val are unique.
 * p != q
 * p and q will exist in the BST.
 */
export function lowestCommonAncestor(
    root: TreeNode | null, p: TreeNode | null, q: TreeNode | null
): TreeNode | null {
	
    if (root && p && q)
        return root.val > p.val && root.val > q.val ? lowestCommonAncestor(root.left, p, q)
        : root.val < p.val && root.val < q.val ? lowestCommonAncestor(root.right, p, q)
        : root;

    return null;
};
//---END---

//---START---Trie
/**
 * A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently
 * store and retrieve keys in a dataset of strings. There are various applications of this
 * data structure, such as autocomplete and spellchecker.
 * 
 * ----Implement the Trie class and its methods:
 * 
 * "constructor(){..."  // Initializes the trie object.
 * 
 * "public insert(word: string): void {..." // Inserts the string word into the trie.
 * 
 * "public search(word: string): boolean {..." // Returns true if the string word is in the
 *                                               trie (i.e., was inserted before), and
 *                                               false otherwise.
 * 
 * "public startsWith(prefix: string): boolean {..." // Returns true if there is a previously
 *                                                     inserted string word that has the
 *                                                     prefix prefix, and false otherwise.
 * 
 * Leetcode # 208
 * https://leetcode.com/problems/implement-trie-prefix-tree/
 * 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 * 
 * Example:
 * Input
 *  ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
 *  [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
 * Output
 *  [null, null, true, false, true, null, true]
 * Explanation
 *  Trie trie = new Trie();
 *  trie.insert("apple");
 *  trie.search("apple");   // return True
 *  trie.search("app");     // return False
 *  trie.startsWith("app"); // return True
 *  trie.insert("app");
 *  trie.search("app");     // return True
 *  
 * Constraints:
 * 1 <= word.length, prefix.length <= 2000
 * word and prefix consist only of lowercase English letters.
 * At most 3 * 104 calls in total will be made to insert, search, and startsWith.
 */
 export class Trie {
    map:{[key:string]:Trie} = {};
    isWord:boolean = false;
    constructor() {
    }

    public insert(word: string): void {
        this.add(word,0,this)
    }

    public search(word: string): boolean {
       return this.find(word,0,this,true)
    }

    public startsWith(prefix: string): boolean {
        return this.find(prefix,0,this,false)
    }

	private add(word:string,index:number,letterMap:Trie):void{
  		if(index == word.length){
    			letterMap.isWord = true
    			return; 
  		}
  		if(!letterMap.map[word.charAt(index)]){
    			letterMap.map[word.charAt(index)] = new Trie()
  		}
  		return this.add(word,index+1,letterMap.map[word.charAt(index)])
	}

    private find(word:string,index:number,letterMap:Trie,isWord:boolean):boolean{
  		if(index == word.length){
    			if(letterMap.isWord || !isWord){
      				return true
    			}
    			return false
  		}
  		if(letterMap.map[word[index]]){
    		return this.find(word,index+1,letterMap.map[word.charAt(index)],isWord)
  		}
  		return false
	}
}
//---END---

//---START---WordDictionary
/**
 * Design a data structure that supports adding new words and finding if a string matches any
 * previously added string.
 * 
 * Implement the WordDictionary class and its methods:
 * 
 * "constructor() {..." - Initializes the object.
 * "addWord(word: string): void {" - Adds word to the data structure, it can be matched later.
 * "search(word: string): boolean {" - Returns true if there is any string in the data structure
 *                                     that matches word or false otherwise. word may contain
 *                                     dots '.' where dots can be matched with any letter.
 *  
 * Leetcode # 211
 * https://leetcode.com/problems/design-add-and-search-words-data-structure/
 * 
 * Example:
 * Input
 *  ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
 *  [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
 * Output
 *  [null,null,null,null,false,true,true,true]
 * Explanation
 *  WordDictionary wordDictionary = new WordDictionary();
 *  wordDictionary.addWord("bad");
 *  wordDictionary.addWord("dad");
 *  wordDictionary.addWord("mad");
 *  wordDictionary.search("pad"); // return False
 *  wordDictionary.search("bad"); // return True
 *  wordDictionary.search(".ad"); // return True
 *  wordDictionary.search("b.."); // return True
 *  
 * Constraints:
 * 1 <= word.length <= 500
 * word in addWord consists lower-case English letters.
 * word in search consist of  '.' or lower-case English letters.
 * At most 50000 calls will be made to addWord and search.
 */
export class WordDictionary {

    isWord: boolean;
    child: {[Key: string]: WordDictionary};

    constructor() {
        this.child = {}; 
        this.isWord = false;
    }

    addWord(word: string): void {
        let curr: WordDictionary = this;
        for(const c of word) {
            if(!curr.child[c]) {
                curr.child[c] = new WordDictionary();
            }
            curr = curr.child[c];
        }
        curr.isWord = true;
    }

    search(word: string, i = 0): boolean {
        let curr: WordDictionary = this;
        for(;i < word.length; i++) {
            const c = word[i];
            if(c !== '.') {
                if(!curr.child[c]) { 
                    return false; 
                }
                curr = curr.child[c];
            } else {
                for(const key in curr.child) {
                    if(curr.child[key].search(word, i + 1)){
                        return true;
                    };
                }
                return false;
            }
        }
        return curr.isWord;
    }
}
//---END---

//---START---findWords
/**
 * Given an m x n board of characters and a list of strings words, return all words on the board.
 * 
 * Each word must be constructed from letters of sequentially adjacent cells, where adjacent
 * cells are horizontally or vertically neighboring. The same letter cell may not be used
 * more than once in a word.
 * 
 * Leetcode # 212
 * https://leetcode.com/problems/word-search-ii/
 *  
 * Example 1:
 * Input: board = [
 *  ["o","a","a","n"],
 *  ["e","t","a","e"],
 *  ["i","h","k","r"],
 *  ["i","f","l","v"]
 * ]
 * words = ["oath","pea","eat","rain"]
 * Output: ["eat","oath"]
 * 
 * Example 2:
 * Input: board = [
 *  ["a","b"]
 *  ["c","d"]
 * ]
 * words = ["abcb"]
 * Output: []
 *  
 * Constraints:
 * m == board.length
 * n == board[i].length
 * 1 <= m, n <= 12
 * board[i][j] is a lowercase English letter.
 * 1 <= words.length <= 3 * 104
 * 1 <= words[i].length <= 10
 * words[i] consists of lowercase English letters.
 * All the strings of words are unique.
 */
export function findWords(board: string[][], words: string[]): string[] {
    
    const charIndicesMap = new Map<string, { y: number; x: number; }[]>()
    const rows = board.length;
    const cols = board[0].length;
    
    const boardSet = board.reduce((set, row, y) => {
        for (let x = 0; x< row.length; x++) {
            const c = board[y][x]
            const charMap = charIndicesMap.get(c);
            set.add(c);
            charIndicesMap.set(c, charMap ? [...charMap, { y, x }] : [{ y, x }])
        }
        return set
    }, new Set());
    
    
    
    const canForm = ({y, x }: any, wordIdx: number, word: string): boolean => { 
        if (wordIdx === word.length) return false;
        if (board[y][x] != word[wordIdx]) return false;
        if (wordIdx + 1 === word.length) return true;
            
        const temp = board[y][x];
        board[y][x] = '_'
        
        if (
            (y - 1 >= 0 && canForm({ y: y - 1, x }, wordIdx + 1, word)) ||
            (x -1 >= 0 && canForm({ y, x: x - 1 }, wordIdx + 1, word)) ||
            (x + 1 < cols && canForm({ y, x: x + 1 }, wordIdx + 1, word)) ||
            (y + 1 < rows && canForm({ y: y + 1, x }, wordIdx + 1, word))
            ) {
            board[y][x] = temp;
             return true
        }
        
        board[y][x] = temp;
        return false;
    };
    
    
   return words.reduce((acc: string[], word: string) => {
    const firstIndices = charIndicesMap.get(word[0]);

      if (
          word.split('').every((c) => boardSet.has(c)) &&
          firstIndices?.some(idx => canForm(idx, 0, word) )
      ) {
          acc.push(word);
      }
       return acc;
    }, []);
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
