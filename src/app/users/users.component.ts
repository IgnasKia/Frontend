import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  currentBalance: number;
  users: any;
  private subscriptions = new Subscription();
  constructor(private apiService: ApiService) { }
  userData: any;
  currentUserName: string;

  ngOnInit(): void {
    this.subscriptions.add(this.apiService.getUsers().subscribe( data => {
      this.users = data;
    }));

    this.getUserData();
  }

  getUserData(){
    this.subscriptions.add(this.apiService.getCurrentUserData().subscribe( data => {
      this.userData = data;
      this.currentBalance = this.userData.balance;
    }));
  }
  
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
