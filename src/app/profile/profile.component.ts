import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  cards: any;
  user: any;
  userId: string;
  private subscriptions = new Subscription();
  constructor(private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
     this.getUserData();
  }

  getUserData(){
    this.subscriptions.add(this.apiService.getUser().subscribe( data => {
      this.user = data;
      this.getUserCards(this.user._id);
    }));
  }

  getUserCards(userId: string) {
    this.subscriptions.add(this.apiService.getAllUserCards(userId).subscribe( data => {
      this.cards = data;
    }));
  } 

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
