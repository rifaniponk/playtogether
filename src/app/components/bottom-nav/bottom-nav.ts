import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  heroMagnifyingGlass,
  heroCalendar,
  heroCog6Tooth
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent],
  viewProviders: [provideIcons({ 
    heroMagnifyingGlass,
    heroCalendar,
    heroCog6Tooth
  })],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.css'
})
export class BottomNavComponent {
  constructor(public router: Router) {}

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}
