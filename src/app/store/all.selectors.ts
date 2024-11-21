import { createFeatureSelector } from '@ngrx/store';
import { Track } from '@spotify/web-api-ts-sdk';
import { SearchTrackResp } from '../models/search-track.model';
import {
  searchFeatureKey,
  State as searchState,
} from './search/search.reducer';

export interface AppState {
  searchTrack: SearchTrackResp;
  track: Track;
}

export const selectSearchTrack =
  createFeatureSelector<searchState>(searchFeatureKey);
