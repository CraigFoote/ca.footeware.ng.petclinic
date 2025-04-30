import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Booking } from '../../model/Booking';
import { Procedure } from '../../model/Procedure';
import { Pet } from '../../model/Pet';
import { Vet } from '../../model/Vet';

@Component({
    selector: 'app-edit-booking-form',
    imports: [
        CommonModule,
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
    templateUrl: './edit-booking-form.component.html',
    styleUrl: './edit-booking-form.component.css',
    standalone: true
})
export class EditBookingFormComponent implements OnChanges {

    editBookingForm: FormGroup;
    @Input() booking?: Booking;
    @Input() procedures: Procedure[] = [];
    @Input() pets: Pet[] = [];
    @Input() vets: Vet[] = [];
    @Output() saveClicked = new EventEmitter<Booking>();
    @Output() cancelClicked = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {
        this.editBookingForm = this.formBuilder.group({
            id: new FormControl(),
            date: new FormControl('', Validators.required),
            procedure: new FormControl('', Validators.required),
            pet: new FormControl('', Validators.required),
            vet: new FormControl('', Validators.required)
        });
    }

    setMode(mode: string) {
        this.cancelClicked.emit(mode);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.booking && this.procedures && this.pets && this.vets) {
            const selectedProcedure = this.procedures.find(p => p.id === this.booking?.procedure.id);
            const selectedPet = this.pets.find(p => p.id === this.booking?.pet.id);
            const selectedVet = this.vets.find(v => v.id === this.booking?.vet.id);
            this.editBookingForm.setValue({
                id: this.booking.id,
                date: this.booking.date,
                procedure: selectedProcedure,
                pet: selectedPet,
                vet: selectedVet
            });
        }
    }

    updateBooking() {
        this.saveClicked.emit(this.editBookingForm.value);
    }
}
