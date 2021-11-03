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

//---START---invertTree
describe("invertTree", () => {

    interface IScenario {
        input: number[];
        output: number[];
    }

    const scenarios: IScenario[] = [
        { input: [4,2,7,1,3,6,9], output: [4,7,2,9,6,3,1] },
        { input: [2,1,3], output: [2,3,1] },
        { input: [], output: [] }
    ];

    scenarios.forEach(s => {

        it ("should return an inverted tree.", () => {

            const inputRoot = trees.arrayToBinaryTree(s.input);
            const expectedOutput = trees.arrayToBinaryTree(s.output);
            const exerciseOutput = trees.invertTree(inputRoot);

            if (exerciseOutput && expectedOutput)
                trees.compareTwoTreesTest(exerciseOutput, expectedOutput);
        });
    });
});

//---START---maxPathSum
describe("maxPathSum", () => {

    interface IScenario {
        input: (number|null)[];
        output: number;
    }

    const scenarios: IScenario[] = [
        { input: [1,2,3], output: 6 },
        { input: [-10,9,20,null,null,15,7], output: 42 },
    ];

    scenarios.forEach(s => {

        it("it should return the sum of the largest path.", () => {
            
            const inputTree = trees.arrayToBinaryTree(s.input);
            expect(trees.maxPathSum(inputTree)).toBe(s.output);
        });
    });
});

//---START---levelOrder
describe("levelOrder", () => {

    interface IScenario {
        input: (number|null)[];
        output: number[][];
    }

    const scenarios: IScenario[] = [
        { input: [3,9,20,null,null,15,7], output: [[3],[9,20],[15,7]] },
        { input: [1], output: [[1]] },
        { input: [], output: [] }
    ];

    scenarios.forEach(s => {

        it("should return the level order traversal of its nodes.", () => {

            const inputRoot = trees.arrayToBinaryTree(s.input);
            expect(trees.levelOrder(inputRoot)).toEqual(s.output);
        });
    });
});

//---START---serialize
describe("serialize", () => {

    interface IScenario {
        input: (number|null)[];
    }

    const scenarios: IScenario[] = [
        { input: [1,2,3,null,null,4,5] },
        { input: [] },
        { input: [1] }
    ];

    // @ts-ignore
    const deserialize = trees._deserialize ? trees._deserialize : trees.deserialize;

    scenarios.forEach(s => {

        it("should serialise and then deserialize the tree.", () => {

            const inputTree = trees.arrayToBinaryTree(s.input);
            const resultTree = deserialize(trees.serialize(inputTree));

            if(inputTree && resultTree)
                trees.compareTwoTreesTest(resultTree, inputTree);

            if (s.input[0] && resultTree === null) {

                fail("The root is null.");
            }
        });
    });
});

//---START---isSubtree
describe("isSubtree", () => {

    interface IScenario {
        root: (number | null)[];
        subRoot: (number | null)[];
        output: boolean;
    }

    const scenarios: IScenario[] = [
        { root: [3,4,5,1,2], subRoot: [4,1,2], output: true },
        { root: [3,4,5,1,2,null,null,null,null,0], subRoot: [4,1,2], output: false }
    ];

    scenarios.forEach(s => {

        it ("Should return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.", () => {

            const rootNode = trees.arrayToBinaryTree(s.root);
            const subRootNode = trees.arrayToBinaryTree(s.subRoot);

            expect(
                trees.isSubtree(rootNode, subRootNode)
            ).toBe(s.output);
        });
    });
});

//---START---buildTree
describe("buildTree", () => {

    interface IScenario {
        preorder: number[];
        inorder: number[];
        output: (number | null)[];
    }

    const scenarios: IScenario[] = [
        { preorder: [3,9,20,15,7], inorder: [9,3,15,20,7], output: [3,9,20,null,null,15,7] },
        { preorder: [-1], inorder: [-1], output: [-1] }
    ];

    scenarios.forEach(s => {

        it ("Should construct and return the binary tree.", () => {

            const expectedOutput = trees.arrayToBinaryTree(s.output);
            const exerciseOutput = trees.buildTree(s.preorder, s.inorder);

            if (expectedOutput && exerciseOutput)
                trees.compareTwoTreesTest(
                    expectedOutput,
                    exerciseOutput
                );

            if (expectedOutput)
                    expect(exerciseOutput).not.toBeNull();
        });
    });
});
//---END---

//---START---isValidBST
describe("isValidBST", () => {

    interface IScenario {
        input: (number|null)[];
        output: boolean;
    }

    const scenarios: IScenario[] = [
        { input: [2,1,3], output: true },
        { input: [5,1,4,null,null,3,6], output: false }
    ];

    scenarios.forEach(s => {

        it ("Should determine if it is a valid binary search tree (BST).", () => {
            
            const inputTree = trees.arrayToBinaryTree(s.input);
            expect(trees.isValidBST(inputTree)).toBe(s.output);
        });
    });
});
//---END---

//---START---kthSmallest
describe("kthSmallest", () => {

    interface IScenario {
        input: (number|null)[];
        k: number;
        output: number
    }

    const scenarios: IScenario[] = [
        { input: [3,1,4,null,2], k: 1, output: 1 },
        { input: [5,3,6,2,4,null,null,1], k: 3, output: 3 }
    ];

    scenarios.forEach(s => {

        it ("Should determine if it is a valid binary search tree (BST).", () => {
            
            const inputTree = trees.arrayToBinaryTree(s.input);
            expect(trees.kthSmallest(inputTree, s.k)).toBe(s.output);
        });
    });
});
//---END---

