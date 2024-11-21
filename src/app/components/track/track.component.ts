import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { Track } from '@spotify/web-api-ts-sdk';
import { AppState, selectTrack } from '../../store/all.selectors';
import { TrackActions } from '../../store/track/track.actions';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export class TrackComponent implements OnInit {
  track!: Track;
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

    // subscribe to track
    this.store
      .select(selectTrack)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => (this.track = state.track));
  }
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}
}
