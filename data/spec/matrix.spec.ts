import * as matrix from "../src/matrix";

//---START---setZeroes
describe("setZeroes", () => {

    interface IScenario {
        input: number[][];
        output: number[][];
    }

    const scenarios: IScenario[] = [
        { input: [[1,1,1],[1,0,1],[1,1,1]], output: [[1,0,1],[0,0,0],[1,0,1]] },
        { input: [[0,1,2,0],[3,4,5,2],[1,3,1,5]], output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]] }
    ];

    scenarios.forEach(s => {

        it("Should return the same matrix with rows and column correctly modified.", () => {
            
            matrix.setZeroes(s.input); // Mutates the matrix.
            expect( s.input ).toEqual(s.output);
        });
    });
});

//---START---spiralOrder
describe("spiralOrder", () => {

    interface IScenario {
        input: number[][];
        output: number[];
    }

    const scenarios: IScenario[] = [
        { input: [[1,2,3],[4,5,6],[7,8,9]], output: [1,2,3,6,9,8,7,4,5] },
        { input: [[1,2,3,4],[5,6,7,8],[9,10,11,12]], output: [1,2,3,4,8,12,11,10,9,5,6,7] }
    ];

    scenarios.forEach(s => {

        it ("should return the elements in spiral order as an array.", () => {
            
            expect(matrix.spiralOrder(s.input)).toEqual(s.output);
        });
    });
});

//---START---rotate
describe("rotate", () => {

    interface IScenario {
        input: number[][];
        output: number[][];
    }

    const scenarios: IScenario[] = [
        { input: [[1,2,3],[4,5,6],[7,8,9]], output: [[7,4,1],[8,5,2],[9,6,3]] },
        { input: [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]], output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]] },
        { input: [[1]], output: [[1]] },
        { input: [[1,2],[3,4]], output: [[3,1],[4,2]] }
    ];

    scenarios.forEach(s => {

        it ("should return the elements in spiral order as an array.", () => {
            
            matrix.rotate(s.input); // This mutates the matrix.
            expect(s.input).toEqual(s.output);
        });
    });
});

//---START---exist
describe("exist", () => {

    interface IScenario {
        input: string[][];
        word: string;
        output: boolean;
    }

    const scenarios: IScenario[] = [
        {
            input: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
            word: "ABCCED",
            output: true
        },
        {
            input: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
            word: "SEE",
            output: true
        },
        {
            input: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
            word: "ABCB",
            output: false
        }
    ];

    scenarios.forEach(s => {

        it ("should return true if the word is in the matrix, false if not.", () => {

            expect(
                matrix.exist(s.input, s.word)
            ).toBe(s.output);
        });
    });
});
