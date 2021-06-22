import  * as fs from "fs";

interface IProblem {
    name: string;
    solution: string;
    emptyMethod: string;
    test: string;
}

interface IProblemPair {
    solved: string;
    empty: string;
}

interface IFiles {
    tests: string;
    solutions: string;
    emptyMethods: string;
}

class Generator {

    private problems: {[Index: string]: IProblem[]} = {};
    private files: IFiles = {tests: "", solutions: "", emptyMethods: ""};

    public constructor(private types: string[] = ["arrays"], private total: number = 3){
        this.generateProblemsDictionary();
        this.generateFileStrings();
        this.createFoldersAndProject();
    }

    /**
     * Creates the "Test" folder, with all required files.
     */
    createFoldersAndProject() {
        
    }

    /**
     * Populates "this.files" with the text of each file.
     */
    private generateFileStrings() {
        
        // keep track of which problems are already included to avoid duplicates.
        const included = new Set<string>();
        let count = 0;

        while (count < this.total) {
            const randomTypeName = this.types[Math.floor(Math.random() * this.types.length)];
            console.log(randomTypeName);
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
        this.types.forEach(type => {
            this.problems[type] = [];
            const solutions = this.getSolutions(type);
            const tests = this.getTests(type);
            Object.keys(solutions).forEach(name => {
                this.problems[type].push({
                    name,
                    solution: solutions[name].solved,
                    emptyMethod: solutions[name].empty,
                    test: tests[name]
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
        const solutionsArr: string[] = fs.readFileSync(`./data/src/${type}.ts`, {encoding: "utf8"}).split("//---START---");
        const solutions: {[indexer: string]: IProblemPair} = {};
        solutionsArr.forEach(s => {
            const indexOfFirstNewLine = s.indexOf("\n");
            const name = s.slice(0, indexOfFirstNewLine);
            const body = s.slice(indexOfFirstNewLine);

            if (name && body) {

                const content = "throw new Error('Method not implemented.');"; 
                const empty =
                    body.slice(0, body.indexOf("{\n") + 3) +
                    content +
                    "\n};\n\n";

                solutions[name] = {
                    solved: body,
                    empty
                };
            }
        });

        return solutions;
    };
}

const generator = new Generator();
