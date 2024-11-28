import { Inject, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { catchError, debounceTime, from, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SPOTIFY_SDK } from '../../config.injection-token';
import { AppState } from '../all.selectors';
import { SearchActions } from './search.actions';

@Injectable()
export class SearchEffects {
  // private sdk: SpotifyApi;
  private actions$ = inject(Actions);

  searchTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.searchsTrack),
      tap(() => this.store.dispatch(SearchActions.loading())),
      switchMap((props) => {
        let url = `${environment.spotifyUrl}/search?q=${props.q}&type=track&limit=20`;

        return from(this.sdk.search(props.q, ['track'])).pipe(
          // tap((resp) => console.log(resp)),
          debounceTime(500),
          switchMap((resp) =>
            of(SearchActions.searchsTrackSuccess({ resp: resp.tracks })),
          ),
          catchError((err) =>
            of(SearchActions.searchsTrackFailure({ error: err })),
          ),
        );
      }),
    ),
  );

  constructor(
    @Inject(SPOTIFY_SDK) private sdk: SpotifyApi,
    private store: Store<AppState>,
  ) {
    // this.sdk = SpotifyApi.withClientCredentials(
    //   environment.clientId,
    //   environment.clientSecret
    // );
  }
}
