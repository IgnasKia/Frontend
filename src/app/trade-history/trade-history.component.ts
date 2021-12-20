import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.css']
})
export class TradeHistoryComponent implements OnInit {
  currentBalance: number;
  private subscriptions = new Subscription();
  loggedUser: any;
  requestedTrades: any;
  createdTrades: any;
  empty: any;
  cardInfo: any;
  currentUserCardInfo: any;
  otherUserCardInfo: any;
  allCards: any;
  array: any[] = [];

  constructor(private apiService: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCurrentUser();

  }

  getCurrentUser(){
    this.subscriptions.add(this.apiService.getCurrentUserData().subscribe( data => {
      this.loggedUser = data;
      this.currentBalance = this.loggedUser.balance;
      this.getRequestedTrades(this.loggedUser._id);
      this.getCreatedTrades(this.loggedUser._id);
    }));
  }

  getRequestedTrades(traderTwo: string) {
    this.subscriptions.add(this.apiService.getRequestedTrades(traderTwo).subscribe( data => {
      if(data.length != 0) {
        this.requestedTrades = data;
        for(let i = 0; i<this.requestedTrades.length; i++){
          this.getTradingCard(this.requestedTrades[i].traderOneCardId);

          this.getTradingCard(this.requestedTrades[i].traderTwoCardId);
          
        }
      } else {
        this.requestedTrades = null;
      }
    }));
  }

  getCreatedTrades(traderOne: string) {
    this.subscriptions.add(this.apiService.getCreatedTrades(traderOne).subscribe( data => {
      if(data.length != 0) {
        this.createdTrades = data;
        for(let i = 0; i<this.createdTrades.length; i++){
          this.getTradingCard(this.createdTrades[i].traderOneCardId);

          this.getTradingCard(this.createdTrades[i].traderTwoCardId);
          
        }
      } else {
        this.createdTrades = null;
      }
    }));
  }

  getTradingCard(cardId: string) {
    this.subscriptions.add(this.apiService.getCardById(cardId).subscribe( data => {
        this.currentUserCardInfo = data;
        this.array.push(this.currentUserCardInfo);
    }));
  }

  acceptTrade(tradeId: string){
    if (confirm('Are you sure you want trade this card?')) {
      this.subscriptions.add(this.apiService.acceptTrade(tradeId, 'accepted', { traderOne: tradeId}).subscribe( data => {
        location.reload();
      }));
      this.openSnackBar(`✅ Trade was successful`);
    }
  }

  cancelTrade(tradeId: string){
    if (confirm('Are you sure you want to cancel this trade?')) {
      this.subscriptions.add(this.apiService.acceptTrade(tradeId, 'declined', { traderOne: tradeId}).subscribe( data => {
        location.reload();
      }));
      this.openSnackBar(`✅ Trade was canceled successfully`);
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }


}
