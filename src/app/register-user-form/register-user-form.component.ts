import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { AuthService } from '../services/auth.service';
import { error } from '@ant-design/icons-angular';

import { Router, ActivatedRoute} from '@angular/router';

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

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.registerRecruiter(this.validateForm.value).subscribe(
        {
          next: (data) => {
            console.log(data);

            this.router.navigateByUrl("/login").then(() => {
              console.log('login');

            }).catch((res) => {
              console.log(res.message);
            })
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

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      // phoneNumberPrefix: ['+216'],
      // phoneNumber: [null, [Validators.required]],
      // website: [null, [Validators.required]],
      // captcha: [null, [Validators.required]],
      // agree: [false]
    });
  }
}
