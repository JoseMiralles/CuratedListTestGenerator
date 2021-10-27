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

//---START---merge
/**
 * Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping
 * intervals, and return an array of the non-overlapping intervals that cover all the
 * intervals in the input.
 * 
 * Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
 * Output: [[1,6],[8,10],[15,18]]
 * Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
 * 
 * Input: intervals = [[1,4],[4,5]]
 * Output: [[1,5]]
 * Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 */
export function merge(intervals: number[][]): number[][] {

    intervals.sort(([a], [c]) => a - c);

    let i = 1;
  
    while (i < intervals.length) {
      const [a, b] = intervals[i - 1];
      const [c, d] = intervals[i];
  
      if (b >= c) intervals.splice(i - 1, 2, [a, Math.max(b, d)]);
      else i++;
    }
  
    return intervals;
};

//---START---eraseOverlapIntervals
/**
 * Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum
 * number of intervals you need to remove to make the rest of the intervals non-overlapping.
 * 
 * https://leetcode.com/problems/non-overlapping-intervals/
 * 
 * Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
 * Output: 1
 * Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
 * 
 * Input: intervals = [[1,2],[2,3]]
 * Output: 0
 * Explanation: You don't need to remove any of the intervals since
 *              they're already non-overlapping.
 */
export function eraseOverlapIntervals(intervals: number[][]): number {

    if (intervals.length < 2) return 0;
    intervals.sort(([, a], [, b]) => a - b);
    let count = 0;
    let pervEnd = intervals[0][1];
  
    for (let i = 1; i < intervals.length; i++) {
      if (pervEnd > intervals[i][0]) count++;
      else pervEnd = intervals[i][1];
    }
    return count;
};

//---START---canAttendMeetings
/**
 * Given an array of meeting time intervals consisting of start and end times
 * [[s1,e1],[s2,e2],...] (si < ei), determine if a person could attend all meetings.
 * 
 * (0,8),(8,10) is not conflict at 8
 * 
 * Leetcode #   252
 * (Premium)    https://leetcode.com/problems/meeting-rooms/
 * (Free)       https://www.lintcode.com/problem/920/
 * 
 * Input: intervals = [(0,30),(5,10),(15,20)]
 * Output: false
 * Explanation: 
 * (0,30), (5,10) and (0,30),(15,20) will conflict
 * 
 * Input: intervals = [(5,8),(9,15)]
 * Output: true
 * Explanation: 
 * Two times will not conflict 
 */
export function canAttendMeetings(intervals: number[][]): boolean {

    if (intervals.length < 2) return true;
    
    intervals.sort((a, b) => a[0] - b[0]);

    let end = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        if (end > intervals[i][0]) return false;
        if (end < intervals[i][1]) end = intervals[i][1];
    }

    return true;
}

//---START---minMeetingRooms
/**
 * Given an array of meeting time intervals consisting of start and end
 * times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of
 * conference rooms required.
 * 
 * Leetcode #   253
 * (Premium)    https://leetcode.com/problems/meeting-rooms-ii/
 * (Free)       https://www.lintcode.com/problem/919/
 * 
 * Input: intervals = [(0,30),(5,10),(15,20)]
 * Output: 2
 * Explanation:
 * We need two meeting rooms
 * room1: (0,30)
 * room2: (5,10),(15,20)
 * 
 * Input: intervals = [(2,7)]
 * Output: 1
 * Explanation: 
 * Only need one meeting room
 */
 export function minMeetingRooms(intervals: number[][]): number {
     
    if (intervals.length < 2) return intervals.length;

    intervals.sort((a,b) => a[0] - b[0]);

    let roomTime = [intervals[0][1]];

    for (let i = 1; i < intervals.length; i++) {

        let [start, end] = intervals[i];
        let earliest = Math.min(...roomTime);

        if (start > earliest) {
            roomTime.push(end);
        } else {
            roomTime[roomTime.indexOf(earliest)] = end;
        }
    }

    return roomTime.length;
}
