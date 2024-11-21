import { createReducer, on } from '@ngrx/store';
import { Track } from '@spotify/web-api-ts-sdk';
import { TrackActions } from './track.actions';

export const trackFeatureKey = 'track';

export interface State {
  track: Track;
}

export const initialState: State = {
  track: <Track>{},
};

export const reducer = createReducer(
  initialState,
  on(TrackActions.loadTracksSuccess, (state, props) => ({
    ...state,
    track: props.track,
  }))
);
