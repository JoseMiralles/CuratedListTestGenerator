//---START---setZeroes
/**
 * Given an m x n integer matrix matrix, if an element is 0, set its entire
 * row and column to 0's, and return the matrix.
 * 
 * You must do it in place.
 * 
 * https://leetcode.com/problems/set-matrix-zeroes/
 * 
 * Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
 * Output: [[1,0,1],[0,0,0],[1,0,1]]
 * 
 * Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
 * Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 */
export function setZeroes(matrix: number[][]): void {

    let m = matrix.length;
    let n = m ? matrix[0].length : 0;
    if (!m || !n) return;
    let row0is0 = false;
    let col0is0 = false;
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            col0is0 = true;
            break;
        }
    }
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) {
            row0is0 = true;
            break;
        }
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    for (let i = 1; i < m; i++) {
        if (matrix[i][0] === 0) {
            for (let j = 0; j < n; j++) {
                matrix[i][j] = 0;
            }
        }
    }
    for (let j = 1; j < n; j++) {
        if (matrix[0][j] === 0) {
            for (let i = 0; i < m; i++) {
                matrix[i][j] = 0;
            }
        }
    }
    if (row0is0) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }
    if (col0is0) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }
};
//---END---
