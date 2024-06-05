import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { NgZorroAntdModulesModule } from '../shared/modules/ng-zoro-antd-modules/ng-zorro-antd-modules.module';
import { IconsProviderModule } from '../shared/modules/ng-zoro-antd-modules/icons-provider.module';


import { HomeComponent } from './home.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { JobDetailsComponent } from './job-details/job-details.component';


@NgModule({
  declarations: [
    HomeComponent,
    JobListingComponent,
    JobDetailsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgZorroAntdModulesModule,
    IconsProviderModule
  ]
})
export class HomeModule { }
