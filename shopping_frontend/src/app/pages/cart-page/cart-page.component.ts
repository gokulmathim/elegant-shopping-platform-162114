import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cart-page',
  imports: [CommonModule],
  template: `
  <section>
    <h2 style="margin-bottom:12px">Your Cart</h2>
    <div *ngIf="(cart.stream | async) as items; else empty">
      <div class="card" *ngFor="let item of items" style="padding:12px; display:flex; gap:12px; align-items:center; margin-bottom:10px">
        <img [src]="item.product.image" width="80" height="60" style="object-fit:cover; border-radius:8px">
        <div style="flex:1">
          <div style="font-weight:600">{{ item.product.title }}</div>
          <div style="color:#6b7280">\${{ item.product.price | number:'1.2-2' }}</div>
        </div>
        <input type="number" min="1" [value]="item.quantity" (input)="update(item.product.id, $any($event.target).value)" class="input" style="width:90px">
        <button class="btn ghost" (click)="remove(item.product.id)">Remove</button>
      </div>

      <div class="card" style="padding:16px; display:flex; justify-content: space-between; align-items:center;">
        <div>Total</div>
        <div style="font-weight:700">\${{ cart.total$ | async | number:'1.2-2' }}</div>
      </div>

      <div style="margin-top:12px; display:flex; gap:8px; justify-content:flex-end">
        <button class="btn ghost" (click)="clear()">Clear Cart</button>
        <button class="btn primary" (click)="checkout()">Proceed to Checkout</button>
      </div>
    </div>
    <ng-template #empty>
      <div class="card" style="padding:16px; color:#6b7280">Your cart is empty.</div>
    </ng-template>
  </section>
  `,
})
export class CartPageComponent {
  cart = inject(CartService);
  private router = inject(Router);

  // PUBLIC_INTERFACE
  update(id: string, qty: number) {
    /** Updates quantity for an item. */
    this.cart.update(id, Number(qty));
  }

  // PUBLIC_INTERFACE
  remove(id: string) {
    /** Removes an item from the cart. */
    this.cart.remove(id);
  }

  // PUBLIC_INTERFACE
  clear() {
    /** Clears the cart. */
    this.cart.clear();
  }

  // PUBLIC_INTERFACE
  checkout() {
    /** Navigates to checkout flow. */
    this.router.navigate(['/checkout']);
  }
}
