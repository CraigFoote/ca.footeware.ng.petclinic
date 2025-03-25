import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Vet } from '../../model/Vet';
import { PetService } from '../../pet.service';
import { VetCardComponent } from "../vet-card/vet-card.component";

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
        VetCardComponent
    ],
    providers: [PetService],
    templateUrl: './vets-page.component.html',
    styleUrl: './vets-page.component.css'
})
export class VetsPageComponent implements OnInit {

    mode: string = 'list';
    vets: Vet[] = [];
    currentVetId?: string;
    addVetForm: FormGroup;
    editVetForm: FormGroup;

    constructor(private petService: PetService, private formBuilder: FormBuilder) {
        this.addVetForm = this.formBuilder.group({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
        });

        this.editVetForm = this.formBuilder.group({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
        });
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

    addVet() {
        const vet = new Vet({
            firstName: this.addVetForm.value.firstName,
            lastName: this.addVetForm.value.lastName,
        });
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
        this.currentVetId = vet.id;
        this.editVetForm.controls['firstName'].setValue(vet.firstName);
        this.editVetForm.controls['lastName'].setValue(vet.lastName);
        this.setMode('edit');
    }

    saveVet() {
        if (this.currentVetId) {
            const vet = new Vet({
                firstName: this.editVetForm.value.firstName,
                lastName: this.editVetForm.value.lastName,
            });
            this.petService.updateVet(this.currentVetId, vet).subscribe((message: string) => {
                this.getAllVets();
                this.setMode('list');
            });
        }
    }
}