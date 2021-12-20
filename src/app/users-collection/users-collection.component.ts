import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from '../user';

@Component({
  selector: 'app-users-collection',
  templateUrl: './users-collection.component.html',
  styleUrls: ['./users-collection.component.css']
})
export class UsersCollectionComponent implements OnInit, OnDestroy {

  users: User[];
  private subscriptions = new Subscription();
  userData: any;
  currentUserName: string;
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.apiService.getUsers().subscribe( data => {
      this.users = data;
    }));

    this.getUserData();
  }

  getUserData(){
    this.subscriptions.add(this.apiService.getCurrentUserData().subscribe( data => {
      this.userData = data;
    }));
  }
  
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

}
