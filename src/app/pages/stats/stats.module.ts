import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { StatsDashboardComponent } from './stats-dashboard/stats-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatsPlayerComponent } from './stats-player/stats-player.component';
import { MatchHistoryDisplayComponent } from './stats-player/match-history-display/match-history-display.component';


@NgModule({
  declarations: [
    StatsComponent,
    StatsDashboardComponent,
    StatsPlayerComponent,
    MatchHistoryDisplayComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    SharedModule
  ]
})
export class StatsModule { }
