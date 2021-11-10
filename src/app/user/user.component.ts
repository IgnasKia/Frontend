import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentBalance: number;
  private subscriptions = new Subscription();
  logggedUser: any;
  userCards: any;
  user: any;
  
  userName: string;
  constructor( private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.getUser(id);
    this.getUserCards(id);
    this.getCurrentUser();
  }

  getUser(userId: string){
    this.subscriptions.add(this.apiService.getUserById(userId).subscribe( data => {
      this.user = data;
      this.userName = this.user.username;
    }));
  }

  getUserCards(userId: string){
    this.subscriptions.add(this.apiService.getAllUserCards(userId).subscribe( data => {
      this.userCards = data;
    }));
  }

  getCurrentUser(){
    this.subscriptions.add(this.apiService.getCurrentUserData().subscribe( data => {
      this.logggedUser = data;
      this.currentBalance = this.logggedUser.balance;
    }));
  }
}
