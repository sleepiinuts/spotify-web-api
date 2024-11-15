import { createActionGroup, props } from '@ngrx/store';
import { Page, Track } from '@spotify/web-api-ts-sdk';

export const SearchActions = createActionGroup({
  source: 'Search',
  events: {
    SearchsTrack: props<{ q: string }>(),
    'SearchsTrack Success': props<{ resp: Page<Track> }>(),
    'SearchsTrack Failure': props<{ error: any }>(),
  },
});
