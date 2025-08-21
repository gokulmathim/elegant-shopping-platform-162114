import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, combineLatest, map, switchMap } from 'rxjs';
import { Product } from '../models/types';

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class CatalogService {
  /** Handles category retrieval and streamed product queries. */
  private api = inject(ApiService);

  private query$ = new BehaviorSubject<{ q?: string; category?: string; min?: number; max?: number }>({});

  categories$ = this.api.getCategories();

  // PUBLIC_INTERFACE
  setQuery(params: { q?: string; category?: string; min?: number; max?: number }) {
    /** Sets query parameters to re-fetch products. */
    this.query$.next(params);
  }

  products$: Observable<Product[]> = this.query$.pipe(
    switchMap(q => this.api.getProducts(q))
  );
}
