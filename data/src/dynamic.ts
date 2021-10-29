
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
//---END---

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
//---END---

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
//---END---

//---START---longestCommonSubsequence
/**
 * Given two strings text1 and text2, return the length of their longest common subsequence.
 * If there is no common subsequence, return 0.
 * 
 * A subsequence of a string is a new string generated from the original string with some
 * characters (can be none) deleted without changing the relative order of the remaining characters.
 * 
 * For example, "ace" is a subsequence of "abcde".
 * A common subsequence of two strings is a subsequence that is common to both strings.
 * 
 * https://leetcode.com/problems/longest-common-subsequence/
 * 
 * Input: text1 = "abcde", text2 = "ace" 
 * Output: 3  
 * Explanation: The longest common subsequence is "ace" and its length is 3.
 * 
 * Input: text1 = "abc", text2 = "def"
 * Output: 0
 * Explanation: There is no such common subsequence, so the result is 0.
 */
export function longestCommonSubsequence(text1: string, text2: string): number {
    
    const matrix: number[][] = Array.from(
        {length: text1.length + 1},
        (v) => Array.from({length: text2.length + 1}, (v) => 0)
    );

    for (let i = 1; i <= text1.length; i++) {
        
        for (let j = 1; j <= text2.length; j++) {

            if (text1[i - 1] === text2[j - 1]) {

                matrix[i][j] = matrix[i - 1][j - 1] + 1;
            } else {

                matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
            }
        }
    }

    return matrix[text1.length][text2.length];
};
//---END---

//---START---wordBreak
/**
 * Given a string s and a dictionary of strings wordDict, return true if s can be segmented
 * into a space-separated sequence of one or more dictionary words.
 * 
 * Note that the same word in the dictionary may be reused multiple times in the segmentation.
 * 
 * https://leetcode.com/problems/word-break/
 * 
 * Input: s = "leetcode", wordDict = ["leet","code"]
 * Output: true
 * Explanation: Return true because "leetcode" can be segmented as "leet code".
 * 
 * Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
 * Output: false
 */
export function wordBreak(s: string, wordDict: string[]): boolean {
    
    const set = new Set(wordDict);
    const dp = Array(s.length + 1).fill(false);
    dp[0] = true;

    for (let end = 1; end <= s.length; end++) {
        for (let start = 0; start < end; start++) {
            
            const w = s.slice(start, end);

            if (dp[start] === true && set.has(w)) {
                dp[end] = true;
                break;
            }
        }
    }

    return dp[s.length];
};
//---END---

//---START---combinationSum4
/**
 * Given an array of distinct integers nums and a target integer target,
 * return the number of possible combinations that add up to target.
 * 
 * The answer is guaranteed to fit in a 32-bit integer.
 * 
 * https://leetcode.com/problems/combination-sum-iv/
 * 
 * Input: nums = [1,2,3], target = 4
 * Output: 7
 * Explanation:
 * The possible combination ways are:
 * (1, 1, 1, 1)
 * (1, 1, 2)
 * (1, 2, 1)
 * (1, 3)
 * (2, 1, 1)
 * (2, 2)
 * (3, 1)
 * Note that different sequences are counted as different combinations.
 */
export function combinationSum4(nums: number[], target: number): number {

    cs4n = nums.length;
    cs4memo = new Map();
    cs4Nums = nums;
    
    return topDown(target);
}

let cs4n: number;
let cs4memo: Map<number, number>;
let cs4Nums: number[];

const topDown = (target: number): number => {

    if (target === 0) return 1;
    if (target < 0) return 0;
    const existing = cs4memo.get(target);
    if (existing) return existing;

    let count = 0;

    for (let i = 0; i < cs4n; i++) {

        const num = cs4Nums[i];
        
        if (num <= target) {
            const amountLeft = target - num;
            count += topDown(amountLeft);
        }
    }

    cs4memo.set(target, count);
    return count;
};
//---END---

//---START---rob
/**
 * You are a professional robber planning to rob houses along a street. Each house has a
 * certain amount of money stashed, the only constraint stopping you from robbing each of them
 * is that adjacent houses have security systems connected and it will automatically contact
 * the police if two adjacent houses were broken into on the same night.
 * 
 * Given an integer array nums representing the amount of money of each house,
 * return the maximum amount of money you can rob tonight without alerting the police.
 * 
 * Input: nums = [1,2,3,1]
 * Output: 4
 * Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
 * Total amount you can rob = 1 + 3 = 4.
 * 
 * Input: nums = [2,7,9,3,1]
 * Output: 12
 * Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
 * Total amount you can rob = 2 + 9 + 1 = 12.
 */
export function rob(nums: number[]): number {
    
    if (!nums.length) return 0;
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);
    
    let maxAtTwoBefore = nums[0];
    let maxAtOneBefore = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < nums.length; i++) {
        const maxAtCurrent = Math.max(nums[i] + maxAtTwoBefore, maxAtOneBefore);
        
        maxAtTwoBefore = maxAtOneBefore;
        maxAtOneBefore = maxAtCurrent;
    }
    
    return maxAtOneBefore;
};
//---END---

