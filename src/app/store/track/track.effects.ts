import { Inject, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { catchError, from, of, switchMap } from 'rxjs';
import { SPOTIFY_SDK } from '../../config.injection-token';
import { TrackActions } from './track.actions';

@Injectable()
export class TrackEffects {
  private actions$ = inject(Actions);

  loadTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.loadTracks),
      switchMap((props) => {
        return from(this.sdk.tracks.get(props.id)).pipe(
          switchMap((track) =>
            of(TrackActions.loadTracksSuccess({ track: track }))
          ),
          catchError((err) => of(TrackActions.loadTracksFailure(err)))
        );
      })
    )
  );

  constructor(@Inject(SPOTIFY_SDK) private sdk: SpotifyApi) {}
}
