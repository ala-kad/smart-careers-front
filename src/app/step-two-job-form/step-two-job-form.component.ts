import { Component,  OnInit } from '@angular/core';
import { FormArray, FormBuilder,  } from '@angular/forms'
@Component({
  selector: 'app-step-two-job-form',
  templateUrl: './step-two-job-form.component.html',
  styleUrls: ['./step-two-job-form.component.css']
})

export class StepTwoJobFormComponent implements OnInit {

  constructor (private _fb: FormBuilder) {} ;

  stepTwoJobForm = this._fb.group({
        jobDescription: [''],
        profile: [''],
        benefits: [''],
      questions:
        this._fb.array([this._fb.control('')])
  })

  ngOnInit(): void {

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
}
