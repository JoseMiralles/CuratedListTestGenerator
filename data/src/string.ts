
//---START---lengthOfLongestSubstring
/**
 * Given a string s, find the length of the longest substring
 * without repeating characters.
 * 
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * 
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 * 
 * Input: s = "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1.
 * 
 * Input: s = "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3.
 * Notice that the answer must be a substring, "pwke" is a subsequence
 * and NOT a substring.
 * 
 * Input: s = ""
 * Output: 0Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
 * 
 * Constraints:
 * 0 <= s.length <= 5 * 104
 * s consists of English letters, digits, symbols and spaces.
 */
export function lengthOfLongestSubstring(s: string): number {

    const result = s.split('').reduce(getLongestSubstring, initialValue)
    return result.longestCount;
};

interface InitialValue {
    previousLetters: string,
    longestCount: number,
}

const initialValue = {
    previousLetters: '',
    longestCount: 0,
};

const getLongestSubstring = (
    { previousLetters, longestCount }: InitialValue,
    currentLetter: string,
) => {
    const repeatedIndex = previousLetters.indexOf(currentLetter);
    const currentLetters = repeatedIndex > -1
        ? previousLetters.substring(repeatedIndex + 1) + currentLetter
        : previousLetters + currentLetter;
    return {
        previousLetters: currentLetters,
        longestCount: currentLetters.length > longestCount
            ? currentLetters.length
            : longestCount,
    }
};
//---END---

//---START---characterReplacement
/**
 * You are given a string s and an integer k. You can choose any character
 * of the string and change it to any other uppercase English character.
 * You can perform this operation at most k times.
 * 
 * Return the length of the longest substring containing the same letter
 * you can get after performing the above operations.
 * 
 * https://leetcode.com/problems/minimum-window-substring/
 * 
 * Input: s = "ABAB", k = 2
 * Output: 4
 * Explanation: Replace the two 'A's with two 'B's or vice versa.
 * 
 * Input: s = "AABABBA", k = 1
 * Output: 4
 * Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
 * The substring "BBBB" has the longest repeating letters, which is 4.
 * 
 * Constraints:
 * 1 <= s.length <= 105
 * s consists of only uppercase English letters.
 * 0 <= k <= s.length
 */
export function characterReplacement(s: string, k: number): number {

    const charCounts: { [key: string]: number } = {};
    let mostFreqCharCount = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        // Increment count of newly added char
        charCounts[char] = (charCounts[char] ?? 0) + 1;
        
        // Newly added char could be most frequent
        mostFreqCharCount = Math.max(mostFreqCharCount, charCounts[char]);
        
        // If our substringLength !== mostFreqCharCount, then our substring contains
        // non-optimal chars. If we have more than k non-optimal chars, we need to
        // decrease our window by shifting the left bound.
        const substringLength = right - left + 1;
        const nonOptimalCharsCount = substringLength - mostFreqCharCount;
        if (nonOptimalCharsCount > k) {
            charCounts[s[left]]--;
            left++;
        }
    }
    
    // Because our window never shrinks, we don't need to keep track of the max substring
    // length. The max will be determined by the final state of our left bound.
    return s.length - left;
};
//---END---

//---START---minWindow
/**
 * Given two strings s and t of lengths m and n respectively, return the minimum window
 * substring of s such that every character in t (including duplicates) is included
 * in the window. If there is no such substring, return the empty string "".
 * 
 * The testcases will be generated such that the answer is unique.
 * 
 * A substring is a contiguous sequence of characters within the string.
 * 
 * https://leetcode.com/problems/minimum-window-substring/
 * 
 * Example 1:
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 * Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
 * 
 * Example 2:
 * Input: s = "a", t = "a"
 * Output: "a"
 * Explanation: The entire string s is the minimum window.
 * 
 * Example 3:
 * Input: s = "a", t = "aa"
 * Output: ""
 * Explanation: Both 'a's from t must be included in the window.
 * Since the largest window of s only has one 'a', return empty string.
 * 
 * Constraints:
 * m == s.length
 * n == t.length
 * 1 <= m, n <= 105
 * s and t consist of uppercase and lowercase English letters.
 * 
 * Follow up: Could you find an algorithm that runs in O(m + n) time?
 */
export function minWindow(s: string, t: string): string {

    if (!s || !t) return "";

    const mainCharArray = s.split("");
    const targetCount: Map<string, number> = getTargetCount(t.split(""));
    let leftPointer: number = 0;
    let completedCount: number = 0;
    const isCompleteSubstring = (count: number) => count === t.length;
    let minLength: number = Infinity;
    let minLeftIndex: number = 0;
    mainCharArray.forEach((rightChar: string, rightPointer: number) => {
      if (!targetCount.has(rightChar)) return;
  
      decrementCount(rightChar, targetCount);
      if (targetCount.get(rightChar)! >= 0) completedCount += 1;
  
      while (isCompleteSubstring(completedCount)) {
        const leftChar: string = s.charAt(leftPointer);
        const currentLength: number = rightPointer - leftPointer + 1;
        if (currentLength < minLength) {
          minLeftIndex = leftPointer;
          minLength = currentLength;
        }
        if (targetCount.has(leftChar)) {
          incrementCount(leftChar, targetCount);
          if (targetCount.get(leftChar)! > 0) completedCount -= 1;
        }
        leftPointer += 1;
      }
    });
    if (minLength === Infinity) return "";
  
    return s.substring(minLeftIndex, minLeftIndex + minLength);
};

const incrementCount = (
    character: string,
    targetCount: Map<string, number>
  ): void => {
    targetCount.set(character, targetCount.get(character)! + 1);
  };
  
  const decrementCount = (
    character: string,
    targetCount: Map<string, number>
  ): void => {
    targetCount.set(character, targetCount.get(character)! - 1);
  };
  
  const getTargetCount = (charArray: string[]): Map<string, number> => {
    const targetCount: Map<string, number> = new Map();
    charArray.forEach((char: string) => {
      const currentCount: number | undefined = targetCount.get(char);
      if (currentCount) {
        incrementCount(char, targetCount);
      } else {
        targetCount.set(char, 1);
      }
    });
    return targetCount;
  };
//---END---
