import {
  APP_INITIALIZER,
  ApplicationConfig,
  TransferState,
  makeStateKey,
  mergeApplicationConfig,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import * as dotenv from 'dotenv';
import { appConfig } from './app.config';

// https://medium.com/@iyieldinov/angular-17-ssr-leveraging-transferstate-for-server-side-environment-variables-or-other-external-2fcb6adbdd06
// Load environment variables
dotenv.config();

const envStateKey = makeStateKey<{ FACEIT_API_KEY: string }>('env');

/**
 * Read the required environment variables from process.env
 * and set them in the transfer state using defined above key.
 * This function is executed as an app initializer.
*/
export function transferStateFactory(transferState: TransferState) {
  return () => {
    console.log('transferStateFactory');
    const envVars = {
      FACEIT_API_KEY: process.env['FACEIT_API_KEY'] ?? ""
      // Add more environment variables as needed
    };
    transferState.set<{ FACEIT_API_KEY: string }>(envStateKey, envVars);
  };
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: APP_INITIALIZER,
      useFactory: transferStateFactory,
      deps: [TransferState],
      multi: true,
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
