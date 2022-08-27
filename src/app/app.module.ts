import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/system/not-found/not-found.component';
import { ToolsOverviewComponent } from './pages/tools-overview/tools-overview.component';
import { ErrorInterceptor } from './shared/services/error.interceptor';
import { ErrorService } from './shared/services/error.service';
import { FaceITAPIInterceptor } from './shared/services/faceit-api.interceptor';
import { LogService } from './shared/services/log.service';
import { SharedModule } from './shared/shared.module';
import { AppStoreModule } from './shared/store/app-store.module';
import { SpriteWrapperComponent } from './sprite-wrapper/sprite-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolsOverviewComponent,
    NotFoundComponent,
    SpriteWrapperComponent,
  ],
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
    BrowserAnimationsModule
  ],
  providers: [
    LogService,
    ErrorService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FaceITAPIInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
