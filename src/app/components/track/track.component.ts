import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { Track } from '@spotify/web-api-ts-sdk';
import {
  AppState,
  selectTrack,
  selectTrackLoading,
} from '../../store/all.selectors';
import { TrackActions } from '../../store/track/track.actions';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatProgressSpinnerModule],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export class TrackComponent implements OnInit {
  track!: Track;
  isLoading = true;
  readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // fetch by track id
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        let id = params['id'];
        if (!id) return;

        this.store.dispatch(TrackActions.loadTracks({ id: params['id'] }));
      });

    // TODO: managing loading state
    this.store
      .select(selectTrackLoading)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoading) => (this.isLoading = isLoading));

    // subscribe to track
    this.store
      .select(selectTrack)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => (this.track = state.track));
  }
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}
}
