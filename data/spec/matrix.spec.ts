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
