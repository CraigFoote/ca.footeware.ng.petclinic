import { Province } from "./province";

export class Owner {
    public id?: any;
    public firstName: string;
    public lastName: string;
    public address: string;
    public city: string;
    public province: Province;
    public postalCode: string;
    public email?: string;
    public phone?: string;

    constructor(
        firstName: string,
        lastName: string,
        address: string,
        city: string,
        province: Province,
        postalCode: string,
        email?: string,
        phone?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.province = province;
        this.postalCode = postalCode;
        this.email = email;
        this.phone = phone;
    }
}