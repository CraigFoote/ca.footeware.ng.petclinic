import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetsPageComponent } from './vets-page.component';

describe('VetsComponent', () => {
  let component: VetsPageComponent;
  let fixture: ComponentFixture<VetsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
