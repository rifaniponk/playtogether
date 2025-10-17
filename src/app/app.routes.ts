import { Routes } from '@angular/router';
import { DiscoverComponent } from './pages/discover/discover.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'discover', component: DiscoverComponent },
];
