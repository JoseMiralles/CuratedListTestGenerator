import * as linkedList from "../src/linkedList";

//---START---reverseList
describe("reverseList", () => {

    interface IScenario {
        items: number[];
        head: linkedList.ListNode | null;
    }

    const scenarios: IScenario[] = [
        { items: [1,2,3,4,5], head: null },
        { items: [1,2], head: null },
        { items: [], head: null }
    ];

    // Loop trough all of the scenarios, create each list, and then run each test.
    scenarios.forEach(s => {
        if (s.items.length < 1) {

            it("Should return null if 'head' is null.", () => {
                expect(linkedList.reverseList(s.head)).toBeNull();
            });
        } else {
            // Create head of the list.
            let current: linkedList.ListNode | null = new linkedList.ListNode(s.items[0]);
            s.head = current;

            // Populate the list.
            for (let x = 1; x < s.items.length; x++) {

                current.next = new linkedList.ListNode(s.items[x]);
                current = current.next;
            }

            it("Should return a reversed linked list.", () => {

                current = linkedList.reverseList(s.head);

                for (let r = s.items.length - 1; r >= 0; r--) {

                    expect(current?.val).toBe(s.items[r]);
                    if (current) current = current.next;
                }
            });
        }
    });
});

//---START---mergeTwoLists
describe("mergeTwoLists", () => {

    interface IScenario {
        l1: number[];
        l2: number[];
        output: number[];
    };

    const scenarios: IScenario[] = [
        { l1: [1,2,4], l2: [1,3,4], output: [1,1,2,3,4,4] },
        { l1: [], l2: [], output: [] },
        { l1: [], l2: [0], output: [0] },
    ];

    scenarios.forEach(s => {

        if (s.l1.length + s.l2.length < 1) {
            
            it ("Should return null when both lists are empty.", () => {
                expect(linkedList.mergeTwoLists(null, null)).toBeNull();
            });
        } else {
            
            const list1 = linkedList.arrayToList(s.l1);
            const list2 = linkedList.arrayToList(s.l2);
            let temp: linkedList.ListNode | null = linkedList.mergeTwoLists(list1, list2);
    
            it ("Should return a merged list.", () => {
                
                s.output.forEach(n => {
                    
                    expect(temp?.val).toBe(n);
                    if (temp) temp = temp.next;
                });
            });
        }
    });
});
