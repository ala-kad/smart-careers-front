import { Component, OnInit, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import {FormGroup, FormBuilder, FormArray, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit, OnChanges {

  @Output() formEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  formInfos!: FormGroup;
  candidateInfos!: any;
  candidateId: any;

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) 
  { 
    this.formInfos = this.fb.group({
      avatar: ['',],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email, this.confirmationValidator]],
      adress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      phoneNumberPrefix: ['+216'],
      cv: ['', [Validators.required]]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['formEmitter']) { 
      console.log('changed');
      
    }
  }

  ngOnInit(): void {    
    this.formEmitter.emit(this.formInfos)
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.candidateId = params.get('userId'); 
        this.fetchCandidateInfos();
      }
    )
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.formInfos.controls['email'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.formInfos.controls['confirmEmail'].updateValueAndValidity());
  }

  fetchCandidateInfos() {
    this.userService.showUser(this.candidateId).subscribe({
      next: (data) => {
        this.candidateInfos = data
        this.initForm();
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  initForm() {
    this.formInfos = this.fb.group({
      avatar: ['',],
      firstname: [this.candidateInfos.firstname, [Validators.required]],
      lastname: [this.candidateInfos.lastname, [Validators.required]],
      email: [this.authService.getUserCrendentials().email , [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email, this.confirmationValidator]],
      adress: [this.candidateInfos.adress, [Validators.required]],
      phone: [this.candidateInfos.phone, [Validators.required]],
      phoneNumberPrefix: ['+216'],
      cv: ['', [Validators.required]]
    })
    this.formEmitter.emit(this.formInfos);
  }

  submitForm() { 
    if(this.formInfos.valid) {
      console.log('valid');
    }
    else {
      Object.values(this.formInfos.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
