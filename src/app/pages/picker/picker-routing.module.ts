import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PickerCustomComponent } from './picker-custom/picker-custom.component';
import { PickerDashboardComponent } from './picker-dashboard/picker-dashboard.component';
import { PickerMatchpageComponent } from './picker-matchpage/picker-matchpage.component';

const routes: Routes = [
  {
    path: '',
    component: PickerDashboardComponent,
  },
  { path: 'custom', component: PickerCustomComponent },
  { path: 'custom/:customDataBase64', component: PickerMatchpageComponent },
  { path: 'match/:matchId', component: PickerMatchpageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PickerRoutingModule { }
