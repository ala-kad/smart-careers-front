import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {

  userAddForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {};

  ngOnInit(): void {
    this.userAddForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
    })
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.userAddForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };


  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.userAddForm.controls['checkPassword'].updateValueAndValidity());
  }

  submitForm(values: string) {
      console.log(values)

      this.authService.registerRecruiter(values).subscribe({
        next: (data) => { console.log(data);
        },
        error: (err) => { console.log(err);
        }
      })


  }
}
