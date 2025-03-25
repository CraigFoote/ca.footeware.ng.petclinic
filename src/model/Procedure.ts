export class Procedure {
    public id?: any;
    public name: string;
    public cost: number;

    constructor(name: string, cost: number) {
        this.name = name;
        this.cost = cost;
    }
}
