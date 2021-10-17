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
