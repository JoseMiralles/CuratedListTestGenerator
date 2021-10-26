//---START---insert
/**
 * You are given an array of non-overlapping intervals intervals where
 * intervals[i] = [starti, endi] represent the start and the end of the ith interval and
 * intervals is sorted in ascending order by starti. You are also given an
 * interval newInterval = [start, end] that represents the start and end of another interval.
 * 
 * Insert newInterval into intervals such that intervals is still sorted in ascending order by
 * starti and intervals still does not have any overlapping intervals (merge overlapping intervals
 * if necessary).
 * 
 * Return intervals after the insertion.
 * 
 * https://leetcode.com/problems/insert-interval/
 * 
 * Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
 * Output: [[1,5],[6,9]]
 * 
 * Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
 * Output: [[1,2],[3,10],[12,16]]
 * Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
 */
export function insert(intervals: number[][], newInterval: number[]): number[][] {

    let i = 0;
    while (i < intervals.length) {
        const [a, b] = intervals[i];
        const [c, d] = newInterval;

        if (
            (a >= c && a <= d) ||
            (b >= c && b <= d) ||
            (c >= a && c <= b) ||
            (d >= a && d <= b)
        ) {
            newInterval = mergeIntervals(intervals[i], newInterval);
            intervals.splice(i, 1);
        } else {
            i++;
        }
    }

    intervals.push(newInterval);
    intervals.sort((a, b) => a[0] - b[0]);

    return intervals;
};

const mergeIntervals = (int1: number[], int2: number[]) => [
    Math.min(int1[0], int2[0]),
    Math.max(int1[1], int2[1]),
];
