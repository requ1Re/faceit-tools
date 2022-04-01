import { createAction, props } from '@ngrx/store';
import { App } from '../../models/App';
import { FaceIT } from '../../models/FaceIT';

export const loadPlayerOverviewByNickname = createAction(
  '[Stats] Load Player Overview by Nickname',
  props<{ nickname: string }>()
);

export const loadPlayerOverviewsByNicknames = createAction(
  '[Stats] Load Player Overviews by Nicknames',
  props<{ nicknames: string[] }>()
);

export const loadPlayerOverviewByNicknameSuccess = createAction(
  '[Stats] Load Player Overview by Nickname Success',
  props<{ playerOverview: FaceIT.PlayerOverview.Player }>()
);

export const loadPlayerOverviewByNicknameError = createAction(
  '[Stats] Load Player Overview by Nickname Error'
);



export const loadPlayerStatsByID = createAction(
  '[Stats] Load Player Stats by ID',
  props<{ id: string }>()
);

export const loadPlayerStatsByIDs = createAction(
  '[Stats] Load Player Stats by IDs',
  props<{ ids: string[] }>()
);

export const loadPlayerStatsByIDSuccess = createAction(
  '[Stats] Load Player Stats by ID Success',
  props<{ playerStats: FaceIT.Player.PlayerStats }>()
);

export const loadPlayerStatsByIDError = createAction(
  '[Stats] Load Player Stats by ID Error',
  props<{ id: string }>()
);

// playerDetails
export const loadPlayerDetailsByNicknames = createAction(
  '[Stats] Load Player Details by Nicknames',
  props<{ nicknames: string[] }>()
);

export const loadPlayerDetailsByNicknameSuccess = createAction(
  '[Stats] Load Player Details by Nickname Success',
  props<{ playerDetails: App.Player.Details }>()
);

export const loadPlayerDetailsByNicknameError = createAction(
  '[Stats] Load Player Details by Nickname Error',
  props<{ nickname: string }>()
);

