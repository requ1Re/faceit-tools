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
        component: ToolsOverviewComponent
      },
      {
        path: 'picker',
        loadChildren: () => import('./pages/picker/picker.module').then((m) => m.PickerModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
