import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const subscriptionGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.checkAuth();
  if (authService.isSubscribed()) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/auth/subscription');
};
