import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Procedure } from '../../model/Procedure';

@Component({
    selector: 'app-add-procedure-form',
    imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
],
    templateUrl: './add-procedure-form.component.html',
    styleUrl: './add-procedure-form.component.css',
    standalone: true
})
export class AddProcedureFormComponent {

    addProcedureForm: FormGroup;
    @Output() saveClicked = new EventEmitter<Procedure>();
    @Output() cancelClicked = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {
        this.addProcedureForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            cost: new FormControl('', Validators.required)
        });
    }

    createProcedure() {
        this.saveClicked.emit(this.addProcedureForm.value);
    }

    setMode(mode: string) {
        this.cancelClicked.emit(mode);
    }
}
