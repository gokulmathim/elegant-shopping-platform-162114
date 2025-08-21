import { Injectable, inject } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Product, Order, UserProfile, CheckoutRequest, CheckoutSessionResponse } from '../models/types';

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class ApiService {
  /** This service mocks a REST API. Replace endpoints with real backend integration. */
  private products: Product[] = [
    { id: '1', title: 'Modern Chair', description: 'Ergonomic and stylish.', image: 'https://picsum.photos/seed/chair/400/300', category: 'Furniture', price: 129.99, rating: 4.5, stock: 12 },
    { id: '2', title: 'Wireless Headphones', description: 'Noise-cancelling premium sound.', image: 'https://picsum.photos/seed/headphones/400/300', category: 'Electronics', price: 199.99, rating: 4.7, stock: 8 },
    { id: '3', title: 'Running Shoes', description: 'Lightweight and durable.', image: 'https://picsum.photos/seed/shoes/400/300', category: 'Sports', price: 89.99, rating: 4.3, stock: 25 },
    { id: '4', title: 'Coffee Maker', description: 'Brew the perfect cup.', image: 'https://picsum.photos/seed/coffee/400/300', category: 'Home', price: 59.99, rating: 4.1, stock: 40 },
    { id: '5', title: 'Sleek Desk Lamp', description: 'Minimal LED lamp.', image: 'https://picsum.photos/seed/lamp/400/300', category: 'Home', price: 39.99, rating: 4.0, stock: 52 },
  ];

  private orders: Order[] = [];

  // PUBLIC_INTERFACE
  getProducts(params?: { q?: string; category?: string; min?: number; max?: number }): Observable<Product[]> {
    /** Returns filtered products for catalog browsing. */
    return of(this.products).pipe(
      delay(200),
      map(list => list.filter(p => {
        if (params?.q && !p.title.toLowerCase().includes(params.q.toLowerCase())) return false;
        if (params?.category && p.category !== params.category) return false;
        if (params?.min != null && p.price < params.min) return false;
        if (params?.max != null && p.price > params.max) return false;
        return true;
      }))
    );
  }

  // PUBLIC_INTERFACE
  getCategories(): Observable<string[]> {
    /** Returns unique product categories. */
    const set = new Set(this.products.map(p => p.category));
    return of(Array.from(set)).pipe(delay(150));
  }

  // PUBLIC_INTERFACE
  getProduct(id: string): Observable<Product | undefined> {
    /** Returns single product by id. */
    return of(this.products.find(p => p.id === id)).pipe(delay(150));
  }

  // PUBLIC_INTERFACE
  login(email: string, password: string): Observable<UserProfile> {
    /** Mock login always succeeds and returns a stub profile. */
    return of({
      id: 'u1',
      name: 'Demo User',
      email
    }).pipe(delay(300));
  }

  // PUBLIC_INTERFACE
  getProfile(): Observable<UserProfile> {
    /** Return mock profile. */
    return of({ id: 'u1', name: 'Demo User', email: 'demo@example.com', address: '123 Demo St', city: 'Metropolis', country: 'Wonderland' }).pipe(delay(200));
  }

  // PUBLIC_INTERFACE
  updateProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    /** Update mock profile. */
    return of({ id: 'u1', name: profile.name || 'Demo User', email: profile.email || 'demo@example.com', address: profile.address, city: profile.city, country: profile.country } as UserProfile).pipe(delay(300));
  }

  // PUBLIC_INTERFACE
  createCheckoutSession(payload: CheckoutRequest): Observable<CheckoutSessionResponse> {
    /** Mocks creating a Stripe checkout session, returning a fake URL and order id. */
    const orderId = `ord_${Math.random().toString(36).slice(2, 8)}`;
    const total = 0;
    this.orders.unshift({
      id: orderId, items: [], total, createdAt: new Date().toISOString(), status: 'placed'
    });
    return of({
      checkoutUrl: `/orders?justPlaced=${orderId}`,
      orderId
    }).pipe(delay(400));
  }

  // PUBLIC_INTERFACE
  listOrders(): Observable<Order[]> {
    /** Returns mock orders list. */
    return of(this.orders).pipe(delay(250));
  }
}
