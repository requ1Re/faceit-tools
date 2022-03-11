import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolsOverviewComponent } from './pages/tools-overview/tools-overview.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tools',
  },
  {
    path: 'tools',
    children: [
      {
        path: '',
        component: ToolsOverviewComponent,
      },
      {
        path: 'picker',
        loadChildren: () =>
          import('./pages/picker/picker.module').then((m) => m.PickerModule),
      },
      {
        path: 'finder',
        loadChildren: () =>
          import('./pages/account-finder/account-finder.module').then(
            (m) => m.AccountFinderModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
