import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobDetails!: any;
  jobId: any

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jobService: JobsService
  ) {}

  ngOnInit(): void {
    this.fetchJobDetails();
  }

  fetchJobDetails() {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.jobId = params.get("id");
      }
    )

    this.jobService.getJobDetails(this.jobId).subscribe({

      next: (data) => {
        this.jobDetails = data;
        console.log(data);

      },
      error: (err) => {
        console.log(err);

      }
    })

  }

}
