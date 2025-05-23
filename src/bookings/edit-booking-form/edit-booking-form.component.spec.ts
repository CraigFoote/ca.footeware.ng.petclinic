import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookingFormComponent } from './edit-booking-form.component';

describe('EditBookingFormComponent', () => {
  let component: EditBookingFormComponent;
  let fixture: ComponentFixture<EditBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBookingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
