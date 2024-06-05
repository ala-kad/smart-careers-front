import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { RecruiterComponent } from './recruiter.component';
import { ApplicationsListingComponent } from './applications-listing/applications-listing.component';


@NgModule({
  declarations: [
    RecruiterComponent,
    ApplicationsListingComponent
  ],
  imports: [
    CommonModule,
    RecruiterRoutingModule
  ]
})
export class RecruiterModule { }
