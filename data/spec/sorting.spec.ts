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
            const expected = s.nums.sort();

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
