import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { Coin } from '../coin';
import { CoinDetailsComponent } from '../coin-details/coin-details.component';

@Component({
  selector: 'app-collection-home',
  templateUrl: './collection-home.component.html',
  styleUrls: ['./collection-home.component.css']
})
export class CollectionHomeComponent implements OnInit {
  coins: Coin[];

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.apiService.getRandomCoins().subscribe( data => {
      this.coins = data;
    });
  }

  openDialogMoreDetails(coinId: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = coinId;
    const dialogRef = this.dialog.open(CoinDetailsComponent, dialogConfig);
  }

}
