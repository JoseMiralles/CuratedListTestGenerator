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

//---START---hammingWeight
describe("hammingWeight", () => {

    interface IScenario {
        num: number;
        output: number;
    }

    const scenarios: IScenario[] = [
        { num: 11, output: 3 },         // 00000000000000000000000000001011
        { num: 128, output: 1 },        // 00000000000000000000000010000000
        { num: 4294967293, output: 31 } // 11111111111111111111111111111101
    ];

    scenarios.forEach(s => {
        it(`return the total number of "1"s in the binary string.`, () => {
            expect(binary.hammingWeight(s.num)).toBe(s.output);
        });
    });
});

//---START---countBits
describe("countBits", () => {

    interface IScenario {
        num: number;
        output: number[];
    }

    const scenarios: IScenario[] = [
        { num: 2, output: [0,1,1] },
        { num: 5, output: [0,1,1,2,1,2] }
    ];

    scenarios.forEach(s => {
        it(`return the total number of "1"s in the binary string.`, () => {
            expect(binary.countBits(s.num)).toEqual(s.output);
        });
    });
});

//---START---missingNumber
describe("missingNumber", () => {

    interface IScenario {
        nums: number[];
        output: number;
    }

    const scenarios: IScenario[] = [
        { nums: [3,0,1], output: 2 },
        { nums: [0,1], output: 2 },
        { nums: [9,6,4,2,3,5,7,0,1], output: 8 },
        { nums: [0], output: 1 }
    ];

    scenarios.forEach(s => {
        it(`Should return the number missing from the array.`, () => {
            expect(binary.missingNumber(s.nums)).toEqual(s.output);
        });
    });
});
