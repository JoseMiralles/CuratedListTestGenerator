//---START---reverseList
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

//---NEEDS [ListNode] NEEDS---//

//---START---mergeTwoLists
export function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    return null;
};

//---NEEDS [ListNode,arrayToList] NEEDS---//

/** SHARED ITEMS **/

//---START---ListNode
export class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

//---START---arrayToList
export const arrayToList = (arr: number[]): ListNode => {

    let current = new ListNode(arr[0]);

    for (let i = 1; i < arr.length; i++) {

        current.next = new ListNode(arr[i]);
        current = current.next;
    }

    return current;
};
