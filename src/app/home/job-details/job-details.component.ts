import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobId!: any;
  jobDetails!: any;

  constructor (
    private activatedRoute: ActivatedRoute,
    private jobService: JobsService
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
        console.log(data);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
