import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/all.selectors';
import { TrackActions } from '../../store/track/track.actions';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export class TrackComponent implements OnInit {
  // track = input.required<Track>();

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let id = params['id'];
      if (!id) return;

      this.store.dispatch(TrackActions.loadTracks({ id: params['id'] }));
    });
  }
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}
}
