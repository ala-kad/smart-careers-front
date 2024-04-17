import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-review-form',
  templateUrl: './job-review-form.component.html',
  styleUrls: ['./job-review-form.component.css']
})
export class JobReviewFormComponent {
  @Input() startingForm: FormGroup | undefined;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder
  ) {}

  public jobReview: FormGroup | undefined ;

  ngOnInit(): void {
    if (this.startingForm) {
      this.jobReview = this.startingForm;
    } else {
      this.jobReview = this.fb.group({
        Revie : ['']
      })
    }
   this.subformInitialized.emit(this.jobReview);

  }


  doChangeStep(direction: 'back') {
    this.changeStep.emit(direction);
  }

}
