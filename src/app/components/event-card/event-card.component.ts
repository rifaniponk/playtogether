import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-card',
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event!: Event;

  get spotsLeft(): number {
    return this.event.maxParticipants - this.event.currentParticipants;
  }

  get isFilling(): boolean {
    return this.spotsLeft <= 3 && this.spotsLeft > 0;
  }

  get isFull(): boolean {
    return this.spotsLeft === 0;
  }

  get progressPercentage(): number {
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
}

