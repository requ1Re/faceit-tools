import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToolsOverviewComponent } from './pages/tools-overview/tools-overview.component';
import { NotFoundComponent } from './pages/system/not-found/not-found.component';
import { ErrorInterceptor } from './shared/services/error.interceptor';
import { ErrorService } from './shared/services/error.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppStoreModule } from './shared/store/app-store.module';
import { SpriteWrapperComponent } from './sprite-wrapper/sprite-wrapper.component';
import { LogService } from './shared/services/log.service';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [AppComponent, ToolsOverviewComponent, NotFoundComponent, SpriteWrapperComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    FontAwesomeModule,
    AppStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    MomentModule
  ],
  providers: [
    LogService,
    ErrorService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
