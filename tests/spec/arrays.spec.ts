import * as problems from "../src/arrays";

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

    it("should return correct output.", () => {
        scenarios.forEach(s => {
            expect(s.acceptedOutputs).toContain(
                problems.twoSum(s.nums, s.target)
            );
        })
    });
});