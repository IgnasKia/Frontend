import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from  './user';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import { Card } from './card';
import { TempTrade } from './tempTrade';
import { UserReward } from './userReward';
import { ChangeUserBalance } from './changeUserBalance';
import { UserIdInCard } from './userIdInCard';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API_SERVER = "https://pokemon-cards-application.herokuapp.com";
  API_SERVER = "http://localhost:3000";

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  // -----------------------------USER SECTION START API----------------------------- 
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

  public getCurrentUserData(){
    const token = this.getToken();
    let tokenInfo = this.getDecodedAccessToken(token!); // decode token
    let userId = tokenInfo._id; // get user _id from token
    return this.httpClient.get<User[]>(`${this.API_SERVER}/auth/user/${userId}`).pipe(retry(1),
      catchError(this.handleError)
    );
  }

  public getUserById(userId: string){
    return this.httpClient.get<User[]>(`${this.API_SERVER}/auth/user/${userId}`).pipe(retry(1),
      catchError(this.handleError)
    );
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

  public updateUserReward(userReward: UserReward, userId: any){
    return this.httpClient.patch<UserReward[]>(`${this.API_SERVER}/auth/user/${userId}`, userReward).pipe(retry(1),
      catchError(this.handleError)
    );
  }

  public updateUserBalance(changeUserBalance: ChangeUserBalance, userId: any){
    return this.httpClient.patch<ChangeUserBalance[]>(`${this.API_SERVER}/auth/user/${userId}`, changeUserBalance).pipe(retry(1),
      catchError(this.handleError)
    );
  }
  // -----------------------------USER SECTION END----------------------------- 

  // -----------------------------CARD SECTION START API-----------------------------   
  public createCard(card: Card){
    return this.httpClient.post<Card[]>(`${this.API_SERVER}/cards/create`, card).pipe(retry(1),
      catchError(this.handleError)
    );
  }

  public getCardById(cardId: string){
    return this.httpClient.get<Card[]>(`${this.API_SERVER}/cards/${cardId}`).pipe(retry(1),
      catchError(this.handleError)
    );
  }

  public getAllCards(){
    return this.httpClient.get<Card[]>(`${this.API_SERVER}/cards`).pipe(retry(1),
      catchError(this.handleError)
    );
  }

  public getAllUserCards(userId: string){
    return this.httpClient.get<Card[]>(`${this.API_SERVER}/user/${userId}/cards`).pipe(retry(1),
      catchError(this.handleError)
    );
  }

  public setUsersCard(cardId: any, userIdInCard: UserIdInCard){
    return this.httpClient.patch<UserIdInCard[]>(`${this.API_SERVER}/cards/update/${cardId}`, userIdInCard).pipe(retry(1),
      catchError(this.handleError)
    );
  }

  public sellCard(cardId: any, userIdInCard: UserIdInCard) {
    return this.httpClient.patch<UserIdInCard[]>(`${this.API_SERVER}/user/delete/cards/${cardId}`, userIdInCard).pipe(retry(1),
      catchError(this.handleError)
    );
  }
// -----------------------------TRADE CARD SECTION START-----------------------------

public createTempTrade(tempTrade: TempTrade){
  return this.httpClient.post<TempTrade[]>(`${this.API_SERVER}/cards/trade/create`, tempTrade).pipe(retry(1),
    catchError(this.handleError)
  );
}

public getRequestedTrades(traderTwo: string){
  return this.httpClient.get<TempTrade[]>(`${this.API_SERVER}/cards/trades/requested/${traderTwo}`).pipe(retry(1),
    catchError(this.handleError)
  );
}

public getCreatedTrades(traderOne: string){
  return this.httpClient.get<TempTrade[]>(`${this.API_SERVER}/cards/trades/created/${traderOne}`).pipe(retry(1),
    catchError(this.handleError)
  );
}

public acceptTrade(tradeId: string, status: string, tempTrade: TempTrade){
  return this.httpClient.patch<TempTrade[]>(`${this.API_SERVER}/cards/trade/${tradeId}/${status}`, tempTrade).pipe(retry(1),
    catchError(this.handleError)
  );
}

// -----------------------------TRADE CARD SECTION END-----------------------------


// -----------------------------CARD SECTION START-----------------------------


public getDecodedAccessToken(token: string): any {
  try{
      return jwt_decode(token);
  }
  catch(Error){
      return null;
  }
}

  public loggedIn() {
    return !!localStorage.getItem('token');
  }

  public isAdmin() {
    const token = this.getToken();
    let tokenInfo = this.getDecodedAccessToken(token!); // decode token
    let isAdmin = tokenInfo.admin;
    return isAdmin;
  }

  public getToken() {
     return localStorage.getItem('token');
  }

  public logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  public getCardByProbability() {
    return this.httpClient.get(`${this.API_SERVER}/card/probability`).pipe(retry(1),
      catchError(this.handleError)
    );
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
