import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // validateForm: FormGroup<{
  //   email: FormControl<string>;
  //   password: FormControl<string>;
  // }> = this.fb.group({
  //   email: ['', [Validators.required]],
  //   password: ['', [Validators.required]],
  //   remember: [true]
  // });

  // submitForm(): void {
  //   if (this.validateForm.valid) {
  //     console.log('submit', this.validateForm.value);
  //   } else {
  //     Object.values(this.validateForm.controls).forEach(control => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({ onlySelf: true });
  //       }
  //     });
  //   }
  // }
  constructor(private authService: AuthService){};

  // constructor(private fb: NonNullableFormBuilder) {}

  email = "";
  pswd = "";

  login(email: string, pass: string) {
    this.authService.login(email, pass).subscribe(
      (data) => {
        console.log(data);

      },
      (error) => {
        console.log(error);

      }
    )
  }
}
