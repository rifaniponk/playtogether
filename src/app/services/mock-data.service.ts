import { Injectable } from '@angular/core';
import { Event, SportType } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  
  private mockEvents: Event[] = [
    {
      id: '1',
      title: 'Saturday Morning Badminton',
      sport: 'Badminton',
      date: '2025-10-18',
      time: '09:00 AM',
      location: 'Jakarta Selatan',
      venue: 'GOR Menteng Badminton Court',
      price: 50000,
      currentParticipants: 6,
      maxParticipants: 8,
      skillLevel: 'Intermediate',
      hostName: 'Ahmad Rizki',
      hostAvatar: '🏸',
      description: 'Friendly badminton session for intermediate players. All equipment provided!',
      image: '🏸',
      distance: '2.3 km'
    },
    {
      id: '2',
      title: 'Sunset Hiking at Gunung Gede',
      sport: 'Hiking',
      date: '2025-10-19',
      time: '04:00 PM',
      location: 'Bogor',
      venue: 'Gunung Gede Trailhead',
      price: 75000,
      currentParticipants: 12,
      maxParticipants: 20,
      skillLevel: 'Beginner',
      hostName: 'Sarah Adventure',
      hostAvatar: '🥾',
      description: 'Join us for a beautiful sunset hike! Perfect for beginners.',
      image: '⛰️',
      distance: '15.8 km'
    },
    {
      id: '3',
      title: 'Padel Tournament',
      sport: 'Padel',
      date: '2025-10-18',
      time: '02:00 PM',
      location: 'Jakarta Pusat',
      venue: 'Senayan Padel Club',
      price: 100000,
      currentParticipants: 14,
      maxParticipants: 16,
      skillLevel: 'Advanced',
      hostName: 'David Martinez',
      hostAvatar: '🎾',
      description: 'Competitive padel tournament. Advanced players only!',
      image: '🎾',
      distance: '5.1 km'
    },
    {
      id: '4',
      title: 'Morning Yoga in the Park',
      sport: 'Yoga',
      date: '2025-10-20',
      time: '06:00 AM',
      location: 'Jakarta Selatan',
      venue: 'Taman Langsat',
      price: 0,
      currentParticipants: 8,
      maxParticipants: 15,
      skillLevel: 'Beginner',
      hostName: 'Rina Wellness',
      hostAvatar: '🧘',
      description: 'Free outdoor yoga session. Bring your own mat!',
      image: '🧘',
      distance: '1.2 km'
    },
    {
      id: '5',
      title: 'Friday Night Basketball',
      sport: 'Basketball',
      date: '2025-10-17',
      time: '07:00 PM',
      location: 'Jakarta Timur',
      venue: 'Lapangan Basket Rawamangun',
      price: 40000,
      currentParticipants: 9,
      maxParticipants: 10,
      skillLevel: 'Intermediate',
      hostName: 'Michael Jordan Jr',
      hostAvatar: '🏀',
      description: 'Casual 5v5 basketball game. Almost full!',
      image: '🏀',
      distance: '8.5 km'
    },
    {
      id: '6',
      title: 'Beach Volleyball Session',
      sport: 'Volleyball',
      date: '2025-10-21',
      time: '05:00 PM',
      location: 'Ancol',
      venue: 'Ancol Beach',
      price: 60000,
      currentParticipants: 4,
      maxParticipants: 12,
      skillLevel: 'Beginner',
      hostName: 'Beach Crew',
      hostAvatar: '🏐',
      description: 'Fun beach volleyball for everyone!',
      image: '🏐',
      distance: '12.3 km'
    },
    {
      id: '7',
      title: 'Tennis Practice',
      sport: 'Tennis',
      date: '2025-10-18',
      time: '10:00 AM',
      location: 'Jakarta Selatan',
      venue: 'Tennis Indoor Senayan',
      price: 120000,
      currentParticipants: 3,
      maxParticipants: 4,
      skillLevel: 'Advanced',
      hostName: 'Coach Andre',
      hostAvatar: '🎾',
      description: 'Professional tennis practice session',
      image: '🎾',
      distance: '4.7 km'
    },
    {
      id: '8',
      title: 'Morning Run Group',
      sport: 'Running',
      date: '2025-10-19',
      time: '05:30 AM',
      location: 'Jakarta Pusat',
      venue: 'Gelora Bung Karno',
      price: 0,
      currentParticipants: 25,
      maxParticipants: 50,
      skillLevel: 'Beginner',
      hostName: 'Jakarta Runners',
      hostAvatar: '🏃',
      description: 'Weekly morning run, 5km route. Free!',
      image: '🏃',
      distance: '6.2 km'
    }
  ];

  private sportTypes: SportType[] = [
    { name: 'All', icon: '🎯' },
    { name: 'Badminton', icon: '🏸' },
    { name: 'Hiking', icon: '🥾' },
    { name: 'Padel', icon: '🎾' },
    { name: 'Basketball', icon: '🏀' },
    { name: 'Volleyball', icon: '🏐' },
    { name: 'Tennis', icon: '🎾' },
    { name: 'Running', icon: '🏃' },
    { name: 'Yoga', icon: '🧘' }
  ];

  getEvents(): Event[] {
    return this.mockEvents;
  }

  getSportTypes(): SportType[] {
    return this.sportTypes;
  }

  getEventById(id: string): Event | undefined {
    return this.mockEvents.find(event => event.id === id);
  }
}

