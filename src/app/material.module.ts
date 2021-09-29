import { NgModule } from  '@angular/core';
 
import { MatButtonModule } from  '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
 
 
@NgModule({
imports: [MatButtonModule,MatToolbarModule,MatCardModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatIconModule,MatCheckboxModule,MatTableModule],
exports: [MatButtonModule,MatToolbarModule,MatCardModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatIconModule,MatCheckboxModule,MatTableModule],
 
})
 
export  class  MyMaterialModule { }