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
