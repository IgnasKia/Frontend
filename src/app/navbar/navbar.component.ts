import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: any;
  subscription: Subscription;
  balance = 0;
  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    try {
      this.subscription = this.apiService.getUser().subscribe( data => {
        this.user = data;
        this.balance = this.user.balance;
      });
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
