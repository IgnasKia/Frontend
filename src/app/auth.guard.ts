import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor (
    private router: Router,
    private api: ApiService
  ) {}

  canActivate(): boolean {
    if (this.api.loggedIn() ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  };
  
}
