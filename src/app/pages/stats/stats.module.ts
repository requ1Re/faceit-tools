import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { StatsDashboardComponent } from './stats-dashboard/stats-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    StatsComponent,
    StatsDashboardComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    SharedModule
  ]
})
export class StatsModule { }
