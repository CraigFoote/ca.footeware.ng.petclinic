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
import { Owner } from '../../model/Owner';
import { Province } from '../../model/Province';

@Component({
    selector: 'app-add-owner-form',
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
    templateUrl: './add-owner-form.component.html',
    styleUrl: './add-owner-form.component.css',
    standalone: true
})
export class AddOwnerFormComponent {

    addOwnerForm: FormGroup;
    @Input() provinces: Province[] = Object.values(Province);
    @Output() saveClicked = new EventEmitter<Owner>();
    @Output() cancelClicked = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {
        this.addOwnerForm = this.formBuilder.group({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            address: new FormControl(''),
            city: new FormControl(''),
            province: new FormControl(''),
            postalCode: new FormControl(''),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', [Validators.required])
        });
    }

    createOwner() {
        this.saveClicked.emit(this.addOwnerForm.value);
    }

    setMode(mode: string) {
        this.cancelClicked.emit(mode);
    }
}
