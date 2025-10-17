import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { UserEventsService } from '../../services/user-events.service';
import { Event } from '../../models/event.model';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule, FormsModule, ZXingScannerModule],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css'
})
export class EventDetail implements OnInit {
  event?: Event;
  showJoinModal: boolean = false;
  showPaymentModal: boolean = false;
  showSuccessModal: boolean = false;
  showQRScannerModal: boolean = false;
  showCheckInSuccessModal: boolean = false;
  hasJoined: boolean = false;
  hasCheckedIn: boolean = false;
  
  // QR Scanner
  availableDevices: MediaDeviceInfo[] = [];
  currentDevice?: MediaDeviceInfo;
  hasDevices: boolean = false;
  hasPermission: boolean = false;
  qrCodeFormat = BarcodeFormat.QR_CODE;
  
  // Payment form
  cardNumber: string = '';
  expiryDate: string = '';
  cvc: string = '';
  cardholderName: string = '';
  isProcessingPayment: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mockDataService: MockDataService,
    private userEventsService: UserEventsService
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      const allEvents = this.mockDataService.getEvents();
      this.event = allEvents.find(e => e.id === eventId);
      
      // Check if user has already joined this event
      if (this.event) {
        this.hasJoined = this.userEventsService.isEventJoined(this.event.id);
      }
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
    
    // Check if event is paid
    if (this.event.price > 0) {
      this.showPaymentModal = true;
    } else {
      this.showJoinModal = true;
    }
  }

  closeJoinModal() {
    this.showJoinModal = false;
  }

  closePaymentModal() {
    this.showPaymentModal = false;
    this.resetPaymentForm();
  }

  resetPaymentForm() {
    this.cardNumber = '';
    this.expiryDate = '';
    this.cvc = '';
    this.cardholderName = '';
  }

  processPayment() {
    if (!this.event) return;
    
    this.isProcessingPayment = true;
    
    // Simulate payment processing (2 seconds)
    setTimeout(() => {
      this.isProcessingPayment = false;
      this.showPaymentModal = false;
      this.resetPaymentForm();
      
      // After successful payment, join the event
      this.completeJoin();
    }, 2000);
  }

  confirmJoin() {
    if (!this.event) return;
    this.showJoinModal = false;
    this.completeJoin();
  }

  completeJoin() {
    if (!this.event) return;
    
    // Simulate joining the event
    this.event.currentParticipants += 1;
    this.hasJoined = true;
    
    // Add to user's joined events
    this.userEventsService.addJoinedEvent(this.event.id);
    
    this.showSuccessModal = true;

    // Auto-close success modal after 2 seconds
    setTimeout(() => {
      this.showSuccessModal = false;
    }, 2000);
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    this.cardNumber = formattedValue.slice(0, 19); // 16 digits + 3 spaces
  }

  formatExpiryDate(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    this.expiryDate = value;
  }

  formatCVC(event: any) {
    this.cvc = event.target.value.replace(/\D/g, '').slice(0, 3);
  }

  isPaymentFormValid(): boolean {
    return this.cardNumber.replace(/\s/g, '').length === 16 &&
           this.expiryDate.length === 5 &&
           this.cvc.length === 3 &&
           this.cardholderName.trim().length > 0;
  }

  isCardNumberValid(): boolean {
    return this.cardNumber.replace(/\s/g, '').length === 16;
  }

  isCardNumberPartial(): boolean {
    return this.cardNumber.length > 0 && this.cardNumber.replace(/\s/g, '').length < 16;
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

  // QR Scanner Methods
  openQRScanner() {
    this.showQRScannerModal = true;
  }

  closeQRScanner() {
    this.showQRScannerModal = false;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string): void {
    // Always treat as successful check-in (for demo)
    this.hasCheckedIn = true;
    this.showQRScannerModal = false;
    this.showCheckInSuccessModal = true;

    // Auto-close success modal after 2 seconds
    setTimeout(() => {
      this.showCheckInSuccessModal = false;
    }, 2000);
  }

  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }
}
