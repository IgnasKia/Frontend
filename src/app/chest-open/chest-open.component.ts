import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-chest-open',
  templateUrl: './chest-open.component.html',
  styleUrls: ['./chest-open.component.css']
})
export class ChestOpenComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ChestOpenComponent>, private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('50%', '100%');
  }

}
