import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

import { UiInteractionsService } from '../services/ui-interactions.service';
import { ActivatedRoute, Router } from '@angular/router';

import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

interface DataItem {
  email: string;
  username: string;
  roles: string;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  // listOfFilter: NzTableFilterList;
  // filterFn: NzTableFilterFn<DataItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

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
  ) { };

  listOfData: any;
  userDetails: any;
  showUpdateForm = false;

  i = 0;
  editId: string | null = null;

  user: any = {};
  userId: any;

  roles = [{ name: 'recruiter' }, { name: 'rh' }, { name: 'technique' }];

  listOfOption: string[] = [];
  listOfSelectedValue: string[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Email',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.email.localeCompare(b.email),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      // listOfFilter: [
      //   { text: 'Joe', value: 'Joe' },
      //   { text: 'Jim', value: 'Jim', byDefault: true }
      // ],
      // filterFn: (list: string[], item: DataItem) => list.some(name => item.name.indexOf(name) !== -1)
    },
    {
      name: 'Username',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.username.localeCompare(b.username),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      // listOfFilter: [
      //   { text: 'Joe', value: 'Joe' },
      //   { text: 'Jim', value: 'Jim', byDefault: true }
      // ],
      // filterFn: (list: string[], item: DataItem) => list.some(name => item.name.indexOf(name) !== -1)
    },
  ]

  ngOnInit(): void {
    this.list();
  }

  /**
   * User listing
   */
  list() {
    this.userService.getEnabledUsers().subscribe(
      {
        next: (data) => {
          this.listOfData = data;
        },
        error: (err) => {
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
    this.router.navigate(['../users', userId, 'edit'], { relativeTo: this.route });
  }

  startEdit(id: any): void {
    this.editId = id;

    const children: string[] = [];
    this.roles.forEach((role) => {
      children.push(role.name);
    })
    this.listOfOption = children;

    this.userId = this.editId
    this.userService.showUser(this.userId).subscribe(
      {
        next: (usr) => {
          this.user = usr;
          this.userId = usr._id;
          this.listOfSelectedValue = usr.role
        }
      }
    )


  }

  editUserRoles(id: any, update: any) {
    console.log(id);
    console.log(typeof(id));
    this.userService.editUser(id, update).subscribe({
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
      // error: (err) => {
      //   console.error(err);
      // }
    });

  }

  stopEdit(): void {
    this.editId = null;
  }
}
