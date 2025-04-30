import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Species } from '../../model/Species';

@Component({
    selector: 'app-add-species-form',
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
    templateUrl: './add-species-form.component.html',
    styleUrl: './add-species-form.component.css',
    standalone: true
})
export class AddSpeciesFormComponent {

    addSpeciesForm: FormGroup;
    @Output() saveClicked = new EventEmitter<Species>();
    @Output() cancelClicked = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {
        this.addSpeciesForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        });
    }

    createSpecies() {
        const species = this.addSpeciesForm.value as Species;
        this.saveClicked.emit(species);
    }

    setMode(mode: string) {
        this.cancelClicked.emit(mode);
    }
}
