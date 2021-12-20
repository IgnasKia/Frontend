import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';
import { Coin } from '../coin';
import { CoinDetailsComponent } from '../coin-details/coin-details.component';
import { CreateCoinModalComponent } from '../create-coin-modal/create-coin-modal.component';
import { User } from '../user';

@Component({
  selector: 'app-user-coin-collection',
  templateUrl: './user-coin-collection.component.html',
  styleUrls: ['./user-coin-collection.component.css']
})
export class UserCoinCollectionComponent implements OnInit {

  constructor(private apiService: ApiService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  user: User[];
  currentUserId: any;
  currentUser: any;
  coins: any;
  year: any;
  order:boolean = false;
  p: number = 1;
  collection: any[];

  ngOnInit(): void {
    this.apiService.getCurrentUserData().subscribe( data => {
      this.currentUser = data;
      this.currentUserId = this.currentUser._id;
      this.getAllCoins(this.currentUserId);
    });
  }

  openDialogMoreDetails(coinId: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = coinId;
    const dialogRef = this.dialog.open(CoinDetailsComponent, dialogConfig);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCoinModalComponent, {
      width: '500px',
      height: '500px',
      panelClass: 'custom-modalbox'
    });
  }

  
  getAllCoins(userId: string) {
    this.apiService.getUserCoins(userId).subscribe( data => {
      this.coins = data;
      this.collection = this.coins;
    });
  }

  getUserId(){
    this.apiService.getCurrentUserData().subscribe( data => {
      this.currentUser = data;
      this.currentUserId = this.currentUser.id;
    });
  }

  filterByYear() {
    this.order = !this.order;
    this.coins.sort( (a, b) => {
      return this.order? a.year!-b.year! : b.year! -a.year!;
    });
  }

  filterByCountry() {
    this.order = !this.order;
    this.coins.sort((a,b) => {       
      return (this.order)? a.issuer!.localeCompare(b.issuer!):b.issuer!.localeCompare(a.issuer!);
    });
  }

  filterByValue(){
    this.order = !this.order;
    this.coins.sort( (a, b) => {
      return this.order? a.value!-b.value! : b.value! -a.value!;
    });
  }

  delete(coinId: any){
    if (confirm('Are you sure you want to delete this coin from your collection?')) {
      this.apiService.deleteUserIdCoin(coinId, {userid: this.currentUserId}).subscribe( ()=>
      {
        this.openSnackBar();
        this.getAllCoins(this.currentUserId);
      });
    }
  }

  openSnackBar() {
    this._snackBar.open("Coin has been deleted from collection", '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}
