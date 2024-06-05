import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit{

  @Output() cvUploadEmitter: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() value: EventEmitter<any> =  new EventEmitter<any>();

  public formInfos!: FormGroup;
  candidateInfos!: any;
  candidateId: any;
  jobId: any;
  formData!: FormData;

  constructor (
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) 
  { 
    this.formInfos = this.fb.group({   
      cv: ['', Validators.required]
    })
  }

  ngOnInit(): void {    
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.candidateId = params.get('userId'); 
        this.jobId = params.get('jobId');
        this.fetchCandidateInfos();
      }
    )

    this.formInfos.valueChanges.subscribe({
      next: (data) => { 
        this.formData = new FormData();
        this.formData.append('cv', this.formInfos.get('cv').value);
        this.cvUploadEmitter.emit(this.formData);
      }
    })
  }

  fetchCandidateInfos() {
    this.userService.showUser(this.candidateId).subscribe({
      next: (data) => {
        this.candidateInfos = data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  uploadCV(event){
    const file = (event.target).files[0];
    this.formInfos.patchValue({
      cv: file,
    });
    this.formInfos.get('cv').updateValueAndValidity();
  }

}
