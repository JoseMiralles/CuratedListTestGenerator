/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * You can return the answer in any order.
 * Expected TC: O(n)
 * 
 * Example:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Output: Because nums[0] + nums[1] == 9, we return [0, 1].
 * 
 * https://leetcode.com/problems/two-sum/
 * 
 * @param nums Array of numbers
 * @param target Target number
 * @returns Indeces of two numbers in "nums" which add up to target.
 */
export function twoSum(nums: number[], target: number): number[] {

    // An object "{[indexer: number]: number}" could also be used.
    const map = new Map<number, number>();

    let diff: number;
    for (let i = 0; i < nums.length; i++) {
        diff = target - nums[i];
        if (map.has(diff)) {
            const diffIndex = map.get(diff);
            if (diffIndex || diffIndex === 0) return [diffIndex, i];
        }
        map.set(nums[i], i);
    };

    return [];
};