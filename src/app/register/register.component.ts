import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from '../validation';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router) { }
  
  registerForm = this.fb.group({
        fullName: ['', 
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30)
          ] 
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', 
          [
            Validators.required, 
            Validators.email, 
            Validators.minLength(5),
            Validators.maxLength(100)
          ]
      ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
  },
  {
    validators: [Validation.match('password', 'confirmPassword')]
  }
  );

  

  ngOnInit(): void {
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  
   registerUser(){
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    (this.apiService.register(this.registerForm.value)).subscribe();
    this.router.navigate(['/login']);
  }

}
