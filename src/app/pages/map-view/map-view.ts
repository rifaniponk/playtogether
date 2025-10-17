import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { Event } from '../../models/event.model';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-view.html',
  styleUrl: './map-view.css'
})
export class MapViewComponent implements OnInit, AfterViewInit, OnDestroy {
  private map: L.Map | null = null;
  events: Event[] = [];
  selectedSport: string = 'All';
  sportTypes = [
    { name: 'All', icon: '🌟', color: '#8B5CF6' },
    { name: 'Basketball', icon: '🏀', color: '#F97316' },
    { name: 'Soccer', icon: '⚽', color: '#10B981' },
    { name: 'Tennis', icon: '🎾', color: '#F59E0B' },
    { name: 'Badminton', icon: '🏸', color: '#EC4899' },
    { name: 'Volleyball', icon: '🏐', color: '#3B82F6' },
    { name: 'Running', icon: '🏃', color: '#EF4444' },
    { name: 'Yoga', icon: '🧘', color: '#8B5CF6' },
    { name: 'Swimming', icon: '🏊', color: '#06B6D4' },
  ];

  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.events = this.mockDataService.getEvents();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  private initMap() {
    // Center on San Francisco (mock location)
    const centerLat = 37.7749;
    const centerLng = -122.4194;

    this.map = L.map('map', {
      center: [centerLat, centerLng],
      zoom: 12,
      zoomControl: false
    });

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(this.map);

    // Add custom zoom control
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    // Add markers for events
    this.addEventMarkers();
  }

  private addEventMarkers() {
    if (!this.map) return;

    const centerLat = 37.7749;
    const centerLng = -122.4194;

    // Filter events based on selected sport
    const filteredEvents = this.selectedSport === 'All' 
      ? this.events 
      : this.events.filter(e => e.sport === this.selectedSport);

    filteredEvents.forEach((event, index) => {
      // Generate random coordinates around center
      const lat = centerLat + (Math.random() - 0.5) * 0.1;
      const lng = centerLng + (Math.random() - 0.5) * 0.1;

      const sportType = this.sportTypes.find(s => s.name === event.sport);
      const icon = sportType?.icon || '📍';
      const color = sportType?.color || '#8B5CF6';

      // Create custom icon
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-container">
            <div class="marker-pulse" style="background-color: ${color}40;"></div>
            <div class="marker-icon" style="background: linear-gradient(135deg, ${color}, ${color}dd); box-shadow: 0 4px 12px ${color}60;">
              <span style="font-size: 20px;">${icon}</span>
            </div>
            <div class="marker-count">${event.currentParticipants}</div>
          </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map!);

      // Create popup content
      const popupContent = `
        <div class="event-popup">
          <div class="popup-header">
            <span class="popup-icon">${icon}</span>
            <div>
              <h3 class="popup-title">${event.title}</h3>
              <p class="popup-sport">${event.sport}</p>
            </div>
          </div>
          <div class="popup-info">
            <p><strong>📅</strong> ${event.date}</p>
            <p><strong>⏰</strong> ${event.time}</p>
            <p><strong>👥</strong> ${event.currentParticipants}/${event.maxParticipants} joined</p>
            <p><strong>💰</strong> ${event.price === 0 ? 'FREE' : '$' + event.price}</p>
          </div>
          <button class="popup-button" onclick="window.viewEventDetail('${event.id}')">
            View Details
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 250,
        className: 'custom-popup'
      });

      // Add click event
      marker.on('click', () => {
        marker.openPopup();
      });
    });

    // Add click handler to window for popup button
    (window as any).viewEventDetail = (eventId: string) => {
      this.router.navigate(['/event', eventId]);
    };
  }

  selectSport(sportName: string) {
    this.selectedSport = sportName;
    this.refreshMap();
  }

  private refreshMap() {
    if (!this.map) return;

    // Clear existing markers
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map!.removeLayer(layer);
      }
    });

    // Re-add markers
    this.addEventMarkers();
  }

  goToMyLocation() {
    if (this.map) {
      this.map.setView([37.7749, -122.4194], 13, {
        animate: true,
        duration: 1
      });
    }
  }

  get totalPlayers(): number {
    return this.events.reduce((sum, e) => sum + e.currentParticipants, 0);
  }
}
