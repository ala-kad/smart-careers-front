import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
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
    private fb: UntypedFormBuilder,
    private router: Router
  ){};

  isAuthenticated = false;
  email = "";
  pswd = "";
  remember = false;
  validateForm!: UntypedFormGroup;
  accessToken = 'TOKEN'

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  login(email: string, pass: string) {
    this.authService.login(email, pass).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem(this.accessToken, data.token);
        this.isAuthenticated = true;
        this.router.navigateByUrl('/dashboard')
      },
      (err) => {
        return err.message;
      }
    )
  }

  logout() {
    localStorage.removeItem(this.accessToken);
    this.isAuthenticated = true;
  }
}
