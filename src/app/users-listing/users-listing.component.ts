import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UiInteractionsService } from '../services/ui-interactions.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.css']
})
export class UsersListingComponent implements OnInit {

  constructor(
    private userService: UserService,
    private ui: UiInteractionsService
  ) {} ;

  listOfData : any ;

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
        },
        error: (err) =>{
          console.log(err);
        },
      }
    )
  }

  openModal(userId: any): void {
    this.ui.openModal(userId).subscribe({
      next: () => {
        // Update the list of users after successful deletion
        this.userService.listUsers().subscribe(
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

}
