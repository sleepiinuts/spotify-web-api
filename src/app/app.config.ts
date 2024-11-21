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
import { TrackEffects } from './store/track/track.effects';
import {
  trackFeatureKey,
  reducer as trackReducer,
} from './store/track/track.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideStore(),
    provideState({ name: searchFeatureKey, reducer: searchReducer }),
    provideState({ name: trackFeatureKey, reducer: trackReducer }),
    provideEffects(SearchEffects, TrackEffects),
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
