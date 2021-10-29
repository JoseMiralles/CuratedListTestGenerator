//---START---twoSum
/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * You can return the answer in any order.
 * 
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
//---END---

//---START---maxProfit
/**
 * You are given an array prices where prices[i] is the price of a given stock
 * on the i'th day.
 * 
 * You want to maximize your profit by choosing a single day to buy one stock and
 * choosing a different day in the future to sell that stock.
 * 
 * Return the maximum profit you can achieve from this transaction.
 * If you cannot achieve any profit, return 0.
 * 
 * Expected TC: O(n)
 * 
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 * 
 * @param prices An array of prices.
 * @returns The maximum profit acheivablem or 0 if profits are possible.
 */
export function maxProfit (prices: number[]): number {
    
    let biggestMargin = 0;
    let low = prices[0];

    prices.forEach((price: number, index: number) => {
        if ((price - low) > biggestMargin) biggestMargin = price - low;
        if (low > price) low = price;
    });

    return biggestMargin;
}
//---END---

//---START---containsDuplicate
/**
 * Given an integer array nums, return true if any value appears at least twice
 * in the array, and return false if every element is distinct.
 * 
 * Expected TC: O(n)
 * 
 * https://leetcode.com/problems/contains-duplicate/
 * 
 * @param nums An array containing numbers.
 * @returns True if the array contains a duplicate value, false if it doesn't.
 */
export function containsDuplicate(nums: number[]): boolean {
    
    const set = new Set<number>();

    let current: number;
    for (let i = 0; i < nums.length; i++) {
        current = nums[i];
        if (set.has(current)) return true;
        set.add(current);
    }

    return false;
}
//---END---

//---START---productExceptSelf
/**
 * Given an integer array nums, return an array answer such that answer[i]
 * is equal to the product of all the elements of nums except nums[i].
 * 
 * The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 * 
 * Expected TC: O(n)
 * Do not use the division operator.
 * 
 * https://leetcode.com/problems/product-of-array-except-self/
 * 
 * @param nums An array of numbers.
 * @returns An array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
 */
export function productExceptSelf(nums: number[]): number[]{
    
    const res: number[] = new Array(nums.length);
    res[0] = 1;
    
    for (let i = 1; i < nums.length; i++) {
        res[i] = res[i - 1] * nums[i - 1];
    }

    let right = 1;
    for (let i = nums.length - 1; i >= 0; i--){
        res[i] = res[i] * right;
        if (res[i] === -0) res[i] = 0;
        right *= nums[i];
    }

    return res;
}
//---END---

//---START---maxSubArray
/**
 * Given an integer array nums, find the contiguous subarray
 * (containing at least one number) which has the largest sum and return its sum.
 * 
 * Expected TC: O(n)
 * 
 * https://leetcode.com/problems/maximum-subarray/
 * 
 * @param nums An array of numbers.
 * @returns Sum of the contiguous sub-array with the largest sum.
 */
export function maxSubArray(nums: number[]): number {
    let maxSum = nums[0];
    let maxTemp = nums[0];

    for (let i = 1; i < nums.length; i++) {
        maxTemp = Math.max(maxTemp + nums[i], nums[i]);
        maxSum = Math.max(maxSum, maxTemp);
    }

    return maxSum;
}
//---END---

//---START---maxProduct
/**
 * Given an integer array nums, find a contiguous non-empty subarray within the array that
 * has the largest product, and return the product.
 * 
 * It is guaranteed that the answer will fit in a 32-bit integer.
 * 
 * A subarray is a contiguous subsequence of the array.
 * 
 * Expected TC: O(n)
 * 
 * https://leetcode.com/problems/maximum-product-subarray/
 * 
 * Input: nums = [2,3,-2,4]
 * Output: 6
 * Explanation: [2,3] has the largest product 6.
 * 
 * Input: nums = [-2,0,-1]
 * Output: 0
 * Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
 * 
 * @param nums An array of numbers.
 * @returns The product of the contiguous non-empty subarray with the largest product.
 */
export function maxProduct(nums: number[]): number {

    let result = nums[0];
    let imax = result;
    let imin = result;
    for (let i = 1; i < nums.length; i++) {

        /**
         * Swap imax and imin if this is a negative number.
         */
        if (nums[i] < 0) {
            const temp = imax;
            imax = imin;
            imin = temp;
        }

        imax = Math.max(nums[i], imax * nums[i]);
        imin = Math.min(nums[i], imin * nums[i]);

        result = Math.max(result, imax);
    }

    return result;
}
//---END---

//---START---findMin
/**
 * Suppose an array of length n sorted in ascending order is rotated between
 * 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:
 * 
 * [4,5,6,7,0,1,2] if it was rotated 4 times.
 * [0,1,2,4,5,6,7] if it was rotated 7 times.
 * 
 * Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]]
 * 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].
 * 
 * Given the sorted rotated array nums of unique elements,
 * return the minimum element of this array.
 * 
 * You must write an algorithm that runs in O(log n) time.
 * 
 * https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
 * 
 * Input: nums = [3,4,5,1,2]
 * Output: 1
 * Explanation: The original array was [1,2,3,4,5] rotated 3 times.
 * 
 * Input: nums = [11,13,15,17]
 * Output: 11
 * Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 
 * 
 * @param nums A rotated array of sorted numbers.
 * @returns The minimum value in the array.
 */
