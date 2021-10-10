import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  
  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUser().subscribe( data => {
      this.user = data;
    });
  }

}
