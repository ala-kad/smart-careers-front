import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.css']
})
export class UpdateUserFormComponent implements OnInit {

  user: any = {};
  userId: any;

  roles = [ {name: 'recruiter'},{name: 'rh'},{name: 'technique'}];

  listOfOption: string[] = [];
  listOfSelectedValue: string [] = [] ;

  constructor(private userService : UserService, private activatedRoute: ActivatedRoute) {} ;

  ngOnInit(): void {

    const children: string[] = [];
    this.roles.forEach((role) => {
      children.push(role.name);
    })
    this.listOfOption = children;

    this.activatedRoute.paramMap.subscribe(
    (params) => {
      this.userId = params.get('id');

      this.userService.showUser(this.userId).subscribe(
        {
          next: (usr) => {
            this.user = usr ;
            this.userId = usr._id;
            this.listOfSelectedValue = usr.role
          },
          error: (err) => {
            console.log(err);

          }
        }
      )
    },
    (err) => {
      console.log(err.message);
    }
    )


  }

   /** */
   editUser(userId: any, selectedRoles: any[]) {
    this.userService.editUser(userId, selectedRoles).subscribe(
      {
        next: (data) => {
          console.log(data);

        },
        error: (err) => {
          console.log(err);

        }
      }
    )
  }

}
