import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModulesModule } from '../shared/modules/ng-zoro-antd-modules/ng-zorro-antd-modules.module';
import { IconsProviderModule } from '../shared/modules/ng-zoro-antd-modules/icons-provider.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidateRoutingModule } from './candidate-routing.module';
import { SharedModule } from '../shared/modules/shared.module';

import { CandidateComponent } from './candidate.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { ApplicationsListingComponent } from './applications-listing/applications-listing.component';
import { EmptyComponent } from './empty/empty.component';


@NgModule({
  declarations: [
    CandidateComponent,
    ApplicationFormComponent,
    StepOneComponent,
    StepTwoComponent,
    ApplicationsListingComponent,
    EmptyComponent,
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    NgZorroAntdModulesModule,
    IconsProviderModule,
    FormsModule,
    ReactiveFormsModule,    
    SharedModule

  ]
})
export class CandidateModule { }
