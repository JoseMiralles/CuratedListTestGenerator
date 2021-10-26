import * as interval from "../src/interval";

//---START---insert
describe("insert", () => {

    interface IScenario {
        intervals: number[][];
        newInterval: number[];
        output: number[][];
    }

    const scenarios: IScenario[] = [
        { intervals: [[1,3],[6,9]], newInterval: [2,5], output: [[1,5],[6,9]] },
        { 
            intervals: [[1,2],[3,5],[6,7],[8,10],[12,16]],
            newInterval: [4,8],
            output: [[1,2],[3,10],[12,16]]
        },
        { intervals: [], newInterval: [5,7], output: [[5,7]] },
        { intervals: [[1,5]], newInterval: [2,3], output: [[1,5]] },
        { intervals: [[1,5]], newInterval: [2,7], output: [[1,7]] }
    ];

    scenarios.forEach(s => {
        it("Should return the intervals after the insertion.", () => {
            expect(interval.insert(s.intervals, s.newInterval)).toEqual(s.output);
        });
    });
});