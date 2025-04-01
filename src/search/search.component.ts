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

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        CommonModule,
        MatCardModule,
        MatButtonModule,
        PetCardComponent
    ],
    providers: [PetService,
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'en-CA' },
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent {

    @Input() pets: Pet[] = [];

    constructor(private petService: PetService, private router: Router) { }

    submitSearch(searchTerm: string) {
        const term = searchTerm.trim();
        if (term.length > 0) {
            this.searchPets(term);
        }
    }

    editPet(pet: Pet) {
        throw new Error('Method not implemented.');
    }

    bookPet(pet: Pet) {
        // Use router state to pass the complex Pet object
        this.router.navigate(['/bookings'], { state: { petToBook: pet, mode: 'add', view: 'info' } });
    }

    searchPets(term: string) {
        this.pets = []
        this.petService.search(term).subscribe((value: any[]) => {
            for (const petDTO of value) {
                this.petService.getSpeciesById(petDTO.speciesId).subscribe((species: any) => {
                    this.petService.getOwnerById(petDTO.ownerId).subscribe((owner: any) => {
                        const pet = new Pet(petDTO.name, species, petDTO.gender, petDTO.birthDate, owner);
                        pet.id = petDTO.id; // Assign the ID from the DTO
                        this.pets.push(pet);
                    });
                });
            }
        });
    }
}
