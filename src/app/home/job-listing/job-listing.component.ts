import { Component, OnInit } from '@angular/core';

import { JobsService } from '../../services/jobs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit{

  jobList: any;
  status = 'Published';

  constructor(
    private jobService: JobsService,
    private router: Router,
    private ar: ActivatedRoute,
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

  navigateToJobDetails(id: any) { 
    this.router.navigate(['./', 'jobs', id], { relativeTo: this.ar }).then(
      (val) => { 
        console.log(val);
        
      },
      
    ).catch((err) => { console.log(err);
    })
  }

}
