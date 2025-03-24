export class Vet {
    public id?: any;
    public firstName: string;
    public lastName: string;

    constructor({ firstName: firstName, lastName: lastName }: Vet) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}