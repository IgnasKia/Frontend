import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CoinDetailsComponent } from '../coin-details/coin-details.component';

@Component({
  selector: 'app-collection-user-id',
  templateUrl: './collection-user-id.component.html',
  styleUrls: ['./collection-user-id.component.css']
})
export class CollectionUserIdComponent implements OnInit {

  username: any;
  user: any;
  multiple: any;
  order:boolean = false;
  p: number = 1;
  userId: any;
  coins: any;
  currentUser: any;
  currentUserId: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.apiService.getUserCoins(this.userId).subscribe( data => {
      this.coins = data;
    });
    this.getUser(this.userId);
  }

  getUser(userId: string){
    this.apiService.getUserById(userId).subscribe( data => {
      this.user = data;
      this.username = this.user.username;
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

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addToCollection(coinId: string){
    if (confirm('Are you sure you want to add this coin to your collection?')) {
      this.apiService.addUserIdCoin(coinId, {userid: this.currentUserId}).subscribe( (data) => {
        this.multiple = data;
        if(this.multiple===true){
          alert("This coin has already been added to your collection");
        }
        this.openSnackBar("Coin has been added to collection successfully");
      });
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}
