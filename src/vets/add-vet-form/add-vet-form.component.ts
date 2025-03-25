import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { Gender } from '../../model/Gender';
import { Species } from '../../model/Species';
import { Owner } from '../../model/Owner';
import { Vet } from '../../model/Vet';

@Component({
    selector: 'app-add-vet-form',
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './add-vet-form.component.html',
    styleUrl: './add-vet-form.component.css'
})
export class AddVetFormComponent {

    addVetForm: FormGroup;
    @Output() saveClicked = new EventEmitter<Vet>();
    @Output() cancelClicked = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {
        this.addVetForm = this.formBuilder.group({
            lastName: new FormControl('', [Validators.required]),
            firstName: new FormControl('', [Validators.required]),
        });
    }

    save() {
        this.saveClicked.emit(this.addVetForm.value);
    }

    cancel() {
        this.cancelClicked.emit('cancel');
    }
}
