import { Routes } from '@angular/router';
import { AlbumComponent } from './components/album/album.component';
import { ArtistComponent } from './components/artist/artist.component';
import { SearchComponent } from './components/search/search.component';
import { TrackComponent } from './components/track/track.component';

export const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'tracks', component: TrackComponent },
  { path: 'albums', component: AlbumComponent },
  { path: 'artists', component: ArtistComponent },
];
