import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateComponent } from './candidate.component';
import { ApplicationFormComponent } from './application-form/application-form.component';

const routes: Routes = [
  { path: '', component: CandidateComponent },
  { path: 'application/job', component: ApplicationFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
