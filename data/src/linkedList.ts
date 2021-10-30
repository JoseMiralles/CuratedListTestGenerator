//---START---reverseList
/** Requires: [ListNode]
 * Given the head of a singly linked list, reverse the list, and return the
 * reversed list.
 * 
 * https://leetcode.com/problems/reverse-linked-list/
 * 
 * Input: head = [1,2,3,4,5]
 * Output: [5,4,3,2,1]
 * 
 * Input: head = [1,2]
 * Output: [2,1]
 * 
 * Input: head = []
 * Output: []
 */
export function reverseList(head: ListNode | null): ListNode | null {
    
    if (head === null) return null;

    let left = head;
    let mid = head.next;
    left.next = null;

    while (mid) {

        const right = mid.next;
        mid.next = left;
        left = mid;
        mid = right;
    }

    return left;
};
//---END---

//---START---mergeTwoLists
/** Requires: [ListNode,arrayToList]
 * Merge two sorted linked lists and return it as a sorted list. The list
 * should be made by splicing together the nodes of the first two lists.
 * 
 * Input: l1 = [1,2,4], l2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 * 
 * Input: l1 = [], l2 = []
 * Output: []
 * 
 * Input: l1 = [], l2 = [0]
 * Output: [0]
 */
export function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    
    const head: ListNode = new ListNode();
    let curr: ListNode = head;

    while (l1 && l2) {

      if (l1.val < l2.val) {

        curr.next = l1;
        l1 = l1.next;
      } else {

        curr.next = l2;
        l2 = l2.next;
      }

      curr = curr.next;
    }

    curr.next = l1 || l2;

    return head.next;
};
//---END---

//---START---mergeKLists
/** Requires: [ListNode,arrayToList]
 * 
 * You are given an array of k linked-lists lists, each linked-list is sorted
 * in ascending order.
 * 
 * Merge all the linked-lists into one sorted linked-list and return it.
 * 
 * https://leetcode.com/problems/merge-k-sorted-lists/
 * 
 * Input: lists = [[1,4,5],[1,3,4],[2,6]]
 * Output: [1,1,2,3,4,4,5,6]
 * 
 * Input: lists = []
 * Output: []
 * 
 * Input: lists = [[]]
 * Output: []
 */
export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {

    const numberOfLists: number = lists.length;

    for (let iteration = 1; iteration < numberOfLists; iteration *= 2) {

      const currentNumberOfLists: number = numberOfLists - iteration;

      for (let i = 0; i < currentNumberOfLists; i += iteration * 2) {

        lists[i] = mergeTwoListss(lists[i], lists[i + iteration]);
      }
    }

    return lists[0] ?? null;
};

function mergeTwoListss(l1: ListNode | null, l2: ListNode | null): ListNode | null {

    const sentinel: ListNode = new ListNode();
    let currentNode: ListNode = sentinel;

    while (l1 && l2) {

      if (l1.val < l2.val) {

        currentNode.next = l1;
        l1 = l1.next;
      } else {

        currentNode.next = l2;
        l2 = l2.next;
      }

      currentNode = currentNode.next;
    }
    
    currentNode.next = l1 ?? l2;
    return sentinel.next;
  }
//---END---

//---START---ListNode
/**
 * Given the head of a linked list, remove the nth node from the end of
 * the list and return its head.
 * 
 * Could you do this in one pass?
 * 
 * Input: head = [1,2,3,4,5], n = 2
 * Output: [1,2,3,5]
 * 
 * Input: head = [1], n = 1
 * Output: []
 * 
 * Input: head = [1,2], n = 1
 * Output: [1]
 */
export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {

  const dummyHead = new ListNode(0, head);
  let left = dummyHead;
  let right = dummyHead;
  
  // Move right n nodes ahead of left
  for (let i = 0; i < n; i++) {
      if (right.next) right = right.next;
  }
  
  // When right reaches 1st node from the end, left will be n+1th node from the end
  while (right.next) {
      right = right.next;
      if (left.next) left = left.next;
  }
  
  // Skip over the nth node from the end
  if (left.next) left.next = left.next.next;
  
  return dummyHead.next;
};
//---END---

/**SHARED ITEMS**/

//---START---ListNode
export class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}
//---END---

//---START---arrayToList
export const arrayToList = (arr: number[] | null): ListNode | null => {

    if (arr === null || arr.length < 1) return null;

    const head = new ListNode(arr[0]);
    let current = head;

    for (let i = 1; i < arr.length; i++) {

        current.next = new ListNode(arr[i]);
        current = current.next;
    }

    return head;
};
//---END---
