import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UiInteractionsService } from '../services/ui-interactions.service';
import { JobsService } from '../services/jobs.service';

import { StepQuestionsComponent } from '../step-questions/step-questions.component'
import { JobDetailsFormComponent } from '../job-details-form/job-details-form.component';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css'],
  providers: [StepQuestionsComponent]
})

export class FormContainerComponent implements OnInit {

  @ViewChild('step1') jobDetailsFormRef!: JobDetailsFormComponent;

  current = 0;
  formOneData : any;
  formQuestionData: any;

  genIARes: any;
  formsData : any ;

  editorContent: any;
  editorHTMLContent: any;

  jobDetailsForm!: FormGroup;

  constructor(
    private jobService: JobsService,
    private uiService: UiInteractionsService,
  ) { }

  ngOnInit(): void {

  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    this.formsData = {...this.formOneData, ...this.formQuestionData}
    this.jobService.postNewJobOffer(this.formsData).subscribe({
      next: (data) => {
        console.log(this.genIARes)

        this.uiService.openSuccessModal();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  receiveFormDataOne(formData: string): void {
    this.formOneData = formData;
    console.log(this.formOneData);
  }

  handleQuestionsFormValues(values: string) {
    this.formQuestionData = values;
    console.log(this.formQuestionData);
  }

  recieveJobDetailsForm(form: FormGroup) {
    this.jobDetailsForm = form
  }

  setEditor(e: any){
    this.editorContent = e;
  }

  handleHtmlEditorContent(content: any) {
    this.editorHTMLContent = content
  }

  changeContent(): void {
    switch (this.current) {
      case 1: {
        this.jobService.generateTextFromGenIA(this.formOneData).subscribe({
          next: (data) => {
            this.genIARes = data;
          },
          error: (err) => {
            console.log(err)
          }
        })
        break;
      }

    }
  }
}
