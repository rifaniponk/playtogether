import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Event } from '../../models/event.model';
import { UserEventsService } from '../../services/user-events.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  heroCalendar,
  heroClock,
  heroMapPin,
  heroUsers
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  viewProviders: [provideIcons({ 
    heroCalendar,
    heroClock,
    heroMapPin,
    heroUsers
  })],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css'
})
export class MyEventsComponent implements OnInit {
  myEvents: Event[] = [];
  upcomingEvents: Event[] = [];
  pastEvents: Event[] = [];

  constructor(
    private userEventsService: UserEventsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMyEvents();
  }

  loadMyEvents() {
    this.myEvents = this.userEventsService.getJoinedEvents();
    
    // Split into upcoming and past (using today's date)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    this.upcomingEvents = this.myEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today;
    });
    
    this.pastEvents = this.myEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate < today;
    });
  }

  viewEventDetail(eventId: string) {
    this.router.navigate(['/event', eventId]);
  }

  formatPrice(price: number): string {
    if (price === 0) return 'FREE';
    return `$${price.toFixed(2)}`;
  }

  getSkillLevelColor(level: string): string {
    const colors = {
      'All Levels': 'bg-blue-100 text-blue-700',
      'Beginner': 'bg-green-100 text-green-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-red-100 text-red-700'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}
