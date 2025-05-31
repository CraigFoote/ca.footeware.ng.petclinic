import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'; // Import ChangeDetectorRef, OnChanges, SimpleChanges
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pet } from '../../model/Pet';
import { Procedure } from '../../model/Procedure';
import { Vet } from '../../model/Vet';
import { Booking } from '../../model/Booking';

@Component({
    selector: 'app-add-booking-form',
    imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
],
    providers: [
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'en-CA' },
    ],
    templateUrl: './add-booking-form.component.html',
    styleUrl: './add-booking-form.component.css',
    standalone: true
})
export class AddBookingFormComponent { // Remove OnChanges

    addBookingForm: FormGroup;

    // Use private backing fields and setters for inputs
    private _pets: Pet[] = [];
    @Input()
    set pets(value: Pet[]) {
        this._pets = value;
        this.updatePetSelection(); // Call update logic when pets list changes
    }
    get pets(): Pet[] {
        return this._pets;
    }

    private _petToBook?: Pet;
    @Input()
    set petToBook(value: Pet | undefined) {
        this._petToBook = value;
        this.updatePetSelection(); // Call update logic when petToBook changes
    }
    get petToBook(): Pet | undefined {
        return this._petToBook;
    }

    // Keep other inputs/outputs as they are
    @Input() procedures: Procedure[] = [];
    @Input() vets: Vet[] = [];
    @Output() saveClicked = new EventEmitter<Booking>();
    @Output() cancelClicked = new EventEmitter<string>();

    constructor(
        private formBuilder: FormBuilder,
        // ChangeDetectorRef might not be needed anymore, but keep it for now
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.addBookingForm = this.formBuilder.group({
            date: new FormControl('', Validators.required),
            pet: new FormControl<Pet | null>(null, Validators.required), // Use typed FormControl
            procedure: new FormControl<Procedure | null>(null, Validators.required), // Use typed FormControl
            vet: new FormControl<Vet | null>(null, Validators.required) // Use typed FormControl
        });
    }

    // Centralized logic to update the pet selection in the form
    private updatePetSelection(): void {
        // Ensure the form is initialized before trying to access controls
        if (!this.addBookingForm) {
            return;
        }

        // Check if petToBook is set and the pets list is populated
        if (this._petToBook && this._pets.length > 0) {
            // Find the pet from the input within the full pets list
            const petInList = this._pets.find(p => p.id === this._petToBook?.id);
            const currentPetValue = this.addBookingForm.controls['pet'].value;

            // Set the form value only if it's not already set or if the petToBook has changed
            if (petInList && (!currentPetValue || currentPetValue.id !== petInList.id)) {
                this.addBookingForm.controls['pet'].setValue(petInList);
            } else if (!petInList && currentPetValue) {
                // If the petToBook is no longer valid, clear the selection
                this.addBookingForm.controls['pet'].setValue(null);
            }
        } else if (!this._petToBook && this.addBookingForm.controls['pet'].value) {
             // If petToBook becomes null/undefined, clear the selection
             this.addBookingForm.controls['pet'].setValue(null);
        }
    }


    createBooking() {
        this.saveClicked.emit(this.addBookingForm.value);
    }

    setMode(mode: string) {
        this.cancelClicked.emit(mode);
    }
}
