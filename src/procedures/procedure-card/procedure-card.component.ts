import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Procedure } from '../../model/Procedure';

@Component({
    selector: 'app-procedure-card',
    imports: [
        MatButtonModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule
    ],
    templateUrl: './procedure-card.component.html',
    styleUrl: './procedure-card.component.css',
    standalone: true
})
export class ProcedureCardComponent {

    @Input() procedures: Procedure[] = [];
    @Output() deleteClicked = new EventEmitter<Procedure>();
    @Output() editClicked = new EventEmitter<Procedure>();

    deleteProcedure(procedure: Procedure) {
        this.deleteClicked.emit(procedure);
    }

    editProcedure(procedure: Procedure) {
        this.editClicked.emit(procedure);
    }
}
