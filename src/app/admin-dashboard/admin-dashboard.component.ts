import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.navigate(['admin'], { relativeTo: this.activatedRoute });
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
    this.router.navigate(['admin'], { relativeTo: this.activatedRoute });
  }

  navigateToJobs(): void {
    this.router.navigate(['jobs'], { relativeTo: this.activatedRoute});
  }

}
