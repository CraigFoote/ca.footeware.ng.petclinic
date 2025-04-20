import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
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

    setMode(mode: string) {
        this.cancelClicked.emit(mode);
    }

    save() {
        this.saveClicked.emit(this.addVetForm.value);
    }

    createVet() {
        this.saveClicked.emit(this.addVetForm.value);
    }
}
