import { Gender } from './Gender';

export class PetDTO {

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
