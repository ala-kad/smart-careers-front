import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ){};

  isAuthenticated = false;
  email = new FormControl('', Validators.required);
  pswd = new FormControl('', Validators.required);
  remember = new FormControl('');

  validateForm!: FormGroup;
  accessToken = 'TOKEN'
  errorMessage = '';

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: this.email,
      password: this.pswd,
      remember: this.remember
    });
  }

  login() {
    const { email, password } = this.validateForm.value;
    if(this.validateForm.valid) { 
      this.authService.login(email, password).subscribe({
        next: (data) => {
          localStorage.setItem(this.accessToken, data.token);
          this.isAuthenticated = true;
          console.log(data.token);
          this.router.navigateByUrl('/dashboard')
        },
        error: (err) => {
          this.errorMessage = err.error;
        }
      })
    }

    
  }

  logout() {
    localStorage.removeItem(this.accessToken);
    this.isAuthenticated = false;
  }
}
