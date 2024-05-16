import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UiInteractionsService } from 'src/app/services/ui-interactions.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {

  current = 0;
  stepOneForm!: FormGroup;

  constructor (
    private ui: UiInteractionsService ,
  ) { }

  ngOnInit(): void {
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
    switch (this.current) {
      case 0:
        console.log(this.current);
        
      break;

      case 1:
        console.log(this.current);

      break;

      case 2:
        console.log(this.current);
        
      break;

      case 3:
        console.log(this.current);
        
      break;

      default:
        console.log(this.current);

      break;
    }
  }

  done() {
    this.ui.openSuccessJobModal()
  }

  recieveStepOneForm(form: FormGroup) {
    this.stepOneForm = form;
    console.log(this.stepOneForm);
    
  }

}
