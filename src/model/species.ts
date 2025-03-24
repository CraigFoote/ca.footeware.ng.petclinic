export class Species {
    public id?: any;
    public name: string;
    public description: string;

    constructor({ name: name, description: description }: Species) {
        this.name = name;
        this.description = description;
    }
}