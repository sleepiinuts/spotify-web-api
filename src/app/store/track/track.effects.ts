import { Inject, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { catchError, from, of, switchMap, tap } from 'rxjs';
import { SPOTIFY_SDK } from '../../config.injection-token';
import { AppState } from '../all.selectors';
import { TrackActions } from './track.actions';

@Injectable()
export class TrackEffects {
  private actions$ = inject(Actions);

  loadTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.load),
      tap(() => this.store.dispatch(TrackActions.loading())),
      switchMap((props) => {
        return from(this.sdk.tracks.get(props.id)).pipe(
          switchMap((track) => of(TrackActions.loadSuccess({ track: track }))),
          catchError((err) => of(TrackActions.loadFailure(err)))
        );
      })
    )
  );

  constructor(
    @Inject(SPOTIFY_SDK) private sdk: SpotifyApi,
    private store: Store<AppState>
  ) {}
}
