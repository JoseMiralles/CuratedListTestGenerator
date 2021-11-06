
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

//---START---isAnagram
/**
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 * 
 * Leetcode # 242
 * https://leetcode.com/problems/valid-anagram/
 * 
 * Example 1:
 * Input: s = "anagram", t = "nagaram"
 * Output: true
 * 
 * Example 2:
 * Input: s = "rat", t = "car"
 * Output: false
 * 
 * Constraints:
 * 1 <= s.length, t.length <= 5 * 104
 * s and t consist of lowercase English letters.
 * 
 * Follow up: What if the inputs contain Unicode characters? How would you adapt your
 * solution to such a case?
 */
export function isAnagram(s: string, t: string): boolean {

    // This solution is not ideal at all.
    return [...s].sort().join('') === [...t].sort().join('');
};
//---END---

//---START---groupAnagrams
/**
 * Given an array of strings strs, group the anagrams together. You can return the answer
 * in any order.
 * 
 * An Anagram is a word or phrase formed by rearranging the letters of a different
 * word or phrase, typically using all the original letters exactly once.
 * 
 * Leetcode # 49
 * https://leetcode.com/problems/group-anagrams/
 * 
 * Example 1:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 
 * Example 2:
 * Input: strs = [""]
 * Output: [[""]]
 * 
 * Example 3:
 * Input: strs = ["a"]
 * Output: [["a"]]
 * 
 * Constraints:
 * 1 <= strs.length <= 104
 * 0 <= strs[i].length <= 100
 * strs[i] consists of lowercase English letters.
 */
export function groupAnagrams(strs: string[]): string[][] {

    const anagramGroups = new Map<string, string[]>();
    strs.forEach((word) => {
      const sortedWordKey: string = word.split("").sort().toString();
      if (!anagramGroups.has(sortedWordKey)) {
        anagramGroups.set(sortedWordKey, [word]);
        return;
      }
      anagramGroups.set(
        sortedWordKey,
        anagramGroups.get(sortedWordKey)!.concat([word])
      );
    });
    return [...anagramGroups.values()];
};
//---END---

//---START---isValid
/**
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 * 
 * An input string is valid if:
 * 
 * Open brackets must be closed by the same type of brackets.
 * Open brackets must be closed in the correct order.
 * 
 * Leetcode # 20
 * https://leetcode.com/problems/valid-parentheses/
 * 
 * Example 1:
 * Input: s = "()"
 * Output: true
 * 
 * Example 2:
 * Input: s = "()[]{}"
 * Output: true
 * 
 * Example 3:
 * Input: s = "(]"
 * Output: false
 * 
 * Example 4:
 * Input: s = "([)]"
 * Output: false
 * 
 * Example 5:
 * Input: s = "{[]}"
 * Output: true
 * 
 * Constraints:
 * 1 <= s.length <= 104
 * s consists of parentheses only '()[]{}'.
 */
export function isValid(s: string): boolean {
    
    const hash: { [key: string]: string } = {
        '(': ')',
        '{': '}',
        '[': ']',
      };
    
      const stack: string[] = [];
    
      for (const char of s) {
        if (char in hash) stack.push(char);
        else {
          const top = stack.pop();
          if (top === undefined || hash[top] !== char) {
            return false;
          }
        }
      }
    
      return !stack.length;
};
//---END---

//---START---isPalindrome
/**
 * A phrase is a palindrome if, after converting all uppercase letters into
 * lowercase letters and removing all non-alphanumeric characters, it
 * reads the same forward and backward. Alphanumeric characters include
 * letters and numbers.
 * 
 * Given a string s, return true if it is a palindrome, or false otherwise
 * 
 * Leetcode # 125:
 * https://leetcode.com/problems/valid-palindrome/
 * 
 * Example 1:
 * Input: s = "A man, a plan, a canal: Panama"
 * Output: true
 * Explanation: "amanaplanacanalpanama" is a palindrome.
 * 
 * Example 2:
 * Input: s = "race a car"
 * Output: false
 * Explanation: "raceacar" is not a palindrome.
 * 
 * Example 3:
 * Input: s = " "
 * Output: true
 * Explanation: s is an empty string "" after removing non-alphanumeric characters.
 * Since an empty string reads the same forward and backward, it is a palindrome.
 * 
 * Constraints:
 * 
 * 1 <= s.length <= 2 * 105
 * s consists only of printable ASCII characters.
 */
