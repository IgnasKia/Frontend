import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { Coin } from '../coin';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.css']
})
export class CoinDetailsComponent implements OnInit {

  coin: Coin;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCoinDetails(this.data);
  }

  getCoinDetails(coinId: string){
    this.apiService.getCoinById(coinId).subscribe( data => {
      this.coin = data;
    });
  }


}
