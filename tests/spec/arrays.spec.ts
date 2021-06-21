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
        {prices: [7,1,5,3,6,4], expectedOutput: 5}
    ];

    it("Should return 0 if profit cannot be acheived.", () => {
        expect(arrays.maxProfit([7,6,4,3,1])).toEqual(0);
    });

    scenarios.forEach(scenario => {
        it(`Should return ${scenario.expectedOutput} when 'prices' = [${scenario.prices}]`, () => {
            expect(arrays.maxProfit(scenario.prices)).toEqual(scenario.expectedOutput);
        });
    });

});
//---END---maxProfit