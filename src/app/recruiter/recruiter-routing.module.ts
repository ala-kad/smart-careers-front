import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormContainerComponent } from './form-container/form-container.component';
import { JobsListingComponent } from './jobs-listing/jobs-listing.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { RecruiterComponent } from './recruiter.component';

const routes: Routes = [
  { 
    path: '', 
    component: RecruiterComponent,
    children: [ 
      {
        path: 'jobs',
        component: JobsListingComponent,
        data: {
          breadcrumb: 'Jobs List'
        }
      },
      {
        path: 'jobs/:id',
        component: JobDetailsComponent,
        data: {
          breadcrumb: 'Job Details'
        }
      },
      {
        path: 'jobs/add/recruiter/:id', component: FormContainerComponent,
        data: {
          breadcrumb: 'Jobs Add'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
