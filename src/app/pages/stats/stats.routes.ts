import { Routes } from '@angular/router';
import { StatsDashboardComponent } from './stats-dashboard/stats-dashboard.component';
import { StatsPlayerComponent } from './stats-player/stats-player.component';

export const STATS_ROUTES: Routes = [
  { path: '', component: StatsDashboardComponent },
  // Legacy
  {
    path: 'player/:playerName',
    redirectTo: ':playerName',
  },
  // New
  {
    path: ':playerName',
    component: StatsPlayerComponent,
  },
];
