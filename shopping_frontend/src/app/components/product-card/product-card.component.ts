import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/types';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="card card-hover card-wrap">
    <a [routerLink]="['/product', product?.id]" class="img-wrap">
      <img [src]="product?.image" [alt]="product?.title" />
    </a>
    <div class="content">
      <a class="title" [routerLink]="['/product', product?.id]">{{ product?.title }}</a>
      <div class="meta">
        <span class="category">{{ product?.category }}</span>
        <span class="rating" *ngIf="product?.rating">★ {{ product?.rating }}</span>
      </div>
      <div class="price-row">
        <div class="price">\${{ product?.price | number:'1.2-2' }}</div>
        <button class="btn primary" (click)="addToCart()">Add</button>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .card-wrap { overflow: hidden; border-radius: 14px; }
    .img-wrap { display:block; aspect-ratio: 4/3; overflow: hidden; background:#F8F9FB; }
    img { width: 100%; height: 100%; object-fit: cover; transition: transform .3s ease; display:block; }
    .img-wrap:hover img { transform: scale(1.05); }
    .content { padding: 12px; }
    .title { font-weight: 600; color: #111827; text-decoration: none; display:block; margin-bottom: 6px;}
    .meta { display:flex; gap: 8px; color:#6b7280; font-size: 12px; margin-bottom: 8px; }
    .price-row { display:flex; align-items:center; justify-content: space-between; }
    .price { font-weight:700; color:#111827; }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
  private cart = inject(CartService);

  // PUBLIC_INTERFACE
  addToCart() {
    /** Adds product to cart with default quantity 1. */
    if (this.product) this.cart.add(this.product, 1);
  }
}
