import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.css']
})
export class RoleDialogComponent implements OnInit {

  changeRoleForm = this.fb.group({
    admin: ['']
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<RoleDialogComponent>, private fb: FormBuilder, private apiService: ApiService) { }

  selectedValue: string;

  roles: Role[] = [
    {value: 'true', viewValue: 'Admin'},
    {value: 'false', viewValue: 'User'}
  ];

  updateUserRole(){
    this.apiService.updateUser(this.changeRoleForm.value, '616535a0953e075070674f4b').subscribe();
    this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }
  
  ngOnInit(): void {
  }

}
