import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersComponent } from './owners-page.component';

describe('OwnersComponent', () => {
  let component: OwnersComponent;
  let fixture: ComponentFixture<OwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
