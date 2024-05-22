import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

import { Router} from '@angular/router';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',

  styleUrls: ['./register-user-form.component.css']
})
export class RegisterUserFormComponent implements OnInit {

  validateForm!: UntypedFormGroup;

  // captchaTooltipIcon: NzFormTooltipIcon = {
  //   type: 'info-circle',
  //   theme: 'twotone'
  // };

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
      this.validateForm = this.fb.group({
        email: [null, [Validators.email, Validators.required]],
        firstname: [null, [Validators.required]],
        lastname: [null, [Validators.required]],
        password: [null, [Validators.required]],
        checkPassword: [null, [Validators.required, this.confirmationValidator]],
        // captcha: [null, [Validators.required]],
        // agree: [false]
      })
  }

  ngOnInit(): void {
   
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.registerCandidate(this.validateForm.value).subscribe(
        {
          next: (data) => {
            this.router.navigateByUrl("/login")
          },
          error(err) {
            console.log(err.message);
          },
        }
      )
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }
}
