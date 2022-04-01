import { createReducer, on } from '@ngrx/store';
import { App } from '../../models/App';
import { FaceIT } from '../../models/FaceIT';
import {
  loadPlayerDetailsByNicknameSuccess,
  loadPlayerOverviewByNicknameSuccess,
  loadPlayerStatsByIDSuccess,
} from './stats.actions';

export interface StatsState {
  playerOverviews: FaceIT.PlayerOverview.Player[];
  playerStats: FaceIT.Player.PlayerStats[];
  playerDetails: App.Player.Details[];
}

export const initialState: StatsState = {
  playerOverviews: [],
  playerStats: [],
  playerDetails: []
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
  })),

  on(loadPlayerDetailsByNicknameSuccess, (state, { playerDetails }) => ({
    ...state,
    playerDetails: [...state.playerDetails, playerDetails],
  }))
);
