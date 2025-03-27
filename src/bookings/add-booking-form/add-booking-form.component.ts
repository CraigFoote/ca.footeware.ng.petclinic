import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pet } from '../../model/Pet';
import { Procedure } from '../../model/Procedure';
import { Vet } from '../../model/Vet';
import { Booking } from '../../model/Booking';

@Component({
    selector: 'app-add-booking-form',
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
    templateUrl: './add-booking-form.component.html',
    styleUrl: './add-booking-form.component.css',
    standalone: true
})
export class AddBookingFormComponent {

    addBookingForm: FormGroup;
    @Input() pets: Pet[] = [];
    @Input() procedures: Procedure[] = [];
    @Input() vets: Vet[] = [];
    @Output() saveClicked = new EventEmitter<Booking>();
    @Output() cancelClicked = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {
        this.addBookingForm = this.formBuilder.group({
            date: new FormControl('', Validators.required),
            pet: new FormControl('', Validators.required),
            procedure: new FormControl('', Validators.required),
            vet: new FormControl('', Validators.required)
        });
    }

    createBooking() {
        this.saveClicked.emit(this.addBookingForm.value);
    }

    setMode(mode: string) {
        this.cancelClicked.emit(mode);
    }
}
