import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVetFormComponent } from './add-vet-form.component';

describe('AddVetFormComponent', () => {
  let component: AddVetFormComponent;
  let fixture: ComponentFixture<AddVetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVetFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
