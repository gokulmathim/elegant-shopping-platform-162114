import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bottom-nav" role="navigation" aria-label="Primary mobile navigation">
      <a class="nav-item" routerLink="/" aria-label="Home">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.1L2 12h2v8h6v-5h4v5h6v-8h2z"/></svg>
        <span class="label">Home</span>
      </a>

      <a class="nav-item" routerLink="/" [queryParams]="{ category: null }" aria-label="Categories">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 5h8v8H3zM13 5h8v6h-8zM13 13h8v6h-8zM3 15h8v4H3z"/></svg>
        <span class="label">Categories</span>
      </a>

      <a class="nav-item cart" routerLink="/cart" aria-label="Cart">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2m10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2M7.17 14h9.91c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 21.5 5H6.21l-.94-2H1v2h3l3.6 7.59l-1.35 2.45C5.52 15.37 6.21 16 7 16h12v-2H7.42l.75-1.35z"/></svg>
        <span class="label">Cart</span>
        <span class="badge" *ngIf="count$ | async as c" [attr.aria-label]="'Items in cart: ' + c" [hidden]="!c">{{ c }}</span>
      </a>

      <a class="nav-item" routerLink="/profile" aria-label="Profile">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 12c2.7 0 4.7-2.2 4.7-4.7S14.7 2.7 12 2.7 7.3 4.9 7.3 7.3 9.3 12 12 12m0 2.7c-3.1 0-9.3 1.6-9.3 4.7V22h18.7v-2.7c0-3.1-6.2-4.6-9.4-4.6"/></svg>
        <span class="label">Profile</span>
      </a>
    </nav>
  `,
  styles: [`
    .bottom-nav {
      position: fixed;
      z-index: 1000;
      left: 0;
      right: 0;
      bottom: 0;
      height: 64px;
      background: var(--bg-card, #fff);
      border-top: 1px solid var(--border, #E5E7EB);
      display: none; /* mobile-only by default hidden */
      grid-template-columns: repeat(4, 1fr);
      align-items: center;
      padding: 6px 8px env(safe-area-inset-bottom, 0);
    }
    .nav-item {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      color: var(--text-secondary, #6B7280);
      text-decoration: none;
      height: 100%;
      position: relative;
    }
    .nav-item:focus-visible { outline: 2px solid #93C5FD; outline-offset: 2px; border-radius: 8px; }
    .nav-item:hover { color: var(--primary, #2563EB); }
    .icon { width: 22px; height: 22px; }
    .label { font-size: 11px; font-weight: 600; letter-spacing: .2px; }
    .badge {
      position: absolute;
      top: 6px;
      right: 22%;
      transform: translateX(50%);
      background: #e53935;
      color: #fff;
      border-radius: 999px;
      font-size: 11px;
      line-height: 1;
      padding: 3px 6px;
    }

    /* Show on small viewports only */
    @media (max-width: 768px) {
      .bottom-nav { display: grid; }
    }
  `]
})
export class BottomNavComponent {
  private cart = inject(CartService);

  // PUBLIC_INTERFACE
  get count$() {
    /** Observable count of items in cart for badge. */
    return this.cart.count$;
  }
}
