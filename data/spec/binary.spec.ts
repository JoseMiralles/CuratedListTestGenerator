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

    it(`return the sum of both numbers.`, () => {
        scenarios.forEach(s => {
            expect(binary.getSum(s.numA, s.numB)).toBe(s.output);
        });
    });

    it (`should not use + or - in the function (even in the comments)`, () => {
        expect(binary.getSum.toString().indexOf("+") === -1).toBeTrue();
        expect(binary.getSum.toString().indexOf("-") === -1).toBeTrue();
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

    it(`return the total number of "1"s in the binary string.`, () => {
        scenarios.forEach(s => {
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

    it(`return the total number of "1"s in the binary string.`, () => {
        scenarios.forEach(s => {
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

    it(`Should return the number missing from the array.`, () => {
        scenarios.forEach(s => {
            expect(binary.missingNumber(s.nums)).toEqual(s.output);
        });
    });
});

//---START---reverseBits
describe("reverseBits", () => {

    interface IScenario {
        n: number;
        output: number;
    }

    const scenarios: IScenario[] = [
        { n: 43261596, output: 964176192 },
        { n: 4294967293, output: 3221225471 }
    ];

    it(`Should return the reversed bits in decimal form.`, () => {
        scenarios.forEach(s => {
            expect(binary.reverseBits(s.n)).toEqual(s.output);
        });
    });
});
