import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { merge, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import {
  loadPlayerDetailsByNicknameError,
  loadPlayerDetailsByNicknames,
  loadPlayerDetailsByNicknameSuccess,
  loadPlayerOverviewByNickname,
  loadPlayerOverviewByNicknameError,
  loadPlayerOverviewByNicknameSuccess,
  loadPlayerStatsByID,
  loadPlayerStatsByIDError,
  loadPlayerStatsByIDs,
  loadPlayerStatsByIDSuccess,
} from './stats.actions';

@Injectable()
export class StatsEffects {
  loadPlayerOverviewByNickname$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPlayerOverviewByNickname),
      concatMap((props) =>
        this.apiService.getPlayerOverviewByName(props.nickname).pipe(
          map((playerOverview) =>
            loadPlayerOverviewByNicknameSuccess({ playerOverview })
          ),
          catchError(() => of(loadPlayerOverviewByNicknameError()))
        )
      )
    )
  );

  loadPlayerStatsByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPlayerStatsByID),
      concatMap((props) =>
        this.apiService.getPlayerStats(props.id).pipe(
          map((playerStats) => loadPlayerStatsByIDSuccess({ playerStats })),
          catchError(() => of(loadPlayerStatsByIDError({ id: props.id })))
        )
      )
    )
  );

  loadPlayerStatsByIDs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPlayerStatsByIDs),
      concatMap((action) => {
        return merge(
          ...action.ids.map((id) =>
            this.apiService.getPlayerStats(id).pipe(
              map((stats) =>
                loadPlayerStatsByIDSuccess({ playerStats: stats })
              ),
              catchError(() => of(loadPlayerStatsByIDError({ id })))
            )
          )
        );
      })
    )
  );

  loadPlayerDetailsByNicknames$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPlayerDetailsByNicknames),
      concatMap((action) => {
        return merge(
          ...action.nicknames.map((nickname) =>
            this.apiService.getPlayerDetails(nickname).pipe(
              map((playerDetails) =>
                loadPlayerDetailsByNicknameSuccess({ playerDetails })
              ),
              catchError(() =>
                of(loadPlayerDetailsByNicknameError({ nickname }))
              )
            )
          )
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private apiService: ApiService
  ) {}
}
