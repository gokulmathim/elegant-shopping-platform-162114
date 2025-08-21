import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  standalone: true,
  selector: 'app-catalog-page',
  imports: [CommonModule, ProductCardComponent],
  template: `
    <!-- Promotional banner (top of catalog) -->
    <section class="catalog-banner card" role="region" aria-label="Featured promotion">
      <div class="banner-content">
        <div class="banner-copy">
          <div class="eyebrow">New season</div>
          <h2 class="banner-title">Fresh arrivals, curated for you</h2>
          <p class="banner-sub">
            Explore hand‑picked products across home, tech, and lifestyle. Enjoy free shipping over $50.
          </p>
          <div class="banner-ctas">
            <a class="btn btn-primary" routerLink="/">Shop Now</a>
            <a class="btn ghost" routerLink="/terms">Learn More</a>
          </div>
        </div>
        <div class="banner-visual" aria-hidden="true">
          <img
            class="banner-image"
            src="https://images.unsplash.com/photo-1520975979653-8bdf2c86ca7f?q=80&w=1200&auto=format&fit=crop"
            alt="Lifestyle collage of modern products" />
        </div>
      </div>
    </section>

    <!-- Product grid -->
    <section class="catalog-section">
      <h3 class="section-title">Popular Products</h3>
      <div class="product-grid enhanced-grid">
        <app-product-card *ngFor="let p of products$ | async" [product]="p"></app-product-card>
      </div>
      <div *ngIf="(products$ | async)?.length === 0" class="empty">No products match your filters.</div>
    </section>
  `,
  styles: [`
    /* Banner base */
    .catalog-banner {
      overflow: hidden;
      margin-bottom: 20px;
      border-radius: var(--radius-card);
    }
    .banner-content {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      gap: 24px;
      padding: 20px;
    }
    .banner-copy { padding: 8px 8px 8px 12px; }
    .eyebrow {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 8px;
    }
    .banner-title {
      margin: 0;
      font-size: 28px;
      line-height: 1.2;
      color: var(--text-primary);
    }
    .banner-sub {
      margin-top: 8px;
      color: var(--text-secondary);
      line-height: 1.6;
      max-width: 560px;
      font-size: 15px;
    }
    .banner-ctas {
      margin-top: 14px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .banner-visual { display: flex; justify-content: center; }
    .banner-image {
      width: 100%;
      max-width: 520px;
      height: auto;
      border-radius: var(--radius-lg);
      box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      object-fit: cover;
      aspect-ratio: 4/3;
      background: #F3F4F6;
    }

    /* Section heading */
    .catalog-section { margin-top: 8px; }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      margin: 8px 0 12px;
      color: var(--text-primary);
    }

    /* Empty state */
    .empty { color:#6b7280; padding:20px; }

    /* Enhanced product grid spacing */
    .enhanced-grid { gap: 24px; }

    /* Responsive adjustments */
    @media (max-width: 1024px) {
      .banner-content { grid-template-columns: 1fr 1fr; gap: 20px; }
      .banner-title { font-size: 24px; }
    }
    @media (max-width: 768px) {
      .banner-content {
        grid-template-columns: 1fr;
        text-align: center;
        padding: 16px;
      }
      .banner-copy { padding: 0; }
      .banner-sub { margin-left: auto; margin-right: auto; }
      .banner-ctas { justify-content: center; }
      .banner-image { max-width: 460px; }
      .section-title { text-align: center; }
    }
    @media (max-width: 480px) {
      .banner-title { font-size: 22px; }
      .banner-image { max-width: 100%; }
    }
  `]
})
export class CatalogPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private catalog = inject(CatalogService);

  products$ = this.catalog.products$;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const q = params.get('q') || undefined;
      const category = params.get('category') || undefined;
      const min = params.get('min') ? Number(params.get('min')) : undefined;
      const max = params.get('max') ? Number(params.get('max')) : undefined;
      this.catalog.setQuery({ q, category, min, max });
    });
  }
}
