import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../models/types';
import { map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-catalog-page',
  imports: [CommonModule, ProductCardComponent],
  template: `
    <section>
      <div class="grid cols-3">
        <app-product-card *ngFor="let p of products$ | async" [product]="p"></app-product-card>
      </div>
      <div *ngIf="(products$ | async)?.length === 0" class="empty">No products match your filters.</div>
    </section>
  `,
  styles: [`.empty{color:#6b7280; padding:20px;}`]
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
