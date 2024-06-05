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

  status = 'Confirmed';

  constructor (
    private ui: UiInteractionsService ,
    private applicationService: ApplicationService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (params) => { 
        this.candidateId = params.get('userId');
        this.jobId = params.get('jobId');
      }
    )
  }

  recieveStepOneFormValue(value: String) {
    this.stepOneFormValue = value;
  }

  recieveStepOneFormData(form: FormData) {
    this.stepOneFormData = form;
  }

  receiveStepTwoResponses(responses: string[]){
    this.responsesStepTWo = responses;      
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
    switch (this.current) {
      case 0:
        
      break;

      case 1:
        this.applicationService.applyForJob(this.stepOneFormData, this.candidateId, this.jobId).subscribe({
          next: (data) => {
            console.log('API res front:', data);
          },
          error: (err) => {
            console.log(err);
          }
        })
      break;

      case 2:
        this.applicationService.sendReposnses(this.responsesStepTWo, this.candidateId, this.jobId).subscribe({
          next: (data) => {
            console.log('Step Two Form value', this.responsesStepTWo);
            console.log('Service API Response', data);
          },
          error: (err) => { 
            console.log(err);
          }
        })
      break;

      case 3:
      break;

      default:
      break;
    }
  }

  done() {
    this.applicationService.submitJobApplication(this.candidateId, this.jobId).subscribe({
      next: () => { 
        this.ui.openSuccessJobModal();
      },
      error: (err) => { 
        console.log(err);
        
      }
    })
  }
 
}
