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
//---END---twoSum

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
//---END---maxProfit

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
//---END---containsDuplicate

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
//---END---productExceptSelf