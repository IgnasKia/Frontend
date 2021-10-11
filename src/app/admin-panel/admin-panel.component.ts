import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, OnDestroy {

  users: any;
  subscription: Subscription;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.subscription = this.apiService.getUsers().subscribe( data => {
      this.users = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
