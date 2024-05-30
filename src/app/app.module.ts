import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModulesModule } from './shared/modules/ng-zoro-antd-modules/ng-zorro-antd-modules.module';
import { NgxEditorModule } from 'ngx-editor';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RegisterUserFormComponent } from './register-user-form/register-user-form.component';
import { ModalComponent } from './modal/modal.component';
import { UsersListingComponent } from './users-listing/users-listing.component';
import { UpdateUserFormComponent } from './update-user-form/update-user-form.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoutComponent } from './logout/logout.component';
import { NzEmptyComponent } from './nz-empty/nz-empty.component'
import { JwtInterceptor } from './auth.interceptor';
import { JobsListingComponent } from './jobs-listing/jobs-listing.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { JobDetailsFormComponent } from './job-details-form/job-details-form.component';
import { JobReviewFormComponent } from './job-review-form/job-review-form.component';
import { StepTwoJobFormComponent } from './step-two-job-form/step-two-job-form.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { DropDowNmenuComponent } from './drop-dow-nmenu/drop-dow-nmenu.component';
import { StepQuestionsComponent } from './step-questions/step-questions.component';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { DynamicQuestionsStepComponent } from './dynamic-questions-step/dynamic-questions-step.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    RegisterUserFormComponent,
    ModalComponent,
    UsersListingComponent,
    UpdateUserFormComponent,
    WelcomeComponent,
    LogoutComponent,
    JobsListingComponent,
    FormContainerComponent,
    JobDetailsFormComponent,
    JobReviewFormComponent,
    StepTwoJobFormComponent,
    JobDetailsComponent,
    DropDowNmenuComponent,
    StepQuestionsComponent,
    AddUserFormComponent,
    NzEmptyComponent,
    DynamicQuestionsStepComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgZorroAntdModulesModule,
    NgxEditorModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    StoreModule.forRoot({}, {}),
    FormlyModule.forRoot(),
    FormlyNgZorroAntdModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    StepQuestionsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
