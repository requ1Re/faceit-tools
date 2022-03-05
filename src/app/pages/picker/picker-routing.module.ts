import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PickerDashboardComponent } from './picker-dashboard/picker-dashboard.component';
import { PickerMatchpageComponent } from './picker-matchpage/picker-matchpage.component';

const routes: Routes = [
  {
    path: '',
    component: PickerDashboardComponent,
  },
  { path: 'match/:matchId', component: PickerMatchpageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PickerRoutingModule { }
