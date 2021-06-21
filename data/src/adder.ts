export class Adder {
    
    public sum: number = 0;

    public add = (num: number): number => {
        this.sum += num;
        return this.sum;
    };
}