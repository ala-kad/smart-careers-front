import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-details-form',
  templateUrl: './job-details-form.component.html',
  styleUrls: ['./job-details-form.component.css']
})
export class JobDetailsFormComponent implements OnInit{

  @Input() startingForm: FormGroup | undefined;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<string> = new EventEmitter<string>();

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder
  ) {}

  jobDetailsForm!: FormGroup  ;

  ngOnInit(): void {
    if (this.startingForm) {
      this.jobDetailsForm = this.startingForm;
    } else {
      this.jobDetailsForm = this.fb.group({
        title: ['', Validators.required],
        jobSummary: [''],
        responsibilities: [''],
        qualificationsSkills: [''],
        salaryBenefits: [''],
        workEnv: [''],
      })
    }
   this.subformInitialized.emit(this.jobDetailsForm);
   this.newItemEvent.emit(this.jobDetailsForm.value)
  }


  doChangeStep(direction: 'forward') {
    this.changeStep.emit(direction);
  }

  submitForm() {
    console.log(this.jobDetailsForm.value);

  }

  addNewItem(formValue: string) {
    this.newItemEvent.emit(formValue)
    console.log(formValue);

  }

}
