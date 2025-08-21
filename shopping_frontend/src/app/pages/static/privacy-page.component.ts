import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-privacy-page',
  imports: [CommonModule],
  template: `
  <section class="card" style="padding:20px">
    <h2>Privacy Policy</h2>
    <p style="margin-top:8px; color:#6b7280">We respect your privacy. This is a demo policy.</p>
  </section>
  `
})
export class PrivacyPageComponent {}
