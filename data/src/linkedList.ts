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

//---INCLUDE
export class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}
