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

//---START---spiralOrder
/**
 * Given an m x n matrix, return all elements of the matrix in spiral order.
 * 
 * https://leetcode.com/problems/spiral-matrix/
 * 
 * Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * Output: [1,2,3,6,9,8,7,4,5]
 * 
 * Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 * Output: [1,2,3,4,8,12,11,10,9,5,6,7]
 */
export function spiralOrder(matrix: number[][]): number[] {

    const flattenedOrder: number[] = [];

    let startRow: number = 0;
    let endRow: number = matrix.length - 1;
    let startCol: number = 0;
    let endCol: number = matrix[0].length - 1;
    while (startRow <= endRow && startCol <= endCol) {
      // Go Right
      for (let currCol = startCol; currCol <= endCol; currCol++) {
        flattenedOrder.push(matrix[startRow][currCol]);
      }
      // Go Down
      for (let currRow = startRow + 1; currRow <= endRow; currRow++) {
        flattenedOrder.push(matrix[currRow][endCol]);
      }
      // Go Left
      for (let currCol = endCol - 1; currCol > startCol; currCol--) {
        if (startRow === endRow) break;
        flattenedOrder.push(matrix[endRow][currCol]);
      }
      // Go Up
      for (let currRow = endRow; currRow > startRow; currRow--) {
        if (startCol === endCol) break;
        flattenedOrder.push(matrix[currRow][startCol]);
      }
      startRow++;
      endRow--;
      startCol++;
      endCol--;
    }
    return flattenedOrder;return [];return [];
};
//---END---

//---START---rotate
/**
 * You are given an n x n 2D matrix representing an image,
 * rotate the image by 90 degrees (clockwise).
 * 
 * You have to rotate the image in-place, which means you have to modify
 * the input 2D matrix directly. DO NOT allocate another 2D matrix
 * and do the rotation.
 * 
 * https://leetcode.com/problems/rotate-image/
 * 
 * Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * Output: [[7,4,1],[8,5,2],[9,6,3]]
 * 
 * Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
 * Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 * 
 * Input: matrix = [[1]]
 * Output: [[1]]
 * 
 * Input: matrix = [[1,2],[3,4]]
 * Output: [[3,1],[4,2]]
 */
export function rotate(matrix: number[][]): void {

    for(let i = 0; i < matrix.length; i ++) {
        for(let j = i + 1; j < matrix.length; j ++) {
           if(i === j) {
               continue; // It is placed in the right place.
           }
           swapValues(matrix, [i, j], [j, i]);
       }
       reverse(matrix[i]);
   }
};

function swapValues(matrix: number[][], p1: number[], p2: number[]): void {
    const aux = matrix[p1[0]][p1[1]];
    matrix[p1[0]][p1[1]] = matrix[p2[0]][p2[1]];
    matrix[p2[0]][p2[1]] = aux;
}

function reverse(array: number[]): void {
    let i = 0;
    let j = array.length - 1;
    while(i < j) {
        const aux = array[i];
        array[i] = array[j];
        array[j] = aux;
        i++;
        j--;
    }
}
//---END---
