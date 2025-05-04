import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Pet } from '../../model/Pet';

@Component({
    selector: 'app-pet-card',
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        RouterLink
    ] as const,
    templateUrl: './pet-card.component.html',
    styleUrl: './pet-card.component.css',
    standalone: true
})
export class PetCardComponent {

    @Input() pets: Pet[] = [];
    @Output() editClicked = new EventEmitter<Pet>();
    @Output() bookClicked = new EventEmitter<Pet>();

    editPet(pet: Pet) {
        this.editClicked.emit(pet);
    }

    bookPet(pet: Pet) {
        this.bookClicked.emit(pet);
    }
}
