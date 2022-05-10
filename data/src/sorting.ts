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

            if (current > next) {

                res[i] = next;
                res[i + 1] = current;

                shifted = true;
            }
        }
    }

    return res;
}
//---END---

//---START---insertionSort
/**
 * Sort the array using insertion sort.
 * Mutate the array.
 */
export function insertionSort(nums: number[]): void {

    for (let i = 1; i < nums.length; i++) {

        let j = i;
        while (j >= 0 && nums[j] < nums[j - 1]) {
            const temp = nums[j];
            nums[j] = nums[j-1];
            nums[j-1] = temp;
            j--;
        }
    }
}
//---END---
