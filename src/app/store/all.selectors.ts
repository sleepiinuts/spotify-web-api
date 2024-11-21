import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Track } from '@spotify/web-api-ts-sdk';
import { SearchTrackResp } from '../models/search-track.model';
import {
  searchFeatureKey,
  State as searchState,
} from './search/search.reducer';
import { trackFeatureKey, State as trackState } from './track/track.reducer';

export interface AppState {
  searchTrack: SearchTrackResp;
  track: Track;
}

export const selectSearchTrack =
  createFeatureSelector<searchState>(searchFeatureKey);

export const selectTrack = createFeatureSelector<trackState>(trackFeatureKey);
export const selectTrackLoading = createSelector(
  selectTrack,
  (state) => state.isloading
);
