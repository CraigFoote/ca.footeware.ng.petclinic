import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Species } from '../model/Species';
import { PetService } from '../services/pet.service';

@Component({
    selector: 'app-species',
    imports: [
        MatButtonModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [PetService],
    templateUrl: './species.component.html',
    styleUrl: './species.component.css'
})
export class SpeciesComponent implements OnInit {

    mode: string = 'list';
    species: Species[] = [];
    currentSpeciesId?: string;
    addSpeciesForm: FormGroup;
    editSpeciesForm: FormGroup;

    constructor(private petService: PetService, private formBuilder: FormBuilder) {
        this.addSpeciesForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        });

        this.editSpeciesForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        this.getAllSpecies();
    }

    setMode(mode: string) {
        this.mode = mode;
    }

    getSpeciesById(id: string) {
        this.petService.getSpeciesById(id).subscribe((species: Species) => {
            return species;
        });
    }

    getAllSpecies() {
        this.petService.getAllSpecies().subscribe((species: Species[]) => {
            species = species.sort((a, b) => a.name.localeCompare(b.name));
            this.species = species;
        });
    }

    addSpecies() {
        const species = new Species({
            name: this.addSpeciesForm.value.name,
            description: this.addSpeciesForm.value.description
        });
        this.petService.insertSpecies(species).subscribe((species: Species) => {
            this.getAllSpecies();
            this.setMode('list');
        });
    }

    editSpecies(id: string, name: string, description: string) {
        this.currentSpeciesId = id;
        this.editSpeciesForm.controls['name'].setValue(name);
        this.editSpeciesForm.controls['description'].setValue(description);
        this.editSpeciesForm.setValue({ name: name, description: description });
        this.setMode('edit');
    }

    deleteSpecies(id: string) {
        if (confirm('Are you sure you want to delete this species?')) {
            this.petService.deleteSpecies(id).subscribe((message: string) => {
                this.getAllSpecies();
                this.setMode('list');
            });
        }
    }

    saveSpecies() {
        if (this.currentSpeciesId) {
            const species = new Species({
                name: this.editSpeciesForm.value.name,
                description: this.editSpeciesForm.value.description,
            });
            this.petService.updateSpecies(this.currentSpeciesId, species).subscribe((message: string) => {
                this.getAllSpecies();
                this.setMode('list');
            });
        }
    }
}
