import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const TrackActions = createActionGroup({
  source: 'Track',
  events: {
    'Load Tracks': emptyProps(),
    'Load Tracks Success': props<{ data: unknown }>(),
    'Load Tracks Failure': props<{ error: unknown }>(),
  }
});
