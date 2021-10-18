import { DatePipe, formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from '../user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  time = moment();

  dailyReward = 20;
  private subscriptions = new Subscription();
  currentUser: any = [];

  constructor(private apiService: ApiService, private _snackBar: MatSnackBar) { }

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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
