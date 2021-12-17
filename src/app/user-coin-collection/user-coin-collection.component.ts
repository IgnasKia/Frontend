import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { CreateCoinModalComponent } from '../create-coin-modal/create-coin-modal.component';

@Component({
  selector: 'app-user-coin-collection',
  templateUrl: './user-coin-collection.component.html',
  styleUrls: ['./user-coin-collection.component.css']
})
export class UserCoinCollectionComponent implements OnInit {

  coinsAll: any;
  coins: any;
  coin: any[] = [];

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCoinModalComponent, {
      width: '500px',
      height: '500px',
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
