import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { catchError, from, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SearchActions } from './search.actions';

@Injectable()
export class SearchEffects {
  private sdk: SpotifyApi;
  private actions$ = inject(Actions);

  searchTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.searchsTrack),
      switchMap((props) => {
        let url = `${environment.spotifyUrl}/search?q=${props.q}&type=track`;

        return from(this.sdk.search(props.q, ['track'])).pipe(
          tap((resp) => console.log(resp)),
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

  constructor() {
    this.sdk = SpotifyApi.withClientCredentials(
      environment.clientId,
      environment.clientSecret
    );
  }
}
