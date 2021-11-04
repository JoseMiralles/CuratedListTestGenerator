import * as strings from "../src/strings";

//---START---lengthOfLongestSubstring
describe("lengthOfLongestSubstring", () => {

    interface IScenario {
        input: string;
        output: number;
    }

    const scenarios: IScenario[] = [
        { input: "abcabcbb", output: 3 },
        { input: "bbbbb", output: 1 },
        { input: "pwwkew", output: 3 },
        { input: "", output: 0 },
    ];

    it("should return the length of the longest non-repating subsring.", () => {
        scenarios.forEach(s => {


            expect(strings.lengthOfLongestSubstring(s.input)).toBe(s.output);
        });
    });
});

//---START---characterReplacement
describe("characterReplacement", () => {

    interface IScenario {
        s: string;
        k: number;
        output: number;
    }

    const scenarios: IScenario[] = [
        { s: "ABAB", k: 2, output: 4 },
        { s: "AABABBA", k: 1, output: 4 }
    ];

    it("should return the length of the longest substring containing the same letter you can get after performing the above operations.", () => {
    
        scenarios.forEach(s => {
            expect(strings.characterReplacement(s.s, s.k)).toBe(s.output);
        });
    });
});

//---START---minWindow
describe("minWindow", () => {

    interface IScenario {
        s: string;
        t: string;
        output: string;
    }

    const scenarios: IScenario[] = [
        { s: "ADOBECODEBANC", t: "ABC", output: "BANC" },
        { s: "a", t: "a", output: "a" },
        { s: "a", t: "aa", output: "" }
    ];

    it ("should return the minimum windows substing.", () => {
        scenarios.forEach(s => {


            expect(strings.minWindow(s.s, s.t)).toBe(s.output);
        });
    });
});

//---START---isAnagram
describe("isAnagram", () => {

    interface IScenario {
        s: string;
        t: string;
        output: boolean;
    }

    const scenarios: IScenario[] = [
        { s: "anagram", t: "nagaram", output: true },
        { s: "rat", t: "car", output: false },
    ];

    scenarios.forEach(s => {

        it ("should return true if t is an anagram of s, and false otherwise.", () => {

            expect(strings.isAnagram(s.s, s.t)).toBe(s.output);
        });
    });
});

//---START---groupAnagrams
describe("groupAnagrams", () => {

    interface IScenario {
        strs: string[];
        output: string[][];
    }

    const scenarios: IScenario[] = [
        { strs: ["eat","tea","tan","ate","nat","bat"], output: [["bat"],["nat","tan"],["ate","eat","tea"]] },
        { strs: [""], output: [[""]] },
        { strs: ["a"], output: [["a"]] }
    ];

    it ("should return the anagrams grouped in a matrix. These can be in any order.", () => {
        
        scenarios.forEach(s => {

            const res = strings.groupAnagrams(s.strs);

            if (s.strs === [""] || (s.strs.length === 1)) {
                expect(res).toEqual(s.output);
            }

            s.output.forEach(expectedSubArray => {

                if (!expectedSubArray.some(item => res.some(subArray => subArray.includes(item)))){

                    fail ("Items are missing in output.");
                }

                res.forEach(resSub => {

                    // If there is a resemblance, check if the items are correctly gruped.
                    if (resSub.some(item => expectedSubArray.includes(item))) {

                        // They need to have the same amount of elements.
                        expect(resSub.length).toBe(expectedSubArray.length);

                        expectedSubArray.forEach(str => {

                            expect(resSub).toContain(str);
                        });
                    }
                });
            });
        });
    });
});

//---START---isValid
describe("isValid", () => {

    interface IScenario {
        input: string;
        output: boolean;
    }

    const scenarios: IScenario [] = [
        { input: "()", output: true },
        { input: "()[]{}", output: true },
        { input: "(]", output: false },
        { input: "([)]", output: false },
        { input: "{[]}", output: true },
    ];

    it("should return true if the strings is valid, and false if not.", () => {
        scenarios.forEach(s => {

            expect(strings.isValid(s.input)).toBe(s.output);
        });
    });
});

//---START---isPalindrome
describe("isPalindrome", () => {

    interface IScenario {
        s: string;
        output: boolean;
    }

    const scenarios: IScenario[] = [
        { s: "A man, a plan, a canal: Panama", output: true },
        { s: "race a car", output: false },
        { s: "5P", output: false },
        { s: " ", output: true }
    ];

    it("should return true if the string is a plaindrome, or false otherwise.", () => {
        
        scenarios.forEach(s => {

            expect(strings.isPalindrome(s.s)).toBe(s.output);
        });
    });
});

//---START---longestPalindrome
describe("longestPalindrome", () => {

    interface IScenario {
        s: string;
        output: string;
    }

    const scenarios: IScenario[] = [
        { s: "babad", output: "bab" },
        { s: "cbbd", output: "bb" },
        { s: "a", output: "a" },
        { s: "ac", output: "a" },
    ];

    it("should the longest palindromic substring.", () => {
        
        scenarios.forEach(s => {

            expect(strings.longestPalindrome(s.s)).toBe(s.output);
        });
    });
});

//---START---countSubstrings
describe("countSubstrings", () => {

    interface IScenario {
        s: string;
        output: number;
    }

    const scenarios: IScenario[] = [
        { s: "abc", output: 3 },
        { s: "aaa", output: 6 },
    ];

    it("should the longest palindromic substring.", () => {
        
        scenarios.forEach(s => {

            expect(strings.countSubstrings(s.s)).toBe(s.output);
        });
    });
});

//---START---encode
describe("encode", () => {

    // @ts-ignore
    const decode = (strings._decode) ? strings._decode : strings.decode;

    interface IScenario {
        input: string[];
    }

    const scenarios: IScenario[] = [
        { input: ["lint","code","love","you"] },
        { input: ["we", "say", ":", "yes"] }

    ];

    it("should the longest palindromic substring.", () => {
        
        scenarios.forEach(s => {

            expect(
                decode(strings.encode(s.input))
            ).toEqual(s.input);
        });
    });
});
