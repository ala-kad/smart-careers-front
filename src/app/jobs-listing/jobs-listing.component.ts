import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobs-listing',
  templateUrl: './jobs-listing.component.html',
  styleUrls: ['./jobs-listing.component.css']
})
export class JobsListingComponent implements OnInit{

  constructor (
    private jobsService: JobsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  listOfJobs: any;
  jobDetails: any ;

  ngOnInit(): void{
    this.jobsService.getJobsList().subscribe({
      next: (data) => {
       this.listOfJobs = data;
       console.log(this.listOfJobs.length);

      },
      error: (err) => {
        console.log(err.message);

      }
    })
  }

  navigateToJobDetails(id: any) {
    this.router.navigate(['./', id], { relativeTo: this.activatedRoute});
  }
}
