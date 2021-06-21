import { Adder } from "../src/adder";

describe("Adder add function should return a value", () => {
    
    it("Should be defined.", () => {
        const adder = new Adder();
        expect(adder.add(2)).withContext("The function add() should be defined.")
    });

    it("Shouldn't return blank.", () => {
        const adder = new Adder();
        expect(adder.add(2).toString()).toMatch("2");
    });

    it("Should return the correct sum.", () => {
        const adder = new Adder();
        adder.add(3);
        expect(adder.add(3).toString()).toMatch("6");
    })
});