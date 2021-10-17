//---START---getSum
/**
 *  This is a test.
 * @param a 
 * @param b 
 * @returns 
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