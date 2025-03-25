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
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { PetService } from '../pet.service';
import { Owner } from '../model/Owner';
import { Province } from '../model/Province';

@Component({
    selector: 'app-owners',
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
        MatSelectModule
    ],
    providers: [PetService,
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'en-CA' },
    ],
    templateUrl: './owners.component.html',
    styleUrl: './owners.component.css'
})
export class OwnersComponent implements OnInit {

  mode: string = 'list';
  owners: Owner[] = [];
  provinces: Province[] = Object.values(Province);
  currentOwnerId?: string;
  addOwnerForm: FormGroup;
  editOwnerForm: FormGroup;

  constructor(private petService: PetService, private formBuilder: FormBuilder) {
    this.addOwnerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(),
      address: new FormControl(),
      city: new FormControl(),
      province: new FormControl(),
      postalCode: new FormControl(),
      email: new FormControl(),
      phone: new FormControl()
    });

    this.editOwnerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(),
      address: new FormControl(),
      city: new FormControl(),
      province: new FormControl(),
      postalCode: new FormControl(),
      email: new FormControl(),
      phone: new FormControl()
    });
  }

  ngOnInit(): void {
    this.getAllOwners();
  }

  setMode(mode: string) {
    this.mode = mode;
  }

  getOwnerById(id: string) {
    this.petService.getOwnerById(id).subscribe((owner: Owner) => {
      return owner;
    });
  }

  getAllOwners() {
    this.petService.getAllOwners().subscribe((owners: Owner[]) => {
      owners = owners.sort((a, b) => a.lastName.localeCompare(b.lastName));
      this.owners = owners;
    });
  }

  addOwner() {
    const owner = new Owner(
      this.addOwnerForm.value.firstName,
      this.addOwnerForm.value.lastName,
      this.addOwnerForm.value.address,
      this.addOwnerForm.value.city,
      this.addOwnerForm.value.province,
      this.addOwnerForm.value.postalCode,
      this.addOwnerForm.value.email,
      this.addOwnerForm.value.phone);
    this.petService.insertOwner(owner).subscribe((message: string) => {
      this.getAllOwners();
      this.setMode('list');
    });
  }

  deleteOwner(id: string) {
    if (confirm('Are you sure you want to delete this owner?')) {
      this.petService.deleteOwner(id).subscribe((message: string) => {
        this.getAllOwners();
        this.setMode('list');
      });
    }
  }

  editOwner(id: string, firstName: string, lastName: string, address: string, city: string,
    province: Province, postalCode: string, email: string, phone: string) {
    this.currentOwnerId = id;
    this.editOwnerForm.controls['firstName'].setValue(firstName);
    this.editOwnerForm.controls['lastName'].setValue(lastName);
    this.editOwnerForm.controls['address'].setValue(address);
    this.editOwnerForm.controls['city'].setValue(city);
    this.editOwnerForm.controls['province'].setValue(province);
    this.editOwnerForm.controls['postalCode'].setValue(postalCode);
    this.editOwnerForm.controls['email'].setValue(email);
    this.editOwnerForm.controls['phone'].setValue(phone);
    this.setMode('edit');
  }

  saveOwner() {
    if (this.currentOwnerId) {
      const owner = new Owner(
        this.editOwnerForm.value.firstName,
        this.editOwnerForm.value.lastName,
        this.editOwnerForm.value.address,
        this.editOwnerForm.value.city,
        this.editOwnerForm.value.province,
        this.editOwnerForm.value.postalCode,
        this.editOwnerForm.value.email,
        this.editOwnerForm.value.phone
      );
      this.petService.updateOwner(this.currentOwnerId, owner).subscribe((message: string) => {
        this.getAllOwners();
        this.setMode('list');
      });
    }
  }
}
