import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Procedure } from '../model/Procedure';
import { PetService } from '../pet.service';

@Component({
    selector: 'app-procedures',
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
    templateUrl: './procedures.component.html',
    styleUrl: './procedures.component.css'
})
export class ProceduresComponent implements OnInit {

    mode: string = 'list';
    procedures: Procedure[] = [];
    currentProcedureId?: string;
    addProcedureForm: FormGroup;
    editProcedureForm: FormGroup;

    constructor(private petService: PetService, private formBuilder: FormBuilder) {
        this.addProcedureForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            cost: new FormControl('', Validators.required),
        });

        this.editProcedureForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            cost: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        this.getAllProcedures();
    }

    setMode(mode: string) {
        this.mode = mode;
    }

    getProcedureById(id: string) {
        this.petService.getProcedureById(id).subscribe((procedure: Procedure) => {
            return procedure;
        });
    }

    getAllProcedures() {
        this.petService.getAllProcedures().subscribe((procedures: Procedure[]) => {
            procedures = procedures.sort((a, b) => a.name.localeCompare(b.name));
            this.procedures = procedures;
        });
    }

    addProcedure() {
        const procedure = new Procedure(this.addProcedureForm.value.name, this.addProcedureForm.value.cost);
        this.petService.insertProcedure(procedure).subscribe((message: string) => {
            this.getAllProcedures();
            this.setMode('list');
        });
    }

    deleteProcedure(id: string) {
        if (confirm('Are you sure you want to delete this procedure?')) {
            this.petService.deleteProcedure(id).subscribe((message: string) => {
                this.getAllProcedures();
                this.setMode('list');
            });
        }
    }

    editProcedure(procedure: Procedure) {
        this.currentProcedureId = procedure.id;
        this.editProcedureForm.controls['name'].setValue(procedure.name);
        this.editProcedureForm.controls['cost'].setValue(procedure.cost);
        this.setMode('edit');
    }

    saveProcedure() {
        if (this.currentProcedureId) {
            const procedure = new Procedure(this.editProcedureForm.value.name, this.editProcedureForm.value.cost);
            this.petService.updateProcedure(this.currentProcedureId, procedure).subscribe((message: string) => {
                this.getAllProcedures();
                this.setMode('list');
            });
        }
    }
}