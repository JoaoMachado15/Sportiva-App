import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    return this.check();
  }

  async canActivateChild(): Promise<boolean> {
    return this.check();
  }

  private async check(): Promise<boolean> {
    const isAuth = await this.auth.isAuthenticated();

    if (!isAuth) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return false;
    }

    return true;
  }
}
