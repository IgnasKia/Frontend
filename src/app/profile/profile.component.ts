import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {


  user: any;
  subscription: Subscription;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.subscription = this.apiService.getUser().subscribe( data => {
      this.user = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
