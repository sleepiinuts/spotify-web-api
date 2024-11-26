import { animate, style, transition, trigger } from '@angular/animations';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Artist } from '@spotify/web-api-ts-sdk';
import {
  AppState,
  selectArtistInfo,
  selectArtistLoading,
} from '../../store/all.selectors';
import { ArtistActions } from '../../store/artist/artist.actions';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
  animations: [
    trigger('carouselAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ArtistComponent implements OnInit {
  idx = 0;
  artists!: Artist[];
  isLoading = false;

  prev() {
    if (this.idx > 0) {
      this.idx -= 1;
    }

    // console.log(`pos: ${this.idx}, artist.length: ${this.artists.length}`);
  }

  next() {
    if (this.idx < this.artists.length - 1) {
      this.idx += 1;
    }
    // console.log(`pos: ${this.idx}, artist.length: ${this.artists.length}`);
  }

  ngOnInit(): void {
    this.store.dispatch(ArtistActions.load());

    this.store
      .select(selectArtistInfo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((artists) => (this.artists = artists));

    this.store
      .select(selectArtistLoading)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoading) => (this.isLoading = isLoading));
  }
  constructor(
    private store: Store<AppState>,
    private destroyRef: DestroyRef,
  ) {}
}
