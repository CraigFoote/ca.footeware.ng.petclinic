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
import { Pet } from '../model/pet';
import { PetService } from '../pet.service';
import { Species } from '../model/species';
import { Owner } from '../model/owner';
import { Gender } from '../model/gender';


@Component({
    selector: 'app-pets',
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
    templateUrl: './pets.component.html',
    styleUrl: './pets.component.css'
})
export class PetsComponent implements OnInit {

  mode: string = 'list';
  pets: Pet[] = [];
  currentPetId?: string;
  addPetForm: FormGroup;
  editPetForm: FormGroup;
  genders: Gender[] = [Gender.MALE, Gender.FEMALE];
  allSpecies?: Species[];
  owners?: Owner[];

  constructor(private petService: PetService, private formBuilder: FormBuilder) {
    this.addPetForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      speciesId: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      ownerId: new FormControl()
    });

    this.editPetForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      speciesId: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      ownerId: new FormControl()
    });
  }

  ngOnInit(): void {
    this.getAllPets();
    this.getAllSpecies();
    this.getAllOwners();
  }

  setMode(mode: string) {
    this.mode = mode;
  }

  getPetById(id: string) {
    this.petService.getPetById(id).subscribe((pet: Pet) => {
      return pet;
    });
  }

  getAllPets() {
    this.petService.getAllPets().subscribe((pets: Pet[]) => {
      pets = pets.sort((a, b) => a.name.localeCompare(b.name));
      this.pets = pets;
    });
  }

  addPet() {
    const pet = new Pet(
      this.addPetForm.value.name,
      this.addPetForm.value.speciesId,
      this.addPetForm.value.gender,
      this.addPetForm.value.birthDate,
      this.addPetForm.value.ownerId);
    this.petService.insertPet(pet).subscribe((message: string) => {
      this.getAllPets();
      this.setMode('list');
    });
  }

  deletePet(id: string) {
    if (confirm('Are you sure you want to delete this pet?')) {
      this.petService.deletePet(id).subscribe((message: string) => {
        this.getAllPets();
        this.setMode('list');
      });
    }
  }

  editPet(
    id: string,
    name: string,
    speciesId: string,
    gender: Gender,
    birthDate: Date,
    ownerId: string) {
    this.currentPetId = id;
    this.editPetForm.controls['name'].setValue(name);
    this.editPetForm.controls['speciesId'].setValue(speciesId);
    this.editPetForm.controls['gender'].setValue(gender);
    this.editPetForm.controls['birthDate'].setValue(birthDate);
    this.editPetForm.controls['ownerId'].setValue(ownerId);
    this.setMode('edit');
  }

  updatePet() {
    if (this.currentPetId) {
      const pet = new Pet(
        this.editPetForm.value.name,
        this.editPetForm.value.speciesId,
        this.editPetForm.value.gender,
        this.editPetForm.value.birthDate,
        this.editPetForm.value.ownerId
      );
      this.petService.updatePet(this.currentPetId, pet).subscribe((message: string) => {
        this.getAllPets();
        this.setMode('list');
      });
    }
  }

  getAllSpecies() {
    this.petService.getAllSpecies().subscribe((species: Species[]) => {
      species = species.sort((a, b) => a.name.localeCompare(b.name));
      this.allSpecies = species;
    });
  }

  getSpeciesName(id: string): string | undefined {
    if (this.allSpecies) {
      for (let s of this.allSpecies) {
        if (s.id == id) {
          return s.name;
        }
      }
    }
    throw new Error('Species not found with id: ' + id);
  }

  getAllOwners() {
    this.petService.getAllOwners().subscribe((owners: Owner[]) => {
      owners = owners.sort((a, b) => a.lastName.localeCompare(b.lastName));
      this.owners = owners;
    });
  }

  getOwnerName(id: string) {
    if (this.owners) {
      for (let o of this.owners) {
        if (o.id == id) {
          return o.lastName + ", " + o.firstName;
        }
      }
    }
    throw new Error('Owner not found with id: ' + id);
  }

  getOwnerPhone(id: string) {
    if (this.owners) {
      for (let o of this.owners) {
        if (o.id == id) {
          return o.phone;
        }
      }
    }
    throw new Error('Owner not found with id: ' + id);
  }
}
