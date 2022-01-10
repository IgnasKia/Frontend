import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentBalance: number;
  cards: any;
  user: any;
  userId: string;
  private subscriptions = new Subscription();
  constructor(private apiService: ApiService) { }

  ngOnInit(): void{
     this.getUserData();
  }

  getUserData(){
    this.subscriptions.add(this.apiService.getCurrentUserData().subscribe( data => {
      this.user = data;
      this.currentBalance = this.user.balance;
      this.getUserCards(this.user._id);
    }));
  }

  getUserCards(userId: string) {
    this.subscriptions.add(this.apiService.getAllUserCards(userId).subscribe( data => {
      this.cards = data;
    }));
  } 

  sellUserCard(cardId: string, userId: string) {
    this.subscriptions.add(this.apiService.sellCard(cardId, {"userid": userId }).subscribe());
  }

  updateUserBalance(price: number, userId: string){
    this.subscriptions.add(this.apiService.updateUserBalance({ "balance": this.user.balance+price, "cardQuantity": this.user.cardQuantity-1}, userId).subscribe( () => this.getUserData()));
  }

  sellCard(cardId: string, price: number) {
    if(confirm("Are you sure you want to sell this banknote?")) {
      this.sellUserCard(cardId, this.user._id);
      this.updateUserBalance(price, this.user._id);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
