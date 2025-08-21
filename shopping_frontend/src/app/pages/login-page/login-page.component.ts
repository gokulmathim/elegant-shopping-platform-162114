import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule],
  template: `
  <section class="card" style="padding:20px; max-width:420px;">
    <h2 style="margin-bottom:12px">Sign in</h2>
    <label>Email
      <input class="input" [(ngModel)]="email" type="email" placeholder="you@example.com">
    </label>
    <div style="height:8px"></div>
    <label>Password
      <input class="input" [(ngModel)]="password" type="password" placeholder="••••••••">
    </label>
    <div style="height:12px"></div>
    <button class="btn primary" (click)="login()">Continue</button>
  </section>
  `,
})
export class LoginPageComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = 'demo@example.com';
  password = 'password';

  // PUBLIC_INTERFACE
  login() {
    /** Performs login and redirects home. */
    this.auth.login(this.email, this.password).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
