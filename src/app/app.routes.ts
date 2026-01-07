import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  // ---------- PUBLIC ----------
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then(m => m.RegisterPage),
  },

  // ---------- PRIVATE ----------
  {
    path: 'tabs',
    canActivateChild: [AuthGuard], 
    loadChildren: () =>
      import('./tabs/tabs.routes').then(m => m.routes),
  },

  // ---------- FALLBACK ----------
  {
    path: '**',
    redirectTo: 'login',
  },
];
