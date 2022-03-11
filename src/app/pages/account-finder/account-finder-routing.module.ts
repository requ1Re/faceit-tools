import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountFinderDashboardComponent } from './account-finder-dashboard/account-finder-dashboard.component';
import { AccountFinderComponent } from './account-finder.component';

const routes: Routes = [
  {
    path: '',
    component: AccountFinderDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountFinderRoutingModule {}
