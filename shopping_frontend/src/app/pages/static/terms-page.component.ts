import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-terms-page',
  imports: [CommonModule],
  template: `
  <section class="card" style="padding:20px">
    <h2>Terms of Service</h2>
    <p style="margin-top:8px; color:#6b7280">Use this app responsibly. This is a demo.</p>
  </section>
  `
})
export class TermsPageComponent {}
