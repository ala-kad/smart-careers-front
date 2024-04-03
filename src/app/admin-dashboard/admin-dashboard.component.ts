import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  constructor(private userService: UserService) {} ;

  listOfData : any ;
  isCollapsed = false;

  ngOnInit(): void {
    this.list();
  }

  /**
   * User listing
   */
  list() {
    this.userService.listUsers().subscribe(
      {
        next: (data) =>{
          this.listOfData = data;
          console.log(data);
          console.log(this.listOfData);
        },
        error: (err) =>{
          console.log(err);
        },
      }
    )
  }

}
