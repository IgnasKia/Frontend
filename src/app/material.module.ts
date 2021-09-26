import { NgModule } from  '@angular/core';
 
import { MatButtonModule } from  '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
 
 
@NgModule({
imports: [MatButtonModule,MatToolbarModule,MatCardModule,MatDialogModule,MatFormFieldModule,MatInputModule],
exports: [MatButtonModule,MatToolbarModule,MatCardModule,MatDialogModule,MatFormFieldModule,MatInputModule],
 
})
 
export  class  MyMaterialModule { }