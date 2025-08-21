import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-checkout-page',
  imports: [CommonModule],
  template: `
  <section>
    <h2 style="margin-bottom:12px">Checkout</h2>
    <div class="card" style="padding:16px; margin-bottom:12px">
      <div style="display:flex; justify-content: space-between;">
        <div>Items</div>
        <div>{{ (cart.stream | async)?.length || 0 }}</div>
      </div>
      <div style="display:flex; justify-content: space-between;">
        <div>Total</div>
        <div style="font-weight:700">\${{ cart.total$ | async | number:'1.2-2' }}</div>
      </div>
    </div>
    <button class="btn primary" (click)="pay()">Pay with Stripe</button>
    <div style="color:#6b7280; font-size:12px; margin-top:8px">This demo uses a mocked checkout session. Integrate your backend to create a real Stripe session and redirect.</div>
  </section>
  `
})
export class CheckoutPageComponent {
  cart = inject(CartService);
  private api = inject(ApiService);
  private router = inject(Router);

  // PUBLIC_INTERFACE
  pay() {
    /** Creates a mocked checkout session and redirects to orders. */
    const items = (this.cart as any).items?.value || [];
    const payload = {
      items: (items || (this.cart as any).items$.value || []).map((i: any) => ({ id: i.product.id, quantity: i.quantity }))
    };
    this.api.createCheckoutSession(payload).subscribe(res => {
      if (res.checkoutUrl) {
        this.cart.clear();
        this.router.navigateByUrl(res.checkoutUrl);
      }
    });
  }
}