export function isPalindrome(s: string): boolean {
    
  let left = 0;
  let right = s.length - 1;

  // Two indices are going to move towards the center | left >> << right
  while (left < right) {

      const leftChar = s[left].toLowerCase();
      const rightChar = s[right].toLowerCase();

      // Check if the characters are alphanumberic.
      const leftIsValid = (/[a-z0-9]/).test(leftChar);
      const rightIsValid = (/[a-z0-9]/).test(rightChar);

      // If they are both alphanumberic, compare them.
      if (leftIsValid && rightIsValid) {

          // If they aren't the same, then this is not a palindrome.
          if (leftChar !== rightChar) return false
          left ++, right --;
      } else {
          
          // Move the indices of invalid charaters towards the center.
          if (!leftIsValid) left++;
          if (!rightIsValid) right--;
      }
  }

  return true;
};
//---END---

//---START---longestPalindrome
/**
 * Given a string s, return the longest palindromic substring in s.
 * 
 * Example 1:
 * Input: s = "babad"
 * Output: "bab"
 * Note: "aba" is also a valid answer.
 * 
 * Example 2:
 * Input: s = "cbbd"
 * Output: "bb"
 * 
 * Example 3:
 * Input: s = "a"
 * Output: "a"
 * 
 * Example 4:
 * Input: s = "ac"
 * Output: "a"
 * 
 * Constraints:
 * 1 <= s.length <= 1000
 * s consist of only digits and English letters.
 */
export function longestPalindrome(s: string): string {

    if (s === null || s.length < 2) return s;

    let start: number = 0;
    let end: number = 0;
    for (let i = 0; i < s.length; i++) {
        const oddRange: number = getPalindromeRange(s, i, i);
        const evenRange: number = getPalindromeRange(s, i, i + 1);
        const currentRange: number = Math.max(oddRange, evenRange)
        if (currentRange > end - start) {
            start = i - Math.ceil(currentRange / 2) + 1;
            end = i + Math.floor(currentRange / 2) + 1;
        }
    }
    return s.substring(start, end);

    function getPalindromeRange(str: string, left: number, right: number): number {
        while (left >= 0 && right < str.length) {
            if (str[left] !== str[right]) break;
            left--;
            right++;
        }
        const palindromeRange: number = right - left - 1;
        return palindromeRange;
    }
};
//---END---

//---START---countSubstrings
/**
 * Given a string s, return the number of palindromic substrings in it.
 * 
 * A string is a palindrome when it reads the same backward as forward.
 * A substring is a contiguous sequence of characters within the string.
 * 
 * Leetcode # 647
 * https://leetcode.com/problems/palindromic-substrings/
 * 
 * Example 1:
 * Input: s = "abc"
 * Output: 3
 * Explanation: Three palindromic strings: "a", "b", "c".
 * 
 * Example 2:
 * Input: s = "aaa"
 * Output: 6
 * Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
 * 
 * Constraints:
 * 1 <= s.length <= 1000
 * s consists of lowercase English letters.
 */
export function countSubstrings(s: string): number {

    let count = 0 ;
    const sLength = s.length;
    
    for(let i = 0 ; i < sLength ; i++){
        //both odd and oven cases
        for(let j = i ; j < i + 2 ; j++){
            let left = i , right = j;
            while(s[left] && s[right] && s[left] === s[right]){
                count++;
                left--;
                right++
            }
        }
    }
    
    return count;
};
//---END---

//---START---encode
/**
 * Design an algorithm to encode a list of strings to a string. The encoded
 * string is then sent over the network and is decoded back to the original
 * list of strings.
 * 
 * Please implement encode and decode
 * 
 * Leetcode # 271
 * (Premium)    https://leetcode.com/problems/encode-and-decode-strings/
 * (Free)       https://www.lintcode.com/problem/659/
 * 
 * Example1
 * Input: ["lint","code","love","you"]
 * Output: ["lint","code","love","you"]
 * Explanation:
 * One possible encode method is: "lint:;code:;love:;you"
 * 
 * Example2
 * Input: ["we", "say", ":", "yes"]
 * Output: ["we", "say", ":", "yes"]
 * Explanation:
 * One possible encode method is: "we:;say:;:::;yes"
 * 
 * Your functions will be called as such:
 * decode(encode(strs));
 */ 

export function encode (strs: string[]): string {
  let sb = [];
  for (let str of strs) {
    sb.push(str.length);
    sb.push('/');
    sb.push(str);
  }
  return sb.join('');
};

export function _decode (s: string): string[] {
  let res = [];
  let i = 0;
  while (i < s.length) {
    let slash = s.indexOf('/', i);
    let len = parseInt(s.substring(i, slash));
    let str = s.substring(slash + 1, slash + 1 + len);
    res.push(str);
    i = slash + 1 + len;
  }
  return res;
};
//---END---

export function decode (s: string): string[] {
  throw new Error('Method not implemented.');
}
