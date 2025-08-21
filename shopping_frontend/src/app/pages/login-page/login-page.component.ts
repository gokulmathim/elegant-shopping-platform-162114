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
  <div class="login-wrap">
    <div class="login-card card">
      <div class="logo" aria-label="Brand logo">
        <!-- Accessible text-based/SVG placeholder logo -->
        <svg viewBox="0 0 160 40" role="img" aria-label="Elegant Shop logo" class="logo-svg">
          <circle cx="18" cy="20" r="8" fill="#111111"></circle>
          <text x="36" y="26" font-size="16" font-weight="800" letter-spacing=".3px" fill="#111111">ELEGANT SHOP</text>
        </svg>
      </div>

      <h2 class="login-title">Welcome back</h2>
      <p class="login-sub">Sign in to continue shopping</p>

      <form (ngSubmit)="login()" class="form">
        <label class="field">
          <span class="label">Email</span>
          <input class="input" [(ngModel)]="email" name="email" type="email" placeholder="you@example.com" required>
        </label>

        <label class="field">
          <span class="label">Password</span>
          <input class="input" [(ngModel)]="password" name="password" type="password" placeholder="••••••••" required>
        </label>

        <button type="submit" class="btn primary full">Continue</button>
      </form>

      <div class="help">
        <a routerLink="/" class="link">Back to home</a>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .login-wrap {
      min-height: 60vh;
      display: grid;
      place-items: center;
      padding: 24px;
    }
    .login-card {
      width: 100%;
      max-width: 420px;
      padding: 24px;
    }
    .logo {
      display: flex;
      justify-content: center;
      margin-bottom: 12px;
    }
    .logo-svg {
      width: 180px;
      height: auto;
    }
    .login-title {
      text-align: center;
      margin: 4px 0 4px;
      font-size: 22px;
      font-weight: 700;
      color: var(--text-primary);
    }
    .login-sub {
      text-align: center;
      margin: 0 0 16px;
      color: var(--text-secondary);
      font-size: 14px;
    }
    .form {
      display: grid;
      gap: 12px;
    }
    .field {
      display: grid;
      gap: 6px;
    }
    .label {
      font-size: 14px;
      color: var(--text-secondary);
    }
    .btn.full {
      width: 100%;
      height: 44px;
      border-radius: var(--radius-pill);
      font-weight: 700;
      letter-spacing: .3px;
      text-transform: uppercase;
    }
    .help {
      margin-top: 12px;
      text-align: center;
    }
    .link {
      color: var(--primary);
      text-decoration: none;
    }
    .link:hover { text-decoration: underline; }

    /* Responsive fine-tuning */
    @media (max-width: 480px) {
      .login-card { padding: 20px; }
      .logo-svg { width: 160px; }
    }
  `]
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
