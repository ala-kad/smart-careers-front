import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.css']
})
export class UsersListingComponent implements OnInit {

  constructor(private userService: UserService) {} ;

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
