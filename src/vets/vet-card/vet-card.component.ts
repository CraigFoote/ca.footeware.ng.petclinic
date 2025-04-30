import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Vet } from '../../model/Vet';

@Component({
    selector: 'app-vet-card',
    imports: [
        MatButtonModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    templateUrl: './vet-card.component.html',
    styleUrl: './vet-card.component.css',
    standalone: true
})
export class VetCardComponent {

    @Input() vets: Vet[] = [];
    @Output() deleteClicked = new EventEmitter<Vet>();
    @Output() editClicked = new EventEmitter<Vet>();

    deleteVet(vet: Vet) {
        this.deleteClicked.emit(vet);
    }

    editVet(vet: Vet) {
        this.editClicked.emit(vet);
    }
}
