import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { SPOTIFY_SDK } from './config.injection-token';
import { SearchEffects } from './store/search/search.effects';
import {
  searchFeatureKey,
  reducer as searchReducer,
} from './store/search/search.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideStore(),
    provideState({ name: searchFeatureKey, reducer: searchReducer }),
    provideEffects(SearchEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    {
      provide: SPOTIFY_SDK,
      useFactory: () =>
        SpotifyApi.withClientCredentials(
          environment.clientId,
          environment.clientSecret
        ),
    },
  ],
};