export function findMin(nums: number[]): number {

    // Edge cases.
    if (nums.length == 0) return -1;
    if (nums.length == 1) return nums[0];

    let left = 0;
    let right = nums.length - 1;
    let midPoint: number;

    while (left < right) {

        midPoint = Math.floor(left + (right - left) / 2);

        // If the midpoint is smaller than the previous element, then it is the minimum.
        if (midPoint > 0 && nums[midPoint] < nums[midPoint - 1]) {
            return nums[midPoint];

        // Else, check if the first element is smaller than the middle element.
        // This would mean that the left side is sorted, and that the min is on the right side
        // which is unsorted.
        } else if (nums[left] <= nums[midPoint] && nums[midPoint] > nums[right]) {
            left = midPoint + 1; // "Discard" the left side.
        } else {
            right = midPoint - 1; // "Discard" the right side.
        }
    }

    return nums[left];
}
//---END---

//---START---searchRotated
/**
 * There is an integer array nums sorted in ascending order (with distinct values).
 * 
 * Prior to being passed to your function, nums is possibly rotated at an unknown
 * pivot index k (1 <= k < nums.length) such that the resulting array
 * is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed).
 * For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
 * 
 * Given the array nums after the possible rotation and an integer target,
 * return the index of target if it is in nums, or -1 if it is not in nums.
 * 
 * You must write an algorithm with O(log n) runtime complexity.
 * 
 * https://leetcode.com/problems/search-in-rotated-sorted-array/
 * 
 * Input: nums = [4,5,6,7,0,1,2], target = 0
 * Output: 4
 * 
 * Input: nums = [4,5,6,7,0,1,2], target = 3
 * Output: -1
 * 
 * Input: nums = [1], target = 0
 * Output: -1
 * 
 * @param nums A sorted and rotated array of numbers.
 * @param target The target to be found.
 * @returns The index of the target, or -1 if not found.
 */
export function searchRotated(nums: number[], target: number): number {
    
    let left = 0;
    let right = nums.length - 1;
    let middle: number;

    while (left < right) {

        middle = Math.floor((left + right) / 2);
        if (nums[middle] === target) return middle;

        // Check if the LEFT SIDE IS SORTED.
        if (nums[left] <= nums[middle]) {

            // Check if target is on the left side.
            if (target >= nums[left] && target < nums[middle]) {
                right = middle - 1;
            } else {
                // Go to the right, it's definetly not on the left.
                left = middle + 1;
            }

        // The left side is not sorted, which means that the RIGHT SIDE IS SORTED.
        } else {

            // Check if the element is to the right.
            if (target > nums[middle] && target <= nums[right]) {
                left = middle + 1;
            } else {
                // Go to the left, its definetly not on the right.
                right = middle - 1;
            }

        }
    }

    // LEFT might still be the element
    return nums[left] === target ? left : -1;
};
//---END---

//---START---threeSum
/**
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
 * such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 * 
 * Notice that the solution set must not contain duplicate triplets.
 * 
 * Input: nums = [-1,0,1,2,-1,-4]
 * Output: [[-1,-1,2],[-1,0,1]]
 * 
 * Input: nums = []
 * Output: []
 * 
 * Input: nums = [0]
 * Output: []
 * 
 * @param nums An array of numbers.
 * @returns An array of multiple triplets that add up to 0.
 */
export function threeSum(nums: number[]): number[][] {
    const results: number[][] = [];

    // Need at least three numbers.
    if (nums.length < 3) return results;

    // Sort in assending order, this is a O(NLog N) operation.
    nums = nums.sort((a, b) => a - b);

    let middle: number, right: number;
    for (let left = 0; left < nums.length - 2; left++) {
        
        // Only positive numbers are left at this point, so break.
        // Can't get 0 from positive numbers.
        if (nums[left] > 0) break;

        // Skip to the next iteration if this is a repeated number.
        if (left > 0 && nums[left] === nums[left - 1]) continue;

        middle = left + 1;
        right = nums.length - 1;

        while (middle < right) {
            let sum = nums[left] + nums[middle] + nums[right];

            if (sum === 0) {
                results.push([nums[left], nums[middle], nums[right]]);
                
                // Again, avoid duplicated values for the middle, and the right side.
                while (nums[middle] === nums[middle + 1]) middle++;
                while (nums[right] === nums[right - 1]) right--;

                middle++;
                right--;

            // If the sum is lower than 0, then increment middle to get closer to the target.
            } else if (sum < 0) {
                middle++;

            // If the sum is larger than 0, decrement right.
            } else {
                right--;
            }
        }

    }

    return results;
};
//---END---

//---START---maxArea
/**
 * 
 * Given n non-negative integers a1, a2, ..., an , where each represents a point at
 * coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the
 * line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis
 * forms a container, such that the container contains the most water.
 * 
 * Notice that you may not slant the container.
 * 
 * View on leetcode for image.
 * https://leetcode.com/problems/container-with-most-water/
 * 
 * Input: height = [1,8,6,2,5,4,8,3,7]
 * Output: 49
 * Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].
 * In this case, the max area of water (blue section) the container can contain is 49.
 * 
 * Input: height = [1,1]
 * Output: 1
 * 
 * Input: height = [4,3,2,1,4]
 * Output: 16
 * 
 * Input: height = [1,2,1]
 * Output: 2
 * 
 * @param height 
 * @returns 
 */
export function maxArea(height: number[]): number {
    let left = 0, right = height.length - 1;
    let max = Number.MIN_SAFE_INTEGER;
    let width: number;
    let shortest: number;

    while (left < right) {
        width = right - left;
        shortest = height[left] < height[right] ? height[left] : height[right];

        if (max < (width * shortest)) max = width * shortest;

        height[left] < height[right] ? left++ : right--;
    }

    return max;
};
//---END---
