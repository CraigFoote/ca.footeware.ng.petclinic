import { Routes } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { PetsComponent } from '../pets/pets.component';
import { VetsComponent } from '../vets/vets.component';
import { ProceduresComponent } from '../procedures/procedures.component';
import { SpeciesComponent } from '../species/species.component';
import { OwnersComponent } from '../owners/owners.component';
import { BookingsComponent } from '../bookings/bookings.component';

export const routes: Routes = [
    { path: 'search', component: SearchComponent },
    { path: 'bookings', component: BookingsComponent },
    { path: 'pets', component: PetsComponent },
    { path: 'vets', component: VetsComponent },
    { path: 'owners', component: OwnersComponent },
    { path: 'species', component: SpeciesComponent },
    { path: 'procedures', component: ProceduresComponent },
    { path: '', redirectTo: '/search', pathMatch: 'full' },
    { path: '**', component: SearchComponent },
];
