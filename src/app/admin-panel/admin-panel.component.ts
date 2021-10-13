import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
import { User } from '../user';
export interface UserElement {
  username: string;
}

interface Rarity {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['username', 'email', 'admin', 'change role', 'delete'];

  usersTable: UserElement[] = [];

  users: User[];

  currentUser: any = [];
  submitted = false;
  private subscriptions = new Subscription();
  
  constructor(private apiService: ApiService, public dialog: MatDialog, private fb: FormBuilder) {}

  rarity: Rarity[] = [
    {value: 'common', viewValue: 'Common'},
    {value: 'uncommon', viewValue: 'Uncommon'},
    {value: 'rare', viewValue: 'Rare'},
    {value: 'legendary', viewValue: 'Legendary'}
  ];

  cardCreateForm = this.fb.group({
    name: ['', Validators.required],
        picture: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        price: ['', Validators.required],
        rarity: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ]
  });

  openDialog(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    const dialogRef = this.dialog.open(RoleDialogComponent, dialogConfig); 
    dialogRef.afterClosed().subscribe(
      () => this.getUsers())
  };

  ngOnInit(): void {
    this.getUsers();
    this.getCurrentUser();
  }

  getUsers(){
    this.subscriptions.add(this.apiService.getUsers().subscribe( data => {
      this.users = data;
      this.usersTable = data;
    }));
  }

  getCurrentUser(){
    this.subscriptions.add(this.apiService.getUser().subscribe( data => {
      this.currentUser = data;
    }));
  }

  deleteUser(id: any){
    if (confirm('Are you sure you want to delete this user?')) {
      this.subscriptions.add(this.apiService.deleteUser(id)
    .subscribe(
      response => {
        console.log(response);
        this.getUsers();
      },
      error => {
        console.log(error);
      }))
    }     
  }

  get f(): { [key: string]: AbstractControl } {
    return this.cardCreateForm.controls;
  }
  
   createCard(){
    this.submitted = true;

    console.log(JSON.stringify(this.cardCreateForm.value, null, 2));
    (this.apiService.createCard(this.cardCreateForm.value)).subscribe((result)=>{
      console.log(result);
    });
  }

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }
}
