import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-game-real',
  templateUrl: './game-real.component.html',
  styleUrls: ['./game-real.component.css']
})
export class GameRealComponent implements OnInit {

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

}
