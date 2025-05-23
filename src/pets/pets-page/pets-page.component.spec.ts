import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsPageComponent } from './pets-page.component';

describe('PetsComponent', () => {
    let component: PetsPageComponent;
    let fixture: ComponentFixture<PetsPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PetsPageComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PetsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
