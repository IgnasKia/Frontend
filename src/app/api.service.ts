import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from  './user';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_SERVER = "http://localhost:3000";

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  public register(user: User){
    return this.httpClient.post<User[]>(`${this.API_SERVER}/auth/signup`, user).pipe(retry(1),
      catchError(this.handleError)
    );
  }

  public login(user: User){
    return this.httpClient.post<User[]>(`${this.API_SERVER}/auth/signin`, user).pipe(retry(1),
      catchError(this.handleError)
    );
  }

  public getUser(){
    const token = this.getToken();
    let tokenInfo = this.getDecodedAccessToken(token!); // decode token
    let userId = tokenInfo._id; // get user _id from token
    return this.httpClient.get<User[]>(`${this.API_SERVER}/auth/user/${userId}`).pipe(retry(1),
      catchError(this.handleError)
    );
  }

  public getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  public getUsers(){
    return this.httpClient.get<User[]>(`${this.API_SERVER}/auth/users`).pipe(retry(1),
      catchError(this.handleError)
    );
  }

  public deleteUser(userId: any){
    return this.httpClient.delete<User[]>(`${this.API_SERVER}/auth/user/${userId}`).pipe(retry(1),
      catchError(this.handleError)
    );
  }

  public updateUser(user: User, userId: any){
    return this.httpClient.patch<User[]>(`${this.API_SERVER}/auth/user/${userId}`, user).pipe(retry(1),
      catchError(this.handleError)
    );
  }

  public loggedIn() {
    return !!localStorage.getItem('token');
  }

  public isAdmin() {
    const token = this.getToken();
    let tokenInfo = this.getDecodedAccessToken(token!); // decode token
    let isAdmin = tokenInfo.admin; // get user _id from token
    return isAdmin;
  }

  public getToken() {
     return localStorage.getItem('token');
  }

  public logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  handleError(error: any) {

    let errorMessage = '';
 
    if (error.error instanceof ErrorEvent) {
 
      // client-side error
 
      errorMessage = `Error: ${error.error.message}`;
 
    } else {
 
      // server-side error
 
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
 
    }
 
    window.alert(errorMessage);
 
    return throwError(errorMessage);
 
  }
}
