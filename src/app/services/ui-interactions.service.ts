import { Injectable } from '@angular/core';
import { NzModalRef, NzModalService, NZ_MODAL_DATA, ModalOptions  } from 'ng-zorro-antd/modal';

import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { JobsService } from './jobs.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UiInteractionsService {

  constructor(
    private modal: NzModalService,
    private userService: UserService,
    private jobService: JobsService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }

  openModal(userId: any): Observable<void> {

    return new Observable<void>(observer => {
      this.modal.confirm({
        nzTitle: 'Are you sure you want to disable this user ?',
        nzOkText: 'Yes',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzCancelText: 'No',
        nzOnOk: () => {
          this.userService.disableUser(userId).subscribe({
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

  openModal2(jobId: any): Observable<void>  {
    return new Observable<void>(observer => {
      this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this job ?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: 'No',
      nzOnOk: () => {
        this.jobService.deleteJob(jobId).subscribe({
          next: () => {
            observer.next();
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          }
        })
      },
      nzOnCancel: () => {
        observer.complete();
      }
      });
    });
  }

  openSuccessModal() {
    const modalRef = this.modal.success({
      nzTitle: 'Job successfully created',
      nzOkType: 'primary',
      nzOkText: 'Ok',
      nzOnOk: () => {
        modalRef.destroy()
        this.router.navigate(['dashboard','jobs'])
      }
    })
  }

  openSuccessJobModal() {
    let modalRef = this.modal.success({
      nzTitle: 'Application successfully submitted',
      nzOkType: 'primary',
      nzOkText: 'Ok',
      nzOnOk: () => {
        modalRef.destroy()
        this.router.navigate(['dashboard', 'candidate'])
      }
    })
  }
}


