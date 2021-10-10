import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe( data => {
      this.users = data;
    });
  }

}
