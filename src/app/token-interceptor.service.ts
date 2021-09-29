import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const apiService = this.injector.get(ApiService)
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${apiService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
    };
  
}
