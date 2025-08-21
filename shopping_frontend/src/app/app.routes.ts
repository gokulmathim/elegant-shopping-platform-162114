import { Routes } from '@angular/router';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { PrivacyPageComponent } from './pages/static/privacy-page.component';
import { TermsPageComponent } from './pages/static/terms-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: CatalogPageComponent },
  { path: 'product/:id', component: ProductDetailPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersPageComponent, canActivate: [authGuard] },
  { path: 'privacy', component: PrivacyPageComponent },
  { path: 'terms', component: TermsPageComponent },
  { path: '**', redirectTo: '' }
];
