import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit{

  jobList: any;
  status = 'Published';

  constructor(
    private jobService: JobsService
  ) {}

  ngOnInit(): void {
    this.getPublishedJobs()
  }


  getPublishedJobs() {
    this.jobService.getJobsList(this.status).subscribe({
      next: (data) => {
        this.jobList = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
