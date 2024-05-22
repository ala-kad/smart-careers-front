import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationService } from 'src/app/services/application.service';
import { UiInteractionsService } from 'src/app/services/ui-interactions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {

  current = 0;
  candidateId: any;
  jobId: any;

  stepOneFormData: FormData = new FormData();
  responsesStepTWo!: any[];

  applicationFormValues: any;

  stepOneFormValue: any ;

  constructor (
    private ui: UiInteractionsService ,
    private applicationService: ApplicationService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.candidateId = params.get('userId');
        this.jobId = params.get('jobId');
      },
      }
    )
  }

  recieveStepOneFormValue(value: String) {
    this.stepOneFormValue = value;
    console.log(this.stepOneFormValue);
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
    switch (this.current) {
      case 0:
        console.log(this.current);
        
      break;

      case 1:
        console.log(this.current);

      break;

      case 2:
        console.log(this.current);
        
      break;

      case 3:
        console.log(this.current);
        
      break;

      default:
        console.log(this.current);

      break;
    }
  }

  recieveStepOneForm(form: FormData) {
    this.stepOneFormData = form;
    console.log(this.stepOneFormData);
  }

  receiveStepTwoResponses(responses: string[]){
    this.responsesStepTWo = responses;
  }

  done() {
    this.applicationFormValues =  {...this.stepOneFormValue, ...this.responsesStepTWo}
    this.applicationService.sendJobApplication(this.stepOneFormData, this.applicationFormValues, this.candidateId, this.jobId).subscribe({
      next: (res) =>{ 
        this.ui.openSuccessJobModal()
        console.log('Values String Input', this.applicationFormValues);
        console.log('Form Data', this.stepOneFormData)
        
      },
      error: (err) => { 
        console.log(err);
      }
    })

    // this.applicationService.sendApplication(this.stepOneFormData, '5', this.candidateId, this.jobId).subscribe({
    //   next: (data) => { 
    //     console.log(this.stepOneFormData);
    //     console.log(data);
    //   },
    //   error: (err) => { 
    //     console.log(err);
        
    //   }
    // })
  }

 
}
