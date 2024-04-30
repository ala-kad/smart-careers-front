import { Component,  OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
@Component({
  selector: 'app-step-two-job-form',
  templateUrl: './step-two-job-form.component.html',
  styleUrls: ['./step-two-job-form.component.css']
})

export class StepTwoJobFormComponent implements OnInit {

  constructor (private _fb: FormBuilder) {} ;

  @Output() formValueEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  stepTwoJobForm!: FormGroup;

  ngOnInit(): void {
    this.stepTwoJobForm = this._fb.group({
      description: [''],
      profile: [''],
      benefits: [''],
    questions:
      this._fb.array([this._fb.control('')])
    })
  }


  getQuestions () {
    return this.stepTwoJobForm.get('questions') as FormArray;
  }

  addQuestion() {
    this.getQuestions().push(this._fb.control(''));
  }

  removeQuestion (index: number) {
    this.getQuestions().removeAt(index);
  }

  submitForm() {
   this.formValueEmitter.emit(this.stepTwoJobForm);
  }
}
