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
export const arrayToList = (arr: number[]): ListNode => {

    const head = new ListNode(arr[0]);
    let current = head;

    for (let i = 1; i < arr.length; i++) {

        current.next = new ListNode(arr[i]);
        current = current.next;
    }

    return head;
};
//---END---
