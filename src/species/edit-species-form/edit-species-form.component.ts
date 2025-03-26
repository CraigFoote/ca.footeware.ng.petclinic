import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Species } from '../../model/Species';

@Component({
    selector: 'app-edit-species-form',
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './edit-species-form.component.html',
    styleUrl: './edit-species-form.component.css',
    standalone: true
})
export class EditSpeciesFormComponent implements OnChanges{

    editSpeciesForm: FormGroup;
    @Input() species?: Species;
    @Output() saveClicked = new EventEmitter<Species>();
    @Output() cancelClicked = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {
        this.editSpeciesForm = this.formBuilder.group({
            id: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required)
        });
    }

    setMode(mode: string) {
        this.cancelClicked.emit(mode);
    }

    updateSpecies() {
        this.saveClicked.emit(this.editSpeciesForm.value);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.species) {
            this.editSpeciesForm.patchValue(this.species);
        }
    }
}
