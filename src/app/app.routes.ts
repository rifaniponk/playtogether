import { Routes } from '@angular/router';
import { DiscoverComponent } from './pages/discover/discover.component';
import { EventDetail } from './pages/event-detail/event-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/discover', pathMatch: 'full' },
  { path: 'discover', component: DiscoverComponent },
  { path: 'event/:id', component: EventDetail },
];
