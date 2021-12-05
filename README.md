# CuratedListTestGenerator

This is a test generator based on [a popular list](https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU) of 75 curated LeetCode problems, which was published on Blind.

From the post:
```
"... here's a list of the best LeetCode questions that teach you core concepts and techniques for each category/type of problems! Many other LeetCode questions are a mash of the techniques from these individual questions. I used this list in my last job hunt to only do the important questions."
```

## About the generator

This generator creates a project containing a list of 10 problems and unit tests, which are randomly selected from a pool of 75 total problems.

**Supported languages**: `TypeScript`

<br>

# Easy Setup

1. Clone or download the project.

2. Make sure that `NPM` and `Node` are installed in your machine.

3. In the project directory, run `npm run generate-all`, this will create a new `./Test` folder.

4. Open the new `./Test` folder in VSCode.

- The **problems** can be found under `src/problems.ts`.
- The **unit tests** can be seen under `spec/tests.spec.ts`.
- The **solutions** can be seen under `solutions/solutions.ts`.

5. Open a terminal window in the new `/Test` directory, and run `npm test`.

You should see many `Method not implemented` errors.

- You can also press `f5` in VSCode to debug the tests.

<br>

# Running Specific Tests

1. Open the test file (`spec/tests.spec.ts`).
2. Change the name of a specific **describe** or **it** statements to **fdescribe** or **fit** respectively.

`describe("maxProfit"...` >>> `fdescribe("maxProfit"...`

or

`it("Should return 0 if profi...` >>> `fit("Should return 0 if profi...`

3. Run the tests again. Only the tests named **fdescribe** / **fit** run.

<br>

# Generating a specific amount of random problems

Simply open `settings.ts`, set the types of problems and the total amount of problems that you want to do.

Then run `npm run generate`. This will create a new `/Test` folder with random problems.

# Generating a new set of problems

To generate a new set of problems, simply run `npm run generate` or `npm run generate-all` again in the main project directory. This will replace all problems and tests with new ones.
