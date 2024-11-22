import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, from, of, switchMap } from 'rxjs';
import { SPOTIFY_SDK } from '../../config.injection-token';
import { AppState, selectArtistIds } from '../all.selectors';
import { ArtistActions } from './artist.actions';

@Injectable()
export class ArtistEffects {
  private actions$ = inject(Actions);
  private sdk = inject(SPOTIFY_SDK);

  loadArtists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistActions.load),
      concatLatestFrom(() => this.store.select(selectArtistIds)),
      switchMap(([_, ids]) =>
        from(this.sdk.artists.get(ids)).pipe(
          switchMap((artists) =>
            of(ArtistActions.loadSuccess({ artists: artists }))
          ),
          catchError((err) => of(ArtistActions.loadFailure({ error: err })))
        )
      )
    )
  );

  constructor(private store: Store<AppState>) {}
}
