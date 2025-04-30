import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Procedure } from '../../model/Procedure';

@Component({
    selector: 'app-edit-procedure-form',
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'en-CA' },
    ],
    templateUrl: './edit-procedure-form.component.html',
    styleUrl: './edit-procedure-form.component.css',
    standalone: true
})
export class EditProcedureFormComponent {

    editProcedureForm: FormGroup;
    @Input() procedure?: Procedure;
    @Output() saveClicked = new EventEmitter<Procedure>();
    @Output() cancelClicked = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {
        this.editProcedureForm = this.formBuilder.group({
            id: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            cost: new FormControl('', Validators.required)
        });
    }

    setMode(mode: string) {
        this.cancelClicked.emit(mode);
    }

    updateProcedure() {
        this.saveClicked.emit(this.editProcedureForm.value);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.procedure) {
            this.editProcedureForm.patchValue(this.procedure);
        }
    }
}
