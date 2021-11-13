import * as arrays from "../src/arrays";

//---START---twoSum
describe("twoSum", () => {

    interface IScenario {
        nums: number[];
        target: number;
        acceptedOutputs: number[][];
    }

    const scenarios: IScenario[] = [
        {nums: [2,7,11,15], target: 9, acceptedOutputs: [ [0,1], [1,0] ]},
        {nums: [3,2,4], target: 6, acceptedOutputs: [ [1,2], [2,1] ]},
        {nums: [3,3], target: 6, acceptedOutputs: [ [0,1], [1,0] ]}
    ];

    
    it(`Should return two numbers that add up to the target.`, () => {
        scenarios.forEach(scenario => {
            expect(scenario.acceptedOutputs).toContain(
                arrays.twoSum(scenario.nums, scenario.target)
            );
        })
    });
});

//---START---maxProfit
describe("maxProfit", () => {

    interface IScenario {
        prices: number[];
        expectedOutput: number;
    }

    const scenarios: IScenario[] = [
        {prices: [7,1,5,3,6,4], expectedOutput: 5},
        {prices: [5,9,4,1,2,8,4], expectedOutput: 7},
        {prices: [4,8,2,4,6,8,7], expectedOutput: 6}
    ];

    it("Should return 0 if profit cannot be acheived.", () => {
        expect(arrays.maxProfit([7,6,4,3,1])).toEqual(0);
        expect(arrays.maxProfit([8,4,3,1])).toEqual(0);
    });

    it(`Should return the maximum profit.`, () => {
        scenarios.forEach(scenario => {
            expect(arrays.maxProfit(scenario.prices)).toEqual(scenario.expectedOutput);
        });
    });

});

//---START---containsDuplicate
describe("containsDuplicate", () => {
    
    interface IScenario {
        nums: number[];
        expectedOutput: boolean;
    }

    const scenariosTrue: IScenario[] = [
        {nums: [1,2,3,1], expectedOutput: true},
        {nums: [1,1,1,3,3,4,3,2,4,2], expectedOutput: true}
    ];

    const scenariosFalse: IScenario[] = [
        {nums: [1,2,3,4], expectedOutput: false},
        {nums: [1,4,2,6,8,9], expectedOutput: false}
    ];

    it("Should return true if there are any duplicates.", () => {
        scenariosTrue.forEach(scenario => {
            expect(arrays.containsDuplicate(scenario.nums)).toBe(scenario.expectedOutput);
        });
    });

    it("Should return false if there aren't any duplicates.", () => {
        scenariosFalse.forEach(scenario => {
            expect(arrays.containsDuplicate(scenario.nums)).toBe(scenario.expectedOutput);
        });
    });
});

//---START---productExceptSelf
describe("productExceptSelf", () => {

    interface IScenario {
        nums: number[];
        expectedOutput: number[];
    }

    const scenarios: IScenario[] = [
        {nums: [1,2,3,4], expectedOutput: [24,12,8,6]},
        {nums: [-1,1,0,-3,3], expectedOutput: [0,0,9,0,0]},
        {nums: [1,-1], expectedOutput: [-1,1]}
    ];

    it(`Should return an array containing the correct products.`, () => {
        scenarios.forEach(scenario => {
            expect(arrays.productExceptSelf(scenario.nums))
            .withContext(
                `\n\tInput [${scenario.nums}]\n\tExpected: [${scenario.expectedOutput}]`
            )
            .toEqual(scenario.expectedOutput);
        });
    });
});

//---START---maxSubArray
describe("maxSubArray", () => {

    interface IScenario {
        nums: number[];
        expectedOutput: number;
    }

    const scenarios: IScenario[] = [
        {nums: [-2,1,-3,4,-1,2,1,-5,4], expectedOutput: 6},
        {nums: [1], expectedOutput: 1},
        {nums: [5,4,-1,7,8], expectedOutput: 23}
    ];

    it(`Should return the sum of the sub array with the largest sum.`, () => {
        scenarios.forEach(scenario => {
            expect(arrays.maxSubArray(scenario.nums)).withContext(
                `\n\tInput: [${scenario.nums}]\n\tExpected Output: ${scenario.expectedOutput}`
            ).toBe(scenario.expectedOutput);
        });
    });
});

