import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickerRoutingModule } from './picker-routing.module';
import { PickerComponent } from './picker.component';
import { PickerDashboardComponent } from './picker-dashboard/picker-dashboard.component';
import { PickerMatchpageComponent } from './picker-matchpage/picker-matchpage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PickerCustomComponent } from './picker-custom/picker-custom.component';
import { PickerTableComponent } from './picker-matchpage/picker-table/picker-table.component';
import { PickerTableDetailedComponent } from './picker-matchpage/picker-table-detailed/picker-table-detailed.component';
import { PickerMaplistComponent } from './picker-matchpage/picker-maplist/picker-maplist.component';


@NgModule({
  declarations: [
    PickerComponent,
    PickerDashboardComponent,
    PickerMatchpageComponent,
    PickerCustomComponent,
    PickerTableComponent,
    PickerTableDetailedComponent,
    PickerMaplistComponent
  ],
  imports: [
    CommonModule,
    PickerRoutingModule,
    SharedModule
  ]
})
export class PickerModule { }
