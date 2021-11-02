import * as trees from "../src/trees";

//---START---maxDepth
describe("maxDepth", () => {

    interface IScenario {
        input: (number | null)[];
        output: number;
    }

    const scenarios: IScenario[] = [
        { input: [3,9,20,null,null,15,7], output: 3 },
        { input: [1,null,2], output: 2 },
        { input: [], output: 0 },
        { input: [0], output: 1 }
    ];

    scenarios.forEach(s => {

        if (s.input[0]) {
            const inputTree = trees.arrayToBinaryTree(s.input);

            it("should return the maximum depth.", () => {
                if (inputTree) expect(trees.maxDepth(inputTree)).toBe(s.output);
            });
        } else {

            it("should return 0 if the root is null.", () => {
                expect(trees.maxDepth(null)).toBe(0);
            })
        }
    });
});

//---START---isSameTree
describe("isSameTree", () => {

    interface IScenario {
        p: (number | null)[];
        q: (number | null)[];
        output: boolean;
    }

    const scenarios: IScenario[] = [
        { p: [1,2,3], q: [1,2,3], output: true },
        { p: [1,2], q: [1,null,2], output: false },
        { p: [1,2,3,null,4,null,5], q: [1,2,3,null,4,null,5], output: true },
        { p: [1,2,3,null,4,null,5], q: [1,2,3,4,null,null,5], output: false },
    ];

    scenarios.forEach(s => {

        it ("should return true if the trees are the same, and false if they are not the same.", () => {

            const p = trees.arrayToBinaryTree(s.p);
            const q = trees.arrayToBinaryTree(s.q);

            expect(trees.isSameTree(p,q)).toBe(s.output);
        });
    });
});
