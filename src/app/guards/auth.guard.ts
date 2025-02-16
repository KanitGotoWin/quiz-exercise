import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log("Login status: " + authService.isAuthenticated);

  if (authService.isAuthenticated) { 
    return true; // Allow access if logged in
  } else {
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false;
  }
};
