import { Component } from '@angular/core';
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
import { Store } from '@ngrx/store';
import { Track } from '@spotify/web-api-ts-sdk';
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
export class SearchComponent {
  items!: Track[];
  searchForm = new FormGroup({
    txtInput: new FormControl('', Validators.required),
  });

  onSearch() {
    this.store.dispatch(
      SearchActions.searchsTrack({ q: this.searchForm.value.txtInput! })
    );
  }

  constructor(private store: Store<AppState>) {
    this.store
      .select(selectSearchTrack)
      .pipe(takeUntilDestroyed())
      .subscribe((res) => (this.items = res.resp.items));
  }
}
