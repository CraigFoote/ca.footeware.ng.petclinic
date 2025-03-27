export class BookingDTO {
    public id?: any;
    public date: Date;
    public petId: string;
    public procedureId: string;
    public vetId: string;

    constructor(date: Date, petId: string, procedureId: string, vetId: string) {
        this.date = date;
        this.petId = petId;
        this.procedureId = procedureId;
        this.vetId = vetId;
    }
}