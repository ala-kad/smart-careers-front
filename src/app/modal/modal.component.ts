import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
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
