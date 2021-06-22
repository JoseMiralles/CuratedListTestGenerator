# CuratedListTestGenerator

This is a test generator based on [a popular list](https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU) of 75 curated LeetCode problems, which was published on Blind.

From the post:
```
"... here's a list of the best LeetCode questions that teach you core concepts and techniques for each category/type of problems! Many other LeetCode questions are a mash of the techniques from these individual questions. I used this list in my last job hunt to only do the important questions."
```

## About the generator

This generator creates a project containing a list of 10 problems and unit tests, which are randomly selected from a pool of 75 total problems.

**Supported languages**: `TypeScript` and `JavaScript`.

<br>

# Easy Setup

1. Clone or download the project.

2. Make sure that `NPM` and `Node` are installed in your machine.

3. In the project directory, run `npm run generate`, this will create a new `./Test` folder.

4. Open the new `./Test` folder in your IDE of choice.

## TypeScript
- The **problems** can be found under `src/problems.ts`.
- The **unit tests** can be seen under `spec/tests.spec.ts`.
- The **solutions** can be seen under `solutions/solutions.ts`.

5. To run the tests, run `npm run test-ts` in the `./Test` directory.
   - To run a specific test, add the line number of the test to the command, EX:

   ```npm run test-ts 32```

## JavaScript
- The **problems** can be found under `dist/src/problems.js`.
- The **unit tests** can be seen under `dist/spec/tests.spec.js`.
- The **solutions** can be seen under `dist/solutions/solutions.js`.

5. To run the tests, run `npm run test-js` in the `./Test` directory.
   - To run a specific test, add the line number of the test to the command, EX:

   ```npm run test-js 32```

**WARNING:** Make sure to use `test-js` and not `test-ts` if you are using JavaScript. Using `test-ts` will re-transpile the TS code and replace the entire `./Dist` folder, which will make you lose your progress.

<br>

# Generating a new set of problems

To generate a new set of problems, simply run `npm run generate` again in the main project directory. This will replace all problems and tests with new ones.

<br>

# Costumizing test

Modify `generator.json` and then run `npm run generate` again.