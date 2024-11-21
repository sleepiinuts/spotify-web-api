import { createReducer, on } from '@ngrx/store';
import { TrackActions } from './track.actions';

export const trackFeatureKey = 'track';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

