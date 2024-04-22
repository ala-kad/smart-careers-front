import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  direction: any = 'horizontal'; // Default direction

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mediaMatcher: MediaMatcher
  ) {}

  ngOnInit(): void {
    this.router.navigate(['users'], { relativeTo: this.activatedRoute });
  }

  formVisibile: boolean = false;
  isCollapsed = false;
  visible = false;


  open(id: any): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  navigateToUsersListing (): void {
    this.router.navigate(['users'], { relativeTo: this.activatedRoute });
  }

  navigateToJobs(): void {
    this.router.navigate(['jobs'], { relativeTo: this.activatedRoute});
  }

  handleScreenChange = (event: MediaQueryListEvent) => {
    this.direction = event.matches ? 'vertical' : 'horizontal';
  };


}
