import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { forkJoin, map } from 'rxjs';
import { Booking } from '../../model/Booking';
import { BookingDTO } from '../../model/BookingDTO';
import { Pet } from '../../model/Pet';
import { PetDTO } from '../../model/PetDTO';
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
    styleUrl: './bookings-page.component.css'
})
export class BookingsPageComponent implements OnInit {

    mode: string = 'list';
    booking?: Booking;
    bookings: Booking[] = [];
    pets: Pet[] = [];
    procedures: Procedure[] = [];
    vets: Vet[] = [];

    constructor(private petService: PetService) {
    }

    ngOnInit(): void {
        this.getAllBookings();
        this.getAllPets();
        this.getAllProcedures();
        this.getAllVets();
    }

    setMode(mode: string) {
        this.mode = mode;
    }

    getAllBookings() {
        this.petService.getAllBookings().subscribe((bookingDTOs: BookingDTO[]) => {
            const observables = bookingDTOs.map(bookingDTO =>
                forkJoin({
                    pet: this.petService.getPetById(bookingDTO.petId),
                    procedure: this.petService.getProcedureById(bookingDTO.procedureId),
                    vet: this.petService.getVetById(bookingDTO.vetId)
                }).pipe(
                    map(result => {
                        const booking = new Booking(
                            bookingDTO.date,
                            result.pet,
                            result.procedure,
                            result.vet
                        );
                        booking.id = bookingDTO.id;
                        return booking;
                    })
                )
            );

            forkJoin(observables).subscribe(bookings => {
                this.bookings = bookings.sort((a, b) => a.date.valueOf() - b.date.valueOf());
            });
        });
    }

    createBooking(booking: Booking) {
        const bookingDTO = new BookingDTO(booking.date, booking.pet.id, booking.procedure.id, booking.vet.id);
        this.petService.insertBooking(bookingDTO).subscribe((message: string) => {
            this.getAllBookings();
            this.setMode('list');
        });
    }

    deleteBooking(booking: Booking) {
        if (confirm('Are you sure you want to delete this booking?')) {
            this.petService.deleteBooking(booking.id).subscribe((message: string) => {
                this.getAllBookings();
                this.setMode('list');
            });
        }
    }

    editBooking(booking: Booking) {
        this.booking = booking;
        this.setMode('edit');
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
                this.getAllBookings();
                this.setMode('list');
            });
        }
    }

    getAllPets() {
        this.petService.getAllPets().subscribe((petDTOs: PetDTO[]) => {
            const observables = petDTOs.map(petDTO =>
                forkJoin({
                    species: this.petService.getSpeciesById(petDTO.speciesId),
                    owner: this.petService.getOwnerById(petDTO.ownerId)
                }).pipe(
                    map(result => {
                        const pet = new Pet(
                            petDTO.name,
                            result.species,
                            petDTO.gender,
                            petDTO.birthDate,
                            result.owner
                        );
                        pet.id = petDTO.id;
                        return pet;
                    })
                )
            );

            forkJoin(observables).subscribe(pets => {
                this.pets = pets.sort((a, b) => a.name.localeCompare(b.name));
            });
        });
    }

    getAllVets() {
        this.petService.getAllVets().subscribe((vets: Vet[]) => {
            vets = vets.sort((a, b) => a.lastName.localeCompare(b.lastName));
            this.vets = vets;
        });
    }

    getAllProcedures() {
        this.petService.getAllProcedures().subscribe((procedures: Procedure[]) => {
            procedures = procedures.sort((a, b) => a.name.localeCompare(b.name));
            this.procedures = procedures;
        });
    }
}
