//---START---getSum
/**
 * Given two integers a and b, return the sum of the
 * two integers without using the operators + and -.
 * 
 * https://leetcode.com/problems/sum-of-two-integers/
 * 
 * Input: a = 1, b = 2
 * Output: 3
 * 
 * @param a First addend
 * @param b Second addend
 * @returns Sum of the two addends
 */
export function getSum(a: number, b: number): number {
    
    let diff: number, carry: number;

    while( b ){
        diff = a ^ b;
        carry = (a&b) << 1;
        a = diff;
        b = carry;
    }

    return a;
};
