import { createReducer, on } from '@ngrx/store';
import { Artist } from '@spotify/web-api-ts-sdk';
import { ArtistActions } from './artist.actions';

export const artistFeatureKey = 'artist';

export interface State {
  ids: string[];
  artist: Artist[];
  isLoading: boolean;
}

export const initialState: State = {
  ids: [],
  artist: [],
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(ArtistActions.ids, (state, props) => ({
    ...state,
    ids: props.ids,
  })),
  on(ArtistActions.loading, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ArtistActions.loadSuccess, (state, props) => ({
    ...state,
    artist: props.artists,
    isLoading: false,
  })),
);
