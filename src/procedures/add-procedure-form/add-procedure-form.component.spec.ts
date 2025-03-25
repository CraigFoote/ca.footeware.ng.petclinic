import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcedureFormComponent } from './add-procedure-form.component';

describe('AddProcedureFormComponent', () => {
  let component: AddProcedureFormComponent;
  let fixture: ComponentFixture<AddProcedureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProcedureFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProcedureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
