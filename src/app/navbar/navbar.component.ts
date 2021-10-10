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
  isAdmin = false;
  balance = 0;
  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    try {
      this.apiService.getUser().subscribe( data => {
        this.user = data;
        this.balance = this.user.balance;
        if (this.user.admin) {
          this.isAdmin = true;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
  }

}
