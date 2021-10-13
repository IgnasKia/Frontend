import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor (
    private router: Router,
    private api: ApiService
  ) {}
  
  async canActivate(): Promise<boolean> {
    if (await this.api.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  };
  
}
