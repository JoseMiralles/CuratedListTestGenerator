
//---START---topKFrequent
/**
 * Given an integer array nums and an integer k, return the k most frequent elements.
 * You may return the answer in any order.
 * 
 * Example 1:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 * 
 * Example 2:
 * Input: nums = [1], k = 1
 * Output: [1]
 *  
 * Constraints:
 * 1 <= nums.length <= 105
 * k is in the range [1, the number of unique elements in the array].
 * It is guaranteed that the answer is unique.
 *  
 * Follow up: Your algorithm's time complexity must be better than O(n log n),
 * where n is the array's size.
 */
export function topKFrequent(nums: number[], k: number): number[] {

    const numsToFrequencyMap: { [key: number]: number } = {};
    for (let i = 0; i < nums.length; i++) {
      const element = nums[i];
      if (numsToFrequencyMap[element] !== undefined) {
        numsToFrequencyMap[element] += 1;
      } else {
        numsToFrequencyMap[element] = 1;
      }
    }
  
    const order: [number, number][] = [];
    for (const key in numsToFrequencyMap) {
      const frequency = numsToFrequencyMap[key];
      order.push([Number(key), Number(frequency)]);
    }
  
    order.sort((a, b) => b[1] - a[1]);
  
    const result: number[] = [];
    for (let i = 0; i < k; i++) {
      const element = order[i];
      const num = element[0];
      result.push(num);
    }
    return result;
};
//---END---

//---START---MedianFinder
/**
 * The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values.
 * 
 * - For example, for arr = [2,3,4], the median is 3.
 * - For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
 * 
 * Implement the MedianFinder class and its methods:
 * "constructor() {" - initializes the MedianFinder object.
 * "addNum(num: number): void {" - adds the integer num from the data stream to the data structure.
 * "findMedian(): number {" - returns the median of all elements so far. Answers
 *                            within 10-5 of the actual answer will be accepted.
 *  
 * Leetcode # 295
 * https://leetcode.com/problems/find-median-from-data-stream/
 * 
 * Example 1:
 * Input
 * ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
 * [[], [1], [2], [], [3], []]
 * Output
 * [null, null, null, 1.5, null, 2.0]
 * Explanation
 * MedianFinder medianFinder = new MedianFinder();
 * medianFinder.addNum(1);    // arr = [1]
 * medianFinder.addNum(2);    // arr = [1, 2]
 * medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
 * medianFinder.addNum(3);    // arr[1, 2, 3]
 * medianFinder.findMedian(); // return 2.0
 *  
 * Constraints:
 * -105 <= num <= 105
 * There will be at least one element in the data structure before calling findMedian.
 * At most 5 * 104 calls will be made to addNum and findMedian.
 */
export class MedianFinder {

    ary: number[] = [];

    constructor() {

    }

    addNum(num: number): void {
        var low = 0;
        var high = this.ary.length - 1;

        while (low <= high) {
            var mid = Math.floor((high + low) / 2);

            if (this.ary[mid] < num) {
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }

        // insert at  location trick for javascript array.
        this.ary.splice(low, 0, num);
    }

    findMedian(): number {

        if (this.ary.length % 2 == 0) {
            var mid = this.ary.length / 2;
            return (this.ary[mid] + this.ary[mid - 1]) / 2;
        }
        else {
            var mid = Math.floor(this.ary.length / 2);
            return (this.ary[mid]);
        }
    }
}
//---END---