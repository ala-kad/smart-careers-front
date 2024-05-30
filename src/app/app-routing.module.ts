import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RegisterUserFormComponent } from './register-user-form/register-user-form.component';
import { UpdateUserFormComponent } from './update-user-form/update-user-form.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsersListingComponent } from './users-listing/users-listing.component';
import { JobsListingComponent } from './jobs-listing/jobs-listing.component';
import { DynamicQuestionsStepComponent } from './dynamic-questions-step/dynamic-questions-step.component';

import { AuthGuard } from './auth.guard';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'questions',
    component: DynamicQuestionsStepComponent
  },
  {
    path: 'welcome', component: WelcomeComponent,
    children: [
      { path: '', component: JobsListingComponent },
      { path: 'jobs/:id', component: JobDetailsComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserFormComponent },
  // Private Auth Guarded Routes
  {
    path: 'dashboard', component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Home'
    },
    children: [
      {
        path: 'users', component: UsersListingComponent,
        data: {
          breadcrumb: 'Users List'
        },
      },
      {
        path: 'users/add', component: AddUserFormComponent,
        data: {
          breadcrumb: 'Users Add'
        },
      },
      {
        path: 'users/:id/edit', component: UpdateUserFormComponent,
        data: {
          breadcrumb: 'User Edit'
        },
      },
      {
        path: 'jobs', component: JobsListingComponent,
        data: {
          breadcrumb: 'Jobs List'
        }
      },
      {
        path: 'jobs/add/recruiter/:id', component: FormContainerComponent,
        data: {
          breadcrumb: 'Jobs Add'
        }
      },
      {
        path: 'jobs/:id', component: JobDetailsComponent,
        data: {
          breadcrumb: 'Jobs Details'
        }
      },
      {
        path: 'candidate',
        loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule),
        data: {
          breadcrumb: 'Candidate'
        },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
