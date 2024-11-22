import { createReducer, on } from '@ngrx/store';
import { Track } from '@spotify/web-api-ts-sdk';
import { TrackActions } from './track.actions';

export const trackFeatureKey = 'track';

export interface State {
  track: Track;
  isloading: boolean;
}

export const initialState: State = {
  track: <Track>{},
  isloading: false,
};

export const reducer = createReducer(
  initialState,
  on(TrackActions.loadSuccess, (state, props) => ({
    ...state,
    track: props.track,
    isloading: false,
  })),
  on(TrackActions.loading, (state) => ({
    ...state,
    isloading: true,
  }))
);
