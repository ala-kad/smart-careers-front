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
  isGuest: boolean = true;

  ngOnInit(): void{
    // TO-DO retrieve user from Auth Service
    const status = this.isGuest ? 'Published' : '' ;
    this.jobsService.getJobsList(status).subscribe({
      next: (data) => {
        this.listOfJobs = data;
        this.listJobsLength = data.length;
      },
      error: (err) => {
        console.log(err.message);

      }
    })
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
