import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProcedureFormComponent } from './edit-procedure-form.component';

describe('EditProcedureFormComponent', () => {
  let component: EditProcedureFormComponent;
  let fixture: ComponentFixture<EditProcedureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProcedureFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProcedureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
