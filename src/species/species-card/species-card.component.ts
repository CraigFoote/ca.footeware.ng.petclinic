import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Species } from '../../model/Species';

@Component({
    selector: 'app-species-card',
    imports: [
        MatButtonModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule
    ],
    templateUrl: './species-card.component.html',
    styleUrl: './species-card.component.css',
    standalone: true
})
export class SpeciesCardComponent {

    @Input() allSpecies: Species[] = [];
    @Output() deleteClicked = new EventEmitter<Species>();
    @Output() editClicked = new EventEmitter<Species>();

    deleteSpecies(species: Species) {
        this.deleteClicked.emit(species);
    }

    editSpecies(species: Species) {
        this.editClicked.emit(species);
    }
}
