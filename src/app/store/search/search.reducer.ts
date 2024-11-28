import { createReducer, on } from '@ngrx/store';
import { Page, Track } from '@spotify/web-api-ts-sdk';
import { SearchActions } from './search.actions';

export const searchFeatureKey = 'searchTrack';

export interface State {
  resp: Page<Track>;
  isLoading: boolean;
}

export const initialState: State = {
  resp: <Page<Track>>{},
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(SearchActions.searchsTrackSuccess, (state, props) => ({
    ...state,
    resp: props.resp,
    isLoading: false,
  })),
  on(SearchActions.loading, (state) => ({
    ...state,
    isLoading: true,
  })),
);
