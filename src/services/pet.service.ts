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
    private auth: string = 'Basic Y3JhaWc6cGV0cw==';

    constructor(@Inject(HttpClient) private http: HttpClient) { }

    search(term: string): Observable<any[]> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.get<any>(this.host + '/search/' + term, { headers });
    }

    // VETS

    getVetById(id: string): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.get<any>(this.host + '/vets/' + id, { headers });
    }

    getAllVets(): Observable<any[]> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.get<any[]>(this.host + '/vets', { headers });
    }

    insertVet(vet: Vet): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.post<any>(this.host + '/vets', vet, { headers });
    }

    deleteVet(id: string) {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.delete<any>(this.host + '/vets/' + id, { headers });
    }

    updateVet(id: string, vet: Vet): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.put<any>(this.host + '/vets/' + id, vet, { headers });
    }

    // SPECIES

    getSpeciesById(id: string): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.get<any>(this.host + '/species/' + id, { headers });
    }

    getAllSpecies(): Observable<any[]> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.get<any[]>(this.host + '/species', { headers });
    }

    insertSpecies(species: Species): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.post<any>(this.host + '/species', species, { headers });
    }

    deleteSpecies(id: string) {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.delete<any>(this.host + '/species/' + id, { headers });
    }

    updateSpecies(id: string, species: Species): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.put<any>(this.host + '/species/' + id, species, { headers });
    }

    // PROCEDURES

    getProcedureById(id: string): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.get<any>(this.host + '/procedures/' + id, { headers });
    }

    getAllProcedures(): Observable<any[]> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.get<any[]>(this.host + '/procedures', { headers });
    }

    insertProcedure(procedure: Procedure): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.post<any>(this.host + '/procedures', procedure, { headers });
    }

    deleteProcedure(id: string) {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.delete<any>(this.host + '/procedures/' + id, { headers });
    }

    updateProcedure(id: string, procedure: Procedure): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.put<any>(this.host + '/procedures/' + id, procedure, { headers });
    }

    // PETS

    getPetById(id: string): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.get<any>(this.host + '/pets/' + id, { headers });
    }

    getAllPets(): Observable<any[]> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.get<any[]>(this.host + '/pets', { headers });
    }

    insertPet(pet: PetDTO): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.post<any>(this.host + '/pets', pet, { headers });
    }

    deletePet(id: string) {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.delete<any>(this.host + '/pets/' + id, { headers });
    }

    updatePet(id: string, pet: PetDTO): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.put<any>(this.host + '/pets/' + id, pet, { headers });
    }

    // OWNERS

    getOwnerById(id: string): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.get<any>(this.host + '/owners/' + id, { headers });
    }

    getAllOwners(): Observable<any[]> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.get<any[]>(this.host + '/owners', { headers });
    }

    insertOwner(owner: Owner): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.post<any>(this.host + '/owners', owner, { headers });
    }

    deleteOwner(id: string) {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.delete<any>(this.host + '/owners/' + id, { headers });
    }

    updateOwner(id: string, owner: Owner): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.put<any>(this.host + '/owners/' + id, owner, { headers });
    }

    // BOOKINGS

    getBookingById(id: string): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.get<any>(this.host + '/bookings/' + id, { headers });
    }

    getAllBookings(): Observable<any[]> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.get<any[]>(this.host + '/bookings', { headers });
    }

    insertBooking(booking: BookingDTO): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.post<any>(this.host + '/bookings', booking, { headers });
    }

    deleteBooking(id: string) {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.delete<any>(this.host + '/bookings/' + id, { headers });
    }

    updateBooking(id: string, booking: BookingDTO): Observable<any> {
        const headers = { 'Access-Control-Allow-Origin': '*', 'Authorization': this.auth };
        return this.http.put<any>(this.host + '/bookings/' + id, booking, { headers });
    }
}
