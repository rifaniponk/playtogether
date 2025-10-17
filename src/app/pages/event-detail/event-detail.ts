import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css'
})
export class EventDetail implements OnInit {
  event?: Event;
  showJoinModal: boolean = false;
  showSuccessModal: boolean = false;
  hasJoined: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      const allEvents = this.mockDataService.getEvents();
      this.event = allEvents.find(e => e.id === eventId);
    }
  }

  goBack() {
    this.router.navigate(['/discover']);
  }

  openJoinModal() {
    if (!this.event) return;
    
    if (this.isFull) {
      return; // Can't join if full
    }
    
    this.showJoinModal = true;
  }

  closeJoinModal() {
    this.showJoinModal = false;
  }

  confirmJoin() {
    if (!this.event) return;
    
    // Simulate joining the event
    this.event.currentParticipants += 1;
    this.hasJoined = true;
    this.showJoinModal = false;
    this.showSuccessModal = true;

    // Auto-close success modal after 2 seconds
    setTimeout(() => {
      this.showSuccessModal = false;
    }, 2000);
  }

  get spotsLeft(): number {
    if (!this.event) return 0;
    return this.event.maxParticipants - this.event.currentParticipants;
  }

  get isFilling(): boolean {
    return this.spotsLeft <= 3 && this.spotsLeft > 0;
  }

  get isFull(): boolean {
    return this.spotsLeft === 0;
  }

  get progressPercentage(): number {
    if (!this.event) return 0;
    return (this.event.currentParticipants / this.event.maxParticipants) * 100;
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
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
