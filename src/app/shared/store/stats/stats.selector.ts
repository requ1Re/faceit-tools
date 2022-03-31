import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StatsState } from "./stats.reducer";

export const statsState = createFeatureSelector<StatsState>('stats');

export const getStatsState = createSelector(
  statsState,
  (state: StatsState) => state
);

export const getPlayerStats = createSelector(
  statsState,
  (state: StatsState) => state.playerStats
);
export const getPlayerOverviews = createSelector(
  statsState,
  (state: StatsState) => state.playerOverviews
);
