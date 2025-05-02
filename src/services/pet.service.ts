import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Species } from "../model/Species";
import { Procedure } from "../model/Procedure";
import { Vet } from "../model/Vet";
import { Owner } from "../model/Owner";
import { PetDTO } from "../model/PetDTO";
import { BookingDTO } from "../model/BookingDTO";

@Injectable({
    providedIn: 'root',
})
export class PetService {

    private host: string = 'http://localhost:10000';

    constructor(@Inject(HttpClient) private http: HttpClient) { }

    search(term: string): Observable<any[]> {
        return this.http.get<any>(this.host + '/search/' + term);
    }

    // VETS

    getVetById(id: string): Observable<any> {
        return this.http.get<any>(this.host + '/vets/' + id);
    }

    getAllVets(): Observable<any[]> {
        return this.http.get<any[]>(this.host + '/vets');
    }

    insertVet(vet: Vet): Observable<any> {
        return this.http.post<any>(this.host + '/vets', vet);
    }

    deleteVet(id: string) {
        return this.http.delete<any>(this.host + '/vets/' + id);
    }

    updateVet(id: string, vet: Vet): Observable<any> {
        return this.http.put<any>(this.host + '/vets/' + id, vet);
    }

    // SPECIES

    getSpeciesById(id: string): Observable<any> {
        return this.http.get<any>(this.host + '/species/' + id);
    }

    getAllSpecies(): Observable<any[]> {
        return this.http.get<any[]>(this.host + '/species');
    }

    insertSpecies(species: Species): Observable<any> {
        return this.http.post<any>(this.host + '/species', species);
    }

    deleteSpecies(id: string) {
        return this.http.delete<any>(this.host + '/species/' + id);
    }

    updateSpecies(id: string, species: Species): Observable<any> {
        return this.http.put<any>(this.host + '/species/' + id, species);
    }

    // PROCEDURES

    getProcedureById(id: string): Observable<any> {
        return this.http.get<any>(this.host + '/procedures/' + id);
    }

    getAllProcedures(): Observable<any[]> {
        return this.http.get<any[]>(this.host + '/procedures');
    }

    insertProcedure(procedure: Procedure): Observable<any> {
        return this.http.post<any>(this.host + '/procedures', procedure);
    }

    deleteProcedure(id: string) {
        return this.http.delete<any>(this.host + '/procedures/' + id);
    }

    updateProcedure(id: string, procedure: Procedure): Observable<any> {
        return this.http.put<any>(this.host + '/procedures/' + id, procedure);
    }

    // PETS

    getPetById(id: string): Observable<any> {
        return this.http.get<any>(this.host + '/pets/' + id);
    }

    getAllPets(): Observable<any[]> {
        return this.http.get<any[]>(this.host + '/pets');
    }

    insertPet(pet: PetDTO): Observable<any> {
        return this.http.post<any>(this.host + '/pets', pet);
    }

    deletePet(id: string) {
        return this.http.delete<any>(this.host + '/pets/' + id);
    }

    updatePet(id: string, pet: PetDTO): Observable<any> {
        return this.http.put<any>(this.host + '/pets/' + id, pet);
    }

    // OWNERS

    getOwnerById(id: string): Observable<any> {
        return this.http.get<any>(this.host + '/owners/' + id);
    }

    getAllOwners(): Observable<any[]> {
        return this.http.get<any[]>(this.host + '/owners');
    }

    insertOwner(owner: Owner): Observable<any> {
        return this.http.post<any>(this.host + '/owners', owner);
    }

    deleteOwner(id: string) {
        return this.http.delete<any>(this.host + '/owners/' + id);
    }

    updateOwner(id: string, owner: Owner): Observable<any> {
        return this.http.put<any>(this.host + '/owners/' + id, owner);
    }

    // BOOKINGS

    getBookingById(id: string): Observable<any> {
        return this.http.get<any>(this.host + '/bookings/' + id);
    }

    getAllBookings(): Observable<any[]> {
        return this.http.get<any[]>(this.host + '/bookings');
    }

    insertBooking(booking: BookingDTO): Observable<any> {
        return this.http.post<any>(this.host + '/bookings', booking);
    }

    deleteBooking(id: string) {
        return this.http.delete<any>(this.host + '/bookings/' + id);
    }

    updateBooking(id: string, booking: BookingDTO): Observable<any> {
        return this.http.put<any>(this.host + '/bookings/' + id, booking);
    }
}
