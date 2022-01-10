import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { TradeCardsComponent } from '../trade-cards/trade-cards.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentBalance: number;
  private subscriptions = new Subscription();
  loggedUser: any;
  userCards: any;
  user: any;
  id: string;
  userName: string;
  constructor( private apiService: ApiService, private route: ActivatedRoute, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.getUser(this.id);
    this.getUserCards(this.id);
    this.getCurrentUser();
  }

  getUser(userId: string){
    this.subscriptions.add(this.apiService.getUserById(userId).subscribe( data => {
      this.user = data;
      this.userName = this.user.username;
    }));
  }

  getUserCards(userId: string){
    this.subscriptions.add(this.apiService.getAllUserCards(userId).subscribe( data => {
      this.userCards = data;
    }));
  }

  getCurrentUser(){
    this.subscriptions.add(this.apiService.getCurrentUserData().subscribe( data => {
      this.loggedUser = data;
      this.currentBalance = this.loggedUser.balance;
    }));
  }


  openDialog(userId: string, cardId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = [this.id, cardId];
    const dialogRef = this.dialog.open(TradeCardsComponent, dialogConfig); 

    dialogRef.afterClosed().subscribe(() => 
      this.getUserCards(this.id));
    };
}
