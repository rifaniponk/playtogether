import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { Event, SportType } from '../../models/event.model';
import { EventCardComponent } from '../../components/event-card/event-card.component';

@Component({
  selector: 'app-discover',
  imports: [CommonModule, FormsModule, RouterModule, EventCardComponent],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.css'
})
export class DiscoverComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  sportTypes: SportType[] = [];
  
  selectedSport: string = 'All';
  selectedSkillLevel: string = 'All';
  searchQuery: string = '';
  showFilters: boolean = false;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.events = this.mockDataService.getEvents();
    this.sportTypes = this.mockDataService.getSportTypes();
    this.filteredEvents = [...this.events];
  }

  filterEvents() {
    this.filteredEvents = this.events.filter(event => {
      const matchesSport = this.selectedSport === 'All' || event.sport === this.selectedSport;
      const matchesSkill = this.selectedSkillLevel === 'All' || event.skillLevel === this.selectedSkillLevel;
      const matchesSearch = !this.searchQuery || 
        event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.sport.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      return matchesSport && matchesSkill && matchesSearch;
    });
  }

  selectSport(sport: string) {
    this.selectedSport = sport;
    this.filterEvents();
  }

  selectSkillLevel(level: string) {
    this.selectedSkillLevel = level;
    this.filterEvents();
  }

  onSearchChange() {
    this.filterEvents();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  clearFilters() {
    this.selectedSport = 'All';
    this.selectedSkillLevel = 'All';
    this.searchQuery = '';
    this.filterEvents();
  }
}

