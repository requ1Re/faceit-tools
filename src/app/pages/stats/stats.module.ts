import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MomentModule } from 'ngx-moment';

import { SharedModule } from 'src/app/shared/shared.module';
import { StatsDashboardComponent } from './stats-dashboard/stats-dashboard.component';
import { MatchHistoryDisplayComponent } from './stats-player/match-history-display/match-history-display.component';
import { StatsPlayerComponent } from './stats-player/stats-player.component';
import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';

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
    SharedModule,
    MomentModule
  ]
})
export class StatsModule { }
