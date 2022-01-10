import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
import { User } from '../user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  usersTable: UserElement[] = [];

  users: User[];

  currentUser: any = [];
  submitted = false;
  private subscriptions = new Subscription();

  img_source: string;
  
  constructor(private apiService: ApiService, public dialog: MatDialog, private fb: FormBuilder, private _snackBar: MatSnackBar) {}

  rarity: Rarity[] = [
    {value: 'common', viewValue: 'Common'},
    {value: 'uncommon', viewValue: 'Uncommon'},
    {value: 'rare', viewValue: 'Rare'},
    {value: 'legendary', viewValue: 'Legendary'}
  ];

  cardCreateForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)]
    ],
    issuer: ['',
    [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150)]
    ],
    year: ['', [Validators.required, Validators.max(2022), Validators.min(1)]],
    value: ['', [Validators.required, Validators.max(1000000), Validators.min(0.01)] ],
    currency: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(1)] ],
    picture: ['', Validators.required ],
    price: ['', [Validators.required, Validators.max(1000000), Validators.min(1)]],
    rarity: ['', Validators.required,],
    comment: ['', [Validators.maxLength(1000), Validators.minLength(10)] ]
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
      this.dataSource.data = data;
    }));
  }

  getCurrentUser(){
    this.subscriptions.add(this.apiService.getCurrentUserData().subscribe( data => {
      this.currentUser = data;
    }));
  }

  deleteUser(id: any){
    if (confirm('Are you sure you want to delete this user?')) {
      this.subscriptions.add(this.apiService.deleteUser(id)
    .subscribe(
      response => {
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

    if (this.cardCreateForm.invalid) {
      return;
    }

    this.apiService.createCard(this.cardCreateForm.value).subscribe((result)=>{
      this.openSnackBar();
      this.cardCreateForm.reset();
    });
  }

  openSnackBar() {
    this._snackBar.open("New banknote has been created successfully", '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  previewImage() {
    this.img_source = this.cardCreateForm.value.picture;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }
}
