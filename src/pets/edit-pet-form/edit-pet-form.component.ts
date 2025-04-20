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
import { Gender } from '../../model/Gender';
import { Species } from '../../model/Species';
import { Owner } from '../../model/Owner';
import { Pet } from '../../model/Pet';

@Component({
    selector: 'app-edit-pet-form',
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
    templateUrl: './edit-pet-form.component.html',
    styleUrl: './edit-pet-form.component.css',
    standalone: true
})
export class EditPetFormComponent implements OnChanges {

    editPetForm: FormGroup;
    genders: Gender[] = Object.values(Gender);
    @Input() pet?: Pet;
    @Input() owners?: Owner[];
    @Input() allSpecies?: Species[];
    @Output() saveClicked = new EventEmitter<Pet>();
    @Output() cancelClicked = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {
        this.editPetForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            species: new FormControl('', Validators.required),
            gender: new FormControl('', Validators.required),
            birthDate: new FormControl('', Validators.required),
            owner: new FormControl()
        });
    }

    setMode(mode: string) {
        this.cancelClicked.emit(mode);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.pet && this.allSpecies && this.owners) {
            const selectedSpecies = this.allSpecies.find(s => s.name === this.pet?.species.name);
            const selectedOwner = this.owners.find(o => o.lastName === this.pet?.owner.lastName && o.firstName === this.pet?.owner.firstName);
            this.editPetForm.setValue({
                name: this.pet.name,
                species: selectedSpecies,
                gender: this.pet.gender,
                birthDate: this.pet.birthDate,
                owner: selectedOwner
            });
        }
    }

    updatePet() {
        this.saveClicked.emit(this.editPetForm.value);
    }
}
