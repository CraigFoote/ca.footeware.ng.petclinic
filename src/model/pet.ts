import { Owner } from "./owner";
import { Species } from "./species";
import { Gender } from '../model/gender';

export class Pet {

    public id?: any;
    public name: string;
    public speciesId: string;
    public gender: Gender;
    public birthDate: Date;
    public ownerId: string;

    constructor(
        name: string,
        speciesId: string,
        gender: Gender,
        birthDate: Date,
        ownerId: string) {
        this.name = name;
        this.speciesId = speciesId;
        this.gender = gender;
        this.birthDate = birthDate;
        this.ownerId = ownerId;
    }
}
