import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-trade-cards',
  templateUrl: './trade-cards.component.html',
  styleUrls: ['./trade-cards.component.css']
})
export class TradeCardsComponent implements OnInit {

  private subscriptions = new Subscription();
  loggedUser: any;
  userCards: any;
  user: any;
  tradingCard: any;
  route: any;
  id: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<TradeCardsComponent>, private fb: FormBuilder, private apiService: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTradingCardById(this.data[1]);
    this.dialogRef.updateSize('100%', '100%');
    this.getCurrentUser();
  }

  getTradingCardById(data: string){
    this.subscriptions.add(this.apiService.getCardById(data).subscribe( data => {
      this.tradingCard = data;
    }));
  }

  getCurrentUser(){
    this.subscriptions.add(this.apiService.getCurrentUserData().subscribe( data => {
      this.loggedUser = data;
      this.getUserCards(this.loggedUser._id);
    }));
  }

  getUserCards(userId: string){
    this.subscriptions.add(this.apiService.getAllUserCards(userId).subscribe( data => {
      this.userCards = data;
    }));
  }

  submitTrade(cardId: string){
    if (confirm('Are you sure you want trade this card?')) {
      const tradeData = {'traderOne': this.loggedUser._id, 'traderTwo': this.data[0], 'traderOneCardId':cardId,'traderTwoCardId':this.data[1]};
      this.subscriptions.add(this.apiService.createTempTrade(tradeData).subscribe(()=>{
        this.getCurrentUser();
      }));
      this.dialogRef.close();
      this.openSnackBar(`✅ Trade request was sent succesfully, you can cancel this trade in Trade section`);
    }
    
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 4000,
      verticalPosition: 'top'
    });
  }
}
