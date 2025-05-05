import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { PetService } from '../services/pet.service';
import { Pet } from '../model/Pet';
import { firstValueFrom } from 'rxjs';
import { PetCardComponent } from '../pets/pet-card/pet-card.component';
import { Router } from '@angular/router';
import { Booking } from '../model/Booking';
import { BookingCardComponent } from '../bookings/booking-card/booking-card.component';
import { Gender } from '../model/Gender';

@Component({
    selector: 'app-search',
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatTabsModule,
        MatIconModule,
        FormsModule,
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatBadgeModule,
        MatSlideToggleModule,
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
    tempBookings: Booking[] = [];

    /**
     * Initializes the component by creating a temporary copy of the current bookings.
     * This allows for any modifications to the bookings list without affecting the original data.
     */
    ngOnInit() {
        this.tempBookings = [...this.bookings];
    }

    constructor(private petService: PetService, private router: Router) { }

    /**
     * Performs a search on the database based on the given search term.
     * Updates the component's properties with the search results.
     * @param searchTerm - The search term to search for.
     * @returns A promise that resolves to void when the search is complete.
     */
    async submitSearch(searchTerm: string): Promise<void> {
        const term = searchTerm.trim();
        if (term.length > 0) {
            await this.search(term);
        }
    }

    editPet(pet: Pet) {
        this.router.navigate(['/pets'], { state: { petToEdit: pet, mode: 'edit' } });
    }

    editBooking(booking: Booking) {
        this.router.navigate(['/bookings'], { state: { bookingToEdit: booking, mode: 'edit' } });
    }

    /**
     * Navigates to the bookings page with the specified pet details.
     * @param pet - The Pet object to be booked.
     */
    bookPet(pet: Pet): void {
        this.router.navigate(['/bookings'], { state: { petToBook: pet, mode: 'add' } });
    }

    /**
     * Performs a search on the database based on the given search term.
     * Updates the component's properties with the search results.
     * @param search - The search term to search for.
     * @returns A promise that resolves to void when the search is complete.
     */
    async search(search: string): Promise<void> {
        this.pets = [];
        this.bookings = [];
        const results = await firstValueFrom(this.petService.search(search));
        for (const innerList of results) {
            for (const item of innerList) {
                if ('gender' in item) {
                    // we have a Pet
                    const species = await firstValueFrom(this.petService.getSpeciesById(item.speciesId));
                    const owner = await firstValueFrom(this.petService.getOwnerById(item.ownerId));
                    const pet = new Pet(item.name, species, item.gender as Gender, item.birthDate, owner);
                    pet.id = item.id; // Assign the ID from the DTO
                    this.pets.push(pet);
                    this.pets.sort((a, b) => a.name.localeCompare(b.name));
                } else if ('procedureId' in item) {
                    // we have a Booking
                    const pet = await firstValueFrom(this.petService.getPetById(item.petId));
                    const procedure = await firstValueFrom(this.petService.getProcedureById(item.procedureId));
                    const vet = await firstValueFrom(this.petService.getVetById(item.vetId));
                    const booking = new Booking(new Date(item.date), pet, procedure, vet);
                    booking.id = item.id; // Assign the ID from the DTO
                    this.bookings.push(booking);
                    this.bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                }
            }
        }
    }

    /**
     * Toggles the visibility of past bookings.
     * @param $event - The MatSlideToggle event.
     */
    async toggleBookingsFilter($event: MatSlideToggleChange): Promise<void> {
        const isChecked = $event?.checked;
        if (isChecked === true) {
            const now = new Date();
            now.setHours(0, 0, 0, 0);

            if (this.bookings) {
                this.tempBookings = [...this.bookings];
                this.bookings = this.bookings.filter((booking: Booking) => {
                    const bookingDate = new Date(booking?.date);
                    bookingDate.setHours(0, 0, 0, 0);
                    return bookingDate?.getTime() >= now.getTime();
                });
                this.bookings = this.bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            }
        } else if (this.tempBookings) {
            this.bookings = [...this.tempBookings];
        }
    }
}
