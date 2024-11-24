import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Artist } from '@spotify/web-api-ts-sdk';
import { AppState, selectArtistInfo } from '../../store/all.selectors';
import { ArtistActions } from '../../store/artist/artist.actions';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
})
export class ArtistComponent implements OnInit {
  public idx = 0;
  public artists!: Artist[];

  prev() {
    if (this.idx > 0) {
      this.idx -= 1;
    }

    console.log(`pos: ${this.idx}, artist.length: ${this.artists.length}`);
  }

  next() {
    if (this.idx < this.artists.length - 1) {
      this.idx += 1;
    }
    console.log(`pos: ${this.idx}, artist.length: ${this.artists.length}`);
  }

  ngOnInit(): void {
    this.store.dispatch(ArtistActions.load());

    this.store
      .select(selectArtistInfo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((artists) => (this.artists = artists));
  }
  constructor(private store: Store<AppState>, private destroyRef: DestroyRef) {}
}
