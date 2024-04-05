import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { UiInteractionsService } from '../services/ui-interactions.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  constructor(private userService: UserService, private ui: UiInteractionsService) {} ;

  listOfData : any ;
  isCollapsed = false;
  visible = false;
  userDetails: any;

  ngOnInit(): void {
  }

  showUser(id: any) {
    this.userService.showUser(id).subscribe(
      {
        next: (data) => {
          this.userDetails = data;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  open(id: any): void {
    this.visible = true;
    this.showUser(id);
  }

  close(): void {
    this.visible = false;
  }

}
