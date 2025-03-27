import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingFormComponent } from './add-booking-form.component';

describe('AddBookingFormComponent', () => {
  let component: AddBookingFormComponent;
  let fixture: ComponentFixture<AddBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
