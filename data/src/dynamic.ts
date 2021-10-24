
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
