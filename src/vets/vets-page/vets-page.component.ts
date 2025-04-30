import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Vet } from '../../model/Vet';
import { PetService } from '../../services/pet.service';
import { VetCardComponent } from "../vet-card/vet-card.component";
import { EditVetFormComponent } from "../edit-vet-form/edit-vet-form.component";
import { AddVetFormComponent } from "../add-vet-form/add-vet-form.component";

@Component({
    selector: 'app-vets-page',
    imports: [
        MatButtonModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        VetCardComponent,
        EditVetFormComponent,
        AddVetFormComponent
    ],
    providers: [PetService],
    templateUrl: './vets-page.component.html',
    styleUrl: './vets-page.component.css',
    standalone: true
})
export class VetsPageComponent implements OnInit {

    mode: string = 'list';
    vets: Vet[] = [];
    vet?: Vet;

    constructor(private petService: PetService) {
    }

    ngOnInit(): void {
        this.getAllVets();
    }

    setMode(mode: string) {
        this.mode = mode;
    }

    getVetById(id: string) {
        this.petService.getVetById(id).subscribe((vet: Vet) => {
            return vet;
        });
    }

    getAllVets() {
        this.petService.getAllVets().subscribe((vets: Vet[]) => {
            vets = vets.sort((a, b) => a.lastName.localeCompare(b.firstName));
            this.vets = vets;
        });
    }

    createVet(vet: Vet) {
        this.petService.insertVet(vet).subscribe((message: string) => {
            this.getAllVets();
            this.setMode('list');
        });
    }

    deleteVet(vet: Vet) {
        if (confirm('Are you sure you want to delete this vet?')) {
            this.petService.deleteVet(vet.id).subscribe((message: string) => {
                this.getAllVets();
                this.setMode('list');
            });
        }
    }

    editVet(vet: Vet) {
        this.vet = vet;
        this.setMode('edit');
    }

    updateVet(vet: Vet) {
        if (this.vet) {
            this.petService.updateVet(this.vet.id, vet).subscribe((message: string) => {
                this.getAllVets();
                this.setMode('list');
            });
        }
    }
}