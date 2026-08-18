import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { JobsService } from '../../services/jobs.service';
import { UiInteractionsService } from '../../services/ui-interactions.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-jobs-listing',
  templateUrl: './jobs-listing.component.html',
  styleUrls: ['./jobs-listing.component.css']
})
export class JobsListingComponent implements OnInit{

  listOfJobs: any;
  listJobsLength!: Number;
  isAdmin = false;
  isRecruiter = false
  isGuest: boolean = false;
  status = '';
  isLoading = true;
  userRoles: any ;
  userRole: any
  userPayload: any;
  recruiterId: any; 

  constructor (
    private jobsService: JobsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uiService: UiInteractionsService,
    private authService: AuthService
  ) {}

  
  ngOnInit(): void{

    this.userRoles = this.authService.getUserRole();
    console.log('Roles', this.userRoles)
    this.userRoles.forEach((element: any) => {
      this.userRole = element;
    });

    console.log('Role', this.userRole)

    this.userPayload = this.authService.getUserCrendentials();
    this.recruiterId = this.userPayload._id;
 
    this.isRecruiter = this.authService.isRecruiter();
    console.log('Recruiter Role:',this.isRecruiter);
    
    this.fetchJobListing()
  }

  fetchJobListing() { 
    /**
   * Checking if authenticated user is admin / reruiter, render all jobs (status = 'published, draft)
   */
    if(this.authService.isAuthenticatedFun() && this.authService.isRecruiter()){
       this.jobsService.getJobsList(this.status).subscribe({
        next: (data) => {
          this.listOfJobs = data;
          this.listJobsLength = data.length;
          this.isLoading = false
        },
        error: (err) => {
          console.log(err.message);

        }
      })
    }else { 
      /**
      * If user is not authenticated (Guest), render only Published jobs
        */
      this.status = 'Published';
      this.jobsService.getJobsList(this.status).subscribe({
        next: (data) => {
          this.listOfJobs = data;
          this.listJobsLength = data.length;
        },
        error: (err) => {
          console.log(err.message);
        }
      })
    }
  }
  navigateToJobDetails(id: any) {
    this.router.navigate(['./', id], { relativeTo: this.activatedRoute})
  }

  navigateToJobForm() {
    this.router.navigate(['add','recruiter', this.recruiterId ], { relativeTo: this.activatedRoute});
  }

  publishJobCTA(id: any) {
    this.jobsService.publishJobOffer(id, {}).subscribe({
      next: () => {
        this.jobsService.getJobsList('').subscribe({
          next: (data) => {
            this.listOfJobs = data;
            this.listJobsLength = data.length;
          },
          error: (err) => {
            console.log(err.message);

          }
        })
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  openModal(jobId: any): void {
    this.uiService.openModal2(jobId).subscribe({
      next: () => {
        this.jobsService.getJobsList('').subscribe({
          next: (data) => {
            this.listOfJobs = data;
            this.listJobsLength = data.length;
          },
          error: (err) => {
            console.log(err);

          }
        })
      },
    })
  }

}
