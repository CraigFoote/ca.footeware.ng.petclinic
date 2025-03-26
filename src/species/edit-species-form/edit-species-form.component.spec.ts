import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpeciesFormComponent } from './edit-species-form.component';

describe('EditSpeciesFormComponent', () => {
  let component: EditSpeciesFormComponent;
  let fixture: ComponentFixture<EditSpeciesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSpeciesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSpeciesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
