import { DatePipe, formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { ChestOpenComponent } from '../chest-open/chest-open.component';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  time = moment();
  casePrice = 50; 
  card: any;
  dailyReward = 20;
  private subscriptions = new Subscription();
  currentUser: any = [];

  constructor(private apiService: ApiService, private _snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(): void {
    setInterval(() => {
      this.time = moment();
   }, 1000);
   this.getCurrentUser();
  }

  getCurrentUser(){
    this.subscriptions.add(this.apiService.getUser().subscribe( data => {
      this.currentUser = data;
    }));
  }

  updateUsersLastRewardDate(id: any) {
    if(moment(moment().format('L')).isAfter(moment(this.currentUser.lastReward).format('L'))) {
      this.apiService.updateUserReward( { "lastReward": moment().format(), "balance": this.currentUser.balance += this.dailyReward }, id).subscribe();
      this.getCurrentUser();
      this.openSnackBar(`💰 Your daily reward is: ${this.dailyReward} 💰`);
    } else {
      this.openSnackBar("You have already got reward today, come back tommorow 📅");
    }
  }

  addBalance(money: number) {
    this.currentUser.balance += money;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  getCardByProbability() {
    this.apiService.getCardByProbability().subscribe( data => 
      console.log(data));
  }

  openDialog() {
    if(this.currentUser.balance-this.casePrice>=0 ) {
      if (confirm('Are you sure you want to open this case?')) {
        this.apiService.updateUserBalance({ "balance": this.currentUser.balance - this.casePrice} , this.currentUser._id).subscribe();
        this.getCurrentUser();
        const dialogConfig = new MatDialogConfig();
    
      this.apiService.getCardByProbability().subscribe( data => {
        this.card = data;
        dialogConfig.data = this.card;
        console.log(this.card._id);
        console.log(this.currentUser._id);

        this.apiService.setUsersCard(this.card._id, { "userid": this.currentUser._id}).subscribe();
        const dialogRef = this.dialog.open(ChestOpenComponent, dialogConfig);
      });
      } 
    } else {
      alert("You don't have enough balance");
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
