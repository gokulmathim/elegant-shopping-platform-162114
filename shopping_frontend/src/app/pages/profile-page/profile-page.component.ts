import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-profile-page',
  imports: [CommonModule, FormsModule],
  template: `
  <section class="card" style="padding:20px; max-width:640px;">
    <h2 style="margin-bottom:12px">Your Profile</h2>
    <ng-container *ngIf="auth.session$ | async as user">
      <div class="grid cols-2">
        <label>Name
          <input class="input" [(ngModel)]="user.name">
        </label>
        <label>Email
          <input class="input" [(ngModel)]="user.email">
        </label>
        <label>Address
          <input class="input" [(ngModel)]="user.address">
        </label>
        <label>City
          <input class="input" [(ngModel)]="user.city">
        </label>
        <label>Country
          <input class="input" [(ngModel)]="user.country">
        </label>
      </div>
      <div style="margin-top:12px; display:flex; gap:8px;">
        <button class="btn primary" (click)="save(user)">Save</button>
        <button class="btn ghost" (click)="logout()">Logout</button>
      </div>
    </ng-container>
  </section>
  `,
})
export class ProfilePageComponent implements OnInit {
  auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    if (!this.auth.isAuthenticated) return;
    this.auth.loadProfile().subscribe();
  }

  // PUBLIC_INTERFACE
  save(user: any) {
    /** Saves the profile via AuthService. */
    this.auth.updateProfile(user).subscribe();
  }

  // PUBLIC_INTERFACE
  logout() {
    /** Logs out and redirects to home in a router-friendly way. */
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
