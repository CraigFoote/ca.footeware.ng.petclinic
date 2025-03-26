import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Species } from '../../model/Species';
import { PetService } from '../../services/pet.service';
import { SpeciesCardComponent } from '../species-card/species-card.component';
import { EditSpeciesFormComponent } from '../edit-species-form/edit-species-form.component';
import { AddSpeciesFormComponent } from "../add-species-form/add-species-form.component";

@Component({
    selector: 'app-species-page',
    imports: [
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    SpeciesCardComponent,
    EditSpeciesFormComponent,
    AddSpeciesFormComponent
],
    providers: [PetService],
    templateUrl: './species-page.component.html',
    styleUrl: './species-page.component.css'
})
export class SpeciesPageComponent implements OnInit {

    mode: string = 'list';
    species?: Species;
    allSpecies: Species[] = [];

    constructor(private petService: PetService) {
    }

    ngOnInit(): void {
        this.getAllSpecies();
    }

    setMode(mode: string) {
        this.mode = mode;
    }

    getAllSpecies() {
        this.petService.getAllSpecies().subscribe((allSpecies: Species[]) => {
            allSpecies = allSpecies.sort((a, b) => a.name.localeCompare(b.name));
            this.allSpecies = allSpecies;
        });
    }

    createSpecies(species: Species) {
        this.petService.insertSpecies(species).subscribe((species: Species) => {
            this.getAllSpecies();
            this.setMode('list');
        });
    }

    editSpecies(species: Species) {
        this.species = species;
        this.setMode('edit');
    }

    deleteSpecies(species: Species) {
        if (confirm('Are you sure you want to delete this species?')) {
            this.petService.deleteSpecies(species.id).subscribe((message: string) => {
                this.getAllSpecies();
                this.setMode('list');
            });
        }
    }

    updateSpecies(species: Species) {
        this.petService.updateSpecies(species.id, species).subscribe((message: string) => {
            this.getAllSpecies();
            this.setMode('list');
        });
    }
}
