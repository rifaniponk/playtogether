import { Routes } from '@angular/router';
import { DiscoverComponent } from './pages/discover/discover.component';

export const routes: Routes = [
  { path: '', redirectTo: '/discover', pathMatch: 'full' },
  { path: 'discover', component: DiscoverComponent },
];
