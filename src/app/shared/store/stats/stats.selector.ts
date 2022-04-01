import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StatsState } from "./stats.reducer";

export const statsState = createFeatureSelector<StatsState>('stats');

export const getStatsState = createSelector(
  statsState,
  (state: StatsState) => state
);

export const getPlayerDetails = createSelector(
  statsState,
  (state: StatsState) => state.playerDetails
);
