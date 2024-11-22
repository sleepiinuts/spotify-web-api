import {
  Component,
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
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { SimplifiedArtist, Track } from '@spotify/web-api-ts-sdk';
import { WINDOW } from '../../config.injection-token';
import { ListArtistsPipe } from '../../pipe/list-artists.pipe';
import { AppState, selectSearchTrack } from '../../store/all.selectors';
import { SearchActions } from '../../store/search/search.actions';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ListArtistsPipe,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
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
  searchForm = new FormGroup({
    txtInput: new FormControl('', Validators.required),
  });

  @ViewChild('searchResult') container!: ElementRef;

  onSearch() {
    this.container.nativeElement.scrollLeft = 0;
    this.store.dispatch(
      SearchActions.searchsTrack({ q: this.searchForm.value.txtInput! })
    );
  }

  extractId(artists: SimplifiedArtist[]): string {
    return artists.map((a) => a.id).join(',');
  }

  ngOnInit(): void {
    // fromEvent(this.window, 'popstate')
    //   .pipe(tap(() => console.log('hellooooo')))
    //   .subscribe(() => {
    //     history.pushState(null, '');
    //     console.log('back button is clicked');
    //   });
  }

  constructor(
    private store: Store<AppState>,
    @Inject(WINDOW) private window: Window
  ) {
    this.store
      .select(selectSearchTrack)
      .pipe(takeUntilDestroyed())
      .subscribe((res) => (this.items = res.resp.items));
  }
}
