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
 * Leetcode # 238
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
 * A subarray is a contiguous part of an array.
 * 
 * Expected TC: O(n)
 * 
 * Leetcode # 53
 * https://leetcode.com/problems/maximum-subarray/
 * 
 * Example 1:
 * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: [4,-1,2,1] has the largest sum = 6.
 * 
 * Example 2:
 * Input: nums = [1]
 * Output: 1
 * 
 * Example 3:
 * Input: nums = [5,4,-1,7,8]
 * Output: 23
 *  
 * Constraints:
 * 1 <= nums.length <= 105
 * -104 <= nums[i] <= 104
 */
 export function maxSubArray(nums: number[]): number {
    
    let max = nums[0];
    let temp = 0;

    nums.forEach(n => {

        // Reset temp if it goes under zero.
        if (temp < 0) temp = 0;

        temp += n;
        max = Math.max(max, temp);
    });

    return max;
}; 
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
 * Leetcode # 152
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
 * Constraints:
 * 1 <= nums.length <= 2 * 104
 * -10 <= nums[i] <= 10
 * The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 */
export function maxProduct(nums: number[]): number {

    // Great visual explanation: https://www.youtube.com/watch?v=lXVy6YWFcRM
    // TC = O(n)
    // SC = O(1)

    // Get the largest number in the nums.
    let res = Number.MIN_SAFE_INTEGER;
    nums.forEach(n => { res = Math.max( res, n ) });

    let curMin = 1, curMax = 1;

    for ( let i = 0; i < nums.length; i++ ){

        const n = nums[i];

        if (n === 0) {
            // Avoid multiplying by zero, instead reset to 1.
            curMin = 1, curMax = 1;
            continue; // Skip to the next iterations.
        }

        // Need to store this to compute curMin since curMax is going to be modified.
        const prevMax = curMax;

        curMax = Math.max(
            n,
            n * curMax,
            n * curMin
        );

        curMin = Math.min(
            n,
            n * prevMax,
            n * curMin
        );

        res = Math.max(res, curMax);
    }

    return res;
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
 * Leetcode # 153
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
    
    let left = 0;
    let right = nums.length - 1;
    let mid = Math.floor( right / 2 );

    while (left < right) {

        const leftItem = nums[left];
        const midItem = nums[mid];
        const rightItem = nums[right];

        if ( nums[mid] < nums[mid - 1] ) return nums[mid];
 
        if (leftItem <= midItem && midItem > rightItem) {

            // The left side is sorted, so move to the right.
            left = mid + 1;
            mid = Math.floor( left  + ((right - left) / 2) );
        } else {

            // The right side is sorted, so move to the left.
            right = mid - 1;
            mid = Math.floor( left + ((right - left) / 2) );
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
 * Leetecode # 33
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

    /**
     * The solution involves adapting binary search.
     * 
     * The "trick" is to see which side is sorted, and then seeing on which
     * side the target is.
     * 
     * If nums[left] is smaller than nums[mid], then left side is sorted.
     * Otherwise, the right side is sorted.
     * 
     * TC = O(LogN)
     * SC = O(1)
     */
    
    let left = 0;
    let right = nums.length - 1;
    let mid: number;

    while (left <= right) {

        mid = Math.floor( left + (right - left) / 2 );

        if ( nums[mid] === target ) {
            
            return mid;
        }

        if ( nums[left] <= nums[mid] ) {

            // The left side is sorted.

            // Check if the target is between left and mid.
            if (nums[left] <= target && target < nums[mid]) right = mid - 1; // Go left
            else left = mid + 1; // Go right

        } else {

            // The right side is sorted.

            // Check if the target is between mid and right.
            if (nums[mid] < target && target <= nums[right]) left = mid + 1; // Go right
            else right = mid -1; // Go right
        }
    }

    return -1;
}; 
//---END---

//---START---threeSum
/**
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
 * such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 * 
 * Notice that the solution set must not contain duplicate triplets.
 * 
 * Leetcode # 15
 * https://leetcode.com/problems/3sum/
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
 * Given n non-negative integers a1, a2, ..., an , where each represents a point at
 * coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the
 * line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis
 * forms a container, such that the container contains the most water.
 * 
 * Notice that you may not slant the container.
 * 
 * Leetcode # 11
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
 */
export function maxArea(height: number[]): number {
    
    let totalWater = 0;
    let left = 0;
    let right = height.length - 1;

    /**
     * Indexes will move inward | left >> << right
     */
    while (left < right) {

        // Find out which wall is the shortest.
        const lowestHeight = height[left] < height[right] ? height[left] : height[right];
        const floorLength = right - left; // Find out the length of the floor between the walls.

        // See if the new area is the biggest so far, and assing it if so.
        totalWater = Math.max(
            totalWater,
            lowestHeight * floorLength
        );

        // The index of the shortest wall has to move towards the center.
        if (height[left] > height[right]) right --;
        else left ++;
    }

    return totalWater;
};
//---END---
