import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertComponent } from './components/alert/alert.component';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PlayerSelectDialogComponent } from './components/player-select-dialog/player-select-dialog.component';
import { EloDisplayComponent } from './components/stats/elo-display/elo-display.component';
import { StatDisplayComponent } from './components/stats/stat-display/stat-display.component';
import { ToolInputComponent } from './components/tool-input/tool-input.component';
import { ApiService } from './services/api.service';
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
    PlayerSelectDialogComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    MatDialogModule
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
