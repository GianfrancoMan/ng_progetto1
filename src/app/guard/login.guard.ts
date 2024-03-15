import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);


  authService.checkAuth();
  let isLogged = authService.isLogged();
  if (isLogged) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/auth');
};
