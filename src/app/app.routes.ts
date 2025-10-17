import { Routes } from '@angular/router';
import { DiscoverComponent } from './pages/discover/discover.component';
import { EventDetail } from './pages/event-detail/event-detail';
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'event/:id', component: EventDetail },
  { path: 'my-events', component: MyEventsComponent },
  { path: 'settings', component: SettingsComponent },
];
