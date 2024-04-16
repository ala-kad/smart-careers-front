import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RegisterUserFormComponent } from './register-user-form/register-user-form.component';
import { UpdateUserFormComponent } from './update-user-form/update-user-form.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsersListingComponent } from './users-listing/users-listing.component';
import { JobsListingComponent } from './jobs-listing/jobs-listing.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users/add', component: RegisterUserFormComponent },
  // { path: 'jobs', component: JobsListingComponent},
  { path: 'dashboard', component: AdminDashboardComponent,

    canActivate: [AuthGuard],
    children: [
      { path: 'admin', component: UsersListingComponent },
      { path: 'users/:id/edit', component: UpdateUserFormComponent, outlet: 'updateUserForm' },
      { path: 'jobs', component: JobsListingComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
