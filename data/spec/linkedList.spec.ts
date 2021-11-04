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

//---START---mergeKLists
describe("mergeKLists", () => {

    interface IScenario {
        lists: number[][];
        output: number[];
    }

    const scenarios: IScenario[] = [
        { lists: [[1,4,5],[1,3,4],[2,6]], output: [1,1,2,3,4,4,5,6] },
        { lists: [], output: [] },
        { lists: [[]], output: [] },
    ];
    
    scenarios.forEach(s => {
        
        const listsArray: (linkedList.ListNode | null)[] = [];
        
        // Convert all of the arrays into lists, and add them to listsArray.
        s.lists.forEach(l => {
            listsArray.push( linkedList.arrayToList(l) );
        });
        
        let res: linkedList.ListNode | null | undefined
            = linkedList.mergeKLists(listsArray);

        if (s.lists.length < 1 || s.lists.every(l => l.length < 1)) {

            it ("Should return null if the array is empty, or if all of the lists are empty.", () => {
                expect( linkedList.mergeKLists(listsArray) ).toBeNull();
            });
        } else {

            it("Should return a single merged list.", () => {

                s.output.forEach(n => {
                    expect(res?.val).toBe(n);
                    res = res?.next;
                });
            });
        }
    });
});

//---START---removeNthFromEnd
describe("removeNthFromEnd", () => {

    interface IScenario {
        arr: number[];
        n: number;
        output: number[];
    }

    const scenarios: IScenario[] = [
        { arr: [1,2,3,4,5], n: 2, output: [1,2,3,5]  },
        { arr: [0,2,5], n: -1, output: [0,2,5] },
        { arr: [1], n: 1, output: []  },
        { arr: [1,2], n: 1, output: [1]  },
    ];

    scenarios.forEach(s => {

        const input = linkedList.arrayToList(s.arr);
        let current = linkedList.removeNthFromEnd(input, s.n);
        
        it ("Should return the list with the correct element removed.", () => {
            
            s.output.forEach(n => {

                expect(current?.val).toBe(n);
                if (current) current = current.next;
            });
        });
    });
});

//---START---reorderList
describe("reorderList", () => {

    interface IScenario {
        input: number[];
        output: number[];
    }

    const scenarios: IScenario[] = [
        { input: [1, 2, 3, 4], output: [1, 4, 2, 3] },
        { input: [1, 2, 3, 4, 5], output: [1, 5, 2, 4, 3] }
    ];

    it("Should have values in the correct order.", () => {

        scenarios.forEach(s => {

            const inputHead = linkedList.arrayToList(s.input);
            const listNodeDictionary: { [key: number]: linkedList.ListNode } = {};

            let current: linkedList.ListNode | null | undefined = inputHead;

            /** Add all the nodes to listNodeDictionary.
             * This is so that we can compare the nodes to ensure that the
             * nodes switched, and not just the values. All nodes should still point
             * to their original values.
             */
            while (current) {

                listNodeDictionary[current.val] = current;
                current = current.next;
            }

            // This mutates the list.
            linkedList.reorderList(inputHead);


            current = inputHead;

            s.output.forEach((n) => {

                expect(current?.val).toBe(n);
                current = current?.next;
            });

            if (current?.next) {
                fail(`The tail of the list ( ${current.val} ) still points to another node (${current.next.val}).`);
            }

            // Check that the nodes still hold their original values.
            s.output.forEach((n) => {

                expect(listNodeDictionary[n].val).withContext(
                    "Nodes do not hold their original values."
                ).toEqual(n);
            });

            // Traverse the list again and look for loops.
            const visitedSet = new Set<linkedList.ListNode>();
            current = inputHead;
            
            while(current) {

                if (current && visitedSet.has(current)) {

                    fail("Loop detected!");
                    current = null;
                }

                if (current) visitedSet.add(current);
                current = current?.next;
            }
        });
    });
});
