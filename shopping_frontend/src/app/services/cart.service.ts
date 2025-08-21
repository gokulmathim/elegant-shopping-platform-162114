import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartItem, Product } from '../models/types';

const LS_KEY = 'app_cart';

function getStorage(): any /* Storage | null */ {
  try {
    // Use globalThis for universal access; avoid direct window reference for SSR/lint.
    const g: any = typeof globalThis !== 'undefined' ? globalThis : undefined;
    if (g && g.localStorage) {
      return g.localStorage as any;
    }
  } catch {}
  return null;
}

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class CartService {
  /** Maintains cart items and provides derived streams. */
  private storage = getStorage();
  private items$ = new BehaviorSubject<CartItem[]>(this.load());

  private load(): CartItem[] {
    try {
      const raw = this.storage?.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private save() {
    try {
      this.storage?.setItem(LS_KEY, JSON.stringify(this.items$.value));
    } catch {}
  }

  // PUBLIC_INTERFACE
  get stream() {
    /** Observable stream of cart items. */
    return this.items$.asObservable();
  }

  // PUBLIC_INTERFACE
  get count$() {
    /** Observable of total items count. */
    return this.items$.pipe(map(items => items.reduce((acc, it) => acc + it.quantity, 0)));
  }

  // PUBLIC_INTERFACE
  get total$() {
    /** Observable of cart total price. */
    return this.items$.pipe(map(items => items.reduce((acc, it) => acc + it.product.price * it.quantity, 0)));
  }

  // PUBLIC_INTERFACE
  add(product: Product, qty = 1) {
    /** Adds an item to the cart or increases its quantity. */
    const items = this.items$.value.slice();
    const found = items.find(i => i.product.id === product.id);
    if (found) found.quantity += qty;
    else items.push({ product, quantity: qty });
    this.items$.next(items);
    this.save();
  }

  // PUBLIC_INTERFACE
  remove(productId: string) {
    /** Removes a product from the cart. */
    const items = this.items$.value.filter(i => i.product.id !== productId);
    this.items$.next(items);
    this.save();
  }

  // PUBLIC_INTERFACE
  update(productId: string, quantity: number) {
    /** Updates quantity or removes if zero. */
    const items = this.items$.value.slice();
    const idx = items.findIndex(i => i.product.id === productId);
    if (idx >= 0) {
      if (quantity <= 0) items.splice(idx, 1);
      else items[idx].quantity = quantity;
      this.items$.next(items);
      this.save();
    }
  }

  // PUBLIC_INTERFACE
  clear() {
    /** Clears the cart. */
    this.items$.next([]);
    this.save();
  }
}
