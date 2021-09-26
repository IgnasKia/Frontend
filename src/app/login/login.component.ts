import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.apiService.login(this.loginForm.value).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('tempToken', JSON.stringify(res));
        const savedPerson = JSON.parse(localStorage.getItem('tempToken')!);
        localStorage.setItem('token', savedPerson.accessToken);
        localStorage.removeItem('tempToken');
        console.log(savedPerson.accessToken);
        this.router.navigate(['/profile']);
      }
     );
  }
  
}
