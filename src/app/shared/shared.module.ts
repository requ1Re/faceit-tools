import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from './services/api.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ToolInputComponent } from './components/tool-input/tool-input.component';
import { EloDisplayComponent } from './components/stats/elo-display/elo-display.component';
import { StatDisplayComponent } from './components/stats/stat-display/stat-display.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { BrowserService } from './services/browser.service';

@NgModule({
  declarations: [
    CardComponent,
    FooterComponent,
    HeaderComponent,
    ToolInputComponent,
    EloDisplayComponent,
    StatDisplayComponent,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    CardComponent,
    FontAwesomeModule,
    FooterComponent,
    HeaderComponent,
    ToolInputComponent,
    EloDisplayComponent,
    StatDisplayComponent,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  providers: [
    ApiService,
    BrowserService
  ]
})
export class SharedModule { }
