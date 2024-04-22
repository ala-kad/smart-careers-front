import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

type Step = 'step1' | 'step2';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})

export class FormContainerComponent implements OnInit {

  private currentStepBs: BehaviorSubject<Step> = new BehaviorSubject<Step>('step1');
  public currentStep$: Observable<Step> = this.currentStepBs.asObservable();

  public stepOneFom: FormGroup | undefined;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    // this.stepOneFom = this._fb.group({
    //   jobTitle: [''],
    //   skills: [''],
    //   requiredExperience: ['']
    // })
  }

  subformInitialized(name: string, group: FormGroup) {
    this.stepOneFom?.setControl(name, group);
  }

  submitForm() {
    const formValues = this.stepOneFom?.value;
    // submit the form with a service
  }

  changeStep(currentStep: string, direction: 'forward' | 'back') {
    switch(currentStep) {
      case 'step1':
        if (direction =='forward') {
          this.currentStepBs.next('step1');
        }
        break;
      case 'step2':
        if (direction == 'back') {
          this.currentStepBs.next('step2');
        }
        break;
    }
  }



  current = 0;

  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

}
