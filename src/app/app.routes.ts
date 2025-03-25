import { Routes } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { PetsPageComponent } from '../pets/pets-page/pets-page.component';
import { VetsPageComponent } from '../vets/vets-page/vets-page.component';
import { ProceduresComponent } from '../procedures/procedures.component';
import { SpeciesComponent } from '../species/species.component';
import { OwnersComponent } from '../owners/owners.component';
import { BookingsComponent } from '../bookings/bookings.component';

export const routes: Routes = [
    { path: 'search', component: SearchComponent },
    { path: 'bookings', component: BookingsComponent },
    { path: 'pets', component: PetsPageComponent },
    { path: 'vets', component: VetsPageComponent },
    { path: 'owners', component: OwnersComponent },
    { path: 'species', component: SpeciesComponent },
    { path: 'procedures', component: ProceduresComponent },
    { path: '', redirectTo: '/search', pathMatch: 'full' },
    { path: '**', component: SearchComponent },
];
