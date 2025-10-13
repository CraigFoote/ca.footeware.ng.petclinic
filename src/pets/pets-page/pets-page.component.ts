import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PetDTO } from '../../model/PetDTO';
import { PetService } from '../../services/pet.service';
import { Species } from '../../model/Species';
import { Owner } from '../../model/Owner';
import { Gender } from '../../model/Gender';
import { Pet } from '../../model/Pet';
import { PetCardComponent } from './../pet-card/pet-card.component';
import { AddPetFormComponent } from './../add-pet-form/add-pet-form.component';
import { EditPetFormComponent } from './../edit-pet-form/edit-pet-form.component';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';

@Component({
    selector: 'app-pets',
    imports: [
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatRadioModule,
        MatDatepickerModule,
        MatSelectModule,
        PetCardComponent,
        AddPetFormComponent,
        EditPetFormComponent
    ],
    providers: [PetService,
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'en-CA' },
    ],
    templateUrl: './pets-page.component.html',
    styleUrl: './pets-page.component.css',
    standalone: true
})
export class PetsPageComponent implements OnInit {

    mode: string = 'list';
    pet?: Pet;
    pets: Pet[] = [];
    genders: Gender[] = [Gender.MALE, Gender.FEMALE];
    allSpecies?: Species[];
    owners?: Owner[];
    petToEdit?: Pet;

    constructor(private petService: PetService, private router: Router) {
    }

    ngOnInit(): void {
        let intendedMode = 'list'; //default
        const state = history.state as any;
        if (state?.petToEdit && state?.mode) {
            this.petToEdit = state.petToEdit;
            intendedMode = state.mode;
        }
        console.log('petsPage oninit petToEdit.id=' + this.petToEdit?.id);

        // fetch all data concurrently
        forkJoin({
            pets: this.fetchAllPets(),
            species: this.fetchAllSpecies(),
            owners: this.fetchAllOwners()
        }).subscribe(results => {
            // assign fetched data
            this.pets = results.pets;
            this.allSpecies = results.species;
            this.owners = results.owners;

            // set the mode *after* all data is loaded
            this.pet = this.petToEdit;
            this.mode = intendedMode;
        });
    }

    setMode(mode: string) {
        this.mode = mode;
    }

    private fetchAllSpecies(): Observable<Species[]> {
        return this.petService.getAllSpecies().pipe(
            map(allSpecies => allSpecies.sort((a, b) => a.name.localeCompare(b.name))),
            catchError(error => {
                console.error('Error fetching all species: ', error);
                return of([]);
            })
        );
    }

    private fetchAllOwners(): Observable<Owner[]> {
        return this.petService.getAllOwners().pipe(
            map(owners => owners.sort((a, b) => a.lastName.localeCompare(b.lastName))),
            catchError(error => {
                console.error('Error fetching owners: ', error);
                return of([]);
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
                        map(result => {
                            const pet = new Pet(petDTO.name, result.species, petDTO.gender, petDTO.birthDate, result.owner);
                            pet.id = petDTO.id;
                            return pet;
                        })
                    )
                );
                return forkJoin(observables);
            }),
            map(pets => pets.sort((a, b) => a.name.localeCompare(b.name))),
            catchError(error => {
                console.error('Error fetching pets: ', error);
                return of([]);
            })
        );
    }

    createPet(pet: Pet) {
        const petDTO = new PetDTO(
            pet.name,
            pet.species.id,
            pet.gender,
            pet.birthDate,
            pet.owner.id
        );
        this.petService.insertPet(petDTO).subscribe((message: string) => {
            this.fetchAllPets();
            this.setMode('list');
        });
    }

    deletePet(pet: Pet) {
        if (confirm('Are you sure you want to delete this pet?')) {
            this.petService.deletePet(pet.id).subscribe((message: string) => {
                this.fetchAllPets();
                this.setMode('list');
            });
        }
    }

    updatePet(pet: Pet) {
        if (this.pet) {
            const petDTO = new PetDTO(
                pet.name,
                pet.species.id,
                pet.gender,
                pet.birthDate,
                pet.owner.id
            );
            this.petService.updatePet(this.pet.id, petDTO).subscribe((message: string) => {
                this.fetchAllPets();
                this.setMode('list');
            });
        }
    }

    editPet(pet: Pet) {
        this.pet = pet;
        this.setMode('edit');
    }

    bookPet(pet: Pet) {
        // Use router state to pass the complex Pet object
        this.router.navigate(['/bookings'], { state: { petToBook: pet, mode: 'add' } });
    }
}
