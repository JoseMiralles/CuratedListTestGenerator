
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
