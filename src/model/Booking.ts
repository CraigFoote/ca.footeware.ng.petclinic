import { Pet } from "./Pet";
import { Procedure } from "./Procedure";
import { Vet } from "./Vet";

export class Booking {
    public id?: any;
    public date: Date;
    public pet: Pet;
    public procedure: Procedure;
    public vet: Vet;

    constructor(date: Date, pet: Pet, procedure: Procedure, vet: Vet) {
        this.date = date;
        this.pet = pet;
        this.procedure = procedure;
        this.vet = vet;
    }
}