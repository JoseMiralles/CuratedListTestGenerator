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

class Generator {

    public problems: {[Index: string]: IProblem[]};

    public constructor(types: string[] = ["arrays"]){
        this.problems = {};
        this.generateProblemsDictionary(types);
    }

    private generateProblemsDictionary = (types: string[]) => {
        types.forEach(type => {
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
            console.log(this.problems);
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
