// Add RxJS imports here
import { Observable, of } from 'rxjs';
// Remove map alias from 'rxjs/operators', keep switchMap and catchError if still needed from there (though often imported from 'rxjs' now)
import { switchMap, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { forkJoin, map } from 'rxjs';
import { Router } from '@angular/router';
import { Booking } from '../../model/Booking';
import { BookingDTO } from '../../model/BookingDTO';
import { Pet } from '../../model/Pet';
import { Procedure } from '../../model/Procedure';
import { Vet } from '../../model/Vet';
import { PetService } from '../../services/pet.service';
import { AddBookingFormComponent } from '../add-booking-form/add-booking-form.component';
import { BookingCardComponent } from '../booking-card/booking-card.component';
import { EditBookingFormComponent } from '../edit-booking-form/edit-booking-form.component';

@Component({
    selector: 'app-bookings-page',
    imports: [
        MatButtonModule,
        CommonModule,
        MatCardModule,
        BookingCardComponent,
        AddBookingFormComponent,
        EditBookingFormComponent
    ],
    providers: [PetService,
        { provide: MAT_DATE_LOCALE, useValue: 'en-CA' },
    ],
    templateUrl: './bookings-page.component.html',
    styleUrl: './bookings-page.component.css',
    standalone: true
})
export class BookingsPageComponent implements OnInit {

    mode: string = 'list';
    booking?: Booking;
    bookings: Booking[] = [];
    pets: Pet[] = [];
    procedures: Procedure[] = [];
    vets: Vet[] = [];
    petToBook?: Pet; // to hold the pet passed from search
    bookingToEdit?: Booking; // to hold the booking passed from search

    constructor(private petService: PetService, private router: Router) {
    }

    ngOnInit(): void {
        let intendedMode = 'list';
        const state = history.state as any;
        if (state?.petToBook) {
            this.petToBook = state.petToBook;
            intendedMode = state.mode || 'list';
        } else if (state?.bookingToEdit) {
            this.bookingToEdit = state.bookingToEdit;
            intendedMode = state.mode || 'list';
        }

        // fetch all data concurrently
        forkJoin({
            bookings: this.fetchAllBookings(),
            pets: this.fetchAllPets(),
            procedures: this.fetchAllProcedures(),
            vets: this.fetchAllVets()
        }).subscribe(results => {
            // assign fetched data
            this.bookings = results.bookings;
            this.pets = results.pets;
            this.procedures = results.procedures;
            this.vets = results.vets;

            // set the mode *after* all data is loaded
            console.log(intendedMode);
            this.mode = intendedMode;
        });
    }

    /**
     * Fetches all bookings and the associated Pet, Procedure, and Vet objects.
     * Sorts the bookings in descending order of date.
     * @returns An Observable of an array of Booking objects - may be empty.
     */
    private fetchAllBookings(): Observable<Booking[]> {
        return this.petService.getAllBookings().pipe(
            switchMap(bookingDTOs => {
                if (!bookingDTOs || bookingDTOs.length === 0) {
                    return of([]); // return empty array if no DTOs
                }
                const observables = bookingDTOs.map(bookingDTO =>
                    forkJoin({
                        pet: this.petService.getPetById(bookingDTO.petId),
                        procedure: this.petService.getProcedureById(bookingDTO.procedureId),
                        vet: this.petService.getVetById(bookingDTO.vetId)
                    }).pipe(
                        map(result => {
                            const booking = new Booking(bookingDTO.date, result.pet, result.procedure, result.vet);
                            booking.id = bookingDTO.id;
                            return booking;
                        })
                    )
                );
                return forkJoin(observables);
            }),
            map(bookings => bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())), // reverse sort
            catchError(error => {
                console.error('Error fetching bookings:', error);
                return of([]); // return empty array on error
            })
        );
    }

    private fetchAllPets(): Observable<Pet[]> {
        return this.petService.getAllPets().pipe(
            switchMap(petDTOs => {
                if (!petDTOs || petDTOs.length === 0) {
                    return of([]);
                }
                const observables = petDTOs.map(petDTO =>
                    forkJoin({
                        species: this.petService.getSpeciesById(petDTO.speciesId),
                        owner: this.petService.getOwnerById(petDTO.ownerId)
                    }).pipe(
                        map(result => { // Use standard map
                            const pet = new Pet(petDTO.name, result.species, petDTO.gender, petDTO.birthDate, result.owner);
                            pet.id = petDTO.id;
                            return pet;
                        })
                    )
                );
                return forkJoin(observables);
            }),
            map(pets => pets.sort((a, b) => a.name.localeCompare(b.name))), // Use standard map
            catchError(error => {
                console.error('Error fetching pets:', error);
                return of([]);
            })
        );
    }

    private fetchAllProcedures(): Observable<Procedure[]> {
        return this.petService.getAllProcedures().pipe(
            map(procedures => procedures.sort((a, b) => a.name.localeCompare(b.name))), // Use standard map
            catchError(error => {
                console.error('Error fetching procedures:', error);
                return of([]);
            })
        );
    }

    private fetchAllVets(): Observable<Vet[]> {
        return this.petService.getAllVets().pipe(
            map(vets => vets.sort((a, b) => a.lastName.localeCompare(b.lastName))), // Use standard map
            catchError(error => {
                console.error('Error fetching vets:', error);
                return of([]);
            })
        );
    }

    setMode(mode: string) {
        if (mode === 'add') {
            this.petToBook = undefined;
        } else if (mode === 'edit') {
            console.log("clearing this.bookingToEdit", this.bookingToEdit);
            this.bookingToEdit = undefined;
        }
        this.mode = mode;
    }

    createBooking(booking: Booking) {
        const bookingDTO = new BookingDTO(booking.date, booking.pet.id, booking.procedure.id, booking.vet.id);
        this.petService.insertBooking(bookingDTO).subscribe((message: string) => {
            this.refreshAllData();
            this.setMode('list');
        });
    }

    deleteBooking(booking: Booking) {
        if (confirm('Are you sure you want to delete this booking?')) {
            this.petService.deleteBooking(booking.id).subscribe((message: string) => {
                this.refreshAllData();
                this.setMode('list');
            });
        }
    }

    editBooking(booking: Booking) {

        this.router.navigate(['/bookings'], { state: { bookingToEdit: booking, mode: 'edit' } });
    }

    updateBooking(booking: Booking) {
        if (this.booking) {
            const bookingDTO = new BookingDTO(
                booking.date,
                booking.pet.id,
                booking.procedure.id,
                booking.vet.id,
            );
            this.petService.updateBooking(this.booking.id, bookingDTO).subscribe((message: string) => {
                this.refreshAllData();
                this.setMode('list');
            });
        }
    }

    private refreshAllData() {
        forkJoin({
            bookings: this.fetchAllBookings(),
            pets: this.fetchAllPets(),
            procedures: this.fetchAllProcedures(),
            vets: this.fetchAllVets()
        }).subscribe(results => {
            this.bookings = results.bookings;
            this.pets = results.pets;
            this.procedures = results.procedures;
            this.vets = results.vets;
        });
    }
}
