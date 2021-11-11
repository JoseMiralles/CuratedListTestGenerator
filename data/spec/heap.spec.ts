import * as heap from "../src/heap";

//---START---topKFrequent
describe("topKFrequent", () => {

    interface IScenario {
        nums: number[];
        k: number;
        output: number[];
    }

    const scenarios: IScenario[] = [
        { nums: [1,1,1,2,2,3], k: 2, output: [1,2] },
        { nums: [1], k: 1, output: [1] },
    ];

    it ("should return the k most frequent elements.", () => {

        scenarios.forEach(s => {

            const output = heap.topKFrequent(s.nums, s.k);

            expect(output.length).withContext(
                `Expected elements: [${s.output}]\nActual Elements: [${output}]`
            ).toBe(s.output.length);

            if (
                s.output.some(num => !output.includes(num)) ||
                output.some(num => !s.output.includes(num))
            ) {
                fail(`Expected elements: [${s.output}]\nActual Elements: [${output}]`);
            }
        });
    });
});

//---START---MedianFinder
describe("MedianFinder", () => {

    interface IScenario {
        operations: string[];
        args: (number|null)[];
        outputs: (number|null)[];
    }

    const scenarios: IScenario[] = [
        {
            operations: ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"],
            args: [null,1,2,null,3,null],
            outputs: [null, null, null, 1.5, null, 2.0]
        },
        {
            operations: ["MedianFinder","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian"],
            args: [null,-1,null,-2,null,-3,null,-4,null,-5,null],
            outputs: [null,null,-1.00000,null,-1.50000,null,-2.00000,null,-2.50000,null,-3.00000]
        },
        {
            operations: ["MedianFinder","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian"],
            args: [null,12,null,10,null,13,null,11,null,5,null,15,null,1,null,11,null,6,null,17,null,14,null,8,null,17,null,6,null,4,null,16,null,8,null,10,null,2,null,12,null,0,null],
            outputs: [null,null,12.00000,null,11.00000,null,12.00000,null,11.50000,null,11.00000,null,11.50000,null,11.00000,null,11.00000,null,11.00000,null,11.00000,null,11.00000,null,11.00000,null,11.00000,null,11.00000,null,11.00000,null,11.00000,null,11.00000,null,10.50000,null,10.00000,null,10.50000,null,10.00000]
        }
    ];

    it("should return the correct values after each operation.", () => {
        
        scenarios.forEach(s => {

            const medianFinder = new heap.MedianFinder();
    
            for(let i = 1; i < s.outputs.length; i++) {
    
                // @ts-ignore
                const output = medianFinder[ s.operations[i] ]( s.args[i] );
                
                if (output !== undefined) {
                    expect(output).withContext(
                        `medianFinder.${s.operations[i]}() returned ${output} but was supposed to return ${s.outputs[i]}.`
                    ).toBe( s.outputs[i] );
                }
            }
        });
    });
});
