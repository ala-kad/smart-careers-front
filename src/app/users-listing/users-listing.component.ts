import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

import { UiInteractionsService } from '../services/ui-interactions.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.css']
})
export class UsersListingComponent implements OnInit {

  constructor(
    private userService: UserService,
    private ui: UiInteractionsService,
    private router: Router,
    private route: ActivatedRoute
  ) {} ;

  listOfData : any ;
  userDetails: any;
  showUpdateForm = false;

  ngOnInit(): void {
   this.list();
  }

  /**
   * User listing
   */
  list() {
    this.userService.getEnabledUsers().subscribe(
      {
        next: (data) =>{
          this.listOfData = data;
        },
        error: (err) =>{
          console.log(err);
        },
      }
    )
  }

  /**
   * Show user details
   */
  showUser(id: any) {
    this.userService.showUser(id).subscribe(
      {
        next: (data) => {
          this.userDetails = data;
          console.log(this.userDetails);
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }


  /**
   *
   * @param userId
   */
  openModal(userId: any): void {
    this.ui.openModal(userId).subscribe({
      next: () => {
        // Update the list of users after successful deletion
        this.userService.getEnabledUsers().subscribe(
          (users) => {
            this.listOfData = users;
          },
          (error) => {
            console.error('Error fetching users:', error);
          }
        );
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      }
    });
  }

  editUser(userId: any) {
    this.router.navigate([{ outlets: { updateUserForm: ['users', userId, 'edit'] } }], { relativeTo: this.route.parent});
  }
}
