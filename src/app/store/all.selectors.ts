import { createFeatureSelector } from '@ngrx/store';
import { SearchTrackResp } from '../models/search-track.model';
import {
  searchFeatureKey,
  State as searchState,
} from './search/search.reducer';

export interface AppState {
  searchTrack: SearchTrackResp;
}

export const selectSearchTrack =
  createFeatureSelector<searchState>(searchFeatureKey);
