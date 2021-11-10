import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  constructor(public apiService: ApiService) { }

  @Input() balance = 0; // decorate the property with @Input()

  ngOnInit(): void {
    try {
      this.subscription = this.apiService.getCurrentUserData().subscribe( data => {
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
