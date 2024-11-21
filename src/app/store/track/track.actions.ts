import { createActionGroup, props } from '@ngrx/store';
import { Track } from '@spotify/web-api-ts-sdk';

export const TrackActions = createActionGroup({
  source: 'Track',
  events: {
    'Load Tracks': props<{ id: string }>(),
    'Load Tracks Success': props<{ track: Track }>(),
    'Load Tracks Failure': props<{ error: unknown }>(),
  },
});
