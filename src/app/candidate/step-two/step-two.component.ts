import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormArrayName } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {

  stepTwoForm!: FormGroup;
  questions: [] = [];
  jobId!: any;
  @Output() responsesEmitter: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor (
    private jobService: JobsService,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
    this.stepTwoForm = this._fb.group({
      responses: this._fb.control(''),
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.jobId = params.get('jobId');
        },
      }
    )

    this.jobService.getJobQuestions(this.jobId).subscribe({
      next: (res) => {
        console.log(res);

        this.questions = res;
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.stepTwoForm.valueChanges.subscribe({
      next: (data) => {
        this.responsesEmitter.emit(data);
      },
      error: (err) => { 
        console.log(err)
      }
    })
  }


}
