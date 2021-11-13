//---START---getSum
/**
 * Given two integers a and b, return the sum of the
 * two integers without using the operators + and -.
 * 
 * LeetCode # 371
 * https://leetcode.com/problems/sum-of-two-integers/
 * Explanation: https://www.youtube.com/watch?v=qq64FrA2UXQ
 * 
 * Input: a = 1, b = 2
 * Output: 3
 * 
 * Hint: You need to know bitwise operations to complete this problem (AND, XOR, shift).
 * 
 * @param a First addend
 * @param b Second addend
 * @returns Sum of the two addends
 */
export function getSum(a: number, b: number): number {
    
    let sum: number, carry: number;

    while( b ){
        sum = a ^ b; // sum = a XOR b
        carry = (a & b) << 1; // carry = (a AND B) shifted once to the left.
        a = sum;
        b = carry;
    }

    return a;
};
//---END---

//---START---hammingWeight
/**
 * Write a function that takes an unsigned integer and returns the number
 * of '1' bits it has (also known as the Hamming weight).
 * 
 * Expected time complexity: O(1)
 * 
 * https://leetcode.com/problems/number-of-1-bits/
 * 
 * Input: n = 00000000000000000000000000001011 (As decimal "11")
 * Output: 3
 * Explanation: The input binary string 00000000000000000000000000001011 has
 *              a total of three '1' bits.
 * 
 * @param n A number
 * @return The amount of "1"s in n.
 */
export function hammingWeight(n: number): number {

    /**
     * This approach flips the least significant 1 bit until n = 0.
     * It also keeps count of the number of flips which would also be the number of 1s.
     * 
     * Ex: n = 1, expected output = 3.
     * 1.)  11 & 10 = 1011 & 1010 = 1010 "10"   count = 1
     * 2.)  10 & 9 = 1010 & 1001 = 1000 "8"     count = 2
     * 3.)  8 & 7 = 1000 & 0111 = 0             count = 3
     * Return count because 8 & 7 = 0.
     */
    
    let count = 0;

    while (n != 0) {
        n = n & (n - 1); 
        count ++;
    }

    return count;
};
//---END---

//---START---countBits
/**
 * Given an integer n, return an array ans of length n + 1 such that for
 * each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.
 * 
 * https://leetcode.com/problems/counting-bits/
 * 
 * Input: n = 5
 * Output: [0,1,1,2,1,2]
 * Explanation:
 * 0 --> 0
 * 1 --> 1
 * 2 --> 10
 * 3 --> 11
 * 4 --> 100
 * 5 --> 101
 * 
 * @param n 
 * @returns 
 */
export function countBits(n: number): number[] {

    const res: number[] = [];

    let num: number;
    let count: number;

    for (let i = 0; i <= n; i++) {
        
        num = i;
        count = 0;

        while (num > 0) {
            num = num & (num - 1);
            count++;
        }

        res.push(count);
    }

    return res;
};
//---END---

//---START---missingNumber
/**
 * Given an array nums containing n distinct numbers in the range [0, n],
 * return the only number in the range that is missing from the array.
 * 
 * Expected TC: O(n)
 * 
 * https://leetcode.com/problems/missing-number/
 * 
 * Input: nums = [3,0,1]
 * Output: 2
 * Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3].
 *              2 is the missing number in the range since it does not appear in nums.
 * 
 * Hint: Lookup "sum of consecutive numbers".
 * 
 * @param nums An array of numbers.
 * @returns The missing number.
 */
export function missingNumber(nums: number[]): number {

    let sum = 0;
    nums.forEach(n => sum += n);

    /**
     * Figure out what the sum of all the numbers between 0 - n should be
     * using this formula: n * (n - 1) / 2
     * n = the length of nums + 1.
     * 
     * Then subtract the sum of all the given numbers from that.
     */
    const n = nums.length + 1;
    const expectedTotal = (n * (n - 1) / 2);
    return expectedTotal - sum;
};
//---END---

//---START---reverseBits
/**
 * Reverse bits of a given 32 bits unsigned integer.
 * 
 * Leetcode # 190
 * https://leetcode.com/problems/reverse-bits/
 * 
 * Input:   43261596 (In binary: 00000010100101000001111010011100).
 * Output:  964176192 (In binary: 00111001011110000010100101000000)
 * Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned
 *              integer 43261596, so return 964176192 which its binary representation
 *              is 00111001011110000010100101000000.
 * 
 * Constraints:
 * The input must be of length 32 in binary string form.
 */
export function reverseBits(n: number): number {

    // There are many approaches, this approach uses bitwise operations only.
    
    if (n === 0) return 0;

    let result = 0;
    let lastBit;
    let reversedLastBit;

    for (let i = 0; i < 32; i++) {
        lastBit = n & 1;
        reversedLastBit = lastBit << (31 - i);
        result |= reversedLastBit;
        n >>>= 1;
    }

    // The >> is arithmetic shift right, >>> is logical shift right.
    return result >>> 0;
};
//---END---
