import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateComponent } from './candidate.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ApplicationsListingComponent } from './applications-listing/applications-listing.component';

const routes: Routes = [
  { 
    path: '', 
    data: {
      breadcrumb: 'Candidate Dashboard'
    },
    component: CandidateComponent,
    children: [
      {
        path: '', component: ApplicationsListingComponent,
        data: {
          breadcrumb: 'Applications List'
        },
      }
    ]
  },
  { 
    path: ':userId/application/job/:jobId', 
    component: ApplicationFormComponent,
    data: {
      breadcrumb: 'Applications Form'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
 