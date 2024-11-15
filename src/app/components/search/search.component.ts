import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { catchError, from, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule],
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
  private sdk: SpotifyApi;
  constructor() {
    // redirectToAuthCodeFlow('2e7027c4cd734e9b937c9b2bd77191d5');
    // this.sdk = SpotifyApi.withUserAuthorization(
    //   '2e7027c4cd734e9b937c9b2bd77191d5',
    //   'http://localhost:4200',
    //   ['user-read-email', 'user-read-private', 'playlist-read-private']
    // );
    this.sdk = SpotifyApi.withClientCredentials(
      environment.clientId,
      environment.clientSecret
    );

    from(this.sdk.search('The Beatles', ['artist', 'playlist']))
      .pipe(catchError((err) => of(err)))
      .subscribe((value) => console.log(value));
  }
}
