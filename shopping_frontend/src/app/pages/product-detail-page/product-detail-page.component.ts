import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product-detail-page',
  imports: [CommonModule, FormsModule],
  template: `
  <div *ngIf="vm$ | async as vm" class="grid cols-2">
    <div class="card">
      <img [src]="vm.image" [alt]="vm.title" style="width:100%; border-radius: 12px 12px 0 0;">
    </div>
    <div>
      <h1 style="margin-bottom:8px">{{ vm.title }}</h1>
      <div style="color:#6b7280; margin-bottom:10px">{{ vm.category }} • ★ {{ vm.rating || '—' }}</div>
      <p style="margin-bottom:16px">{{ vm.description }}</p>
      <div style="font-size:20px; font-weight:700; margin-bottom:8px">\${{ vm.price | number:'1.2-2' }}</div>
      <div style="display:flex; gap:8px; align-items:center">
        <label>Qty:
          <input type="number" [(ngModel)]="qty" min="1" class="input" style="width:90px">
        </label>
        <button class="btn primary" (click)="add(vm.id)">Add to Cart</button>
      </div>
    </div>
  </div>
  `,
})
export class ProductDetailPageComponent {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private cart = inject(CartService);

  qty = 1;

  vm$ = this.route.paramMap.pipe(
    switchMap(p => this.api.getProduct(p.get('id') || ''))
  );

  // PUBLIC_INTERFACE
  add(id: string) {
    /** Adds current product by id with chosen quantity. */
    this.api.getProduct(id).subscribe(p => { if (p) this.cart.add(p, Math.max(1, this.qty)); });
  }
}
