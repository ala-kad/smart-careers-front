import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModulesModule } from '../shared/modules/ng-zoro-antd-modules/ng-zorro-antd-modules.module';
import { RecruiterRoutingModule } from './recruiter-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';

import { RecruiterComponent } from './recruiter.component';
import { ApplicationsListingComponent } from './applications-listing/applications-listing.component';
import { JobsListingComponent } from './jobs-listing/jobs-listing.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { JobDetailsFormComponent } from './job-details-form/job-details-form.component';
import { StepTwoJobFormComponent } from './step-two-job-form/step-two-job-form.component';
import { StepQuestionsComponent } from './step-questions/step-questions.component';
import { JobReviewFormComponent } from './job-review-form/job-review-form.component';
import { JobDetailsComponent } from './job-details/job-details.component';


@NgModule({
  declarations: [
    RecruiterComponent,
    ApplicationsListingComponent,
    JobsListingComponent,
    FormContainerComponent,
    JobDetailsFormComponent,
    StepTwoJobFormComponent,
    StepQuestionsComponent,
    JobReviewFormComponent,
    JobDetailsComponent
  ],
  imports: [
    CommonModule,
    RecruiterRoutingModule,
    NgZorroAntdModulesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
  ]
})
export class RecruiterModule { }
