import { Inject, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { catchError, debounceTime, from, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SPOTIFY_SDK } from '../../config.injection-token';
import { SearchActions } from './search.actions';

@Injectable()
export class SearchEffects {
  // private sdk: SpotifyApi;
  private actions$ = inject(Actions);

  searchTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.searchsTrack),
      switchMap((props) => {
        let url = `${environment.spotifyUrl}/search?q=${props.q}&type=track`;

        return from(this.sdk.search(props.q, ['track'])).pipe(
          // tap((resp) => console.log(resp)),
          debounceTime(500),
          switchMap((resp) =>
            of(SearchActions.searchsTrackSuccess({ resp: resp.tracks }))
          ),
          catchError((err) =>
            of(SearchActions.searchsTrackFailure({ error: err }))
          )
        );
      })
    )
  );

  constructor(@Inject(SPOTIFY_SDK) private sdk: SpotifyApi) {
    // this.sdk = SpotifyApi.withClientCredentials(
    //   environment.clientId,
    //   environment.clientSecret
    // );
  }
}
