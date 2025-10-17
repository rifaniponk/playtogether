import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroPhoto, heroCheckCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent],
  viewProviders: [provideIcons({ heroArrowLeft, heroPhoto, heroCheckCircle })],
  templateUrl: './create-event.html',
  styleUrl: './create-event.css'
})
export class CreateEventComponent {
  // Form data
  eventData = {
    title: '',
    sport: 'Basketball',
    date: '',
    time: '',
    location: '',
    venue: '',
    price: 0,
    maxParticipants: 10,
    skillLevel: 'All Levels',
    description: '',
    bannerImage: null as File | null
  };

  sportTypes = [
    { name: 'Basketball', icon: '🏀' },
    { name: 'Soccer', icon: '⚽' },
    { name: 'Tennis', icon: '🎾' },
    { name: 'Badminton', icon: '🏸' },
    { name: 'Volleyball', icon: '🏐' },
    { name: 'Running', icon: '🏃' },
    { name: 'Yoga', icon: '🧘' },
    { name: 'Swimming', icon: '🏊' },
    { name: 'Cycling', icon: '🚴' },
    { name: 'Hiking', icon: '🥾' },
  ];

  skillLevels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  showSuccessModal = false;
  previewImageUrl: string | null = null;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/discover']);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.eventData.bannerImage = file;
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.eventData.bannerImage = null;
    this.previewImageUrl = null;
  }

  onSubmit() {
    // Mock submission - just show success modal
    console.log('Event created (mock):', this.eventData);
    this.showSuccessModal = true;

    // Auto-redirect after 2 seconds
    setTimeout(() => {
      this.showSuccessModal = false;
      this.router.navigate(['/discover']);
    }, 2000);
  }

  isFormValid(): boolean {
    return !!(
      this.eventData.title.trim() &&
      this.eventData.sport &&
      this.eventData.date &&
      this.eventData.time &&
      this.eventData.location.trim() &&
      this.eventData.venue.trim() &&
      this.eventData.maxParticipants > 0 &&
      this.eventData.description.trim()
    );
  }
}
