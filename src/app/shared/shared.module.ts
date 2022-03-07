import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from './services/api.service';
import { BaseComponent } from './components/base/base.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    CardComponent,
    BaseComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    CardComponent,
    FontAwesomeModule,
    BaseComponent,
    FooterComponent
  ],
  providers: [
    ApiService
  ]
})
export class SharedModule { }
