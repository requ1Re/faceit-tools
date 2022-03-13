import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsDashboardComponent } from './stats-dashboard/stats-dashboard.component';
import { StatsPlayerComponent } from './stats-player/stats-player.component';

const routes: Routes = [
  { path: '', component: StatsDashboardComponent },
  {
    path: 'player/:playerId',
    component: StatsPlayerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
