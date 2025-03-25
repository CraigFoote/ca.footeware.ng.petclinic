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
import { Pet } from '../../model/Pet';

@Component({
    selector: 'app-add-pet-form',
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
    templateUrl: './add-pet-form.component.html',
    styleUrl: './add-pet-form.component.css'
})
export class AddPetFormComponent {

    addPetForm: FormGroup;
    genders: Gender[] = [Gender.MALE, Gender.FEMALE];
    @Input() owners?: Owner[];
    @Input() allSpecies?: Species[];
    @Output() saveClicked = new EventEmitter<Pet>();
    @Output() cancelClicked = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {
        this.addPetForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            species: new FormControl('', Validators.required),
            gender: new FormControl('', Validators.required),
            birthDate: new FormControl('', Validators.required),
            owner: new FormControl()
        });
    }

    addPet() {
        this.saveClicked.emit(this.addPetForm.value);
    }

    setMode(mode: string) {
        this.cancelClicked.emit(mode);
    }
}