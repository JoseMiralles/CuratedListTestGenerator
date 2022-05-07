//---START---bubbleSort
/**
 * Use bubble sort to sort the given array.
 * Do not mutate the array, return a new sorted copy.
 */
export function bubbleSort(nums: number[]): number[] {

    let res = Array.from(nums);
    let shifted = true;

    while (shifted) {

        shifted = false;

        for (let i = 0; i < nums.length - 1; i ++) {

            let current = res[i];
            let next = res[i + 1];

            if (current < next) {

                res[i] = next;
                res[i + 1] = current;

                shifted = true;
            }
        }
    }

    return res;
}