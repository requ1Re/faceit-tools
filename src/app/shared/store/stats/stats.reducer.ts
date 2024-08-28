import { createReducer, on } from '@ngrx/store';
import { App } from '../../models/App';
import { loadPlayerDetailsByNicknameSuccess } from './stats.actions';

export interface StatsState {
  playerDetails: App.Player.Details[];
}

export const initialState: StatsState = {
  playerDetails: [],
};

export const statsReducer = createReducer(
  initialState,
  on(loadPlayerDetailsByNicknameSuccess, (state, { playerDetails }) => ({
    ...state,
    playerDetails: [...state.playerDetails, playerDetails],
  })),
);
