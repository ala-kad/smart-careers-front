import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiInteractionsService {

  constructor(
    private modal: NzModalService,
    private userService: UserService
  ) { }


  openModal(userId: any): Observable<void> {
    return new Observable<void>(observer => {
      this.modal.confirm({
        nzTitle: 'Are you sure you want to delete this user?',
        nzOkText: 'Yes',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzCancelText: 'No',
        nzOnOk: () => {
          this.userService.deleteUser(userId).subscribe({
            next: () => {
              observer.next(); // Notify the observer when deletion is successful
              observer.complete();
            },
            error: (err) => {
              observer.error(err); // Pass error to the observer
            }
          });
        },
        nzOnCancel: () => {
          observer.complete(); // Complete the observer if user cancels
        }
      });
    });
  }

}

