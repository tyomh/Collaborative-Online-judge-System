import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(@Inject('auth') private auth, private router: Router) { }

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      //redirect to home page
      this.router.navigate(['/problems']);
      return false;
    }
  }

  isAdmin(): boolean {
    return (this.auth.isAuthenticated());
    // if (this.auth.isAuthenticated() && this.auth.getProfile().roles.includes('Admin')) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
}
