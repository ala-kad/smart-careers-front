import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UiInteractionsService } from '../services/ui-interactions.service';

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
    private uiService: UiInteractionsService
  ) {}

  listOfJobs: any;
  jobDetails: any[] = [] ;
  jobId: any
  listJobsLength: Number = 0;

  ngOnInit(): void{
    this.jobsService.getJobsList().subscribe({
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

  openModal(jobId: any): void {
    this.uiService.openModal2(jobId).subscribe({
      next: () => {
        this.jobsService.getJobsList().subscribe({
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
