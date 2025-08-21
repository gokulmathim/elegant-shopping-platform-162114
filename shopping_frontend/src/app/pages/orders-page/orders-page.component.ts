import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-orders-page',
  imports: [CommonModule],
  template: `
  <section>
    <h2 style="margin-bottom:12px">Your Orders</h2>
    <div *ngIf="justPlaced" class="card" style="padding:12px; margin-bottom:12px; border-left:4px solid var(--color-primary)">
      Order {{ justPlaced }} placed successfully. You will receive updates via email.
    </div>
    <div *ngFor="let o of orders" class="card" style="padding:12px; margin-bottom:10px">
      <div style="display:flex; justify-content: space-between;">
        <div>#{{ o.id }}</div>
        <div style="color:#6b7280">{{ o.createdAt | date:'medium' }}</div>
      </div>
      <div style="margin-top:6px">Status: <strong>{{ o.status }}</strong></div>
      <div>Total: <strong>\${{ o.total | number:'1.2-2' }}</strong></div>
    </div>
    <div *ngIf="orders.length === 0" class="card" style="padding:16px; color:#6b7280">No orders yet.</div>
  </section>
  `,
})
export class OrdersPageComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);

  orders: any[] = [];
  justPlaced?: string | null;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(p => this.justPlaced = p.get('justPlaced'));
    this.api.listOrders().subscribe(o => this.orders = o);
  }
}
