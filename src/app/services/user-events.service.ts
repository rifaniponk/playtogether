import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserEventsService {
  private joinedEventIds = new BehaviorSubject<string[]>([]);
  
  constructor(private mockDataService: MockDataService) {
    // Add some sample joined events for demo
    this.joinedEventIds.next(['1', '4', '7', '18', '22']);
  }

  getJoinedEvents(): Event[] {
    const allEvents = this.mockDataService.getEvents();
    const joinedIds = this.joinedEventIds.value;
    return allEvents.filter(event => joinedIds.includes(event.id));
  }

  addJoinedEvent(eventId: string): void {
    const currentIds = this.joinedEventIds.value;
    if (!currentIds.includes(eventId)) {
      this.joinedEventIds.next([...currentIds, eventId]);
    }
  }

  removeJoinedEvent(eventId: string): void {
    const currentIds = this.joinedEventIds.value;
    this.joinedEventIds.next(currentIds.filter(id => id !== eventId));
  }

  isEventJoined(eventId: string): boolean {
    return this.joinedEventIds.value.includes(eventId);
  }

  getJoinedEventIds(): Observable<string[]> {
    return this.joinedEventIds.asObservable();
  }
}

