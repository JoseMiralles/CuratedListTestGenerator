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