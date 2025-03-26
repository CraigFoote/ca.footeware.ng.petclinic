import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOwnerFormComponent } from './add-owner-form.component';

describe('AddOwnerFormComponent', () => {
  let component: AddOwnerFormComponent;
  let fixture: ComponentFixture<AddOwnerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOwnerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOwnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
