import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Procedure } from '../../model/Procedure';
import { PetService } from '../../services/pet.service';
import { ProcedureCardComponent } from '../procedure-card/procedure-card.component';
import { EditProcedureFormComponent } from '../edit-procedure-form/edit-procedure-form.component';
import { AddProcedureFormComponent } from "../add-procedure-form/add-procedure-form.component";

@Component({
    selector: 'app-procedures-page',
    imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    ProcedureCardComponent,
    EditProcedureFormComponent,
    AddProcedureFormComponent
],
    providers: [PetService],
    templateUrl: './procedures-page.component.html',
    styleUrl: './procedures-page.component.css',
    standalone: true
})
export class ProceduresPageComponent implements OnInit {

    mode: string = 'list';
    @Input() procedure?: Procedure;
    procedures: Procedure[] = [];

    constructor(private petService: PetService) {
    }

    ngOnInit(): void {
        this.getAllProcedures();
    }

    setMode(mode: string) {
        this.mode = mode;
    }

    getAllProcedures() {
        this.petService.getAllProcedures().subscribe((procedures: Procedure[]) => {
            procedures = procedures.sort((a, b) => a.name.localeCompare(b.name));
            this.procedures = procedures;
        });
    }

    createProcedure(procedure: Procedure) {
        this.petService.insertProcedure(procedure).subscribe((message: string) => {
            this.getAllProcedures();
            this.setMode('list');
        });
    }

    deleteProcedure(procedure: Procedure) {
        if (confirm('Are you sure you want to delete this procedure?')) {
            this.petService.deleteProcedure(procedure.id).subscribe((message: string) => {
                this.getAllProcedures();
                this.setMode('list');
            });
        }
    }

    updateProcedure(procedure: Procedure) {
        this.petService.updateProcedure(procedure.id, procedure).subscribe((message: string) => {
            this.getAllProcedures();
            this.setMode('list');
        });
    }

    editProcedure(procedure: Procedure) {
        this.procedure = procedure;
        this.setMode('edit');
    }
}