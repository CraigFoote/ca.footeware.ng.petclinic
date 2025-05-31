import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
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
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Owner } from '../../model/Owner';
import { Province } from '../../model/Province';

@Component({
    selector: 'app-edit-owner-form',
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
    templateUrl: './edit-owner-form.component.html',
    styleUrl: './edit-owner-form.component.css',
    standalone: true
})
export class EditOwnerFormComponent implements OnChanges {

    editOwnerForm: FormGroup;
    @Input() owner?: Owner;
    @Input() provinces: Province[] = Object.values(Province);
    @Output() saveClicked = new EventEmitter<Owner>();
    @Output() cancelClicked = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {
        this.editOwnerForm = this.formBuilder.group({
            id: new FormControl(),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            province: new FormControl('', Validators.required),
            postalCode: new FormControl('', Validators.required),
            email: new FormControl('', Validators.email),
            phone: new FormControl('', Validators.required)
        });
    }

    setMode(mode: string) {
        this.cancelClicked.emit(mode);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.owner) {
            this.editOwnerForm.setValue({
                id: this.owner.id,
                firstName: this.owner.firstName,
                lastName: this.owner.lastName,
                address: this.owner.address,
                city: this.owner.city,
                province: this.owner.province,
                postalCode: this.owner.postalCode,
                email: this.owner.email,
                phone: this.owner.phone
            });
        }
    }

    updateOwner() {
        this.saveClicked.emit(this.editOwnerForm.value);
    }
}
