import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { SimplifiedArtist, Track } from '@spotify/web-api-ts-sdk';
import { ImagePlaceHolderDirective } from '../../directives/image.directive';
import { ListArtistsPipe } from '../../pipe/list-artists.pipe';
import {
  AppState,
  selectSearchLoading,
  selectSearchTrack,
} from '../../store/all.selectors';
import { ArtistActions } from '../../store/artist/artist.actions';
import { SearchActions } from '../../store/search/search.actions';
import { PlaceholderComponent } from '../shared/placeholder/placeholder.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    ListArtistsPipe,
    ImagePlaceHolderDirective,
    PlaceholderComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
    },
  ],
})
export class SearchComponent implements OnInit {
  items!: Track[];
  isLoading = false;
  _completedImages: number[][] = [];

  searchForm = new FormGroup({
    txtInput: new FormControl('', Validators.required),
  });

  @ViewChild('searchResult') container!: ElementRef;

  onSearch() {
    this.container.nativeElement.scrollLeft = 0;
    this.store.dispatch(
      SearchActions.searchsTrack({ q: this.searchForm.value.txtInput! }),
    );
  }

  extractId(artists: SimplifiedArtist[]): string[] {
    return artists.map((a) => a.id);
  }

  setArtistId(ids: string[]) {
    this.store.dispatch(ArtistActions.ids({ ids: ids }));
  }

  ngOnInit(): void {
    // fromEvent(this.window, 'popstate')
    //   .pipe(tap(() => console.log('hellooooo')))
    //   .subscribe(() => {
    //     history.pushState(null, '');
    //     console.log('back button is clicked');
    //   });

    this.store
      .select(selectSearchLoading)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }
  notify(idx: number) {
    setTimeout(() => {
      console.log('done loading image...');
      this._completedImages[idx] = [0];

      this.document
        .getElementById(`img${this.items[idx].id}`)
        ?.classList.remove('hide');
    }, 3000);
  }

  constructor(
    private store: Store<AppState>,
    private destroyRef: DestroyRef,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.store
      .select(selectSearchTrack)
      .pipe(takeUntilDestroyed())
      .subscribe((res) => {
        this.items = res.resp.items;

        // create array of empty array to represent which image(id) is loading/finish
        Array.from({ length: this.items?.length }).forEach(() => {
          this._completedImages.push([]);
        });
      });
  }
}
