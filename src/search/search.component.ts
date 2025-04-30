import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { PetService } from '../services/pet.service';
import { Pet } from '../model/Pet';
import { PetCardComponent } from '../pets/pet-card/pet-card.component';
import { Router } from '@angular/router';
import { Booking } from '../model/Booking';
import { BookingCardComponent } from '../bookings/booking-card/booking-card.component';

@Component({
    selector: 'app-search',
    imports: [
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        CommonModule,
        MatCardModule,
        MatButtonModule,
        PetCardComponent,
        BookingCardComponent
    ],
    providers: [PetService,
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'en-CA' },
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    standalone: true
})
export class SearchComponent {

    @Input() pets: Pet[] = [];
    @Input() bookings: Booking[] = [];

    constructor(private petService: PetService, private router: Router) { }

    submitSearch(searchTerm: string) {
        const term = searchTerm.trim();
        if (term.length > 0) {
            this.search(term);
        }
    }

    editPet(pet: Pet) {
        throw new Error('Method not implemented.');
    }

    editBooking($event: Booking) {
        throw new Error('Method not implemented.');
    }

    bookPet(pet: Pet) {
        // Use router state to pass the complex Pet object
        this.router.navigate(['/bookings'], { state: { petToBook: pet, mode: 'add', view: 'info' } });
    }

    search(search: string) {
        this.pets = []
        this.petService.search(search).subscribe((value: any[]) => {
            // value is an array of arrays
            // each inner array contains objects of different types
            // we need to check the type of each object and create the corresponding model
            for (const innerList of value) {
                for (const item of innerList) {
                    attrs: for (const attr in item) { // 'in' iterates over the keys of the object 
                        if (attr === 'gender') {
                            // we have a Pet
                            // resolve ids to objects
                            const species = this.petService.getSpeciesById(item.speciesId).subscribe((species: any) => {
                                const owner = this.petService.getOwnerById(item.ownerId).subscribe((owner: any) => {
                                    const pet = new Pet(item.name, species, item.gender, item.birthDate, owner);
                                    pet.id = item.id; // Assign the ID from the DTO
                                    this.pets.push(pet);
                                });
                            });
                            break attrs;
                        } else if (attr === 'procedureId') {
                            // we have a Booking
                            const pet = this.petService.getPetById(item.petId).subscribe((pet: any) => {
                                const procedure = this.petService.getProcedureById(item.procedureId).subscribe((procedure: any) => {
                                    const vet = this.petService.getVetById(item.vetId).subscribe((vet: any) => {
                                        const booking = new Booking(new Date(item.date), pet, procedure, vet);
                                        booking.id = item.id; // Assign the ID from the DTO
                                        this.bookings.push(booking);
                                    });
                                });
                            });
                            break attrs;
                        }
                    }
                }
            }
        });
    }
}
