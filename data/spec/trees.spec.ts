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
            const inputTree = new trees.TreeNode(s.input[0]);
            trees.arrayToBinaryTree(s.input, 0, inputTree);

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
