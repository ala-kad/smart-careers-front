import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormBuilder, FormArray, Validators, FormControl} from '@angular/forms';
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
    let formData: any = new FormData();
    Object.values(this.formInfos.controls).forEach(formControlName  => {
      formData.append(formControlName, this.formInfos.get(formControlName.value));  
    }) 
    
    this.formInfos.valueChanges.subscribe({
      next: (data) => { 
        this.value.emit(data);    
        this.cvUploadEmitter.emit(formData);    
        console.log(data)
        console.log(formData.values)

      },
      error: (err) => { 
        console.log(err);
      }
    })

    this.formInfos.valueChanges.subscribe({
      next: (data) => {
        this.cvUploadEmitter.emit(formData);
      },
      error: (err) => { 

      }
    })

    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.candidateId = params.get('userId'); 
        this.fetchCandidateInfos();
      }
    )

   
  }

  uploadFile(event: Event, fileType: string) {
    this.updateFile(event, fileType); 
    // Process the selected file
  }

  updateFile(event: Event, formControlName: string) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const selectedFile = input.files[0];
      const control = this.formInfos.controls[formControlName]
      if (control) {
        control.patchValue(selectedFile);
        control.updateValueAndValidity();
      }
    }
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

  submitForm() { 
    Object.values(this.formInfos.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });

  }

}
