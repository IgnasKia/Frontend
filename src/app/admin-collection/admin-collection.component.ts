import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
import { User } from '../user';


interface Rarity {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-admin-collection',
  templateUrl: './admin-collection.component.html',
  styleUrls: ['./admin-collection.component.css']
})
export class AdminCollectionComponent implements OnInit {

  displayedColumns: string[] = ['username', 'email', 'admin', 'change role', 'delete'];

  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  imageSrc: string;

  uploadForm = new FormGroup({
    issuer: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required, Validators.max(2022), Validators.min(1)]),
    value: new FormControl('', [Validators.required, Validators.max(1000000), Validators.min(0.01)]),
    currency: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(1)]),
    composition: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    weight: new FormControl('', [Validators.required, Validators.max(10000), Validators.min(1)]),
    shape: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    comment: new FormControl('', [Validators.maxLength(1000), Validators.minLength(10)]),
  });

  fileName = '';

  form: FormGroup;

  issuerList: string[] = ["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Antarctic Territory","British Indian Ocean Territory","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Canton and Enderbury Islands","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos [Keeling] Islands","Colombia","Comoros","Congo - Brazzaville","Congo - Kinshasa","Cook Islands","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Côte d’Ivoire","Denmark","Djibouti","Dominica","Dominican Republic","Dronning Maud Land","East Germany","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","French Southern and Antarctic Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Honduras","Hong Kong SAR China","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Johnston Island","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau SAR China","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Metropolitan France","Mexico","Micronesia","Midway Islands","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar [Burma]","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","Neutral Zone","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","North Korea","North Vietnam","Northern Mariana Islands","Norway","Oman","Pacific Islands Trust Territory","Pakistan","Palau","Palestinian Territories","Panama","Panama Canal Zone","Papua New Guinea","Paraguay","People's Democratic Republic of Yemen","Peru","Philippines","Pitcairn Islands","Poland","Portugal","Puerto Rico","Qatar","Romania","Russia","Rwanda","Réunion","Saint Barthélemy","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Saudi Arabia","Senegal","Serbia","Serbia and Montenegro","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","South Korea","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syria","São Tomé and Príncipe","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","U.S. Minor Outlying Islands","U.S. Miscellaneous Pacific Islands","U.S. Virgin Islands","Uganda","Ukraine","Union of Soviet Socialist Republics","United Arab Emirates","United Kingdom","United States","Unknown or Invalid Region","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Wake Island","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe","Åland Islands"];

  users: User[];

  currentUser: any = [];
  submitted = false;
  private subscriptions = new Subscription();

  img_source: string;

  usersTable: User[];

  constructor(private apiService: ApiService, public dialog: MatDialog, private fb: FormBuilder, private _snackBar: MatSnackBar) { }

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

  get f(){
    return this.uploadForm.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        fileSource: file
      });

      reader.readAsDataURL(file);
      this.uploadForm.get('picture')?.setValue(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  submit() {
    this.submitted = true;

    if (this.uploadForm.invalid) {
      alert("Insert all required fields");
      return;
    }

    const formData = new FormData();

    formData.append('file', this.uploadForm.get('fileSource')?.value);
    formData.append('issuer', this.uploadForm.get('issuer')?.value);
    formData.append('year', this.uploadForm.get('year')?.value);
    formData.append('value', this.uploadForm.get('value')?.value);
    formData.append('currency', this.uploadForm.get('currency')?.value);
    formData.append('composition', this.uploadForm.get('composition')?.value);
    formData.append('weight', this.uploadForm.get('weight')?.value);
    formData.append('shape', this.uploadForm.get('shape')?.value);
    formData.append('comment', this.uploadForm.get('comment')?.value);

    this.apiService.createCoin(formData).subscribe();

    this.uploadForm.reset();
    this.imageSrc = '';

    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.open("New coin has been created successfully", '', {
      duration: 3000,
      verticalPosition: 'top'
    });
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
