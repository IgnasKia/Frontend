import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from  './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_SERVER = "http://localhost:3000";

  constructor(
    private httpClient: HttpClient
  ) { }

  public register(user: User){
    return this.httpClient.post<User[]>(`${this.API_SERVER}/auth/signup`, user);
  }

  public login(user: User){
    return this.httpClient.post<User[]>(`${this.API_SERVER}/auth/signin`, user);
  }

  public loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
