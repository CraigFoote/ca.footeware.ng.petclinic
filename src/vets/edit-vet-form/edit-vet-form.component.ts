import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Vet } from '../../model/Vet';

@Component({
    selector: 'app-edit-vet-form',
    imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
],
    templateUrl: './edit-vet-form.component.html',
    styleUrl: './edit-vet-form.component.css',
    standalone: true
})
export class EditVetFormComponent implements OnChanges {

    editVetForm: FormGroup;
    @Input() vet?: Vet;
    @Output() saveClicked = new EventEmitter<Vet>();
    @Output() cancelClicked = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {
        this.editVetForm = this.formBuilder.group({
            id: new FormControl(),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
        });
    }

    setMode(mode: string) {
        this.cancelClicked.emit(mode);
    }

    updateVet() {
        this.saveClicked.emit(this.editVetForm.value);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.vet) {
            this.editVetForm.patchValue(this.vet);
        }
    }
}
