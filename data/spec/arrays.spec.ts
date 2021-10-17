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

    
    scenarios.forEach(scenario => {
        it(`Should return ${scenario.acceptedOutputs[0]} or ${scenario.acceptedOutputs[1]} when nums: ${scenario.nums} and target: ${scenario.target}.`, () => {
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

    scenarios.forEach(scenario => {
        it(`Should return ${scenario.expectedOutput} when 'prices' = [${scenario.prices}]`, () => {
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

    scenariosTrue.forEach(scenario => {
        it("Should return true if there are any duplicates.\n" + "\tInput: " + scenario.nums, () => {
            expect(arrays.containsDuplicate(scenario.nums)).toBe(scenario.expectedOutput);
        });
    });

    scenariosFalse.forEach(scenario => {
        it("Should return false if there aren't any duplicates\n" + "\tInput: " + scenario.nums, () => {
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

    scenarios.forEach(scenario => {
        it(`Should return an array containing the correct products.\n\tInput [${scenario.nums}]\n\tExpected: [${scenario.expectedOutput}]`, () => {
            expect(arrays.productExceptSelf(scenario.nums)).toEqual(scenario.expectedOutput);
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

    scenarios.forEach(scenario => {
        it(`Should return the sum of the sub array with the largest sum.\n\tInput: [${scenario.nums}]\n\tExpected Output: ${scenario.expectedOutput}`, () => {
            expect(arrays.maxSubArray(scenario.nums)).toBe(scenario.expectedOutput);
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

    scenarios.forEach(scenario => {
        it(`Should return the product of the subarray with the largest product.\n\tInput: [${scenario.nums}]\n\tExpected Output: ${scenario.expectedOutput}`, () => {
            expect(arrays.maxProduct(scenario.nums)).toBe(scenario.expectedOutput);
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
        { nums: [2, 1], expectedOutput: 1 }
    ];

    scenarios.forEach(scenario => {

        it (`Should return the minimum value in the array. \n\tInput: [${scenario.nums}]\n\tExpected Output: ${scenario.expectedOutput}`, () => {
            expect(arrays.findMin(scenario.nums)).toBe(scenario.expectedOutput);
        });

        // Check if it is faster than the linear approach.
        if (scenario.compareToLinear) {

        }
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
        { nums: [1], target: 0, expectedOutput: -1 }
    ];

    scenarios.forEach(scenario => {
        it (`Should return the index of the target number. \n\tInput: [${scenario.nums}]\n\tTarget: ${scenario.target}\n\tExpected Output: ${scenario.expectedOutput}`, () => {
            expect(arrays.searchRotated(scenario.nums, scenario.target)).toBe(scenario.expectedOutput);
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

    scenarios.forEach(s => {
        it (`Should return all the triplets that add up to 0. \n\tInput:[${s.nums}]\n\tExpected Output:${s.output}`, () => {
            expect(arrays.threeSum(s.nums)).toEqual(s.output);
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

    scenarios.forEach(s => {
        it(`Should return max area of water. \n\tInput:[${s.height}]\n\tExpected: ${s.output}`, () => {
            expect(arrays.maxArea(s.height)).toBe(s.output);            
        })
    });
});