//---START---lowestCommonAncestor
describe("lowestCommonAncestor", () => {

    interface IScenario {
        input: (number|null)[];
        p: number;
        q: number;
        output: number;
    }

    const scenarios: IScenario[] = [
        { input: [6,2,8,0,4,7,9,null,null,3,5], p: 2, q: 8, output: 6 },
        { input: [6,2,8,0,4,7,9,null,null,3,5], p: 2, q: 4, output: 2 },
    ];

    scenarios.forEach(s => {

        it ("should find the lowest common ancestor (LCA) of two given nodes in the BST.", () => {
            
            const inputTree = trees.arrayToBinaryTree(s.input);
            expect(
                trees.lowestCommonAncestor(
                    trees.arrayToBinaryTree(s.input),
                    new trees.TreeNode(s.p),
                    new trees.TreeNode(s.q),
                )?.val
            ).toBe(s.output);
        });
    });
});
//---END---

//---START---Trie
describe("Trie", () => {

    interface IScenario {
        operations: string[];
        args: string[];
        outputs: (boolean|null)[];
    }

    const scenarios: IScenario[] = [
        {
            operations: ["Trie", "insert", "search", "search", "startsWith", "insert", "search"],
            args: ["", "apple", "apple", "app", "app", "app", "app"],
            outputs: [null, null, true, false, true, null, true]
        }
    ];

    it ("Should return the correct output for each operation and argument.", () => {
        scenarios.forEach(s => {
            
            const trie = new trees.Trie();

            for (let i = 1; i < s.operations.length; i++) {

                // call the scenario operations and pass in arguments.
                // @ts-ignore
                const operationOutput: boolean = trie[ s.operations[i] ] ( s.args[i] );
                const expectedOutput = s.outputs[i];

                if (expectedOutput !== null)
                    expect(operationOutput)
                    .withContext(
                        `trie.${s.operations[i]}("${s.args[i]}") was expected to return ${expectedOutput}`
                    )
                    .toBe(expectedOutput);
            }
        });
    });
});

//---START---WordDictionary
describe("WordDictionary", () => {

    interface IScenario {
        operations: string[];
        args: string[];
        outputs: (boolean|null)[];
    }

    const scenarios: IScenario[] = [
        {
            operations: ["WordDictionary","addWord","addWord","addWord","search","search","search","search"],
            args: ["","bad","dad","mad","pad","bad",".ad","b.."],
            outputs: [null,null,null,null,false,true,true,true]
        }
    ];

    it ("Should return the correct output for each operation and argument.", () => {
        scenarios.forEach(s => {
            
            const wordDictionary = new trees.WordDictionary();

            for (let i = 1; i < s.operations.length; i++) {

                // call the scenario operations and pass in arguments.
                // @ts-ignore
                const operationOutput: boolean = wordDictionary[ s.operations[i] ] ( s.args[i] );
                const expectedOutput = s.outputs[i];

                if (expectedOutput !== null)
                    expect(operationOutput)
                    .withContext(
                        `wordDictionary.${s.operations[i]}("${s.args[i]}") was expected to return ${expectedOutput}`
                    )
                    .toBe(expectedOutput);
            }
        });
    });
});

//---START---WordDictionary
describe("WordDictionary", () => {

    interface IScenario {
        operations: string[];
        args: string[];
        outputs: (boolean|null)[];
    }

    const scenarios: IScenario[] = [
        {
            operations: ["WordDictionary","addWord","addWord","addWord","search","search","search","search"],
            args: ["","bad","dad","mad","pad","bad",".ad","b.."],
            outputs: [null,null,null,null,false,true,true,true]
        }
    ];

    it ("Should return the correct output for each operation and argument.", () => {
        scenarios.forEach(s => {
            
            const wordDictionary = new trees.WordDictionary();

            for (let i = 1; i < s.operations.length; i++) {

                // call the scenario operations and pass in arguments.
                // @ts-ignore
                const operationOutput: boolean = wordDictionary[ s.operations[i] ] ( s.args[i] );
                const expectedOutput = s.outputs[i];

                if (expectedOutput !== null)
                    expect(operationOutput)
                    .withContext(
                        `wordDictionary.${s.operations[i]}("${s.args[i]}") was expected to return ${expectedOutput}`
                    )
                    .toBe(expectedOutput);
            }
        });
    });
});

//---START---findWords
describe("findWords", () => {

    interface IScenario {
        board: string[][];
        words: string[];
        output: string[];
    }

    const scenarios: IScenario[] = [
        {
            board: [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
            words: ["oath","pea","eat","rain"],
            output: ["eat","oath"]
        },
        {
            board: [["a","b"],["c","d"]],
            words: ["abcb"],
            output: []
        }
    ];

    it ("Should return a list of all the words from the array that are found in the grid.", () => {
        scenarios.forEach(s => {
            
            const output = trees.findWords( s.board, s.words );

            expect(output.length).withContext(
                `The words found were: [${output}],\nbut were expected to be: [${s.output}]`
            ).toBe(s.output.length);

            output.forEach(word => {

                if (!s.output.includes(word))
                    fail(`${word} was not supposed to be in the output.`);
            });

            s.output.forEach(word => {

                if (!output.includes(word))
                    fail(`${word} is missing from the output.`);
            });
        });
    });
});
