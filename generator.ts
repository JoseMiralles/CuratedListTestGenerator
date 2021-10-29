import * as fs from "fs";
import * as settings from "./settings";

interface IProblem {
    name: string;
    solution: string;
    emptyMethod: string;
    test: string;
}

interface IProblemPair {
    solved: string;
    empty: string;
    required: string[];
}

interface IFiles {
    tests: string;
    solutions: string;
    emptyMethods: string;
}

class Generator {

    private types: string[];
    private total: number;
    // Will hold all problems, separated by type.
    private problems: {[type: string]: IProblem[]} = {};
    // Will hold all of the shared items for all problems.
    private sharedItems: {[name: string]: string} = {};
    private files: IFiles = {
        tests: "",
        solutions: "",
        emptyMethods: "",
    };

    public constructor(){
        this.loadGeneratorSettings();
        this.generateProblemsDictionary();
        this.generateFileStrings();
        this.createFoldersAndProject();
    }

    /**
     * Loads the settings from generator.json
     */
    loadGeneratorSettings() {
        this.types = settings.problemTypes;
        this.total = settings.totalProblems;
    }

    /**
     * Creates the "Test" folder, with all required files.
     */
    createFoldersAndProject() {
        console.log("Creating folders and files...");
        if (!fs.existsSync("Test")) fs.mkdirSync("Test");
        if (!fs.existsSync("Test/spec")) fs.mkdirSync("Test/spec");
        if (!fs.existsSync("Test/spec/support")) fs.mkdirSync("Test/spec/support");
        if (!fs.existsSync("Test/src")) fs.mkdirSync("Test/src");
        if (!fs.existsSync("Test/solutions")) fs.mkdirSync("Test/solutions");
        fs.writeFileSync("Test/src/problems.ts", this.files.emptyMethods);
        fs.writeFileSync("Test/spec/tests.spec.ts", this.files.tests);
        fs.writeFileSync("Test/solutions/solutions.ts", this.files.solutions);
        fs.writeFileSync("Test/package.json", fs.readFileSync("data/package.json", {encoding: "utf8"}));
        fs.writeFileSync("Test/tsconfig.json", fs.readFileSync("data/tsconfig.json", {encoding: "utf8"}));
        fs.writeFileSync("Test/spec/support/jasmine.json", fs.readFileSync("data/spec/support/jasmine.json", {encoding: "utf8"}));
    }

    /**
     * Populates "this.files" with the text of each file.
     */
    private generateFileStrings() {
        console.log("Generating files strings...");
        
        // Add imports for all types to the test file string.
        this.types.forEach(t => {
            this.files.tests += `import * as ${t} from "../src/problems";\n`;
        });

        // keep track of which problems are already included to avoid duplicates.
        const included = new Set<string>();
        let count = 0;

        while (count < this.total) {
            const randomTypeName = this.types[Math.floor(Math.random() * this.types.length)];
            const randomProblemIndex = Math.floor(Math.random() * this.problems[randomTypeName].length);
            const problem = this.problems[randomTypeName][randomProblemIndex];

            if (!included.has(problem.name)) {
                this.files.emptyMethods += problem.emptyMethod;
                this.files.solutions += problem.solution;
                this.files.tests += problem.test;

                count++;
                included.add(problem.name);
            }
        }
    }

    /**
     * Populates "this.problems" dictionary with {type => IProblem} object.
     */
    private generateProblemsDictionary = () => {

        console.log("Generating problems dictionary...");

        this.types.forEach(type => {

            this.problems[type] = [];
            const solutions = this.getSolutions(type);
            const tests = this.getTests(type);

            Object.keys(solutions).forEach(name => {

                this.problems[type].push({
                    name,
                    solution: solutions[name].solved,
                    emptyMethod: solutions[name].empty,
                    test: tests[name],
                    
                });
            });
        });
    };

    private getTests(type: string): {[indexer: string]: string} {
        const testsArr: string[] = fs.readFileSync(`./data/spec/${type}.spec.ts`, {encoding: "utf8"}).split("//---START---");
        const tests: {[indexer: string]: string} = {};

        testsArr.forEach((s, i) => {
            if (i === 0) return; // Skip the first one since its the import statement.
            const indexOfFirstNewLine = s.indexOf("\n");
            const name = s.slice(0, indexOfFirstNewLine);
            const body = s.slice(indexOfFirstNewLine);

            if (name && body) tests[name] = body;
        });

        return tests;
    }

    private getSolutions = (type: string): {[indexer: string]: IProblemPair} => {

        const fileSections = fs.readFileSync(
            `./data/src/${type}.ts`, {encoding: "utf8"}).split("/**SHARED ITEMS**/");
        const solutionsArr: string[] = fileSections[0].split("//---START---");
        const solutions: {[indexer: string]: IProblemPair} = {};

        solutionsArr.forEach(s => {

            const indexOfFirstNewLine = s.indexOf("\n");
            const name = s.slice(0, indexOfFirstNewLine);

            const endFlag = "//---END---\n";
            const indexOfEndFlag = s.indexOf(endFlag);

            let includeMessage = `// Used by ${name}`;
            
            const body: string = s.slice(indexOfFirstNewLine, indexOfEndFlag);
            // Include extra functions for this problem
            const rest: string = `\n${s.slice(indexOfEndFlag + endFlag.length)}`;
            // Get the list of the required shared items for this problem.
            const required: string[] = body.slice(
                body.indexOf("/** Requires: ")  + "/** Requires: ".length,
                body.indexOf("]")
            )
            .replace(/[ []/g, "")
            .split(",");

            // Do not render a message if there is no extra methods.
            if (rest.replace(/[ \n]/g, "").length < 1) includeMessage = "";

            if (name && body) {

                const content = "\tthrow new Error('Method not implemented.');"; 
                const empty =
                    body.slice(0, body.indexOf("{\n") + 3) +
                    content +
                    "\n}; \n\n" +
                    includeMessage +
                    rest +
                    "\n\n";
                const solved = body + rest;


                solutions[name] = {
                    solved,
                    empty,
                    required
                };
            }
        });

        // Loop trough all of the shared items, and add them to the dictionary.
        fileSections[1].split("//---START---").forEach(si => {
            
            const indexOfFirstNewLine = si.indexOf("\n");
            const name = si.slice(0, indexOfFirstNewLine);
            const endFlag = "//---END---\n";
            const indexOfEndFlag = si.indexOf(endFlag);
            const body: string = si.slice(indexOfFirstNewLine, indexOfEndFlag);

            this.sharedItems[name] = body;
        });

        return solutions;
    };
}

const generator = new Generator();
