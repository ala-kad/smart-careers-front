import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {

  stepTwoForm!: FormGroup;
  questions: any;
  jobId!: any;
  candidateId: any;

  @Output() responsesEmitter: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor (
    private jobService: JobsService,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
    this.stepTwoForm = this._fb.group({
      responses: this._fb.array([]),
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
          this.jobId = params.get('jobId');
          this.candidateId = params.get('userId');
        },
      }
    )

    this.fetchQuestionsJob();

    this.stepTwoForm.valueChanges.subscribe({
      next: (data) => {
        this.responsesEmitter.emit(data);        
      },
      error: (err) => { 
        console.log(err)
      }
    })
  }

  fetchQuestionsJob() { 
     this.jobService.getJobQuestions(this.jobId).subscribe({
      next: (res) => {
        this.questions = res;
        this.initFormArray();
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  initFormArray(): void { 
    const formArray = this.stepTwoForm.get('responses') as FormArray;
    this.questions.forEach(question => {
      const group = this._fb.group({
        answer: ['', [Validators.required]]
      })
      formArray.push(group)
    });
  }
}
