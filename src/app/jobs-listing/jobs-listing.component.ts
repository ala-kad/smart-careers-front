import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UiInteractionsService } from '../services/ui-interactions.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-jobs-listing',
  templateUrl: './jobs-listing.component.html',
  styleUrls: ['./jobs-listing.component.css']
})
export class JobsListingComponent implements OnInit{

  constructor (
    private jobsService: JobsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uiService: UiInteractionsService,
    private authService: AuthService
  ) {}

  listOfJobs: any;
  jobDetails: any[] = [] ;
  jobId: any
  listJobsLength: Number = 0;

  isAdmin = false;
  isRecruiter = false
  isGuest: boolean = false;
  status = '';

  ngOnInit(): void{
    this.isAdmin = this.authService.isAdmin();
    this.isRecruiter = this.authService.isRecruiter();
    this.isGuest = this.authService.isGuest();
    /**
     * Checking if authenticated user is admin / reruiter, render all jobs (status = 'published, draft)
     */
    if(this.isAdmin || this.isRecruiter){
      this.jobsService.getJobsList(this.status).subscribe({
        next: (data) => {
          this.listOfJobs = data;
          console.log(this.listOfJobs);

          this.listJobsLength = data.length;
        },
        error: (err) => {
          console.log(err.message);

        }
      })
    }
    else {
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
    this.router.navigate(['./', id], { relativeTo: this.activatedRoute});
  }

  navigateToJobForm() {
    this.router.navigate(['./', 'add'], { relativeTo: this.activatedRoute});
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
          },
          error: (err) => {
            console.log(err);

          }
        })
      },
    })
  }
}
