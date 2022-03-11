import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountFinderRoutingModule } from './account-finder-routing.module';
import { AccountFinderComponent } from './account-finder.component';
import { AccountFinderDashboardComponent } from './account-finder-dashboard/account-finder-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AccountFinderComponent,
    AccountFinderDashboardComponent
  ],
  imports: [
    CommonModule,
    AccountFinderRoutingModule,
    SharedModule
  ]
})
export class AccountFinderModule { }
