import { Routes } from '@angular/router';
import { StatsDashboardComponent } from './stats-dashboard/stats-dashboard.component';
import { StatsPlayerComponent } from './stats-player/stats-player.component';

export const STATS_ROUTES: Routes = [
  { path: '', component: StatsDashboardComponent },
  {
    path: ':playerName',
    component: StatsPlayerComponent,
  },
];
