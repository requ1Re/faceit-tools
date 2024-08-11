import { Routes } from '@angular/router';
import { PickerCustomComponent } from './picker-custom/picker-custom.component';
import { PickerDashboardComponent } from './picker-dashboard/picker-dashboard.component';
import { PickerMatchpageComponent } from './picker-matchpage/picker-matchpage.component';

export const PICKER_ROUTES: Routes = [
  {
    path: '',
    component: PickerDashboardComponent,
  },
  { path: 'custom', component: PickerCustomComponent },
  { path: 'custom/:customDataBase64', component: PickerCustomComponent },
  { path: 'match/custom/:team1Str/:team2Str', component: PickerMatchpageComponent },
  { path: 'match/:matchId', component: PickerMatchpageComponent },
];
