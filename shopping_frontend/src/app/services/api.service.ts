import { Injectable, inject } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Product, Order, UserProfile, CheckoutRequest, CheckoutSessionResponse } from '../models/types';

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class ApiService {
  /** This service mocks a REST API. Replace endpoints with real backend integration. */
  private products: Product[] = [
    // Matches mockup list with sensible categories and placeholder images
    {
      id: 'p1',
      title: 'Minimal Sneakers',
      description: 'Clean minimal silhouette for everyday comfort.',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop', // sneakers placeholder
      category: 'Fashion',
      price: 59.00,
      rating: 4.3,
      stock: 20
    },
    {
      id: 'p2',
      title: 'Leather Backpack',
      description: 'Premium tan leather backpack with modern profile.',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop', // tan handbag-style backpack
      category: 'Accessories',
      price: 120.00,
      rating: 4.6,
      stock: 15
    },
    {
      id: 'p3',
      title: 'Classic Watch',
      description: 'Timeless analog watch with leather strap.',
      image: 'https://images.unsplash.com/photo-1516570161787-2fd917215a3d?q=80&w=1200&auto=format&fit=crop',
      category: 'Accessories',
      price: 149.00,
      rating: 4.5,
      stock: 10
    },
    {
      id: 'p4',
      title: 'Sunglasses',
      description: 'Polarized lenses with a classic frame.',
      image: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop',
      category: 'Accessories',
      price: 59.00,
      rating: 4.2,
      stock: 30
    },
    {
      id: 'p5',
      title: 'Denim Jacket',
      description: 'Mid-wash denim jacket with a modern fit.',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop',
      category: 'Fashion',
      price: 99.00,
      rating: 4.4,
      stock: 18
    },
    {
      id: 'p6',
      title: 'Wireless Headphones',
      description: 'Noise-cancelling over-ear headphones.',
      image: 'https://images.unsplash.com/photo-1518441902113-c1d3d249c1dd?q=80&w=1200&auto=format&fit=crop',
      category: 'Electronics',
      price: 199.00,
      rating: 4.7,
      stock: 12
    },
    {
      id: 'p7',
      title: 'Red T-Shirt',
      description: 'Soft cotton tee in vibrant red.',
      image: 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?q=80&w=1200&auto=format&fit=crop',
      category: 'Fashion',
      price: 29.00,
      rating: 4.1,
      stock: 40
    }
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
