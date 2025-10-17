export interface Event {
  id: string;
  title: string;
  sport: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  price: number;
  currentParticipants: number;
  maxParticipants: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  hostName: string;
  hostAvatar: string;
  description: string;
  image: string;
  distance?: string;
}

export interface SportType {
  name: string;
  icon: string;
}

