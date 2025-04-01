import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Pet } from '../../model/Pet';

@Component({
    selector: 'app-pet-card',
    imports: [
        MatButtonModule,
        CommonModule,
        MatCardModule
    ],
    templateUrl: './pet-card.component.html',
    styleUrl: './pet-card.component.css'
})
export class PetCardComponent {

    @Input() view?: string;
    @Input() pets: Pet[] = [];
    @Output() deleteClicked = new EventEmitter<Pet>();
    @Output() editClicked = new EventEmitter<Pet>();
    @Output() bookClicked = new EventEmitter<Pet>();

    deletePet(pet: Pet) {
        this.deleteClicked.emit(pet);
    }

    editPet(pet: Pet) {
        this.editClicked.emit(pet);
    }

    bookPet(pet: Pet) {
        this.bookClicked.emit(pet);
    }
}
