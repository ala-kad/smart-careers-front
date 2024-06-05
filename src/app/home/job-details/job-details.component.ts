import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';
import { JobsService } from 'src/app/services/jobs.service';
import { UiInteractionsService } from 'src/app/services/ui-interactions.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobId!: any;
  jobDetails!: any;
  candidateId : any;
  isCandidate!: boolean;

  constructor (
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private jobService: JobsService,
    private router: Router,
    private applicationService: ApplicationService,
    private ui: UiInteractionsService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.jobId = params.get("id");
      },
       error: (err) =>{
        console.log(err);
      }
    })
    this.fetchJobDetails();

    this.isCandidate = this.authService.isCandidate();
    this.candidateId = this.authService.getUserCrendentials()._id;
    console.log('Candidate infos', this.authService.getUserCrendentials());
    console.log('Candidate Id', this.candidateId);

  }

  fetchJobDetails() {
    this.jobService.getJobDetails(this.jobId).subscribe({
      next: (data) => {
        this.jobDetails = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  verifyCandidateApplied() { 
    if(this.authService.isAuthenticatedFun() && this.authService.isCandidate()){
      this.applicationService.checkIfCandidateApplied(this.jobId, this.candidateId).subscribe({
        next: (data) => { 
          console.log(data);
          if(data.length >= 1 ) { 
            this.ui.openDangerJobModal();
          }else { 
            this.router.navigate(['dashboard', 'candidate', this.candidateId, 'application', 'job', this.jobId]);
          }
        },
        error: (err) => { 
          console.log(err);
        }
      })
    }else {
      this.router.navigateByUrl('/login')
    }
  }

  navigateToApplicationForm() {
    this.router.navigate(['dashboard', 'candidate', this.candidateId, 'application', 'job', this.jobId]);
  }

  checkApplication() {
    if(this.authService.isAuthenticatedFun() && this.authService.isCandidate()){

    }
  }
}
