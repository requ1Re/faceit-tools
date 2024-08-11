import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/system/not-found/not-found.component';
import { ToolsOverviewComponent } from './pages/tools-overview/tools-overview.component';

export const APP_ROUTES: Routes = [
  // Legacy
  {
    path: 'tools/:p',
    redirectTo: ':p',
  },
  // New
  {
    path: '',
    children: [
      {
        path: '',
        component: ToolsOverviewComponent,
      },
      {
        path: 'picker',
        loadChildren: () =>
          import('./pages/picker/picker.routes').then((m) => m.PICKER_ROUTES),
      },
      {
        path: 'finder',
        loadChildren: () =>
          import('./pages/account-finder/account-finder.routes').then(
            (m) => m.ACCOUNT_FINDER_ROUTES
          ),
      },
      {
        path: 'stats',
        loadChildren: () =>
          import('./pages/stats/stats.routes').then((m) => m.STATS_ROUTES),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
