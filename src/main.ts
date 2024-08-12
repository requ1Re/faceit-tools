import { enableProdMode, importProvidersFrom } from '@angular/core';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { ApiService } from './app/shared/services/api.service';
import { ErrorInterceptor } from './app/shared/services/error.interceptor';
import { ErrorService } from './app/shared/services/error.service';
import { FaceITAPIInterceptor } from './app/shared/services/faceit-api.interceptor';
import { LogService } from './app/shared/services/log.service';
import { StatsEffects } from './app/shared/store/stats/stats.effects';
import { statsReducer } from './app/shared/store/stats/stats.reducer';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  bootstrapApplication(AppComponent, {
    providers: [
      provideStore({ stats: statsReducer }),
      provideEffects([StatsEffects]),
      provideStoreDevtools(),
      importProvidersFrom(BrowserModule, FontAwesomeModule),
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
    ],
  }).catch((err) => console.error(err));
}

if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}
