import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})

export class StepOneComponent implements OnInit {

  formInfos!: FormGroup;

  constructor (
    private fb: FormBuilder,
  ){
    this.formInfos = this.fb.group({
      avatar: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      confirmEmail: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      phoneNumberPrefix: [''],
    })
  }

  ngOnInit(): void {

  }


}
