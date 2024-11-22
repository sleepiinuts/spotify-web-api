import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/all.selectors';
import { ArtistActions } from '../../store/artist/artist.actions';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
})
export class ArtistComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(ArtistActions.load());
  }
}
