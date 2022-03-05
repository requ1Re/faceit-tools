import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickerRoutingModule } from './picker-routing.module';
import { PickerComponent } from './picker.component';
import { PickerDashboardComponent } from './picker-dashboard/picker-dashboard.component';
import { PickerMatchpageComponent } from './picker-matchpage/picker-matchpage.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PickerComponent,
    PickerDashboardComponent,
    PickerMatchpageComponent
  ],
  imports: [
    CommonModule,
    PickerRoutingModule,
    SharedModule
  ]
})
export class PickerModule { }
