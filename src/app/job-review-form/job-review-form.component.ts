import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-job-review-form',
  templateUrl: './job-review-form.component.html',
  styleUrls: ['./job-review-form.component.css']
})
export class JobReviewFormComponent {
  @Input() startingForm: FormGroup | undefined;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<string> = new EventEmitter<string>();


  @Input() formOneValues : any;
  @Input() formTwoValues : any;

  constructor(
    private jobService: JobsService
  ) {}


  ngOnInit(): void {

  }


  submitForms() {
    const val1 = this.formOneValues;
    const val2 = this.formTwoValues;
    const val = {...val1, ...val2}
    console.log(val)
    this.jobService.postNewJobOffer(val).subscribe({
      next: (data) => { console.log(data)},
      error: (err) => { console.log(err )}
    })
  }

}
