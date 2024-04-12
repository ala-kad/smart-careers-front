import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent{

  constructor() {}

  formVisibile: boolean = false;

  isCollapsed = false;
  visible = false;


  open(id: any): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }


}
