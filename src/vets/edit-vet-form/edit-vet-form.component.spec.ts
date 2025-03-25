import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVetFormComponent } from './edit-vet-form.component';

describe('EditVetFormComponent', () => {
  let component: EditVetFormComponent;
  let fixture: ComponentFixture<EditVetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVetFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
