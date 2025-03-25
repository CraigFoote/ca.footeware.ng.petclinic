import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Pet } from '../../model/Pet';

@Component({
    selector: 'app-pet-card',
    imports: [
        MatButtonModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule
    ],
    templateUrl: './pet-card.component.html',
    styleUrl: './pet-card.component.css'
})
export class PetCardComponent {

    @Input() pets: Pet[] = [];
    @Output() deleteClicked = new EventEmitter<Pet>();
    @Output() editClicked = new EventEmitter<Pet>();

    deletePet(pet: Pet) {
        this.deleteClicked.emit(pet);
    }

    editPet(pet: Pet) {
        this.editClicked.emit(pet);
    }
}
