import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUser().subscribe( data => {
      this.user = data;
    });
  }
}
