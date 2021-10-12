import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogContent } from '@angular/material/dialog';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
export interface UserElement {
  username: string;
}
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['username', 'email', 'admin', 'change role', 'delete'];

  usersTable: UserElement[] = [];

  users: any;
  currentUser: any = [];
  private subscriptions = new Subscription();
  
  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  openDialog(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    this.dialog.open(RoleDialogComponent, dialogConfig);    
  };

  ngOnInit(): void {
    this.subscriptions.add(this.apiService.getUsers().subscribe( data => {
      this.users = data;
      this.usersTable = data;
    }));
    this.subscriptions.add(this.apiService.getUser().subscribe( data => {
      this.currentUser = data;
    }));
  }

  deleteUser(id: any): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.subscriptions.add(this.apiService.deleteUser(id)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }))
    }     
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
