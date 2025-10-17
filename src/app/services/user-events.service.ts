import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserEventsService {
  private readonly STORAGE_KEY = 'playtogether_joined_events';
  private joinedEventIds = new BehaviorSubject<string[]>([]);
  
  constructor(private mockDataService: MockDataService) {
    // Load from localStorage or use sample data for demo
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsedIds = JSON.parse(stored);
        this.joinedEventIds.next(parsedIds);
      } catch (e) {
      }
    } 
  }


  private saveToStorage(ids: string[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ids));
  }

  getJoinedEvents(): Event[] {
    const allEvents = this.mockDataService.getEvents();
    const joinedIds = this.joinedEventIds.value;
    return allEvents.filter(event => joinedIds.includes(event.id));
  }

  addJoinedEvent(eventId: string): void {
    const currentIds = this.joinedEventIds.value;
    if (!currentIds.includes(eventId)) {
      const newIds = [...currentIds, eventId];
      this.joinedEventIds.next(newIds);
      this.saveToStorage(newIds);
    }
  }

  removeJoinedEvent(eventId: string): void {
    const currentIds = this.joinedEventIds.value;
    const newIds = currentIds.filter(id => id !== eventId);
    this.joinedEventIds.next(newIds);
    this.saveToStorage(newIds);
  }

  isEventJoined(eventId: string): boolean {
    return this.joinedEventIds.value.includes(eventId);
  }

  getJoinedEventIds(): Observable<string[]> {
    return this.joinedEventIds.asObservable();
  }

  clearAllJoinedEvents(): void {
    this.joinedEventIds.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

