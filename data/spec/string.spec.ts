import * as strings from "../src/string";

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

    scenarios.forEach(s => {

        it("should return the length of the longest non-repating subsring.", () => {

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

    scenarios.forEach(s => {

        it("should return the length of the longest substring containing the same letter you can get after performing the above operations.", () => {

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

    scenarios.forEach(s => {

        it ("should return the minimum windows substing.", () => {

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

    scenarios.forEach(s => {

        it ("should return the anagrams grouped in a matrix. These can be in any order.", () => {

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
//---END---
