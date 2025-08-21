import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogService } from './services/catalog.service';
import { CartService } from './services/cart.service';
import { Observable } from 'rxjs';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet, BottomNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // PUBLIC_INTERFACE
  /** Title is used in footers and metadata. */
  title = 'Elegant Shop — Online Shopping';

  private router = inject(Router);
  private catalog = inject(CatalogService);
  private cart = inject(CartService);

  query = '';
  minPrice?: number;
  maxPrice?: number;

  categories$ = this.catalog.categories$;
  cartCount$: Observable<number> = this.cart.count$;

  year = new Date().getFullYear();

  // PUBLIC_INTERFACE
  onSearch(): void {
    /** Navigates to catalog with query param for search. */
    this.router.navigate(['/'], { queryParams: { q: this.query || null }, queryParamsHandling: 'merge' });
  }

  // PUBLIC_INTERFACE
  filterBy(category: string): void {
    /** Applies category filter through router query params. */
    this.router.navigate(['/'], { queryParams: { category: category === 'all' ? null : category }, queryParamsHandling: 'merge' });
  }

  // PUBLIC_INTERFACE
  applyFilters(): void {
    /** Applies min/max price filter via router. */
    this.router.navigate(['/'], {
      queryParams: {
        min: this.minPrice ?? null,
        max: this.maxPrice ?? null
      },
      queryParamsHandling: 'merge'
    });
  }

  // PUBLIC_INTERFACE
  clearFilters(): void {
    /** Clears query and numeric filters. */
    this.query = '';
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.router.navigate(['/'], { queryParams: { q: null, category: null, min: null, max: null }, queryParamsHandling: 'merge' });
  }
}
