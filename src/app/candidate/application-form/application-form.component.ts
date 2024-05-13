import { Component } from '@angular/core';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent {
  current = 0;

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done() {
    console.log('done');
  }

}
