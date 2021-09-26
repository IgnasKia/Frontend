import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{


  
  constructor(private injector: Injector) { }

  intercept(req: { clone: (arg0: { setHeaders: { Authorization: string; }; }) => any; }, next: { handle: (arg0: any) => any; }) {
    const apiService = this.injector.get(ApiService)
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${apiService.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
    }
  
}
