import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { UiInteractionsService } from '../services/ui-interactions.service';

import { ModalComponent } from '../modal/modal.component';


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
    // this.list();
  }

  /**
   * User listing
   */
  // list() {
  //   this.userService.listUsers().subscribe(
  //     {
  //       next: (data) =>{
  //         this.listOfData = data;
  //         console.log(data);
  //         console.log(this.listOfData);
  //       },
  //       error: (err) =>{
  //         console.log(err);
  //       },
  //     }
  //   )
  // }

  showUser(id: any) {
    this.userService.showUser(id).subscribe(
      {
        next: (data) => {
          this.userDetails = data;
          console.log( this.userDetails );

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

  openModal(userId: any) {
    this.ui.openModal(userId);
  }

}
