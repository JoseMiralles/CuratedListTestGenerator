import * as graph from "../src/graph";

//---START---cloneGraph
describe("cloneGraph", () => {

    interface IScenario {
        graphArray: number[][];
    }

    const scenarios: IScenario[] = [
        { graphArray: [[2,4],[1,3],[2,4],[1,3]] },
        { graphArray: [[]] },
        { graphArray: [] },
        { graphArray: [[2],[1]] }
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

    for (let i = 0; i < scenarios.length; i++) {

        const s = scenarios[i];

        const originalGraph = buildGraph(s.graphArray);
        const deepDup = graph.cloneGraph(originalGraph);

        if (originalGraph && !deepDup) {
            // Fail if the new graph is undefined.
            fail ("Your graph / head node is undefined.");
            continue;
        };

        const originalQue: graph.cGNode[] = originalGraph ? [ originalGraph ] : [];
        const dupQue: graph.cGNode[] = deepDup ? [ deepDup ] : [];

        const originalVisited = new Set<number>();
        const dupVisited = new Set<number>();

        while (originalQue.length) {

            it ("Should be properly connected.", () => {

                if (dupQue.length < 1) {
                    fail("Your graph seems to be improperly connected or missing nodes.");
                }
            });

            const currentOriginal = originalQue.pop();
            const currentDup = dupQue.pop();

            if (currentOriginal) originalVisited.add(currentOriginal?.val);
            if (currentDup) originalVisited.add(currentDup?.val);

            it ("Should have the same values.", () => {

                expect(currentOriginal?.val).toBe(currentDup?.val);
            });

            it ("Should contain new nodes only.", () => {

                expect(currentOriginal).not.toBe(currentDup);
            });

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

    trueScenarios.forEach(s => {
        it ("Should return TRUE if the courses CAN be completed.", () => {
            expect(graph.canFinish(s.numCourses, s.prerequisites)).toBe(s.output);
        });
    });

    falseScenarios.forEach(s => {
        it ("Should return FALSE if the courses CANNOT be completed.", () => {
            expect(graph.canFinish(s.numCourses, s.prerequisites)).toBe(s.output);
        });
    });
});

