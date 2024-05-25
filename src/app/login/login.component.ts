import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isAuthenticated = false;
  validateForm!: FormGroup;
  accessToken = 'TOKEN';
  errorMessage = '';
  passwordVisible = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.validateForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl(false),
    });
  }

  ngOnInit(): void {}

  login() {
    const { email, password } = this.validateForm.value;
    if (this.validateForm.valid) {
      this.authService.login(email, password).subscribe({
        next: (data) => {
          this.authService.setLocalStorageToken(data.token);
          this.isAuthenticated = true;
          if(this.authService.isAuthenticatedFun() && this.authService.isCandidate()){
            this.router.navigate(['dashboard', 'candidate']).then(
            () => { console.log('Candidate') }
            ).catch(
              (err) => { console.log(err); }
            );
          }else if(this.authService.isAuthenticatedFun() && this.authService.isAdmin()){
            this.router.navigate(['dashboard', 'users']).then(
              () => { console.log('admin') }
              ).catch(
                (err) => { console.log(err); }
              );
          }else { 
            this.router.navigate(['dashboard', 'jobs']).then(
              () => { console.log('recruiter') }
              ).catch(
                (err) => { console.log(err); }
              );
          }
          
        },
        error: (err) => {
          this.errorMessage = err.error;
        }
      });
    }
  }

  logout() {
    localStorage.removeItem(this.accessToken);
    this.isAuthenticated = false;
  }
}
