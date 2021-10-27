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

//---START---merge
describe("merge", () => {

    interface IScenario {
        intervals: number[][];
        output: number[][];
    }

    const scenarios: IScenario[] = [
        { intervals: [[1,3],[2,6],[8,10],[15,18]], output: [[1,6],[8,10],[15,18]] },
        { intervals: [[1,4],[4,5]], output: [[1,5]] }
    ];

    scenarios.forEach(s => {
        it("Should return an array of the non-overlapping intervals that cover all the intervals in the input.", () => {
            expect(interval.merge(s.intervals)).toEqual(s.output);
        });
    });
});

//---START---eraseOverlapIntervals
describe("eraseOverlapIntervals", () => {

    interface IScenario {
        intervals: number[][];
        output: number;
    }

    const scenarios: IScenario[] = [
        { intervals: [[1,2],[2,3],[3,4],[1,3]], output: 1 },
        { intervals: [[1,2],[1,2],[1,2]], output: 2 },
        { intervals: [[1,2],[2,3]], output: 0 },
    ];

    scenarios.forEach(s => {
        it("Should return an array of the non-overlapping intervals that cover all the intervals in the input.", () => {
            expect(interval.eraseOverlapIntervals(s.intervals)).toEqual(s.output);
        });
    });
});

//---START---canAttendMeetings
describe("canAttendMeetings", () => {

    interface IScenario {
        intervals: number[][];
        output: boolean;
    }

    const scenarios: IScenario[] = [
        { intervals: [[0,30],[5,10],[15,20]], output: false },
        { intervals: [[5,8],[9,15]] , output: true },
    ];

    scenarios.forEach(s => {
        it("Should return an array of the non-overlapping intervals that cover all the intervals in the input.", () => {
            expect(interval.canAttendMeetings(s.intervals)).toEqual(s.output);
        });
    });
});
