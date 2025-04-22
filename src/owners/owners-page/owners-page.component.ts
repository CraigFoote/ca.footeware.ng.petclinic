import { Component, OnInit } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, ActivatedRoute } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { Owner } from '../../model/Owner';
import { Province } from '../../model/Province';
import { OwnerCardComponent } from '../owner-card/owner-card.component';
import { AddOwnerFormComponent } from '../add-owner-form/add-owner-form.component';
import { EditOwnerFormComponent } from '../edit-owner-form/edit-owner-form.component';

@Component({
    selector: 'app-owners-page',
    imports: [
        MatButtonModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatRadioModule,
        MatDatepickerModule,
        MatSelectModule,
        AddOwnerFormComponent,
        OwnerCardComponent,
        EditOwnerFormComponent
    ],
    providers: [PetService,
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'en-CA' },
    ],
    templateUrl: './owners-page.component.html',
    styleUrl: './owners-page.component.css',
    standalone: true,
})
export class OwnersPageComponent implements OnInit {

    id?: string;
    mode: string = 'list';
    owners: Owner[] = [];
    provinces: Province[] = Object.values(Province);
    owner?: Owner;

    constructor(private petService: PetService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.getAllOwners();
    }

    setMode(mode: string) {
        this.mode = mode;
    }

    getAllOwners() {
        this.petService.getAllOwners().subscribe((owners: Owner[]) => {
            if(this.id){
                this.owners = owners.filter(owner => owner.id === this.id);
            } else {
                this.owners = owners;
            }
            this.owners.sort((a, b) => a.lastName.localeCompare(b.lastName));
        });
    }

    createOwner(owner: Owner) {
        if (owner) {
            this.petService.insertOwner(owner).subscribe((message: string) => {
                this.getAllOwners();
                this.setMode('list');
            });
        }
    }

    deleteOwner(owner: Owner) {
        if (confirm('Are you sure you want to delete this owner?')) {
            this.petService.deleteOwner(owner.id).subscribe((message: string) => {
                this.getAllOwners();
                this.setMode('list');
            });
        }
    }

    updateOwner(owner: Owner) {
        this.petService.updateOwner(owner.id, owner).subscribe((message: string) => {
            this.getAllOwners();
            this.setMode('list');
        });
    }

    editOwner(owner: Owner) {
        this.owner = owner;
        this.setMode('edit');
    }
}
