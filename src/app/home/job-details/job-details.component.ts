import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobId!: any;
  jobDetails!: any;
  candidateId : any;

  constructor (
    private activatedRoute: ActivatedRoute,
    private jobService: JobsService,
    private router: Router,
    private authService: AuthService,
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

  navigateToApplicationForm() {
    if(this.authService.isAuthenticatedFun() ){
      this.candidateId = this.authService.getUserCrendentials()._id;
      this.router.navigate(['dashboard', 'candidate', this.candidateId, 'application', 'job', this.jobId]);
    } else {
      this.router.navigateByUrl('/login')
    }
  }

}