//---START---rob2
/**
 * You are a professional robber planning to rob houses along a street. Each house has a certain
 * amount of money stashed. All houses at this place are arranged in a circle. That means the first
 * house is the neighbor of the last one. Meanwhile, adjacent houses have a security system
 * connected, and it will automatically contact the police if two adjacent houses were broken into
 * on the same night.
 * 
 * Given an integer array nums representing the amount of money of each house, return the maximum
 * amount of money you can rob tonight without alerting the police.
 * 
 * https://leetcode.com/problems/house-robber-ii/
 * 
 * Input: nums = [2,3,2]
 * Output: 3
 * Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2),
 * because they are adjacent houses.
 * 
 * Input: nums = [1,2,3,1]
 * Output: 4
 * Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
 * Total amount you can rob = 1 + 3 = 4.
 */
export function rob2(nums: number[]): number {

    if(nums.length === 0) return 0;
    if(nums.length === 1) return nums[0];
    
    return Math.max(
        rob_impl(nums, 0, nums.length - 2), 
        rob_impl(nums, 1, nums.length - 1)
    );
};

function rob_impl(nums: number[], start: number, end: number){
    let include = 0;
    let exclude = 0;
    
    for(let j = start; j <= end; j++){
        let i = include;
        let e = exclude;
        include = e + nums[j]
        exclude = Math.max(e, i);
    }
    
   return Math.max(include, exclude);
}
//---END---

//---START---numDecodings
/**
 * A message containing letters from A-Z can be encoded into numbers using the following mapping:
 * 'A' -> "1"
 * 'B' -> "2"
 * ...
 * 'Z' -> "26"
 * 
 * To decode an encoded message, all the digits must be grouped then mapped back into letters
 * using the reverse of the mapping above (there may be multiple ways).
 * For example, "11106" can be mapped into:
 * "AAJF" with the grouping (1 1 10 6)
 * "KJF" with the grouping (11 10 6)
 * 
 * Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6"
 * is different from "06".
 * 
 * Given a string s containing only digits, return the number of ways to decode it.
 * 
 * The answer is guaranteed to fit in a 32-bit integer.
 * 
 * https://leetcode.com/problems/decode-ways/
 * 
 * Input: s = "12"
 * Output: 2
 * Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
 * 
 * Input: s = "06"
 * Output: 0
 * Explanation: "06" cannot be mapped to "F" because of the leading
 * zero ("6" is different from "06").
 */
export function numDecodings(s: string): number {

    if (s.length === 0) return 0;

    const N = s.length;
    const dp = Array(N+1).fill(0);
  
    dp[0] = 1;
    dp[1] = s[0] === '0' ? 0 : 1;
  
    for (let i = 2; i <= N; i++) {
      if (s[i-1] !== '0') {
        dp[i] += dp[i-1];
      }
      if (s[i-2] === '1' || s[i-2] === '2' && s[i-1] <= '6') {
        dp[i] += dp[i-2];
      }
    }
  
    return dp[N];
};
//---END---

//---START---uniquePaths
/**
 * NOTE: See the instructions on leetcode.
 * 
 * A robot is located at the top-left corner of a {m * n} grid (marked 'Start' in the diagram below).
 * 
 * The robot can only move either down or right at any point in time. The robot is trying to reach
 * the bottom-right corner of the grid (marked 'Finish' in the diagram below).
 * 
 * How many possible unique paths are there?
 * 
 * https://leetcode.com/problems/unique-paths/
 */
export function uniquePaths(m: number, n: number): number {

    let currentRow = new Array(n);
    // Assigning a 1 to matrix[0][0] is simply a shortcut that skips some later computation
    // as matrix[i][0] will never change in this iterative process
    for (let i = 0; i < n; i++) {
        currentRow[i] = 1;
    }
    for (let row = 1; row < m; row++) {
        for (let i = 1; i < n; i++) {
            currentRow[i] += currentRow[i - 1];
        }
    }
    return currentRow[n - 1];
};
//---END---

//---START---canJump
/**
 * You are given an integer array nums. You are initially positioned at the array's first index,
 * and each element in the array represents your maximum jump length at that position.
 * 
 * Return true if you can reach the last index, or false otherwise.
 * 
 * Input: nums = [2,3,1,1,4]
 * Output: true
 * Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
 * 
 * Input: nums = [3,2,1,0,4]
 * Output: false
 * Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0,
 * which makes it impossible to reach the last index.
 */
export function canJump(nums: number[]): boolean {

    let idx = 0;
    let max = 0;
    let target = nums.length - 1;
  
    while(idx < nums.length) {
      max = Math.max(max, idx + nums[idx]);
      
      if (max >= target) {
        return true;
      }
      
      if (max <= idx && nums[idx] === 0) {
        return false;
      }
      
      idx++;
    }
    
    return false;
};
//---END---
