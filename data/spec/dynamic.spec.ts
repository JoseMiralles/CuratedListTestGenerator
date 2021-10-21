import * as dynamic from "../src/dynamic";

//---START---climbStairs
describe("climbStairs", () => {

    interface IScenario {
        n: number;
        output: number;
    }

    const scenarios: IScenario[] = [
        { n: 2, output: 2 },
        { n: 3, output: 3 }
    ];

    scenarios.forEach(s => {
        it(`Should return the total number of distinct way in which to climb the stairs.`, () => {
            expect(dynamic.climbStairs(s.n)).toEqual(s.output);
        });
    });
});

//---START---coinChange
describe("coinChange", () => {

    interface IScenario {
        coins: number[];
        amount: number;
        output: number;
    }

    const scenarios: IScenario[] = [
        { coins: [1,2,5], amount: 11, output: 3 },
        { coins: [2,5,10,1], amount: 27, output: 4 },
        { coins: [186,419,83,408], amount: 6249, output: 20 },
        { coins: [2], amount: 3, output: -1 },
        { coins: [1], amount: 0, output: 0 },
        { coins: [1], amount: 1, output: 1 },
        { coins: [1], amount: 2, output: 2 },
    ];

    scenarios.forEach(s => {
        it(`Should return the fewest number of coins needed to make up the amount, or -1 if its not possibe.`, () => {
            expect(dynamic.coinChange(s.coins, s.amount)).toEqual(s.output);
        });
    });
});
