import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Track } from '@spotify/web-api-ts-sdk';

export const TrackActions = createActionGroup({
  source: 'Track',
  events: {
    Load: props<{ id: string }>(),
    Loading: emptyProps(),
    'Load Success': props<{ track: Track }>(),
    'Load Failure': props<{ error: unknown }>(),
  },
});
