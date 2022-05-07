import * as sorting from "../src/sorting";

//---START---bubbleSort
describe("bubbleSort", () => {

    interface IScenario {
        nums: number[];
        res: number[];
    }

    const scenarios: IScenario[] = [
        {nums: [4,5,7,2,3,4], res: [2,3,4,4,5,7]},
        {nums: [3,2,1], res: [1,2,3]},
        {nums: [3,1,5,2,4], res: [1,2,3,4,5]}
    ];

    it (`Should not modify the original array.`, () => {
        scenarios.forEach(scenario => {
            
            const original = Array.from(scenario.nums);
            const input = Array.from(scenario.nums);

            sorting.bubbleSort(input);

            original.forEach((n, i) => {
                expect(n).toBe(input[i]);
            });
        });
    });

    it ("Should return a sorted array.", () => {
        scenarios.forEach(s => {
            const res = sorting.bubbleSort(s.nums);
            res.forEach((n ,i) => {
                expect(n).toBe(s.res[i]);
            });
        });
    });
});
