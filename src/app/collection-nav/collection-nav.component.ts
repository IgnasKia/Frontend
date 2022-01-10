import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-collection-nav',
  templateUrl: './collection-nav.component.html',
  styleUrls: ['./collection-nav.component.css']
})
export class CollectionNavComponent implements OnInit {
  isMenuCollapsed = true;

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
  }

}
