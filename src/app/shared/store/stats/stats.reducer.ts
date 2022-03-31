import { createReducer, on } from '@ngrx/store';
import { FaceIT } from '../../models/FaceIT';
import {
  loadPlayerOverviewByNicknameSuccess,
  loadPlayerStatsByIDSuccess,
} from './stats.actions';

export interface StatsState {
  playerOverviews: FaceIT.PlayerOverview.Player[];
  playerStats: FaceIT.Player.PlayerStats[];
}

export const initialState: StatsState = {
  playerOverviews: [],
  playerStats: [],
};

export const statsReducer = createReducer(
  initialState,
  on(loadPlayerOverviewByNicknameSuccess, (state, { playerOverview }) => ({
    ...state,
    playerOverviews: [...state.playerOverviews, playerOverview],
  })),
  on(loadPlayerStatsByIDSuccess, (state, { playerStats }) => ({
    ...state,
    playerStats: [...state.playerStats, playerStats],
  }))
);