//---START---maxProduct
describe("maxProduct", () => {

    interface IScenario {
        nums: number[];
        expectedOutput: number;
    }

    const scenarios: IScenario[] = [
        {nums: [2,3,-2,4], expectedOutput: 6},
        {nums: [-2,0,-1], expectedOutput: 0}
    ];

    it(`Should return the product of the subarray with the largest product.`, () => {
        scenarios.forEach(scenario => {
            expect(arrays.maxProduct(scenario.nums)).withContext(
                `\n\tInput: [${scenario.nums}]\n`
            ).toBe(scenario.expectedOutput);
        })
    });
});

//---START---findMin
describe("findMin", () => {

    interface IScenario {
        nums: number[];
        expectedOutput: number;
        compareToLinear?: boolean;
    }

    const scenarios: IScenario[] = [
        { nums: [3,4,5,1,2], expectedOutput: 1, compareToLinear: true },
        { nums: [4,5,6,7,0,1,2], expectedOutput: 0, compareToLinear: true },
        { nums: [11,13,15,17], expectedOutput: 11 },
        { nums: [2, 1], expectedOutput: 1 },
        { nums: [1], expectedOutput: 1 },
        { nums: [3,1,2], expectedOutput: 1 }
    ];

    it (`Should return the minimum value in the array.`, () => {
        scenarios.forEach(scenario => {

            expect(arrays.findMin(scenario.nums)).withContext(
                ` \n\tInput: [${scenario.nums}]\n\tExpected Output: ${scenario.expectedOutput}`
            ).toBe(scenario.expectedOutput);
        });
    });
});

//---START---searchRotated
describe("searchRotated", () => {

    interface IScenario {
        nums: number[];
        target: number;
        expectedOutput: number;
    }

    const scenarios: IScenario[] = [
        { nums: [4,5,6,7,0,1,2], target: 0, expectedOutput: 4 },
        { nums: [4,5,6,7,0,1,2], target: 3, expectedOutput: -1 },
        { nums: [4,5,6,0,1,2,3], target: 5, expectedOutput: 1 },
        { nums: [4,5,6,0,1,2,3], target: 2, expectedOutput: 5 },
        { nums: [4,5,6,1,2,3], target: 5, expectedOutput: 1 },
        { nums: [1], target: 0, expectedOutput: -1 }
    ];

    it (`Should return the index of the target number.`, () => {
        scenarios.forEach(scenario => {
            expect(arrays.searchRotated(scenario.nums, scenario.target))
            .withContext(`\n\tInput: [${scenario.nums}]\n\tTarget: ${scenario.target}\n\tExpected Output: ${scenario.expectedOutput}`)
            .toBe(scenario.expectedOutput);
        })
    });
});

//---START---threeSum
describe("threeSum", () => {

    interface IScenario {
        nums: number[];
        output: number[][];
    }

    const scenarios: IScenario[] = [
        { nums: [-1,0,1,2,-1,-4], output: [[-1,-1,2],[-1,0,1]] },
        { nums: [], output: [] },
        { nums: [0], output: [] }
    ];

    it (`Should return all the triplets that add up to 0.`, () => {
        scenarios.forEach(s => {

            const res = arrays.threeSum(s.nums);

            // Check that they are both of the same length.
            expect(res.length)
            .withContext(`Output is either missing items, or has extra items.`)
            .withContext(`Output: ${res}`)
            .withContext(`Expected: ${s.output}`)
            .toBe(s.output.length);

            // Check that the correct arrays are included.
            const sortedOutputStrings = s.output.map(sub => sub.sort().toString());
            const sortedResStrings = res.map(sub => sub.sort().toString());

            sortedOutputStrings.forEach(str => {

                if (!sortedResStrings.includes(str)) {
                    fail (`The set ${str} is missing.`);
                }
            });
        });
    });
});

//---START---maxArea
describe("maxArea", () => {

    interface IScenario {
        height: number[],
        output: number
    }

    const scenarios: IScenario[] = [
        { height: [1,8,6,2,5,4,8,3,7], output: 49 },
        { height: [1,1], output: 1 },
        { height: [4,3,2,1,4], output: 16 },
        { height: [1,2,1], output: 2 }
    ];

    it(`Should return max area of water.`, () => {
        scenarios.forEach(s => {
            expect(arrays.maxArea(s.height)).toBe(s.output);            
        })
    });
});
