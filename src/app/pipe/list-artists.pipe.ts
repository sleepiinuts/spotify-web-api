import { Pipe, PipeTransform } from '@angular/core';
import { SimplifiedArtist } from '@spotify/web-api-ts-sdk';

@Pipe({
  name: 'listArtists',
  standalone: true,
})
export class ListArtistsPipe implements PipeTransform {
  transform(artists: SimplifiedArtist[]): string {
    return artists.map((a) => a.name).join(', ');
  }
}
