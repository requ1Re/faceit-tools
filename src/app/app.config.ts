import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';
import { ApiService } from './shared/services/api.service';
import { ErrorInterceptor } from './shared/services/error.interceptor';
import { ErrorService } from './shared/services/error.service';
import { FaceITAPIInterceptor } from './shared/services/faceit-api.interceptor';
import { LogService } from './shared/services/log.service';
import { StatsEffects } from './shared/store/stats/stats.effects';
import { statsReducer } from './shared/store/stats/stats.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({ stats: statsReducer }),
    provideEffects([StatsEffects]),
    provideStoreDevtools(),
    importProvidersFrom(
      BrowserModule.withServerTransition({ appId: 'serverApp' }),
      FontAwesomeModule
    ),
    LogService,
    ErrorService,
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FaceITAPIInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(APP_ROUTES),
    provideClientHydration(),
  ],
};
