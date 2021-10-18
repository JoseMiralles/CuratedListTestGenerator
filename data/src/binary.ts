//---START---getSum
/**
 * Given two integers a and b, return the sum of the
 * two integers without using the operators + and -.
 * 
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

// O( n )
