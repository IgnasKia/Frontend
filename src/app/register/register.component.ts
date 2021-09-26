import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }
  
  registerUser(){
    this.apiService.register(this.registerForm.value).subscribe((result)=>{
      console.log(result);
      this.router.navigate(['/login']);
    });
  }
}
