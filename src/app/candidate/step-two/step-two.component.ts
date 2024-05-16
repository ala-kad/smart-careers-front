import { Component, OnInit } from '@angular/core';
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
        this.jobId = params.get('id');
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
  }


}
