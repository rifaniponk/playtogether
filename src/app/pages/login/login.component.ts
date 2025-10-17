import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.email && this.password) {
      this.isLoading = true;
      // Simulate login process
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/discover']);
      }, 1500);
    }
  }

  onGoogleLogin(): void {
    this.isLoading = true;
    // Simulate Google login
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/discover']);
    }, 1000);
  }

  onAppleLogin(): void {
    this.isLoading = true;
    // Simulate Apple login
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/discover']);
    }, 1000);
  }

  goToSignUp(): void {
    // Navigate to sign up page (you can implement this later)
    console.log('Navigate to sign up');
  }

  goToForgotPassword(): void {
    // Navigate to forgot password page (you can implement this later)
    console.log('Navigate to forgot password');
  }
}
