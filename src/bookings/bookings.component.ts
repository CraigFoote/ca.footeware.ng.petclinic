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
import { Province } from '../model/province';
import { Booking } from '../model/booking';
import { Pet } from '../model/pet';
import { Procedure } from '../model/procedure';
import { Vet } from '../model/vet';

@Component({
  selector: 'app-bookings',
  standalone: true,
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
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {

  mode: string = 'list';
  bookings: Booking[] = [];
  provinces: Province[] = Object.values(Province);
  currentBookingId?: string;
  addBookingForm: FormGroup;
  editBookingForm: FormGroup;
  pets: Pet[] = [];
  procedures: Procedure[] = [];
  vets: Vet[] = [];

  constructor(private petService: PetService, private formBuilder: FormBuilder) {
    this.addBookingForm = this.formBuilder.group({
      date: new FormControl('', Validators.required),
      petId: new FormControl('', Validators.required),
      procedureId: new FormControl('', Validators.required),
      vetId: new FormControl('', Validators.required),
    });

    this.editBookingForm = this.formBuilder.group({
      date: new FormControl('', Validators.required),
      petId: new FormControl('', Validators.required),
      procedureId: new FormControl('', Validators.required),
      vetId: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getAllBookings();
    this.getAllPets();
    this.getAllProcedures();
    this.getAllVets();
  }

  setMode(mode: string) {
    this.mode = mode;
  }

  getBookingById(id: string) {
    this.petService.getBookingById(id).subscribe((booking: Booking) => {
      return booking;
    });
  }

  getAllBookings() {
    this.petService.getAllBookings().subscribe((bookings: Booking[]) => {
      if (bookings.length > 1) {
        bookings = bookings.sort((a, b) => a.date.valueOf() - b.date.valueOf());
      }
      this.bookings = bookings;
    });
  }

  addBooking() {
    const booking = new Booking(
      this.addBookingForm.value.date,
      this.addBookingForm.value.petId,
      this.addBookingForm.value.procedureId,
      this.addBookingForm.value.vetId);
    this.petService.insertBooking(booking).subscribe((message: string) => {
      this.getAllBookings();
      this.setMode('list');
    });
  }

  deleteBooking(id: string) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.petService.deleteBooking(id).subscribe((message: string) => {
        this.getAllBookings();
        this.setMode('list');
      });
    }
  }

  editBooking(booking: Booking) {
    this.currentBookingId = booking.id;
    this.editBookingForm.controls['date'].setValue(booking.date);
    this.editBookingForm.controls['petId'].setValue(booking.petId);
    this.editBookingForm.controls['procedureId'].setValue(booking.procedureId);
    this.editBookingForm.controls['vetId'].setValue(booking.vetId);
    this.setMode('edit');
  }

  updateBooking() {
    if (this.currentBookingId) {
      const booking = new Booking(
        this.editBookingForm.value.date,
        this.editBookingForm.value.petId,
        this.editBookingForm.value.procedureId,
        this.editBookingForm.value.vetId,
      );
      this.petService.updateBooking(this.currentBookingId, booking).subscribe((message: string) => {
        this.getAllBookings();
        this.setMode('list');
      });
    }
  }

  getAllPets() {
    this.petService.getAllPets().subscribe((pets: Pet[]) => {
      pets = pets.sort((a, b) => a.name.localeCompare(b.name));
      this.pets = pets;
    });
  }

  getAllVets() {
    this.petService.getAllVets().subscribe((vets: Vet[]) => {
      vets = vets.sort((a, b) => a.lastName.localeCompare(b.lastName));
      this.vets = vets;
    });
  }

  getAllProcedures() {
    this.petService.getAllProcedures().subscribe((procedures: Procedure[]) => {
      procedures = procedures.sort((a, b) => a.name.localeCompare(b.name));
      this.procedures = procedures;
    });
  }

  getPetName(id: string) {
    for (let pet of this.pets) {
      if (pet.id == id) {
        return pet.name;
      }
    }
    throw new Error("Pet not found with id: " + id);
  }

  getProcedureName(id: string) {
    for (let procedure of this.procedures) {
      if (procedure.id == id) {
        return procedure.name;
      }
    }
    throw new Error("Procedure not found with id: " + id);
  }

  getVetName(id: string) {
    for (let vet of this.vets) {
      if (vet.id == id) {
        return "Dr. " + vet.firstName + " " + vet.lastName;
      }
    }
    throw new Error("Vet not found with id: " + id);
  }
}
