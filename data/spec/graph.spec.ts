import * as graph from "../src/graph";

//---START---cloneGraph
describe("cloneGraph", () => {

    interface IScenario {
        edges: number[][];
    }

    const scenarios: IScenario[] = [
        { edges: [[2,4],[1,3],[2,4],[1,3]] },
        { edges: [[]] },
        { edges: [] },
        { edges: [[2],[1]] }
    ];

    // Generates a graph with nodes.
    const buildGraph = (list: number[][]): graph.cGNode | null => {

        if (list.length < 1 || list.some(arr => arr.length !== 2)) {
            return null;
        }

        const dict: {[key: number]: graph.cGNode} = {};
        let node: graph.cGNode;
        let target: graph.cGNode;

        list.forEach(d => {

            node = dict[ d[0] ];
            target = dict[ d[1] ];

            if (!node) {
                node = new graph.cGNode( d[0] );
                dict[ d[0] ] = node;
            }

            if (!target) {
                target = new graph.cGNode( d[1] );
                dict[ d[1] ] = target;
            }
            
            node.addNeighbor(target);
            target.addNeighbor(node);
        });

        return dict[list[0][0]];
    };

    it("Should be properly connected and have the correct values.", () => {
        for (let i = 0; i < scenarios.length; i++) {

            const s = scenarios[i];

            const originalGraph = buildGraph(s.edges);
            const deepDup = graph.cloneGraph(originalGraph);

            if (originalGraph && !deepDup) {
                // Fail if the new graph is undefined.
                fail("Your graph / head node is undefined.");
                continue;
            };

            const originalQue: graph.cGNode[] = originalGraph ? [originalGraph] : [];
            const dupQue: graph.cGNode[] = deepDup ? [deepDup] : [];

            const originalVisited = new Set<number>();
            const dupVisited = new Set<number>();

            while (originalQue.length) {


                if (dupQue.length < 1) {
                    fail("Your graph seems to be improperly connected or missing nodes.");
                }

                const currentOriginal = originalQue.pop();
                const currentDup = dupQue.pop();

                if (currentOriginal) originalVisited.add(currentOriginal?.val);
                if (currentDup) originalVisited.add(currentDup?.val);

                expect(currentOriginal?.val).toBe(currentDup?.val);

                expect(currentOriginal)
                .withContext(`Node: ${currentOriginal?.val} is not a clone!`)
                .not.toBe(currentDup);

                currentOriginal?.neighbors.forEach(n => {
                    if (!originalVisited.has(n.val))
                        originalQue.push(n);
                });

                currentDup?.neighbors.forEach(n => {
                    if (!dupVisited.has(n.val))
                        dupQue.push(n);
                });
            }
        };
    });
});

//---START---canFinish
describe("canFinish", () => {

    interface IScenario {
        numCourses: number;
        prerequisites: number[][];
        output: boolean;
    };

    const trueScenarios: IScenario[] = [
        { numCourses: 2, prerequisites: [[1,0]], output: true },
    ];

    const falseScenarios: IScenario[] = [
        { numCourses: 2, prerequisites: [[1,0], [0,1]], output: false }
    ];

    it ("Should return TRUE if the courses CAN be completed.", () => {
        trueScenarios.forEach(s => {
            expect(graph.canFinish(s.numCourses, s.prerequisites)).toBe(s.output);
        });
    });

    it ("Should return FALSE if the courses CANNOT be completed.", () => {
        falseScenarios.forEach(s => {
            expect(graph.canFinish(s.numCourses, s.prerequisites)).toBe(s.output);
        });
    });
});

//---START---pacificAtlantic
describe("pacificAtlantic", () => {

    interface IScenario {
        heights: number[][];
        output: number[][];
    };

    const scenarios: IScenario[] = [
        {
            heights: [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]],
            output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
        },
        {
            heights: [[2,1],[1,2]],
            output: [[0,0],[0,1],[1,0],[1,1]]
        }
    ];

    it ("Should return a 2D list of grid coordinates 'result' where 'result[i] = [ri, ci]' denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.", () => {
        scenarios.forEach(s => {
            expect(graph.pacificAtlantic(s.heights)).toEqual(s.output);
        });
    });
});

//---START---numIslands
describe("numIslands", () => {

    interface IScenario {
        grid: string[][];
        output: number;
    };

    const scenarios: IScenario[] = [
        {
            grid: [
                ["1", "1", "1", "1", "0"],
                ["1", "1", "0", "1", "0"],
                ["1", "1", "0", "0", "0"],
                ["0", "0", "0", "0", "0"]
            ],
            output: 1
        },
        {
            grid: [
                ["1", "1", "0", "0", "0"],
                ["1", "1", "0", "0", "0"],
                ["0", "0", "1", "0", "0"],
                ["0", "0", "0", "1", "1"]
            ],
            output: 3
        }
    ];

    it ("Should return the number of islands.", () => {
        scenarios.forEach(s => {
            expect(graph.numIslands(s.grid)).toEqual(s.output);
        });
    });
});

//---START---longestConsecutive
describe("longestConsecutive", () => {

    interface IScenario {
        nums: number[];
        output: number;
    };

    const scenarios: IScenario[] = [
        { nums: [100,4,200,1,3,2], output: 4 },
        { nums: [0,3,7,2,5,8,4,6,0,1], output: 9 },
    ];

    it ("Should return the length of the longest consecutive elements sequence.", () => {
        scenarios.forEach(s => {
            expect(graph.longestConsecutive(s.nums)).toEqual(s.output);
        });
    });
});

//---START---alienOrder
describe("alienOrder", () => {

    interface IScenario {
        words: string[];
        output: string;
    };

    const scenarios: IScenario[] = [
        { words: ["wrt","wrf","er","ett","rftt"], output: "wertf" },
        { words: ["z","x"], output: "zx" },
        { words: ["z","x","z"], output: "" }
    ];

    it ("Should return the order of letters in this language.", () => {
        scenarios.forEach(s => {
            expect(graph.alienOrder(s.words)).toEqual(s.output);
        });
    });
});

//---START---validTree
describe("validTree", () => {

    interface IScenario {
        n: number;
        edges: number[][];
        output: boolean;
    };

    const trueScenarios: IScenario[] = [
        { n: 5, edges: [[0, 1], [0, 2], [0, 3], [1, 4]], output: true }
    ];

    const falseScenarios: IScenario[] = [
        { n: 5, edges: [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]], output: false }
    ];

    it ("Should return TRUE if the edges DO make up a valid tree.", () => {
        trueScenarios.forEach(s => {
            expect(graph.validTree(s.n, s.edges)).toEqual(s.output);
        });
    });

    it ("Should return FALSE if the edges DO NOT make up a valid tree.", () => {
        falseScenarios.forEach(s => {
            expect(graph.validTree(s.n, s.edges)).toEqual(s.output);
        });
    });
});

//---START---countComponents
describe("countComponents", () => {

    interface IScenario {
        n: number;
        edges: number[][];
        output: number;
    };

    const scenarios: IScenario[] = [
        { n: 5, edges: [[0,1], [1,2], [3,4]], output: 2 },
        { n: 5, edges: [[0,1], [1,2], [2,3], [3,4]], output: 1 },
    ];

    it ("Should return the number of connected components in the undirected graph.", () => {
        scenarios.forEach(s => {
            expect(graph.countComponents(s.n, s.edges)).toEqual(s.output);
        });
    });
});
