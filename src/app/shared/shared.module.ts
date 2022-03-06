import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from './services/api.service';
import { BaseComponent } from './components/base/base.component';

@NgModule({
  declarations: [
    CardComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    CardComponent,
    FontAwesomeModule
  ],
  providers: [
    ApiService
  ]
})
export class SharedModule { }
