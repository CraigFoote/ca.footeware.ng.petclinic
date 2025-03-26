import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpeciesFormComponent } from './add-species-form.component';

describe('AddSpeciesFormComponent', () => {
  let component: AddSpeciesFormComponent;
  let fixture: ComponentFixture<AddSpeciesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSpeciesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSpeciesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
