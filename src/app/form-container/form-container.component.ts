import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { JobsService } from '../services/jobs.service';
import { StepQuestionsComponent } from '../step-questions/step-questions.component'
type Step = 'step1' | 'step2';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css'],
  providers: [StepQuestionsComponent]
})

export class FormContainerComponent implements OnInit {

  private currentStepBs: BehaviorSubject<Step> = new BehaviorSubject<Step>('step1');
  public currentStep$: Observable<Step> = this.currentStepBs.asObservable();

  public stepOneFom!: FormGroup ;

  formValues = '';
  formTwo!: FormGroup;

  formOne : any;
  formTwoValues : any;


  constructor(private _fb: FormBuilder, private jobService: JobsService,
    private questionComponent: StepQuestionsComponent
  ) {}

  ngOnInit(): void {

  }

  subformInitialized(name: string, group: FormGroup) {
    this.stepOneFom?.setControl(name, group);
  }

  submitForm() {
    const formValues = this.stepOneFom?.value;
    // submit the form with a service
  }

  submitFormOne(value: string) {
    this.formValues = value;
    this.formOne = value;
  }

  submitFormTwo(formValue: FormGroup) {
    this.formTwo = formValue.value;
    this.formTwoValues = formValue.value;
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
  }

  next(): void {
    this.current += 1;

    this.changeContent()
  }

  done(): void {
    const formValues = {...this.formOne, ...this.formTwoValues}
    this.jobService.postNewJobOffer(formValues).subscribe({
      next: (data) => { console.log(data); },
      error: (err) => { console.log(err);
       }
    })
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        console.log(this.current);

        break;
      }
      case 1: {
        this.index = 'Second-content';
        console.log(this.current);

        break;
      }
      case 2: {
        this.index = 'third-content';
        console.log(this.current);

        break;
      }

      default: {
        this.index = 'error';
      }
    }
  }

  handleQuestionsFormValues(values: string) {
    console.log('Received Form Values:', values);
  }

  triggerEmitQuestions() {
    this.questionComponent.emitQuestionsFormValues();
  }
}
