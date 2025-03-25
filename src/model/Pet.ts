import { Owner } from "./Owner";
import { Species } from "./Species";
import { Gender } from './Gender';

export class Pet {

    public id?: any;
    public name: string;
    public species: Species;
    public gender: Gender;
    public birthDate: Date;
    public owner: Owner;

    constructor(
        name: string,
        species: Species,
        gender: Gender,
        birthDate: Date,
        owner: Owner) {
        this.name = name;
        this.species = species;
        this.gender = gender;
        this.birthDate = birthDate;
        this.owner = owner;
    }
}
