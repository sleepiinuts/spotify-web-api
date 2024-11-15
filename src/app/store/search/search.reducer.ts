import { createReducer, on } from '@ngrx/store';
import { Page, Track } from '@spotify/web-api-ts-sdk';
import { SearchActions } from './search.actions';

export const searchFeatureKey = 'searchTrack';

export interface State {
  resp: Page<Track>;
}

export const initialState: State = {
  resp: <Page<Track>>{},
};

export const reducer = createReducer(
  initialState,
  on(SearchActions.searchsTrackSuccess, (state, props) => ({
    ...state,
    resp: props.resp,
  }))
);
