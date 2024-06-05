import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-job-details-form',
  templateUrl: './job-details-form.component.html',
  styleUrls: ['./job-details-form.component.css']
})

export class JobDetailsFormComponent implements OnInit{

  @Input() jobDetailsInfos: any;

  @Output() jobDetailsEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() formReady: EventEmitter<FormGroup>  = new EventEmitter<FormGroup>();

  jobDetailsForm!: FormGroup  ;
  selectedOption: any;

  constructor(private fb: FormBuilder) {
    this.jobDetailsForm = this.fb.group({
      title: ['', [Validators.required]],
      responsibilities: ['', [Validators.required]],
      qualificationsSkills: ['', [Validators.required]],
      salaryBenefits: ['', [Validators.required]],
      workEnv: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.formReady.emit(this.jobDetailsForm);
    this.jobDetailsForm.valueChanges.subscribe({
      next: (data) => {
        if (this.jobDetailsForm.valid) {
          // Emit the form data when all inputs are valid
          this.jobDetailsEmitter.emit(data);

        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  checkControlValidty() {
    Object.values(this.jobDetailsForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
        }
      });
  }
}
