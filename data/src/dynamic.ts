
//---START---climbStairs
/**
 * You are climbing a staircase. It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 * 
 * Expected TC: O(n)
 * 
 * https://leetcode.com/problems/climbing-stairs/
 * 
 * Input: n = 2
 * Output: 2
 * Explanation: There are two ways to climb to the top.
 *      1. 1 step + 1 step
 *      2. 2 steps
 * 
 * Input: n = 3
 * Output: 3
 * Explanation: There are three ways to climb to the top.
 *      1. 1 step + 1 step + 1 step
 *      2. 1 step + 2 steps
 *      3. 2 steps + 1 step
 * 
 * Constraints: 1 <= n <= 45
 */
export function climbStairs(n: number): number {

    const dp: number[] = [1,1];

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
};

//---START---coinChange
/**
 * You are given an integer array coins representing coins of different denominations
 * and an integer amount representing a total amount of money.
 * 
 * Return the fewest number of coins that you need to make up that amount.
 * If that amount of money cannot be made up by any combination of the coins, return -1.
 * 
 * You may assume that you have an infinite number of each kind of coin.
 * 
 * Expected TC: O(N*K)      N = Amount, K = size of coins array
 * Space SC: O(N)           N = Amount
 * 
 * https://leetcode.com/problems/coin-change/
 * 
 * Input: coins = [1,2,5], amount = 11
 * Output: 3
 * Explanation: 11 = 5 + 5 + 1
 * 
 * Input: coins = [2], amount = 3
 * Output: -1
 * 
 * Constraints:
 * 1 <= coins.length <= 12
 * 1 <= coins[i] <= 231 - 1
 * 0 <= amount <= 104
 * 
 * @param coins An array containing the types of coins that can be used.
 * @param amount The amount of change requred.
 * @returns The fewest number of coins needed to make up the amount, or -1 if not possible.
 */
export function coinChange(coins: number[], amount: number): number {

    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        coins.forEach(coin => {
            if (i - coin >= 0) {
                dp[i] = Math.min(
                    dp[i],
                    dp[i - coin] + 1
                );
            }
        });
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}

//---START---lengthOfLIS
/**
 * Given an integer array nums, return the length of the longest strictly increasing subsequence.
 * 
 * A subsequence is a sequence that can be derived from an array by deleting some or
 * no elements without changing the order of the remaining elements.
 * For example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].
 * 
 * Expected TC: O(n log(n))
 * 
 * https://leetcode.com/problems/longest-increasing-subsequence/
 * 
 * Input: nums = [10,9,2,5,3,7,101,18]
 * Output: 4
 * Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
 * 
 * Input: nums = [7,7,7,7,7,7,7]
 * Output: 1
 */
export function lengthOfLIS(nums: number[]): number {
    
    let sequence: number[] = [nums[0]];

    nums.forEach((num) => {
        
        if (num > sequence[sequence.length - 1]) sequence.push(num);
        else {
            const nextBiggerNumIndex = sequence.findIndex(val => val >= num);
            sequence[nextBiggerNumIndex] = num;
        }
    });

    return sequence.length;
};
