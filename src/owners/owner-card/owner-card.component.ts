import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Owner } from '../../model/Owner';

@Component({
    selector: 'app-owner-card',
    imports: [
        MatButtonModule,
        CommonModule,
        MatCardModule
    ],
    templateUrl: './owner-card.component.html',
    styleUrl: './owner-card.component.css'
})
export class OwnerCardComponent {

    @Input() owners: Owner[] = [];
    @Output() deleteClicked = new EventEmitter<Owner>();
    @Output() editClicked = new EventEmitter<Owner>();

    deleteOwner(owner: Owner) {
        this.deleteClicked.emit(owner);
    }

    editOwner(owner: Owner) {
        this.editClicked.emit(owner);
    }
}
