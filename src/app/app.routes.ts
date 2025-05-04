import { Routes } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { PetsPageComponent } from '../pets/pets-page/pets-page.component';
import { VetsPageComponent } from '../vets/vets-page/vets-page.component';
import { ProceduresPageComponent } from '../procedures/procedures-page/procedures-page.component';
import { SpeciesPageComponent } from '../species/species-page/species-page.component';
import { OwnersPageComponent } from '../owners/owners-page/owners-page.component';
import { BookingsPageComponent } from '../bookings/bookings-page/bookings-page.component';

export const routes: Routes = [
    { path: 'search', component: SearchComponent },
    { path: 'bookings', component: BookingsPageComponent },
    { path: 'pets', component: PetsPageComponent },
    { path: 'vets', component: VetsPageComponent },
    { path: 'owners', component: OwnersPageComponent},
    { path: 'species', component: SpeciesPageComponent },
    { path: 'procedures', component: ProceduresPageComponent },
    { path: '', redirectTo: '/search', pathMatch: 'full' },
    { path: '**', component: SearchComponent },
];
