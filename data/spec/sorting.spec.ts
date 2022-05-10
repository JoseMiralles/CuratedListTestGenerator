import * as sorting from "../src/sorting";

//---START---bubbleSort
describe("bubbleSort", () => {

    interface IScenario {
        nums: number[];
    }

    const scenarios: IScenario[] = [
        {nums: [4,5,7,2,3,4]},
        {nums: [3,2,1]},
        {nums: [3,1,5,2,4]}
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
            const expected = s.nums.sort((a, b) => a - b);

            for (let i = 0; i < res.length; i ++) {

                const n = res[i];

                if (n !== expected[i]) {
                    fail(`\nExpected result: ${expected}\nActual Result: ${res}`);
                    break;
                }
            };
        });
    });
});

//---START---insertionSort
fdescribe("insertionSort", () => {

    interface IScenario {
        nums: number[];
    }

    const scenarios: IScenario [] = [
        {nums: [4,76,2,31,56,3]},
        {nums: [34,8,5,21,46,56,8]},
        {nums: [3,7,1,5,8,9,3,4,6,7,2,1]},
        {nums: [7,9,2,1,3,5,0,8,0,7,4,-5]}
    ];

    it ("Should sort the given array.", () => {
        scenarios.forEach(s => {

            const expected = Array.from(s.nums).sort((a, b) => a - b);
            sorting.insertionSort(s.nums);

            for (let i = 0; i < expected.length; i ++) {
                if (s.nums[i] !== expected[i]) {
                    fail(`\nExpected result: ${expected}\nActual result: ${s.nums}`);
                    break;
                }
            }
        });
    });
});
