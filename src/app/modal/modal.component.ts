import { Component, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef) {}


  isVisible = false;
  isOkLoading = false;

  // showModal(): void {
  //   this.isVisible = true;
  // }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    console.log('cancel');

    this.isVisible = false;
  }
}
