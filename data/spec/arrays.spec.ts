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
//---END---twoSum

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
//---END---maxProfit

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
//---END---containsDuplicate

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
//---END---productExceptSelf