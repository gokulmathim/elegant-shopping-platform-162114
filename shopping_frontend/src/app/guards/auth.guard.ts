import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// PUBLIC_INTERFACE
export const authGuard: CanActivateFn = () => {
  /** Guard ensures user is authenticated before accessing a route. */
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated) return true;
  router.navigate(['/login']);
  return false;
};
