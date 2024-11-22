import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Artist } from '@spotify/web-api-ts-sdk';

export const ArtistActions = createActionGroup({
  source: 'Artist',
  events: {
    ids: props<{ ids: string[] }>(),
    Load: emptyProps(),
    Loading: emptyProps(),
    'Load Success': props<{ artists: Artist[] }>(),
    'Load Failure': props<{ error: unknown }>(),
  },
});
