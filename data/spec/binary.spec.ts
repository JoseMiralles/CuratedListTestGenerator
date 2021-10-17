import * as binary from "../src/binary";

//---START---getSum
describe("getSum", () => {

    interface IScenario {
        numA: number;
        numB: number;
        output: number;
    }

    const scenarios: IScenario[] = [
        { numA: 1, numB: 2, output: 3 },
        { numA: 2, numB: 3, output: 5 }
    ];

    scenarios.forEach(s => {
        it(`return the sum of ${s.numA} and ${s.numB}, which is ${s.output}`, () => {
            expect(binary.getSum(s.numA, s.numB)).toBe(s.output);
        });
        it (`should not use + or - in the function (even in the comments)`, () => {
            expect(binary.getSum.toString().indexOf("+") === -1).toBeTrue();
            expect(binary.getSum.toString().indexOf("-") === -1).toBeTrue();
        });
    });
});
