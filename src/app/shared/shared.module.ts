import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from './services/api.service';
import { BaseComponent } from './components/base/base.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ToolInputComponent } from './components/tool-input/tool-input.component';

@NgModule({
  declarations: [
    CardComponent,
    BaseComponent,
    FooterComponent,
    HeaderComponent,
    ToolInputComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    CardComponent,
    FontAwesomeModule,
    BaseComponent,
    FooterComponent,
    HeaderComponent,
    ToolInputComponent
  ],
  providers: [
    ApiService
  ]
})
export class SharedModule { }
