import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';
import { Coin } from '../coin';
import { CoinDetailsComponent } from '../coin-details/coin-details.component';

@Component({
  selector: 'app-catalogue-collection',
  templateUrl: './catalogue-collection.component.html',
  styleUrls: ['./catalogue-collection.component.css']
})
export class CatalogueCollectionComponent implements OnInit {
  coins: Coin[];
  year: any;
  order:boolean = false;
  p: number = 1;
  collection: any[];
  currentUserId: any;
  currentUser: any;
  multiple: Object;
  constructor(public apiService: ApiService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllCollectionCoins();
    this.getCurrentUser();
  }

  getAllCollectionCoins() {
    this.apiService.getAllCoins().subscribe( data => {
      this.coins = data;
      this.collection = this.coins;
    });
  }

  getCurrentUser(){
    this.apiService.getCurrentUserData().subscribe(data => {
      this.currentUser = data;
      this.currentUserId = this.currentUser._id;
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

  openDialogMoreDetails(coinId: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = coinId;
    const dialogRef = this.dialog.open(CoinDetailsComponent, dialogConfig);
  }


  addToCollection(coinId: string){
    if (confirm('Are you sure you want to add this coin to your collection?')) {
      this.apiService.addUserIdCoin(coinId, {userid: this.currentUserId}).subscribe( (data) => {
        this.multiple = data;
        if(this.multiple===true){
          alert("This coin has already been added to your collection");
        }else this.openSnackBar("Coin has been added to collection successfully");
      });
    }
  };

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  delete(coinId: string, publicId: string){
    if (confirm('Are you sure you want to delete this coin from collection? Remember that if any user has this coin in their collection it will be deleted permanently')) {
      this.apiService.deleteCoin(publicId, coinId).subscribe( ()=> {
        this.openSnackBar("Coin was deleted successfuly");
        this.getAllCollectionCoins();
      });
    }

  }

}
